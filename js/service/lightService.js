define('LightService', ['EventService'], function (EventService) {
    var lightEvents = EventService.lightEvents,
        /**
         * Toggles the light in the specified jquery object <b>$room</b>
         * Uses the css class <code>.light-on</code> to check if the light is actually on
         *
         * @see switchLightOffIn
         * @see switchLightOnIn
         *
         * @param $room
         * @type jquery
         */
        lightSwitch = function ($room) {
            if ($room.hasClass('light-on')) {
                switchLightOffIn($room);
            } else {
                switchLightOnIn($room);
            }
        },
        /**
         * Switches the light off in the specified jquery object <b>$room</b>
         *
         * Triggers event <code>light.close</code> before the light turns off
         * Triggers event <code>light.closed</code> after the light turns off
         *
         * @see switchLightOnIn
         * @see lightSwitch
         *
         * @param $room
         * @type jquery
         */
        switchLightOffIn = function ($room) {
            $room.trigger(lightEvents.beforeOff);
            $room.removeClass('light-on');
            $room.trigger(lightEvents.afterOff);
        },
        /**
         * Switches the light on in the specified jquery object <b>$room</b>
         *
         * Triggers event <code>light.open</code> before the light turns on
         * Triggers event <code>light.opened</code> after the light turns on
         *
         * @see switchLightOffIn
         * @see lightSwitch
         *
         * @param $room
         * @type jquery
         */
        switchLightOnIn = function ($room) {
            $room.trigger(lightEvents.beforeOn);
            $room.addClass('light-on');
            $room.trigger(lightEvents.afterOn);
        };

    return {
        lightSwitch: lightSwitch,
        switchLightOnIn: switchLightOnIn,
        switchLightOffIn: switchLightOffIn
    };
});