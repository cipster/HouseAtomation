require.config({
    paths: {
        jquery: "bower_components/jquery/dist/jquery.min",
        svg: "bower_components/jquery-svg/jquery.svg.min",
        mustache: "bower_components/mustache.js/mustache.min",
        HouseController: "js/controller/houseController",
        EventService: "js/service/eventService",
        SvgService: "js/service/svgService",
        StateService: "js/service/stateService",
        TemplateService: "js/service/templateService",
        LightService: "js/service/lightService",
        CurtainService: "js/service/curtainService",
        TemperatureService: "js/service/temperatureService"
    },
    shim: {
        /**
         * svg-jquery is dependent on jquery itself
         * this adds a constraint that jquery must be loaded beforehand
         */
        svg: {
            deps: ['jquery']
        }
    }
});

/**
 * Entry point of the app.
 *
 * @see HouseController.init
 */
require(['HouseController'], function (HouseController) {
    HouseController.init();
});