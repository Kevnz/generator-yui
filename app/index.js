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
  this.cssIncludeURL = '<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/combo?';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

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
  var prompts = [{
    name: 'resetCSS',
    message: 'Would you like to include YUI CSS reset?',
    default: true,
    warning: 'Includes YUI CSS reset stylesheets.'
  },

  {
    name: 'baseCSS',
    message: 'Would you like to include YUI base styles?',
    default: true,
    warning: 'Includes YUI base CSS styles.'
  },

  {
    name: 'gridsCSS',
    message: 'Would you like to include YUI CSS grids?',
    default: true,
    warning: 'Includes YUI grid stylesheets.'
  },

  {
    name: 'fontsCSS',
    message: 'Would you like to include YUI CSS fonts?',
    default: true,
    warning: 'Includes YUI font stylesheets.'
  }];

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

YuiGenerator.prototype.generateCssUrl = function generateCssUrl() {
  /*
    Generate CSS include URL depending on input from prompts.
  */
  if (YuiGenerator.resetCSS) {
    YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssreset/cssreset-min.css&';
  };

  if (YuiGenerator.baseCSS) {
    YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssbase/cssbase-min.css&';
  };

  if (YuiGenerator.gridsCSS) {
    YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssgrids/cssgrids-min.css&';
  };

  if (YuiGenerator.fontsCSS) {
    YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '3.10.1/cssfonts/cssfonts-min.css';
  };

  YuiGenerator.cssIncludeURL = YuiGenerator.cssIncludeURL + '">';
};

YuiGenerator.prototype.writeIndex = function writeIndex() {
  /*
    Build index.html according to input from prompts.
  */

  var initialContent = [
    '<!DOCTYPE html>',
    '<html class="no-js">',
    '  <head>',
    '    <meta charset="utf-8">',
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">',
    '    <title>Welcome to YUI3!</title>',
    '    <meta name="description" content="">',
    '    <meta name="viewport" content="width=device-width">',
    '',
    '    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->',
  ];

  var cssIncludeURL = YuiGenerator.cssIncludeURL;

  var trailingContent = [
    '  </head>',
    '  <body>',
    '    <!-- Add your site or application content here -->',
    '    <p>Hello world! This is HTML5 Boilerplate.</p>',
    '',
    '    <script src="http://yui.yahooapis.com/3.10.1/build/yui/yui-min.js"></script>',
    '  </body>',
    '</html>',
  ];

  /*
    TODO: Generate the index.html file using the information above.
  */
};

YuiGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
