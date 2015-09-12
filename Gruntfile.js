module.exports = function(grunt) {
  
  
  grunt.initConfig({
    connect: {
      dev: {
        options: {
          port: 8000,
          base: "test",
          livereload: 35729,
          open: "http://localhost:8000/test.html"
        }
      }
    },
    watch: {
      dev: {
        files: ["**/*.js", "!test/bundle.js", "!Gruntfile.js"],
        tasks: ["browserify:dev"],
        options: {
          livereload: 35729
        }
      }
    },
    browserify: {
      dev: {
        files: {
          "test/bundle.js": ["test/test.js"]
        }
      }
    }
  });
  
  
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browserify");
  
  
  grunt.registerTask("default", ["connect:dev", "watch:dev"]);
  
  
}