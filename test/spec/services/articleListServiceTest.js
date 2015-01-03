'use strict';

describe('Factory: ArticleListFactory', function () {
  var articleListFactory,
      httpBackend,
      articles;

  beforeEach(module('szkzApp', function($provide) {
    // Output messages
    $provide.value('$log', console);
  })); 


  beforeEach(function (){  
    // load the module.
    module('szkzApp');
    
    // get your service, also get $httpBackend
    // $httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, _ArticleListFactory_) {
      articleListFactory = _ArticleListFactory_;      
      httpBackend = $httpBackend;
    });
  });
  
  // make sure no expectations were missed in your tests.
  // (e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });
 
  it('should return the data defined in data/content.json.', function (){
    // set up some data for the http call to return and test later.
    var returnData = {
      appName: {
        'hz':'启蒙中文',
        'py':'qi3 meng2 zhong1 wen2',
        'en':'Easy HanZi'
      },

      'articles': [
        {
          'type': 'kj',
          'label': {
            'hz':'识字口诀',
            'py':'Shi Zi Kou Jue',
            'en':'Literacy teaching pithy formula'
          },
          'articles':
          [
            {
              'code': 'kj-SZJ',
              'title': {
                'hz':'三字经',
                'py':'San Zi Jing',
                'en':' Three character primer'
              },
              'author': '王应麟',
              'pages': '93'
            },
            {
              'code': 'kj-QZW',
              'title': {
                'hz':'千字文',
                'py':'Qian Zi Wen',
                'en':'Thousand character classic'
              },
              'author': '周兴嗣',
              'pages': '125'
            }
          ]
        },
        {
          'type': 'thgs',
          'label': {
            'hz':'童话故事',
            'py':'Tong Hua Gu Shi',
            'en':'Fairy tales'
          },
          'articles':
          [
            {
              'code': 'thgs-CXY',
              'title': {
                'hz':'丑小鸭',
                'py':'Chou Xiao Ya',
                'en':'The ugly duckling'
              },
              'author': '安徒生',
              'pages': '110'
            }
          ]
        },
        {
          'type': 'cygs',
          'label': {
            'hz':'成语故事',
            'py':'Cheng Yu Gu Shi',
            'en':'Idiom stories'
          },
          'articles':
          [
            {
              'code': 'cygs-YMJR',
              'title': {
                'hz':'一鸣惊人',
                'py':'Yi Ming Jing Ren',
                'en':'Set the world on fire'
              },
              'author': '佚名',
              'pages': '13'
            },
            {
              'code': 'cygs-CFPL',
              'title': {
                'hz':'乘风破浪',
                'py':'Cheng Feng Po Lang',
                'en':'Ride the wind and waves'
              },
              'author': '佚名',
              'pages': '7'
            },
            {
              'code': 'cygs-JDZW',
              'title': {
                'hz':'井底之蛙',
                'py':'Jing Di Zhi Wa',
                'en':'The frog in well'
              },
              'author': '佚名',
              'pages': '12'
            },
            {
              'code': 'cygs-WYBL',
              'title': {
                'hz':'亡羊补牢',
                'py':'Wang Yang Bu Lao',
                'en':'Mend the fold after a sheep is lost'
              },
              'author': '佚名',
              'pages': '12'
            },
            {
              'code': 'cygs-KZQJ',
              'title': {
                'hz':'刻舟求剑',
                'py':'Ke Zhou Qiu Jian',
                'en':'Notching the boat to find the sword'
              },
              'author': '佚名',
              'pages': '7'
            },
            {
              'code': 'cygs-MLSS',
              'title': {
                'hz':'名落孙山',
                'py':'Ming Luo Sun Shan',
                'en':'Fall behind Sun Shan'
              },
              'author': '佚名',
              'pages': '11'
            },
            {
              'code': 'cygs-LYCS',
              'title': {
                'hz':'滥竽充数',
                'py':'Lan Yu Chong Shu',
                'en':'Be dragged in to swell the total'
              },
              'author': '佚名',
              'pages': '15'
            },
            {
              'code': 'cygs-HJHW',
              'title': {
                'hz':'狐假虎威',
                'py':'Hu Jia Hu Wei',
                'en':'The fox assuming the majesty of the tiger'
              },
              'author': '佚名',
              'pages': '14'
            },
            {
              'code': 'cygs-TCCZ',
              'title': {
                'hz':'铁杵成针',
                'py':'Tie Chu Cheng Zhen',
                'en':'Little strokes fell great oaks'
              },
              'author': '佚名',
              'pages': '12'
            },
            {
              'code': 'cygs-SWSM',
              'title': {
                'hz':'塞翁失马',
                'py':'Sai Weng Shi Ma',
                'en':'A loss may turn out to be a gain'
              },
              'author': '佚名',
              'pages': '11'
            }
          ]
        },
        {
          'type': 'scjx',
          'label': {
            'hz':'诗词精选',
            'py':'Shi Ci Jing Xuan',
            'en':'Classical Chinese Poetry'
          },
          'articles':
          [
            {
              'code': 'scjx-YE',
              'title': {
                'hz':'咏鹅',
                'py':'Yong E',
                'en':'The Geese'
              },
              'author': '骆宾王',
              'pages': '2'
            },
            {
              'code': 'scjx-MN',
              'title': {
                'hz':'悯农',
                'py':'Min Nong',
                'en':'Commiserate with farmers'
              },
              'author': '李绅',
              'pages': '2'
            },
            {
              'code': 'scjx-CX',
              'title': {
                'hz':'春晓',
                'py':'Chun Xiao',
                'en':'The spring dawn'
              },
              'author': '孟浩然',
              'pages': '2'
            },
            {
              'code': 'scjx-JX',
              'title': {
                'hz':'江雪',
                'py':'Jiang Xue',
                'en':'Fishing in snow'
              },
              'author': '柳宗元',
              'pages': '2'
            },
            {
              'code': 'scjx-QM',
              'title': {
                'hz':'清明',
                'py':'Qing Ming',
                'en':'Qing Ming festival'
              },
              'author': '杜牧',
              'pages': '2'
            },
            {
              'code': 'scjx-JYS',
              'title': {
                'hz':'静夜思',
                'py':'Jing Ye Si',
                'en':'Quiet night thoughts'
              },
              'author': '李白',
              'pages': '2'
            },
            {
              'code': 'scjx-WLSPB',
              'title': {
                'hz':'望庐山瀑布',
                'py':'Wang Lu Shan Pu Bu',
                'en':'The Lu mountain falls'
              },
              'author': '李白',
              'pages': '2'
            },
            {
              'code': 'scjx-SMHR',
              'title': {
                'hz':'黄鹤楼送孟浩然之广陵',
                'py':'Huang He Lou Song Meng Hao Ran Zhi Guang Ling',
                'en':'Guangling Yellow Crane Tower sent Meng Haoran'
              },
              'author': '李白',
              'pages': '2'
            },
            {
              'code': 'scjx-ZFBDC',
              'title': {
                'hz':'早发白帝城',
                'py':'Zao Fa Bai Di Cheng',
                'en':'Early departure from Baidi town'
              },
              'author': '李白',
              'pages': '2'
            },
            {
              'code': 'scjx-CLG',
              'title': {
                'hz':'敕勒歌',
                'py':'Ci Le Ge',
                'en':'Ancient folk song'
              },
              'author': '北朝民歌',
              'pages': '2'
            }
          ]
        },
        {
          'type': 'scgq',
          'label': {
            'hz':'诗词歌曲',
            'py':'Shi Ci Ge Qu',
            'en':'Songs of classical Chinese poetry'
          },
          'articles': 
          [
            {
              'code': 'scgq-YE',
              'title': {
                'hz':'咏鹅',
                'py':'Yong E',
                'en':'The geese'
              },
              'author': '骆宾王',
              'pages': '5'
            },
            {
              'code': 'scgq-QM',
              'title': {
                'hz':'清明',
                'py':'Qing Ming',
                'en':'Qing Ming festival'
              },
              'author': '杜牧',
              'pages': '6'
            },
            {
              'code': 'scgq-CX',
              'title': {
                'hz':'春晓',
                'py':'Chun Xiao',
                'en':'The spring dawn'
              },
              'author': '孟浩然',
              'pages': '6'
            },
            {
              'code': 'scgq-JYS',
              'title': {
                'hz':'静夜思',
                'py':'Jing Ye Si',
                'en':'Quiet night thoughts'
              },
              'author': '李白',
              'pages': '8'
            },
            {
              'code': 'scgq-CS',
              'title': {
                'hz':'出塞',
                'py':'Chu Sai',
                'en':'Go out of the border'
              },
              'author': '王维',
              'pages': '8'
            }
          ]
        }
      ]
    },
    returnedPromise,
    result,
    appName;
    
    // expectGET to make sure this is called once.
    httpBackend.expectGET('data/content-list.json').respond(returnData);
    
    // make the call.
    returnedPromise = articleListFactory.init();
    
    // set up a handler for the response, that will put the result
    // into a variable in this scope for you to test.
    returnedPromise.then(function(response) {
      console.log('response =' + response);
      result = response;
    });
    
    // flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    articles = articleListFactory.getArticles();

    // check the result. 
    // (after Angular 1.2.5: be sure to use `toEqual` and not `toBe`
    // as the object will be a copy and not the same instance.)
    expect(result).toEqual(true);
    console.log('PASS 1');
    expect(articles[0].type).toEqual('kj');
    console.log('PASS 2');
    expect(articles[0].articles.length).toEqual(2);
    console.log('PASS 3');
    expect(articles[1].articles.length).toEqual(1);
    console.log('PASS 4');
    expect(articles[2].articles.length).toEqual(10);
    console.log('PASS 5');

    appName = articleListFactory.getAppName(); 
    expect(appName.hz).toEqual('启蒙中文');
    console.log('PASS 6');
    expect(appName.py).toEqual('qi3 meng2 zhong1 wen2');
    console.log('PASS 7');
    expect(appName.en).toEqual('Easy HanZi');
    console.log('PASS 8');


    expect(articleListFactory.getArticleCount()).toEqual(5);
    console.log('PASS 9');

    expect(articleListFactory.getArticleInfo({type: 'kj', code: 'SZJ'}).title.hz).toEqual('三字经');
    console.log('PASS 10');

    expect(articleListFactory.getArticleTypeLabel('kj').hz).toEqual('识字口诀');
    console.log('PASS 11');
    expect(articleListFactory.getArticleTypeLabel('kj').en).toEqual('Literacy teaching pithy formula');
    console.log('PASS 12');

    console.log('TYPE: ' + JSON.stringify(articleListFactory.getArticleTypeLabel('kj')));
  });  
});