requirejs({
    paths : {
        jquery : 'bower_components/jquery/dist/jquery.min'
    },
    map: {
      // '*' means all modules will get 'jquery-private'
      // for their 'jquery' dependency.
      '*': { 'jquery': 'js/jquery-private' },

      // 'jquery-private' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      'js/jquery-private': { 'jquery': 'jquery' }
    }
});
