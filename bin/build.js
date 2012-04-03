#!/usr/bin/env node

/**
 * Build script for application
 */

try {
  var requirejs = require('requirejs'),
      wrench = require('wrench'),
      uglify = require('uglify-js');
}
catch (e) {
  console.log("install build dependencies with this command: npm install requirejs uglify-js wrench");
  process.exit();
}

var fs = require('fs'),
    sys = require('sys'),
    path = require('path');

// util: simply copy a file
function copyFile(source, dest, success) {
  success = success ||
  function () {};
  console.log('copy', source, dest);
  var read = fs.createReadStream(source);
  var write = fs.createWriteStream(dest);
  read.on("end", success);
  sys.pump(read, write);
}

// delete webroot
function clean(success, dir) {
  success = success ||
  function () {};
  dir = dir || path.join(__dirname, '..');
  console.log('clean', path.join(dir, 'webroot'));
  wrench.rmdirRecursive(path.join(dir, 'webroot'), success);
}

// just optimize application code (no css)
function optimizejs(dir) {
  dir = dir || path.join(__dirname, '..');

  console.log('optimize javascript');

  fs.mkdirSync(path.join(dir, 'webroot', 'shared'), 16877);
  ugly(path.join(dir, 'src', 'shared', 'require.js'), path.join(dir, 'webroot', 'shared', 'require.js'));

  var require_config = {
    baseUrl: path.join(dir, 'src'),
    name: 'main',
    out: path.join(dir, 'webroot', 'main.js'),
    'paths': {
      'share': path.join(dir, 'src', 'shared'),
      'views': path.join(dir, 'src', 'shared', 'views'),
      'config': "empty:"
    },
    inlineText: true
  };
  requirejs.optimize(require_config, function (){});

  ugly(path.join(dir, 'webroot', 'main.js'), path.join(dir, 'webroot', 'main.js'));

  wrench.copyDirRecursive(path.join(dir, 'src', 'config'), path.join(dir, 'webroot', 'config'), function () {});
  copyFile(path.join(dir, 'src', 'index.html'), path.join(dir, 'webroot', 'index.html'));
  wrench.copyDirRecursive(path.join(dir, 'src', 'views'), path.join(dir, 'webroot', 'views'), function () {});
}

// run uglify on a single file
function ugly(infile, outfile){
  console.log('uglify', infile, outfile);
  var jsp = uglify.parser;
  var pro = uglify.uglify;
  var orig_code = fs.readFileSync(infile) + "";
  var ast = jsp.parse(orig_code); // parse code and get the initial AST
  ast = pro.ast_mangle(ast, {toplevel:true}); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
  var final_code = pro.gen_code(ast); // compressed code here
  fs.writeFileSync(outfile, final_code);
}


// just optimize the CSS
function optimizecss(dir) {
  dir = dir || path.join(__dirname, '..');
  console.log('optimize css');
  var require_config = {
    cssIn: path.join(dir, 'src', 'main.css'),
    out: path.join(dir, 'webroot', 'main.css'),
    optimizeCss: "standard"
  };
  requirejs.optimize(require_config, function () {
    fs.readdir(path.join(dir, 'src', 'themes'), function (err, list) {
      fs.mkdirSync(path.join(dir, 'webroot', 'themes'), 16877);
      list.forEach(function (theme) {
        if (theme[0] != '.') {
          fs.mkdirSync(path.join(dir, 'webroot', 'themes', theme), 16877);
          require_config.cssIn = path.join(dir, 'src', 'themes', theme, 'style.css');
          require_config.out = path.join(dir, 'webroot', 'themes', theme, 'style.css');
          console.log('css', require_config.cssIn, '->', require_config.out);
          requirejs.optimize(require_config, function () {});
        }
        fs.readdir(path.join(dir, 'src', 'themes', theme), function (err, assets) {
          if (!err) {
            assets.forEach(function (fname) {
              if (fname != 'style.css' && fname[0] != '.') {
                fs.stat(path.join(dir, 'src', 'themes', theme, fname), function (err, stats) {
                  if (stats.isDirectory()) {
                    console.log('copy', path.join(dir, 'src', 'themes', theme, fname), path.join(dir, 'webroot', 'themes', theme, fname));
                    wrench.copyDirRecursive(path.join(dir, 'src', 'themes', theme, fname), path.join(dir, 'webroot', 'themes', theme, fname), function () {});
                  }
                  else {
                    copyFile(path.join(dir, 'src', 'themes', theme, fname), path.join(dir, 'webroot', 'themes', theme, fname));
                  }
                });
              }
            });
          }
        });
      });
    });
  });
}

// full target build
function build(dir) {
  dir = dir || path.join(__dirname, '..');
  clean(function () {
    optimizecss(dir);
    optimizejs(dir);
    addTag(path.join(dir, 'webroot', 'main.js'), dir);
  });
}

// add current git tag
function addTag(file, dir){
  require('child_process').exec('cd "' + dir + '"; git describe --tag', function(error, tag, stderr){
    if (error === null) {
      tag = tag.trim();
      var code = fs.readFileSync(file) + "";
      console.log('tagged', tag);
      code = code.replace('%DEV%', tag);
      fs.writeFileSync(file, code);
    }
  });
}


// optimist is nicer, but didn't want any other dependencies
var args = process.argv.splice(2);

function help() {
  var h = [
    "Usage: " + process.argv[1] + " COMMAND",
    "  Where COMMAND is one of the following:",
    "    clean                    - delete the webroot",
    "    build                    - build compressed site to webroot",
    "    optimizejs               - minify the target's javascript",
    "    optimizecss              - minify the target's CSS"
    ].join('\n');
  console.log(h);
}

try {
  var command = args[0];

  if (command == 'clean') {
    clean();
  }
  else {
    switch (command) {
    case 'optimizejs':
      optimizejs();
      break;
    case 'optimizecss':
      optimizecss();
      break;
    case 'build':
      build();
      break;
    default:
      help();
    }
  }
}
catch (e) {
  console.log(e);
  help();
}