const fs = require('fs');
var drafter = require('drafter');
var aglio = require('aglio');
function apib_to_html(templateHtml,apibFile) {
    // const folderName = "./htmls" + type;
    // var INCLUDE, LEGACY_TEMPLATES, ROOT, benchmark, errMsg;
    //
    // var includeDirective, includeReplace;
    //
    // INCLUDE = /( *)<!-- include\((.*)\) -->/gmi;
    //
    // ROOT = path.dirname(__dirname);
    //
    // LEGACY_TEMPLATES = ['default', 'default-collapsed', 'flatly', 'flatly-collapsed', 'slate', 'slate-collapsed', 'cyborg', 'cyborg-collapsed'];
    //
    // benchmark = {
    //     start: function(message) {
    //         if (process.env.BENCHMARK) {
    //             return console.time(message);
    //         }
    //     },
    //     end: function(message) {
    //         if (process.env.BENCHMARK) {
    //             return console.timeEnd(message);
    //         }
    //     }
    // };
    //
    // errMsg = function(message, err) {
    //     err.message = message + ": " + err.message;
    //     return err;
    // };
    //
    // includeReplace = function(includePath, match, spaces, filename) {
    //     var content, fullPath, lines;
    //     fullPath = path.join(includePath, filename);
    //     lines = fs.readFileSync(fullPath, 'utf-8').replace(/\r\n?/g, '\n').split('\n');
    //     content = spaces + lines.join("\n" + spaces);
    //     return includeDirective(path.dirname(fullPath), content);
    // };
    //
    // includeDirective = function(includePath, input) {
    //     return input.replace(INCLUDE, includeReplace.bind(this, includePath));
    // };
    //
    // var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    //
    // var render;
    //
    // var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
    //
    // var getTheme;
    // getTheme = function(name) {
    //     if (!name || __indexOf.call(LEGACY_TEMPLATES, name) >= 0) {
    //         name = 'olio';
    //     }
    //     return require("aglio-theme-" + name);
    // };
    //
    // render = function(input, options, done) {
    //     var filteredInput, variables, _ref;
    //     if (typeof options === 'string' || options instanceof String) {
    //         options = {
    //             theme: options
    //         };
    //     }
    //     if (options.filterInput == null) {
    //         options.filterInput = true;
    //     }
    //     if (options.includePath == null) {
    //         options.includePath = process.cwd();
    //     }
    //     if (options.theme == null) {
    //         options.theme = 'default';
    //     }
    //     if (options.template) {
    //         options.theme = options.template;
    //     }
    //     if (fs.existsSync(options.theme)) {
    //         console.log("Setting theme to olio and layout to " + options.theme);
    //         options.themeLayout = options.theme;
    //         options.theme = 'olio';
    //     } else if (options.theme !== 'default' && (_ref = options.theme, __indexOf.call(LEGACY_TEMPLATES, _ref) >= 0)) {
    //         variables = options.theme.split('-')[0];
    //         console.log("Setting theme to olio and variables to " + variables);
    //         options.themeVariables = variables;
    //         options.theme = 'olio';
    //     }
    //
    //     input = includeDirective(options.includePath, input);
    //     console.log(input);
    //
    //     filteredInput = !options.filterInput ? input : input.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');
    //     benchmark.start('parse');
    //     return drafter.parse(filteredInput, {
    //         type: 'ast'
    //     }, function(err, res) {
    //         var f, name, option, theme, words, _i, _len, _ref1;
    //         benchmark.end('parse');
    //         if (err) {
    //             err.input = input;
    //             return done(errMsg('Error parsing input', err));
    //         }
    //         try {
    //             theme = exports.getTheme(options.theme);
    //         } catch (_error) {
    //             err = _error;
    //             return done(errMsg('Error getting theme', err));
    //         }
    //         _ref1 = theme.getConfig().options || [];
    //         for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    //             option = _ref1[_i];
    //             words = (function() {
    //                 var _j, _len1, _ref2, _results;
    //                 _ref2 = option.name.split('-');
    //                 _results = [];
    //                 for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
    //                     f = _ref2[_j];
    //                     _results.push(f[0].toUpperCase() + f.slice(1));
    //                 }
    //                 return _results;
    //             })();
    //             name = "theme" + (words.join(''));
    //             if (options[name] == null) {
    //                 options[name] = option["default"];
    //             }
    //         }
    //         benchmark.start('render-total');
    //         return theme.render(res.ast, options, function(err, html) {
    //             benchmark.end('render-total');
    //             if (err) {
    //                 return done(err);
    //             }
    //             res.warnings.input = filteredInput;
    //             return done(null, html, res.warnings);
    //         });
    //     });
    // };


    var drafteroptions = {
       // generateSourceMap: true,
    };
    let apibInput = apibFile.replace(/\r\n?/g, '\n').replace(/\t/g, '    ');

    drafter.parse(apibInput, drafteroptions, function(err, result) {
        if (err) {
            console.log(err);
        }
            fs.writeFile("./drafterResult.json", JSON.stringify(result,null,4), 'utf8', function (err) {
                if (err) return console.log(err);
            });
    });


    var agliooptions = {
        //theme: 'ONLICAR',
     //   theme: 'otto',
        //theme: 'custom',

      //  theme: 'slate',

      // // // themeVariables:"triple",

        //themeTemplate:"triple",

        // themeVariables:"cyborg",

     //  themeTemplate: './template.jade'
        themeStyle:"./mystyle.less",
    };

    aglio.render(apibFile,agliooptions, function (err, html, warnings) {
        if (err) return console.log(err);
        if (warnings) console.log(warnings);

        fs.writeFile("./mystyle.html", html, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

    // aglio.renderFile('./baaz.apib', './output.html', options, function (err, warnings) {
    //     if (err) return console.log(err);
    //     if (warnings) console.log(warnings);
    // });


}
module.exports = apib_to_html;