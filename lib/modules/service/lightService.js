define(['lib/modules/service/eventService'], function (eventService) {
    var lightEvents = eventService.lightEvents,
        lightSwitch = function ($room) {
            if ($room.hasClass('light-on')) {
                switchLightOffIn($room);
            } else {
                switchLightOnIn($room);
            }
        },
        switchLightOffIn = function ($room) {
            $room.trigger(lightEvents.beforeOff);
            $room.removeClass('light-on');
            $room.trigger(lightEvents.afterOff);
        },
        switchLightOnIn = function ($room) {
            $room.trigger(lightEvents.beforeOn);
            $room.addClass('light-on');
            $room.trigger(lightEvents.afterOn);
        };

    return {
        lightSwitch: lightSwitch,
        switchLightOnIn: switchLightOnIn
    };
});