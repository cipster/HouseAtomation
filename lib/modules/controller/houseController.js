define('HouseController', ['domReady', 'jquery', 'svg', 'StateService', 'LightService', 'CurtainService', 'TemperatureService'],
    function (domReady, $, svg, StateService, LightService, CurtainService, TemperatureService) {
        var $svg,

            loadHouse = function () {
                var $house = $("#house");
                $house.svg({
                        onLoad: function () {
                            $svg = $house.svg('get');
                            $svg.load('data/houseAutomationPlan.svg', {addTo: true, changeSize: false});
                        },
                        settings: {}
                    }
                );

                StateService.getAndLoadState();
            },

            init = function () {
                loadHouse();

                $(document).on('click', '.light', function () {
                    var $room = $(this).closest('.room').find('.room-light');
                    LightService.lightSwitch($room);
                });

                $(document).on('click', '.curtains', function () {
                    var $curtains = $(this);

                    CurtainService.curtainPull($curtains);
                });

                $(document).on('change', '.temperature-dial', function () {
                    var $temperatureDial = $(this),
                        temperature = $temperatureDial.val(),
                        sideId = TemperatureService.getTemperatureSide($temperatureDial),
                        $temperatureZone = $(sideId, $svg.root());

                    TemperatureService.changeTemperature(temperature, $temperatureZone);
                });
            };

        domReady(function () {
            init();
        });

    });