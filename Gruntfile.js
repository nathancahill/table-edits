
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: {
          'build/<%= pkg.name %>.min.js': 'src/table-edits.js'
        }
      }
    },
    jasmine: {
        test: {
            src: 'src/table-edits.js',
            options: {
                vendor: 'node_modules/jquery/dist/jquery.js',
                specs: ['test/table-edits.spec.js']
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['uglify']);
};
