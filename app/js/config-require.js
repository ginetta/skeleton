require([], function () {
  /*
    This file is used to specify the project modules.

    If you add a new module, a new global javascript file or a bower dependency,
    you should add it in here.
  */
  requirejs.config({
      paths: {
        /* bower components you need */
        jquery               : 'bower_components/jquery/dist/jquery',
        mediaQuery           : 'bower_components/sensible/mediaQuery',

        /* global utilities you need */
        globals: 'js/globals',

        /* your components */
        button: 'components/button/button',
        tweet:  'components/tweet/tweet',

        /* finally, the main file */
        main: 'js/main'
      }
  });

})
