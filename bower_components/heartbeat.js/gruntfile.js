module.exports = function( grunt ) {

  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({

    jshint: {
      options: {
        '-W093': true,
        "es3": true
      },
      main: {
        src: 'heartbeat.js'
      }
    },

    uglify: {
      main: {
        options: {
          sourceMap: true
        },
        dest: 'heartbeat.min.js',
        src:  'heartbeat.js'
      }
    },

    connect: {
      mocha: {
        options: {
          base: [ './', 'test' ],
          debug: true,
          open: true,
          keepalive: true
        }
      }
    },

    blanket_mocha : {    
      test: {
        src: ['test/index.html'],                
        options: {    
          threshold: 0,
          globalThreshold: 0,
          log: true,
          logErrors: true
        }                
      }      
    }

  });

  grunt.registerTask( 'default', ['jshint', 'blanket_mocha', 'uglify'] );


  grunt.registerTask( 'browser-test', ['jshint', 'connect', 'blanket_mocha'] );

};