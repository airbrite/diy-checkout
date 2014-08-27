module.exports = function(grunt) {
  'use strict';

  var prodOrTest = /(production|test)/.test(process.env['NODE_ENV']);
  var production = process.env['NODE_ENV'] === 'production';

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      html: ['src/js/templates/**/*.html'],
      svg: ['src/js/templates/svg/**/*.svg'],
      dist: ['dist']
    },

    // require js optimization
    requirejs: {
      compile: {
        options: {
          // name is required
          name: 'main',
          // the base path of our optimization
          baseUrl: 'src/js',
          // include almond to get define (in place of require.js)
          include: 'vendor/almond/almond.js',

          optimize: 'uglify2',

          uglify2: {
            output: {
              beautify: false
            }
          },

          generateSourceMaps: false,
          preserveLicenseComments: false,
          findNestedDependencies: true,
          wrapShim: true,

          // use our original main configuration file to avoid
          // duplication.  this file will pull in all our dependencies
          mainConfigFile: 'src/js/require-config.js',
          // the output optimized file name
          out: 'dist/celery-cart.min.js'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9'],
        src: 'dist/celery.css'
      }
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeTitle: true
        }, {
          removeUselessStrokeAndFill: false
        }, {
          convertPathData: false
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['svg/*.svg'],
          dest: 'src/js/templates'
        }]
      }
    },

    // less
    less: {
      production: {
        options: {
          cleancss: true
        },
        files: {
          'dist/celery.css': 'src/less/main.less'
        }
      },
      development: {
        options: {
          compress: false,
          cleancss: false
        },
        files: {
          'src/css/main.css': 'src/less/main.less',
          'src/css/fakesite.css': 'src/less/fakesite.less'
        }
      }
    },

    template: {
      production: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['templates/*.tmpl'],
          dest: 'src/js',
          ext: '.html'
        }]
      }
    },

    watch: {
      less: {
        files: ['src/less/**/*.less'],
        tasks: ['less:development']
      },
      svg: {
        files: ['src/svg/**/*.svg'],
        tasks: ['clean:svg', 'svgmin']
      },
      html: {
        files: ['src/templates/**/*.tmpl'],
        tasks: ['clean:html', 'template']
      },
      livereload: {
        files: ['src/css/*.css'],
        options: {
          livereload: 35724
        }
      }
    }
  });

  // Default task(s).
  grunt.registerTask('build', [
    'clean',
    'less:production',
    'autoprefixer',
    'template',
    'svgmin',
    'requirejs'
  ]);
  grunt.registerTask('default', ['build']);
};
