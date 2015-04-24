requirejs.config({
    baseUrl: '../../js/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        mymodule: '../modules/mymodule/mymodule',
        mediaQuery: '../bower_components/sensible/mediaQuery',
        requestAnimationFrame: '../bower_components/requestAnimationFrame/app/requestAnimationFrame'
    },
    shim: {
        shimfull: {
            deps: ['jquery']
        }
    }
});