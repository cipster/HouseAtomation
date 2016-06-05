define('HouseController', ['domReady', 'jquery', 'SvgService', 'LightService', 'CurtainService', 'TemperatureService'],
    function (domReady, $, SvgService, LightService, CurtainService, TemperatureService) {

            /**
             * Initiates the loading of the house and declares event listeners for
             * interaction with house controls
             *
             * @see loadHouse
             */
            var init = function () {
                SvgService.loadHouse();

                $(document).on('click', '.light', function () {
                    var $room = $(this).closest('.room').find('.room-light');
                    LightService.lightSwitch($room);
                });

                $(document).on('click', '.curtains', function () {
                    var $curtains = $(this);

                    CurtainService.curtainPull($curtains);
                });

                $(document).on('change', '.temperature-dial', function () {
                    var $temperatureDial = $(this);

                    TemperatureService.changeTemperature($temperatureDial);
                });
            };

        domReady(function () {
            init();
        });
    });