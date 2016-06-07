define(['jquery', 'jasmine-jquery', 'SvgService', 'EventService'], function ($, jasmineJquery, SvgService, EventService) {
    describe('SvgService', function () {
        jasmine.getFixtures().fixturesPath = 'fixtures/html';
        jasmine.getJSONFixtures().fixturesPath = 'fixtures/json';

        var houseLoading,
            houseFixture;

        beforeEach(function () {
            setFixtures('<div id="house">');
            houseFixture = $('#house');
            houseLoading = spyOn($, 'svg').and.callFake(function (param) {
                //empty function
            });
        });

        it('.loadHouse() should trigger house.load before it starts to load the house', function () {
            var beforeEvent = spyOnEvent(houseFixture, EventService.houseLoadEvents.beforeLoad);

            SvgService.loadHouse();

            expect(beforeEvent).toHaveBeenTriggered();
        });

        it('.loadHouse() should trigger house.loaded after it has loaded the house', function () {
            var afterEvent = spyOnEvent(houseFixture, EventService.houseLoadEvents.afterLoad);

            SvgService.loadHouse();

            expect(afterEvent).toHaveBeenTriggered();
        });
    });
});