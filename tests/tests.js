require.config({
    paths: {
        jquery: "../bower_components/jquery/dist/jquery.min",
        svg: "../bower_components/jquery-svg/jquery.svg.min",
        mustache: "../bower_components/mustache.js/mustache.min",
        jasmine: "../bower_components/jasmine/lib/jasmine-core/jasmine",
        'jasmine-jquery': "../bower_components/jasmine-jquery/lib/jasmine-jquery",
        'jasmine-html': "../bower_components/jasmine/lib/jasmine-core/jasmine-html",
        'jasmine-boot': "boot-without-onload",
        domReady: "../bower_components/domReady/domReady",
        HouseController: "../js/controller/houseController",
        EventService: "../js/service/eventService",
        SvgService: "../js/service/svgService",
        StateService: "../js/service/stateService",
        TemplateService: "../js/service/templateService",
        LightService: "../js/service/lightService",
        CurtainService: "../js/service/curtainService",
        TemperatureService: "../js/service/temperatureService"
    },
    // shim: makes external libraries compatible with requirejs (AMD)
    shim: {
        svg: {
            deps: ['jquery']
        },
        jasmine: {
            deps: ['jquery']
        },
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        },
        'jasmine-jquery': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

require(['jasmine-boot'], function () {
    require(
        [
            'suites/svgServiceSpec',
            'suites/stateServiceSpec',
            'suites/templateServiceSpec',
            'suites/lightServiceSpec',
            'suites/temperatureServiceSpec',
            'suites/curtainServiceSpec'
        ],

        function () {
            /**
             * This triggers Jasmine to load
             */
            window.executeTests();
        })
});
