var path = require('path');
var webpack = require('webpack');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    remote: require('./config/remote.json'),

    // Specify where you'd like to keep your files
    app: {
      server: 'server',
      src   : 'client.src',
      dev   : 'client.dev',
      prod  : 'client.prod',
      tmp   : 'tmp',
      bower : grunt.file.readJSON('.bowerrc').directory
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
        src: ['<%= app.src %>/**/*.js', '!<%= app.src %>/bower_components/**/*']
      }
    },

    jst: {
      templates: {
        options: {
          prettify: true,

          // This converts our file names into camelCase names.
          // For instance, some-name.okay.ext => someNameOkay
          processName: function(filename) {
            var dirname = path.dirname(filename);
            var parts = dirname.split('/');
            var lastPart = parts[parts.length - 1];
            return lastPart.replace(/[-\.]([a-z])/g, function (g) { return g[1].toUpperCase(); });
          }
        },
        files: {
          '<%= app.tmp %>/templates.js': ['<%= app.src %>/**/*.jst', '!<%= app.src %>/bower_components/**/*']
        }
      }
    },

    stylus: {
      options: {
        'include css': true,
        import: ['variables'],
        paths: ['<%= app.src %>/bower_components']
      },
      dev: {
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/subapps/**/*.styl', '<%= app.src %>/lib/**/*.styl', '<%= app.src %>/core/lib/**/*.styl'],
        dest: '<%= app.dev %>/style.css'
      },
      prod: {
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/subapps/**/*.styl', '<%= app.src %>/lib/**/*.styl'],
        dest: '<%= app.prod %>/style.css'
      },
    },

    uglify: {
      dev: {
        options: {
          sourceMap: true
        },
        src: 'js/*',
        dest: '<%= app.dev %>/js/script.js'
      },
      prod: {
        src: 'js/*',
        dest: '<%= app.prod %>/js/script.prod.js'
      }
    },

    // Only minify images for production. Just copy for dev.
    imagemin: {
      prod: {
        files: {
          expand: true,
          cwd: '<%= app.src %>',
          src: 'img/**/*.{png,jpg}',
          dest: '<%= app.prod %>'
        }
      }
    },

    copy: {
      favicon: {
        src:  '<%= app.src %>/core/assets/favicon.ico',
        dest: '<%= app.dev %>/favicon.ico'
      },
      // For the dev environment only; in prod they are minified
      images: {
        src:  ['<%= app.src %>/images', '!<%= app.src %>/img/sprite/*'],
        dest: '<%= app.dev %>/images'
      },
      fonts_dev: {
        expand: true,
        flatten: true,
        src: '<%= app.bower %>/octicons/octicons/*.{ttf,eot,svg,ttf,woff}',
        dest: '<%= app.dev %>/fonts'
      },
      fonts_prod: {
        expand: true,
        flatten: true,
        src: '<%= app.bower %>/octicons/octicons/*.{ttf,eot,svg,ttf,woff}',
        dest: '<%= app.prod %>/fonts'
      }
    },

    // Build our spritesheets
    sprite: {
      jpg: {
        src:     '<%= app.src %>/img/sprite/*.png',
        destImg: '<%= app.tmp %>/sprites/spritesheet.png',
        destCSS: '<%= app.tmp %>/spritesheet.png.css'
      },
      png: {
        src:     '<%= app.src %>/img/sprite/*.jpg',
        destImg: '<%= app.tmp %>/sprites/spritesheet.jpg',
        destCSS: '<%= app.tmp %>/spritesheet.jpg.css'
      }
    },

    watch: {

      // Refresh the watch task when the Gruntfile changes
      grunt: {
        files: ['gruntfile.js']
      },
      scripts: {
        files: ['<%= app.src %>/**/*.js', '!<%= app.src %>/bower_components/**/*'],
        tasks: ['jshint', 'webpack:dev']
      },
      styles: {
        files: ['<%= app.src %>/core/**/*.styl', '<%= app.src %>/subapps/**/*.styl', '<%= app.src %>/lib/**/*.styl'],
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
      jst: {
        files: ['<%= app.src %>/**/*.jst', '!<%= app.src %>/bower_components/**/*'],
        tasks: ['jst', 'webpack:dev']
      },

      // Refresh the browser when clientside code change
      assets: {
        files: '<%= app.dev %>/**/*',
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
        output: 'Gistbook is listening on port 3000'
      },
      dev: {
        options: {
          node_env: 'dev',
        }
      },
      prod: {
        options: {
          port: 18908,
          node_env: 'prod'
        },
        output: 'Gistbook is listening on port 18908'
      }
    },

    concurrent: {
      target: {
        tasks: ['express:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    webpack: {
      options: {
          entry: './<%= app.src %>/core/index.js',
          output: {
            path: './client.dev/',
            filename: 'script.js'
          },
          module: {
            loaders: [
              {test: /templates/, loader: 'imports?_=underscore!exports?this.JST'}
            ]
          },
          resolve: {
            alias: {
              marionette: 'backbone.marionette',
              wreqr: 'backbone.wreqr',
              radio: 'backbone.radio',
              _: 'underscore'
            },
            modulesDirectories: ['node_modules', '<%= app.tmp %>']
          },
          cache: true
        },
      dev: {
        devtool: 'inlinesourcemap',
        debug: true
      },
      prod: {
        // plugins: [
        //   new webpack.optimize.UglifyJsPlugin()
        //],
        options: {
          output: {
            path: './<%= app.prod %>/',
            filename: 'script.js'
          }
        }
      }
    },

    rsync: {
      server: {
        options: {
          ssh: true,
          args: ['--verbose'],
          exclude: ['.git', '.node_modules', 'node_modules', '.gitignore', '<%= app.prod %>', '<%= app.dev %>', '<%= app.src %>/bower_components'],
          recursive: true,
          syncDestIgnoreExcl: true,
          src: ['.bowerrc', '<%= app.src %>', '.jshintrc', 'bower.json', 'package.json', 'gruntfile.js', 'server'],
          dest: '<%= remote.dest %>',
          host: '<%= remote.host %>'
        }
      }
    }
  });

  grunt.registerTask('default', 'An alias of test', ['test']);

  grunt.registerTask('test', 'Runs unit tests', []);

  grunt.registerTask('build', 'Build the application', function(target) {
    target = target || 'dev';
    var images = (target === 'dev') ? 'copy:images' : 'imagemin';

    var taskArray = [
      'clean:'+target,
      'jst',
      'webpack:'+target,
      'copy:favicon',
      'copy:fonts_'+target,
      // images,
      // 'sprite',
      'stylus:'+target
   ];

    grunt.task.run(taskArray);
  });

  grunt.registerTask('dev', 'Develop the app', ['jshint', 'build:dev', 'express:dev', 'watch']);

  // For running the site on a production server
  grunt.registerTask('deploy', 'Deploy the app', ['jshint', 'build:prod', 'express:prod']);

};
