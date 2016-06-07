define('TemperatureService', ['jquery', 'EventService'], function ($, EventService) {
    var MINIMUM_PERFECT_TEMPERATURE = 21,
        MAXIMUM_PERFECT_TEMPERATURE = 23,
        temperatureEvents = EventService.temperatureEvents,
        /**
         * Changes the temperature representation
         * Depending on the value, it can display: cold, optimal and hot temperature
         *
         * Triggers event <code>temperature.change</code> before the temperature changes
         * Triggers event <code>temperature.changed</code> after the temperature changes
         *
         * @param $temperatureDial
         * @type jquery
         */
        changeTemperature = function ($temperatureDial) {
            var temperature = $temperatureDial.val(),
                $temperatureZone = getTemperatureSide($temperatureDial),
                sideId = $temperatureZone.prop('id'),
                data = {
                    sideId: sideId,
                    value: temperature
                };

            $temperatureZone.trigger(temperatureEvents.temperatureChange);

            $temperatureZone.removeClass('cold perfect hot');

            if (temperature < MINIMUM_PERFECT_TEMPERATURE) {
                $temperatureZone.addClass('cold');
            } else {
                if (temperature <= MAXIMUM_PERFECT_TEMPERATURE) {
                    $temperatureZone.addClass('perfect');
                } else {
                    $temperatureZone.addClass('hot');
                }
            }

            $temperatureZone.trigger(temperatureEvents.temperatureChanged);

            saveTemperature(data);

            return $temperatureZone;
        },
        /**
         * Returns the css id selector for the zone affected by the temperature change
         * based on the dial that operated the change
         *
         * @param $temperatureDial
         * @type jquery
         * @returns String sideId - stringy representation of zone ID
         */
        getTemperatureSide = function ($temperatureDial) {
            var sideId;
            if ($temperatureDial.hasClass('left-side')) {
                sideId = "#bed-room-left-heat";
            } else if ($temperatureDial.hasClass('right-side')) {
                sideId = "#bed-room-right-heat";
            } else {
                sideId = "#living-room-heat";
            }

            return $(sideId);
        },
        /**
         * Sends the temperature state to the "backend" for the specified $room
         *
         * @param data data = { sideId: <sideId>, value: <temperature> }
         * @type Object
         */
        saveTemperature = function (data) {
            $.post('change-temperature', data)
                .fail(function () {
                    console.log("change-temperature not implemented yet")
                });
        };

    return {
        changeTemperature: changeTemperature,
        getTemperatureSide: getTemperatureSide
    };
});