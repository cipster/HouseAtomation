define('StateService', ['jquery', 'TemplateService', 'LightService', 'CurtainService', 'TemperatureService'],
    function ($, TemplateService, LightService, CurtainService, TemperatureService) {
        var getAndLoadState = function () {
                $.getJSON('data/state.json').done(function (state) {
                    console.log("Current house state is:");
                    console.log(state);

                    TemplateService.renderDialTemplate(state);

                    setTimeout(function () {
                        loadState(state)
                    }, 300);
                });
            },

            loadState = function (stateData) {
                $.each($(document).find('.light'), function (index, switchElement) {
                    var $switch = $(switchElement),
                        switchId = $switch.prop('id'),
                        lightOnInThisRoom = stateData[switchId].isOn,
                        $room = $switch.closest('.room').find('.room-light');

                    if (lightOnInThisRoom) {
                        LightService.switchLightOnIn($room);
                    }
                });

                $.each($(document).find('.curtains'), function (index, curtainElement) {
                    var $curtain = $(curtainElement),
                        curtainId = $curtain.prop('id'),
                        curtainsClosedInThisRoom = stateData[curtainId].isClosed;

                    if (!curtainsClosedInThisRoom) {
                        CurtainService.openCurtains($curtain);
                    }
                });

                $.each($(document).find('.temperature-dial'), function (index, dialElement) {
                    var $dial = $(dialElement),
                        dialId = $dial.prop('id'),
                        dialTemperature = stateData.temperature.dials[dialId],
                        sideId = TemperatureService.getTemperatureSide($dial),
                        $temperatureZone = $(sideId);

                    $dial.val(dialTemperature);
                    TemperatureService.changeTemperature(dialTemperature, $temperatureZone);
                });
            };

        return {
            getAndLoadState: getAndLoadState
        }

    });