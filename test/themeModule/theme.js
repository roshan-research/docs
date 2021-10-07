// Get the theme's configuration options
exports.getConfig = function() {
    return {
        formats: ['1A'],
        options: [
            {
                name: 'variables',
                description: 'Color scheme name or path to custom variables',
                "default": 'default'
            }, {
                name: 'condense-nav',
                description: 'Condense navigation links',
                boolean: true,
                "default": true
            }, {
                name: 'full-width',
                description: 'Use full window width',
                boolean: true,
                "default": false
            }, {
                name: 'template',
                description: 'Template name or path to custom template',
                "default": 'default'
            }, {
                name: 'style',
                description: 'Layout style name or path to custom stylesheet'
            }, {
                name: 'emoji',
                description: 'Enable support for emoticons',
                boolean: true,
                "default": true
            }
        ]
    };
}
// Asyncronously render out a string
exports.render = function (input, options, done) {
    // Normally you would use some template engine here.
    // To keep this code really simple, we just print
    // out a string and ignore the API Blueprint.
    console.log(JSON.stringify(input,null,4));
    // console.log("---------------");
    // console.log(input.toString());
    done(null, JSON.stringify(input,null,4));
};