/*

  GLOBAL TODO:

  - Implement easy version control (for version bumping)
  - Allow use of local builds/copies of YUI
  - Write some demo YUI code
  - Support front-end YUI and Node.js YUI (?)

*/

'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var YuiGenerator = module.exports = function YuiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // For building index.html and CSS include URL.
  this.indexFile = '';
  this.cssIncludeURL = '    <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?3.10.1/cssfonts/cssfonts-min.css&3.10.1/cssgrids/cssgrids-min.css&3.10.1/cssreset/cssreset-min.css&3.10.1/cssbase/cssbase-min.css"> \n';

  // this.on('end', function () {
  //   this.installDependencies({ skipInstall: options['skip-install'] });
  // });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(YuiGenerator, yeoman.generators.NamedBase);

YuiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcome);
  /*
    TODO: Improve prompt descriptions.
  */
  var prompts = [];
  // {
  //   name: 'resetCSS',
  //   message: 'Would you like to include YUI CSS reset?',
  //   default: 'Y/n',
  //   warning: 'Includes YUI CSS reset stylesheets.'
  // },

  // {
  //   name: 'baseCSS',
  //   message: 'Would you like to include YUI base styles?',
  //   default: 'Y/n',
  //   warning: 'Includes YUI base CSS styles.'
  // },

  // {
  //   name: 'gridsCSS',
  //   message: 'Would you like to include YUI CSS grids?',
  //   default: 'Y/n',
  //   warning: 'Includes YUI grid stylesheets.'
  // },

  // {
  //   name: 'fontsCSS',
  //   message: 'Would you like to include YUI CSS fonts?',
  //   default: 'Y/n',
  //   warning: 'Includes YUI font stylesheets.'
  // }];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    // manually deal with the response, get back and store the results.
    this.resetCSS = props.resetCSS;
    this.baseCSS = props.baseCSS;
    this.gridsCSS = props.gridsCSS;
    this.fontsCSS = props.fontsCSS;

    cb();
  }.bind(this));
};

YuiGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_component.json', 'component.json');
};

YuiGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/favicon.ico');
  this.copy('humans.txt', 'app/humans.txt');
  this.copy('robots.txt', 'app/robots.txt');
};

// YuiGenerator.prototype.generateCssUrl = function generateCssUrl() {
//   /*
//     Generate CSS include URL depending on input from prompts.
//   */
//   if (YuiGenerator.resetCSS = 'Y') {
//     YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssreset/cssreset-min.css&';
//   };

//   if (YuiGenerator.baseCSS = 'Y') {
//     YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssbase/cssbase-min.css&';
//   };

//   if (YuiGenerator.gridsCSS = 'Y') {
//     YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssgrids/cssgrids-min.css&';
//   };

//   if (YuiGenerator.fontsCSS = 'Y') {
//     YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssfonts/cssfonts-min.css';
//   };

//   YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '"> \n';
// };

YuiGenerator.prototype.writeIndex = function writeIndex() {
  /*
    Build index.html according to input from prompts.
  */

  var initialContent = [
    '<!DOCTYPE html> \n',
    '<html class="no-js"> \n',
    '  <head> \n',
    '    <meta charset="utf-8"> \n',
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> \n',
    '    <title>Welcome to YUI3!</title> \n',
    '    <meta name="description" content=""> \n',
    '    <meta name="viewport" content="width=device-width"> \n',
    '\n',
    '    <!-- Place favicon.ico and apple-touch-icon.png in the root directory --> \n',
  ],
  cssIncludeURL = YuiGenerator.cssIncludeURL,
  trailingContent = [
    '  </head> \n',
    '  <body> \n',
    '    <!-- Add your site or application content here --> \n',
    '    <p>Hello world! This is HTML5 Boilerplate.</p> \n',
    '\n',
    '    <script src="http://yui.yahooapis.com/3.10.1/build/yui/yui-min.js"></script> \n',
    '  </body> \n',
    '</html> \n',
  ];

  YuiGenerator.indexFile = initialContent.join("") + this.cssIncludeURL + trailingContent.join("")

  this.write('app/index.html', YuiGenerator.indexFile);

  /*
    TODO: Generate the index.html file using the information above.
  */
};

YuiGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
