require(['jquery', 'svg', 'lib/modules/service/templateService', 'lib/modules/service/lightService', 'lib/modules/service/curtainService', 'lib/modules/service/temperatureService'],
    function ($, svg, templateService, lightService, curtainService, temperatureService) {
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

                getState();
            },
            getState = function () {
                $.getJSON('data/state.json', function (state) {
                    console.log("Current house state is:");
                    console.log(state);

                    templateService.renderDialTemplate(state);

                    setTimeout(function () {
                        loadState(state)
                    }, 500);
                });
            },
            loadState = function (stateData) {
                $.each($(document).find('.light'), function (index, switchElement) {
                    var $switch = $(switchElement),
                        switchId = $switch.prop('id'),
                        lightOnInThisRoom = stateData[switchId].isOn,
                        $room = $switch.closest('.room').find('.room-light');

                    if (lightOnInThisRoom) {
                        lightService.switchLightOnIn($room);
                    }
                });

                $.each($(document).find('.curtains'), function (index, curtainElement) {
                    var $curtain = $(curtainElement),
                        curtainId = $curtain.prop('id'),
                        curtainsClosedInThisRoom = stateData[curtainId].isClosed;

                    if (!curtainsClosedInThisRoom) {
                        curtainService.openCurtains($curtain);
                    }
                });

                $.each($(document).find('.temperature-dial'), function (index, dialElement) {
                    var $dial = $(dialElement),
                        dialId = $dial.prop('id'),
                        dialTemperature = stateData.temperature.dials[dialId],
                        sideId = temperatureService.getTemperatureSide($dial),
                        $temperatureZone = $(sideId, $svg.root());

                    $dial.val(dialTemperature);
                    temperatureService.changeTemperature(dialTemperature, $temperatureZone);
                });
            };


        $(document).ready(function () {
            setTimeout(function () {
                loadHouse();
            }, 200);


            $(document).on('click', '.light', function () {
                var $room = $(this).closest('.room').find('.room-light');
                lightService.lightSwitch($room);
            });

            $(document).on('click', '.curtains', function () {
                var $curtains = $(this);

                curtainService.curtainPull($curtains);
            });

            $(document).on('change', '.temperature-dial', function () {
                var $temperatureDial = $(this),
                    temperature = $temperatureDial.val(),
                    sideId = temperatureService.getTemperatureSide($temperatureDial),
                    $temperatureZone = $(sideId, $svg.root());

                temperatureService.changeTemperature(temperature, $temperatureZone);
            });
        });
    });