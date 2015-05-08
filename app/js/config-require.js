/*
  This file is used to generate the build javascript bundle

  Note: we don't need to use relativePath here as the files are bundled together
       using grunt-contrib-requirejs so they are downloaded as a whole in
       only one file.
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
