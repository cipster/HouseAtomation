require.config({
    paths: {
        jquery: "bower_components/jquery/dist/jquery.min",
        bootstrap: "bower_components/bootstrap/dist/js/bootstrap.min",
        svg: "bower_components/jquery-svg/jquery.svg.min",
        mustache: "bower_components/mustache.js/mustache.min",
        domReady: "bower_components/domReady/domReady",
        HouseController: "lib/modules/controller/houseController",
        EventService: "lib/modules/service/eventService",
        StateService: "lib/modules/service/stateService",
        TemplateService: "lib/modules/service/templateService",
        LightService: "lib/modules/service/lightService",
        CurtainService: "lib/modules/service/curtainService",
        TemperatureService: "lib/modules/service/temperatureService"
    },
    shim: {
        "bootstrap": {"deps": ['jquery']}
    }
});

require(['HouseController'], function (HouseController) {
});