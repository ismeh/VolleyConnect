const { src } = require('gulp');
const jest = require('gulp-jest').default;

const paths = {
  public: {
    src: 'src/public/*'
  },
  views: {
    src: 'src/views/*'
  }
};

function test () {
  return src('test').pipe(jest({
    preprocessorIgnorePatterns: ['/node_modules/'],
    automock: false
  }));
}

exports.test = test;
