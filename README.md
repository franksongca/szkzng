https://github.com/franksongca/szkzng.git

This project is based on angularjs library with responsive design.

The scaffold is by yeoman. Installed with grunt and some plugins to manage the project, including grunt-contrib-concat, grunt-contrib-uglify, grunt-contrib-cssmin, grunt-contrib-jshint, grunt-contrib-less...  

karma and karma-jasmine are installed to enable to do the unit testing. 

The project is also integrated with cordova, it can build the android cordova package together with the grunt build. 

The project uses LESS to write the css styles.

Source code is in the folder: app.

The android cordova package CordovaApp-debug.apk is in the folder: platforms\android\ant-build\

Run command 'bower install' and 'npm install' in the project. For some reason, components in node_modules is not working fine, if you want to fully build the app(run command grunt), please extract the zip file node_module.zip to replace the folder node_modules.

Run command 'grunt serve' to launch the web app.

Run command 'grunt' to compile the app, the web content is in the folder: www, and the package CordovaApp-debug.apk is compiled at the same time.

This project is under construction, it can show my experience in angular and front-skills in some way as a portfolio.

songfrank@hotmail.com
cell: 647-862-7810

Frank Song

   