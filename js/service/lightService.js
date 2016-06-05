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
         * @type jquery $('#roomId')
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
         * @type jquery $('#roomId')
         */
        switchLightOffIn = function ($room) {
            $room.trigger(lightEvents.beforeOff);
            $room.removeClass('light-on');
            $room.trigger(lightEvents.afterOff);

            var on = false;
            saveLightState($room, on);
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
         * @param $room $('#roomId')
         * @type jquery
         */
        switchLightOnIn = function ($room) {
            $room.trigger(lightEvents.beforeOn);
            $room.addClass('light-on');
            $room.trigger(lightEvents.afterOn);

            var on = true;
            saveLightState($room, on);
        },
        /**
         * Sends the light state to the "backend" for the specified $room
         *
         * @param $room $('#roomId')
         * @type jquery
         * @param isOn true or false
         * @type boolean
         */
        saveLightState = function ($room, isOn) {
            var roomId = $room.prop('id'),
                data = {
                    roomId: roomId,
                    isOn: isOn
                };

            $.post('switch-light', data)
                .fail(function () {
                    console.log("switch-light not implemented yet")
                });
        };

    return {
        lightSwitch: lightSwitch,
        switchLightOnIn: switchLightOnIn,
        switchLightOffIn: switchLightOffIn
    };
});