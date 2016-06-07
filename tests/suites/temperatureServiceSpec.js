define(['jquery', 'jasmine-jquery', 'TemperatureService', 'EventService'], function ($, jasmineJquery, TemperatureService, EventService) {
    describe('TemperatureService', function () {
        var dialColdFixture,
            dialPerfectFixture,
            dialHotFixture,
            leftZoneFixture,
            middleZoneFixture,
            rightZoneFixture,
            houseFixture;

        beforeEach(function () {
            houseFixture = loadFixtures('houseFixture.html');
            leftZoneFixture = $('#bed-room-left-heat');
            middleZoneFixture = $('#living-room-heat');
            rightZoneFixture = $('#bed-room-right-heat');

            dialColdFixture = $('<select id="left-side-temp" class="form-control temperature-dial left-side">' +
                '<optgroup label="Low">' +
                '<option selected value="18">18° C</option>' +
                '<option value="19">19° C</option>' +
                '<option value="20">20° C</option>' +
                '</optgroup>' +
                '<optgroup label="Perfect">' +
                '<option value="21">21° C</option>' +
                '<option value="22">22° C</option>' +
                '<option value="23">23° C</option>' +
                '</optgroup>' +
                '<optgroup label="High">' +
                '<option value="24">24° C</option>' +
                '<option value="25">25° C</option>' +
                '<option value="26">26° C</option>' +
                '</optgroup>' +
                '</select>');
            dialPerfectFixture = $('<select id="living-area-temp" class="form-control temperature-dial living-side">' +
                '<optgroup label="Low">' +
                '<option value="18">18° C</option>' +
                '<option value="19">19° C</option>' +
                '<option value="20">20° C</option>' +
                '</optgroup>' +
                '<optgroup label="Perfect">' +
                '<option selected value="21">21° C</option>' +
                '<option value="22">22° C</option>' +
                '<option value="23">23° C</option>' +
                '</optgroup>' +
                '<optgroup label="High">' +
                '<option value="24">24° C</option>' +
                '<option value="25">25° C</option>' +
                '<option value="26">26° C</option>' +
                '</optgroup>' +
                '</select>');

            dialHotFixture = $('<select id="right-side-temp" class="form-control temperature-dial right-side">' +
                '<optgroup label="Low">' +
                '<option value="18">18° C</option>' +
                '<option value="19">19° C</option>' +
                '<option value="20">20° C</option>' +
                '</optgroup>' +
                '<optgroup label="Perfect">' +
                '<option value="21">21° C</option>' +
                '<option value="22">22° C</option>' +
                '<option value="23">23° C</option>' +
                '</optgroup>' +
                '<optgroup label="High">' +
                '<option selected value="24">24° C</option>' +
                '<option value="25">25° C</option>' +
                '<option value="26">26° C</option>' +
                '</optgroup>' +
                '</select>');
        });

        it('.changeTemperature() changes the temperature to a more chillier one', function () {
            var $temperatureZone = TemperatureService.changeTemperature(dialColdFixture);

            expect($temperatureZone).toHaveClass('cold');
        });

        it('.changeTemperature() changes the temperature to a perfect one', function () {
            TemperatureService.changeTemperature(dialPerfectFixture);

            expect(middleZoneFixture).toHaveClass('perfect');
        });

        it('.changeTemperature() changes the temperature to a more warmer one', function () {
            TemperatureService.changeTemperature(dialHotFixture);

            expect(rightZoneFixture).toHaveClass('hot');
        });

        it('.getTemperatureSide() gets the left zone id', function () {
            var temperatureZone = TemperatureService.getTemperatureSide(dialColdFixture);

            expect(temperatureZone).toHaveClass("room-heat left-side");
        });

        it('.getTemperatureSide() gets the middle zone id', function () {
            var temperatureZone = TemperatureService.getTemperatureSide(dialPerfectFixture);

            expect(temperatureZone).toHaveClass("room-heat living-side");
        });

        it('.getTemperatureSide() gets the right zone id', function () {
            var temperatureZone = TemperatureService.getTemperatureSide(dialHotFixture);

            expect(temperatureZone).toHaveClass("room-heat right-side");
        });
    });
});