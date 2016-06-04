require.config({
    paths: {
        "jquery": "bower_components/jquery/dist/jquery.min",
        "bootstrap": "bower_components/bootstrap/dist/js/bootstrap.min",
        "svg": "bower_components/jquery-svg/jquery.svg.min",
        "mustache": "bower_components/mustache.js/mustache.min"
    },
    shim: {
        "bootstrap": {"deps": ['jquery']}
    }
});

require(['lib/modules/controller/automationController'], function (automationController) {

});