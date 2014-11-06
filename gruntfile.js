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

    jst: {
      templates: {
        options: {
          prettify: true,

          // This converts our file names into camelCase names.
          // For instance, some-name.okay.ext => someNameOkay
          processName: function(filename) {
            var basename = path.basename( filename, path.extname(filename) );
            return basename.replace(/[-\.]([a-z])/g, function (g) { return g[1].toUpperCase(); });
          }
        },
        files: {
          '<%= app.tmp %>/templates.js': ['<%= app.src %>/**/*.jst']
        }
      }
    },

    stylus: {
      options: {
        'include css': true,
        import: ['variables'],
        paths: ['bower_components']
      },
      dev: {
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/core/views/**/*.styl', '<%= app.src %>/modules/**/*.styl', '<%= app.src %>/vendor/**/*.styl', '<%= app.src %>/shared/**/*.styl'],
        dest: '<%= app.dev %>/style.css'
      },
      prod: {
        options: {
          compress: true
        },
        src: ['<%= app.src %>/core/assets/styl/index.styl', '<%= app.src %>/cores/views/**/*.styl', '<%= app.src %>/modules/**/*.styl', '<%= app.src %>/vendor/**/*.styl', '<%= app.src %>/shared/**/*.styl'],
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
        src:  ['<%= app.src %>/core/assets/img/**/*', '!<%= app.src %>/img/sprite/*'],
        dest: '<%= app.dev %>/img'
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
      // scripts: {
      //   files: ['<%= app.src %>/**/*.js'],
      //   tasks: ['jshint', 'webpack:dev']
      // },
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
      jst: {
        files: ['<%= app.src %>/**/*.jst'],
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
      }
    },

    webpack: {
      options: {
        entry: './<%= app.src %>/core/index.js',
        module: {
          loaders: [
            {test: /templates/, loader: 'imports?_=underscore!exports?this.JST'},
            {test: /\.js$/, loader: '6to5-loader'},
            // {test: /jquery-mockjax/, loader: 'imports?jQuery=jquery'}
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
    },

    rsync: {
      server: {
        options: {
          ssh: true,
          args: ['--verbose'],
          exclude: ['.git', '.node_modules', 'node_modules/', '.gitignore', '<%= app.prod %>/', '<%= app.dev %>/', 'bower_components/', '<%= app.tmp %>'],
          recursive: true,
          syncDestIgnoreExcl: true,
          src: ['<%= app.src %>', '.jshintrc', 'bower.json', 'package.json', 'gruntfile.js', 'server', 'config'],
          dest: '<%= remote.dest %>',
          host: '<%= remote.host %>'
        }
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
      'jst',
      'webpack:'+target,
      'copy:favicon_'+target,
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
  grunt.registerTask('deploy', 'Deploy the app', ['jshint', 'build:prod', 'express:prod']);

};
