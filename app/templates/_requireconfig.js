require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery.min',
        underscore: 'bower_components/underscore/underscore-min'
    },
    shim: {
        underscore: {
            exports: '_'
        }
    }
})
