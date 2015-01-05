var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Specify where you'd like to keep your files
    app: {
      server: 'server',
      src   : 'client.src',
      dev   : 'client.dev',
      prod  : 'client.prod',
      tmp   : 'tmp',
      bower : 'bower_components'
    },

    clean: {
      dev : ['tmp', '<%= app.dev %>'],
      prod: ['tmp', '<%= app.prod %>']
    },

    jshint: {
      options: {
        jshintrc : '.jshintrc'
      },
      source: {
        src: ['<%= app.src %>/**/*.js']
      }
    },

    handlebars: {
      templates: {
        options: {
          prettify: true,

          // This converts our file names into camelCase names.
          // For instance, some-name.okay.ext => someNameOkay
          processName: function(filename) {
            var basename = path.basename( filename, path.extname(filename) );
            return basename.replace(/[-\.]([a-z0-9])/g, function (g) { return g[1].toUpperCase(); });
          }
        },
        files: {
          '<%= app.tmp %>/templates.js': ['<%= app.src %>/**/*.hbs']
        }
      }
    },

    stylus: {
      options: {
        'include css': true,
        import: ['variables', 'nib', 'mixins'],
        paths: ['bower_components']
      },
      dev: {
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/core/views/**/*.styl', '<%= app.src %>/modules/**/*.styl', '<%= app.src %>/vendor/**/*.styl', '<%= app.src %>/shared/**/*.styl'],
        dest: '<%= app.dev %>/style.css'
      },
      prod: {
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/core/views/**/*.styl', '<%= app.src %>/modules/**/*.styl', '<%= app.src %>/vendor/**/*.styl', '<%= app.src %>/shared/**/*.styl'],
        dest: '<%= app.prod %>/style.css'
      },
    },

    cssmin: {
      prod: {
        src: '<%= stylus.prod.dest %>',
        dest: '<%= stylus.prod.dest %>'
      }
    },

    // Only minify images for production. Just copy for dev.
    imagemin: {
      prod: {
        expand: true,
        cwd: '<%= app.src %>/core/assets',
        src: ['img/**/*.{png,jpg}'],
        dest: '<%= app.prod %>'
      }
    },

    copy: {
      favicon_dev: {
        src:  '<%= app.src %>/core/assets/favicon.ico',
        dest: '<%= app.dev %>/favicon.ico'
      },
      favicon_prod: {
        src:  '<%= app.src %>/core/assets/favicon.ico',
        dest: '<%= app.prod %>/favicon.ico'
      },
      images: {
        expand: true,
        flatten: true,
        src:  '<%= app.src %>/core/assets/img/**/*',
        dest: '<%= app.dev %>/img'
      },
      emoji_dev: {
        expand: true,
        flatten: true,
        src: 'node_modules/emojify.js/images/**/*',
        dest: '<%= app.dev %>/img/emoji'
      },
      emoji_prod: {
        expand: true,
        flatten: true,
        src: 'node_modules/emojify.js/images/**/*',
        dest: '<%= app.prod %>/img/emoji'
      },
      fonts_dev: {
        expand: true,
        flatten: true,
        src: ['<%= app.bower %>/octicons/octicons/*.{ttf,eot,svg,woff}', '<%= app.bower %>/entypo/font/*.{ttf,eot,svg,woff}'],
        dest: '<%= app.dev %>/fonts'
      },
      fonts_prod: {
        expand: true,
        flatten: true,
        src: ['<%= app.bower %>/octicons/octicons/*.{ttf,eot,svg,ttf,woff}', '<%= app.bower %>/entypo/font/*.{ttf,eot,svg,woff}'],
        dest: '<%= app.prod %>/fonts'
      }
    },

    watch: {

      // Refresh the watch task when the Gruntfile changes
      grunt: {
        files: ['gruntfile.js']
      },
      styles: {
        files: ['<%= app.src %>/**/*.styl'],
        tasks: ['stylus:dev']
      },
      images: {
        files: ['<%= app.src %>/img/**/*', '!<%= app.src %>/img/sprite/*'],
        tasks: ['copy:images']
      },
      fonts: {
        files: ['<%= app.src %>/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      hbs: {
        files: ['<%= app.src %>/**/*.hbs'],
        tasks: ['handlebars', 'webpack:dev']
      },

      // Refresh the browser when clientside code change
      assets: {
        files: ['<%= app.dev %>/**/*', '!<%= app.dev %>/img/emoji/**'],
        options: {
          spawn: false,
          livereload: 35729
        }
      },

      // Restart the express app & refresh browser when
      // server-side code changes
      express: {
        options: {
          spawn: false,
          livereload: 35729
        },
        files: '<%= app.server %>/**/*',
        tasks: ['express:dev']
      }
    },

    express: {
      options: {
        script: '<%= app.server %>/app.js',
        output: 'Gistbook is listening on port 3344'
      },
      dev: {
        options: {
          node_env: 'development',
        }
      }
    },

    webpack: {
      options: {
        entry: './<%= app.src %>/core/index.js',
        module: {
          loaders: [
            {test: /templates/, loader: 'imports?Handlebars=handlebars/dist/handlebars.runtime.js!exports?this.JST'},
            {test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader'},
            {test: /\.json$/, loader: 'json-loader'}
          ]
        },
        resolve: {
          alias: {
            handlebars: 'handlebars/dist/handlebars.runtime.js',
            marionette: 'backbone.marionette',
            'backbone.wreqr': 'backbone.radio',
            radio: 'backbone.radio',
            _: 'underscore'
          },
          modulesDirectories: ['node_modules', '<%= app.tmp %>', '<%= app.src %>']
        },
        cache: true,
        watch: true
      },
      dev: {
        output: {
          path: './<%= app.dev %>/',
          filename: 'script.js',
          pathinfo: true
        },
        devtool: 'eval-source-map',
        debug: true
      },
      prod: {
        output: {
          path: './client.prod/',
          filename: 'script.js'
        }
      }
    },

    uglify: {
      prod: {
        src: '<%= app.prod %>/script.js',
        dest: '<%= app.prod %>/script.js'
      }
    }
  });

  grunt.registerTask('default', 'An alias of test', ['test']);

  grunt.registerTask('test', 'Runs unit tests', ['jshint']);

  grunt.registerTask('build', 'Build the application', function(target) {
    target = target || 'dev';
    var images = (target === 'dev') ? 'copy:images' : 'imagemin';

    var taskArray = [
      'clean:'+target,
      'handlebars',
      'webpack:'+target,
      'copy:favicon_'+target,
      'copy:emoji_'+target,
      'copy:fonts_'+target,
      images,
      'stylus:'+target
    ];

    if (target === 'prod') {
      taskArray.push('cssmin:prod', 'uglify:prod');
    }

    grunt.task.run(taskArray);
  });

  grunt.registerTask('work', 'Develop the app', ['jshint', 'build:dev', 'express:dev', 'watch']);

  // For running the site on a production server
  grunt.registerTask('deploy', 'Deploy the app', ['jshint', 'build:prod']);

};
