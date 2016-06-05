define('TemperatureService', ['EventService'], function (EventService) {
    var temperatureEvents = EventService.temperatureEvents,
        /**
         * Changes the temperature representation
         * Depending on the value, it can display: cold, optimal and hot temperature
         *
         * Triggers event <code>temperature.change</code> before the temperature changes
         * Triggers event <code>temperature.changed</code> after the temperature changes
         *
         * @param temperature
         * @type int
         * @param $temperatureZone
         * @type jquery
         */
        changeTemperature = function (temperature, $temperatureZone) {
            $temperatureZone.trigger(temperatureEvents.temperatureChange);

            $temperatureZone.removeClass('cold perfect hot');

            if (temperature < 21) {
                $temperatureZone.addClass('cold');
            } else if (temperature < 24) {
                $temperatureZone.addClass('perfect');
            } else {
                $temperatureZone.addClass('hot');
            }
            $temperatureZone.trigger(temperatureEvents.temperatureChanged);
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

            return sideId;
        };

    return {
        changeTemperature: changeTemperature,
        getTemperatureSide: getTemperatureSide
    };
});