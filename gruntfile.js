/*global module:false require*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    files: {
      grunt: ['gruntfile.js'],
      js:    ['javascripts/app/*.js'],
      img:   ['images/**/*.*', '!images/sprites/**/*.*'],
      sass:  ['sass/*.scss']
    },

    smushit: {
      path: { src: '<%= files.img %>' }
    },

    concat: {
      jsapp: {
        src: ['<%= files.js %>'],
        dest: 'javascripts/libs/z.scripts.concat.js'
      },
      jslibs: {
        src: ['javascripts/libs/*.js'],
        dest: 'javascripts/libs/z.scripts.concat.js'
      },
      jsmin: {
        src: ['javascripts/min/*.js'],
        dest: 'javascripts/min/scripts.min.js'
      }
    },

    uglify: {
      dist: {
        src: ['javascripts/libs/z.scripts.concat.js'],
        dest: 'javascripts/min/scripts.min.js'
      }
    },

    compass: {
      dist: {
      }
    },

    jshint: {
      files: ['<%= files.grunt %>', '<%= files.js %>'],

      options: {
        boss: true,
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        jquery: true,
        latedef: true,
        newcap: true,
        noarg: true,
        smarttabs: true,
        sub: true,
        undef: true,

        globals: {
          console: true,
          jQuery: true,
          undef: true,
          unused: false
        }
      }
    },

    watch: {
      files: ['<%= files.grunt %>', '<%= files.js %>', '<%= files.sass %>'],
      tasks: ['default']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-smushit');

  grunt.registerTask('default', [
    'compass',
    'jshint',
    'concat:jsapp',
    'concat:jslibs',
    'uglify',
    'concat:jsmin'
  ]);

  grunt.registerTask('minify', ['default', 'smushit']);
};
