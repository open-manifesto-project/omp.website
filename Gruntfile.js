module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'src/assets/js/', src: ['**'], dest: '../omp.website-gh-pages/assets/js/'},
          {expand: true, cwd: 'src/assets/images/', src: ['**'], dest: '../omp.website-gh-pages/assets/images/'},
          {expand: true, cwd: 'src/assets/fonts/', src: ['**'], dest: '../omp.website-gh-pages/assets/fonts/'},
          {expand: true, cwd: 'src/assets/css/', src: ['font-awesome.min.css'], dest: '../omp.website-gh-pages/assets/css/'},
          {expand: true, cwd: 'src/', src: ['robots.txt'], dest: '../omp.website-gh-pages/'},
        ],
      },
    },
    sass: {
      dist: {
        options: {
          sourceMap: true
        },
        files: {
          "../omp.website-gh-pages/assets/css/styles.css": "src/assets/sass/main.scss"
        }
      }
    },
    ejs_static: {
      dist: {
        options: {
          dest: '../omp.website-gh-pages',
          path_to_data: 'src/data/routes.json',
          path_to_layouts: 'src/layouts',
          index_page: 'home',
          parent_dirs: true,
          underscores_to_dashes: true,
          file_extension: '.html'
        }
      }
    },
    xml_sitemap: {
      default_options: {
        options: {
          dest: '../omp.website-gh-pages/',
          siteRoot: 'http://openmanifestoproject.org'
        },
        files: [
          {
            expand: false,
            cwd: '../omp.website-gh-pages/',
            src: [
              '**/*.html'
            ]
          }
        ]
      }
    },
    watch: {
      datalayout: {
        files: ['src/data/**/*.json', 'src/layouts/**/*.ejs'],
        tasks: ['ejs_static:dist'],
      },
      sass: {
        files: ['src/assets/sass/**/*.scss'],
        tasks: ['sass:dist'],
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ejs-static');
  grunt.loadNpmTasks('grunt-xml-sitemap');

  grunt.registerTask('default', ['copy',  'sass', 'ejs_static', 'xml_sitemap', 'watch']);

}
