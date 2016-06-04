define(['lib/modules/service/eventService'], function (eventService) {
    var temperatureEvents = eventService.temperatureEvents,

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