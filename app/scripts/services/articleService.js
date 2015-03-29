'use strict';

angular.module('szkzApp.services').factory('ArticleFactory', ['$rootScope', '$http', '$timeout', '_',
    'ArticleListFactory', 'UIService',
    function($rootScope, $http, $timeout, _, ArticleListFactory, UIService)
{
    var currentArticle,
        articleType,
        articleCode,
        totalPage,
        inLoading = true,
        player = document.getElementById('audio-player'),
        sourceMP3 = document.getElementById('audio-src-mp3'),
        audioURL = 'http://sz-abc.com/ng/audio/';

    return {
        loadArticle: function(code){
            var group = ArticleListFactory.getArticleGroupIndex(code),
                article = code.split('-'),
                url,// = "data\\WenZhang\\" + article[0] + "\\" + (group == undefined ? "" : "g" + group + "\\") + article[1] + "\\text.xml",
                blankCharacter = {hanZi: '', pinYin: '', shengDiao: '', 'ori_id': '', mistake: 0, index: 0, characterIndex: ''};

            if (articleType + '-' + articleCode === code) {
                return;
            }

            inLoading = true;

            articleType = article[0];
            articleCode = article[1];

            UIService.showSpinner(true);

            url = 'data\\WenZhang\\' + articleType + '\\' + (group === undefined ? '' : 'g' + group + '\\') + articleCode + '\\document.json';

            $http.get(url).then(function (response) {
                var pageData = response.data,
                    attributes,
                    ziObj,
                    pageObj,
                    cuePointsText,
                    charCount,
                    characterIndex,
                    appendChars,
                    i,
                    cuePoint,
                    attrLineSpacing = 'line_spacing',
                    attrRowsPerPage = 'rows_per_page',
                    attrCharactersPerRow = 'characters_per_row',
                    attrPositionX = 'position_x',
                    attrPositionY = 'position_y',
                    attrHanZi = 'han_zi',
                    attrShengDiao = 'sheng_diao',
                    attrPinYin = 'pin_yin',
                    attrOriginalId = 'ori_id',
                    attrXuHao = 'xu_hao',
                    attrCuePoints = 'cue_points',
                    tempChar,
                    paragraphs;

                currentArticle = {};
                currentArticle.pageAttributes = {};

                currentArticle.pageAttributes.scale = +pageData.scale;
                currentArticle.pageAttributes.valign = pageData.valign;
                currentArticle.pageAttributes.halign = pageData.halign;
                currentArticle.pageAttributes.lineSpacing = +pageData[attrLineSpacing];
                currentArticle.pageAttributes.charactersPerRow = +pageData[attrCharactersPerRow];
                currentArticle.pageAttributes.rowsPerPage = +pageData[attrRowsPerPage];
                currentArticle.pageAttributes.positionX = +pageData[attrPositionX];
                currentArticle.pageAttributes.positionY = +pageData[attrPositionY];
                currentArticle.pageAttributes.style = +pageData.style;

                currentArticle.pages = [];
                _.each(pageData.page, function(page){
                    pageObj = {};

                    pageObj.pageAttributes = {};
                    pageObj.pageAttributes.align = page.align;
                    pageObj.pageAttributes.lineSpacing = +page[attrLineSpacing];
                    pageObj.pageAttributes.scale = +page.scale;
                    pageObj.pageAttributes.positionX = +page[attrPositionX];
                    pageObj.pageAttributes.positionY = +page[attrPositionY];
                    pageObj.pageAttributes.charactersPerRow = +page[attrCharactersPerRow];
                    pageObj.pageAttributes.rowsPerPage = page[attrRowsPerPage];
                    pageObj.pageAttributes.halign = page.halign;
                    pageObj.pageAttributes.valign = page.valign;

                    cuePointsText = page[attrCuePoints];
                    pageObj.cuePoints = cuePointsText.split(',');

                    pageObj.characters = [];
                    charCount = 0;
                    characterIndex = 0;

                    paragraphs = page.paragraph;

                    if (!angular.isArray(paragraphs)) {
                        paragraphs = [paragraphs];
                    }

                    _.each(paragraphs, function (p) {
                        _.each(p.zi, function (zi) {
                            ziObj = {};

                            if(zi[attrHanZi] === ''){
                                if(charCount % currentArticle.pageAttributes.charactersPerRow > 0){
                                    appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
                                    for (i=0; i< appendChars; i++) {
                                        tempChar = angular.copy(blankCharacter);
                                        tempChar.index = charCount;
                                        pageObj.characters.push(tempChar);

                                        charCount++;
                                    }
                                }
                            } else {
                                ziObj.hanZi = zi[attrHanZi];
                                ziObj.shengDiao = +zi[attrShengDiao];
                                ziObj.pinYin = zi[attrPinYin];
                                if(ziObj.pinYin === ''){
                                    ziObj.characterIndex = '';
                                } else {
                                    cuePoint = pageObj.cuePoints[characterIndex];
                                    pageObj.cuePoints[characterIndex] = {cuePoint: +cuePoint, realIndex: +zi[attrXuHao], pinyin: ziObj.pinYin + '_' + ziObj.shengDiao };

                                    ziObj.characterIndex = 'character-' + (++characterIndex);
                                }

                                if (zi.id) {
                                    ziObj[attrOriginalId] = +zi.id;
                                } else {
                                    ziObj[attrOriginalId] = '';
                                }

                                ziObj.mistakes = +zi.mistakes;
                                ziObj.times = +zi.times;
                                ziObj.index = +zi[attrXuHao];
                                pageObj.characters.push(ziObj);

                                charCount++;
                            }
                        });

                        if(charCount % currentArticle.pageAttributes.charactersPerRow > 0){
                            appendChars = currentArticle.pageAttributes.charactersPerRow - (charCount % currentArticle.pageAttributes.charactersPerRow);
                            for (i = 0; i < appendChars; i++) {
                                tempChar = angular.copy(blankCharacter);
                                tempChar.index = charCount;
                                pageObj.characters.push(tempChar);
                                charCount++;
                            }
                        }
                    });

                    currentArticle.pages.push(pageObj);
                });

                totalPage = currentArticle.pages.length;
                inLoading = false;

                $timeout(function () {
                    UIService.hideSpinner();
                }, 1000);
            });
        },

        getTotalPages: function () {
            return totalPage;
        },

        getArticleInfo: function () {
            return ArticleListFactory.getArticleInfo({type: articleType, code: articleCode});
        },

        getArticleType: function () {
            return articleType;
        },

        getArticleCode: function () {
            return articleCode;
        },

        getArticle: function () {
            return currentArticle;
        },

        getLoadingStatus: function () {
            return inLoading;
        },

        getPageCharacters: function (index) {
            return currentArticle.pages[index].characters;
        },

        getCharactersPerLine: function () {
            return parseInt(currentArticle.pageAttributes.charactersPerRow);
        },

        getPageTotalLines: function (index) {
            return currentArticle.pages[index].characters.length / this.getCharactersPerLine();
        },

        getPageLines: function (index) {
            var lines = [],
                counter = 0,
                lineCount = 0,
                characters = currentArticle.pages[index].characters;

            lines[0] = [];
            for (var i = 0; i < characters.length; i++) {
                counter++;
                if (counter > this.getCharactersPerLine(index)) {
                    lineCount++;
                    counter = 0;
                    lines[lineCount] = [];
                }
                lines[lineCount].push(characters[i]);
            }

            return lines;
        },

        getCuePoints: function (index) {
            return currentArticle.pages[index].cuePoints;
        },

        getAudioBaseURL: function () {
            return audioURL;
        },

        getAudioURL: function(audioFormat){
            var code = this.getArticleType() + '-' + this.getArticleCode(),
                group = ArticleListFactory.getArticleGroupIndex(code),
                article = code.split('-');

            audioFormat = audioFormat || 'mp3';

            return this.getAudioBaseURL() +  'WenZhang/' +article[0] + '/' +
                (group === undefined ? '' : 'g'+group + '/') +
                article[1] + '/' + (audioFormat === undefined ? '' : (audioFormat + '/'));
        }
    };
}]);
