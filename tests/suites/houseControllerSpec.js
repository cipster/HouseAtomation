define(['jquery', 'jasmine-jquery', 'HouseController', 'SvgService', 'LightService', 'CurtainService', 'TemperatureService', 'EventService'],
    function ($, jasmineJquery, HouseController, SvgService, LightService, CurtainService, TemperatureService, EventService) {
        describe('HouseController', function () {
            jasmine.getFixtures().fixturesPath = 'fixtures/html';
            jasmine.getJSONFixtures().fixturesPath = 'fixtures/json';

            var houseFixture,
                roomFixture,
                curtainFixture,
                temperatureFixture,
                houseLoading;

            beforeEach(function () {
                houseFixture = loadFixtures('houseFixture.html');
                roomFixture = $('#bed-room-2');
                curtainFixture = $('#bed-room-2-curtains');
                temperatureFixture = $('#bed-room-left-heat');
                houseLoading = spyOn(SvgService, 'loadHouse').and.callFake(function (param) {
                    //empty function
                });
            });

            it('.init() should load state', function () {
                HouseController.init();

                expect(houseLoading).toHaveBeenCalled();
            });

            it('.init() should register on click on .light CSS class', function () {
                var lightEvent = spyOnEvent(roomFixture, EventService.lightEvents.afterOn),
                    bedRoomFixture = $('#bed-room-2-light.light');

                HouseController.init();

                bedRoomFixture.click();

                expect(lightEvent).toHaveBeenTriggered();
            });

            it('.init() should register on click on .curtains CSS class', function () {
                var curtainEvent = spyOnEvent(curtainFixture, EventService.curtainEvents.afterClosed),
                    curtainsOpenFixture = $('#bed-room-2-curtains.curtains');

                HouseController.init();

                curtainsOpenFixture.click();

                expect(curtainEvent).toHaveBeenTriggered();
            });

            it('.init() should register on change on .temperature-dial CSS class', function () {
                var temperatureEvent = spyOnEvent(temperatureFixture, EventService.temperatureEvents.temperatureChanged),
                    dialFixture = $('#left-side-temp.temperature-dial');

                HouseController.init();

                dialFixture.val(dialFixture.val() + 1).trigger('change');

                expect(temperatureEvent).toHaveBeenTriggered();
            });

        });
    });