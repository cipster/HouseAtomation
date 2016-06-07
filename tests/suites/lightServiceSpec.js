define(['jquery', 'jasmine-jquery', 'LightService', 'EventService'], function ($, jasmineJquery, LightService, EventService) {
    describe('LightService', function () {
        var roomFixture,
            roomLightOnFixture,
            saveLightFailure = function (e) {
                e.error({});
            };

        beforeEach(function () {
            roomFixture = $('<polygon id="bed-room-2" class="room room-light" points="7.6331,50.1682 44.4492,50.1682 44.3907,59.2286 59.1281,59.2805 58.9784,50.1683 59.2423,8.2778 7.897,8.2777 "></polygon>');
            roomLightOnFixture = $('<polygon id="bed-room-2" class="room room-light light-on" points="7.6331,50.1682 44.4492,50.1682 44.3907,59.2286 59.1281,59.2805 58.9784,50.1683 59.2423,8.2778 7.897,8.2777 "></polygon>');
        });

        it('.lightSwitch() should switch the light on in the room', function () {
            LightService.lightSwitch(roomFixture);

            expect(roomFixture).toHaveClass('light-on');
        });

        it('.lightSwitch() should switch the light off in the room', function () {
            LightService.lightSwitch(roomLightOnFixture);

            expect(roomLightOnFixture).not.toHaveClass('light-on');
        });

        it('.lightSwitch() should make call to backend when switching the light on or off', function () {
            var saveAjax = spyOn($, 'post').and.callFake(function () {
                var postCall = $.Deferred();
                postCall.reject(saveLightFailure);
                return postCall.promise();
            });

            LightService.lightSwitch(roomFixture);

            expect(saveAjax).toHaveBeenCalled();
        });

        it('.switchLightOnIn() should trigger light.open event before switching the light on', function () {
            var beforeEvent = spyOnEvent(roomFixture, EventService.lightEvents.beforeOn);

            LightService.switchLightOnIn(roomFixture);

            expect(beforeEvent).toHaveBeenTriggered();
        });

        it('.switchLightOnIn() should trigger light.opened event after switching the light on', function () {
            var afterEvent = spyOnEvent(roomFixture, EventService.lightEvents.afterOn);

            LightService.switchLightOnIn(roomFixture);

            expect(afterEvent).toHaveBeenTriggered();
        });

        it('.switchLightOffIn() should trigger light.close event before switching the light off', function () {
            var beforeEvent = spyOnEvent(roomLightOnFixture, EventService.lightEvents.beforeOff);

            LightService.switchLightOffIn(roomLightOnFixture);

            expect(beforeEvent).toHaveBeenTriggered();
        });

        it('.switchLightOffIn() should trigger light.closed event after switching the light off', function () {
            var afterEvent = spyOnEvent(roomLightOnFixture, EventService.lightEvents.beforeOff);

            LightService.switchLightOffIn(roomLightOnFixture);

            expect(afterEvent).toHaveBeenTriggered();
        });
    });
});