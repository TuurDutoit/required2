module.exports = function(grunt) {
  
  
  grunt.initConfig({
    watch: {
      engine: {
        files: ["**/*.js", "!test/bundle.js", "!Gruntfile.js"],
        tasks: ["browserify"],
        options: {
          livereload: true
        }
      }
    },
    browserify: {
      engine: {
        files: {
          "test/bundle.js": ["test/test.js"]
        }
      }
    }
  });
  
  
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browserify");
  
  
  grunt.registerTask("default", "watch");
  
  
}