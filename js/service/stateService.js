define('StateService', ['jquery', 'TemplateService', 'LightService', 'CurtainService', 'TemperatureService'],
    function ($, TemplateService, LightService, CurtainService, TemperatureService) {

        /**
         * Retrieves the state of the house from the "backend" and then
         * <ul>
         *     <li> renders the dial template with data loaded</li>
         *     <li> renders the state of the app after a timeout of 200 ms switching on lights, pulling the curtains setting the temperature</li>
         * </ul>
         *
         * @see TemplateService.renderDialTemplate
         * @see loadState
         */
        var getAndLoadState = function () {
                $.getJSON('data/state.json').done(function (state) {
                    console.log("Current house state is:");
                    console.log(state);

                    TemplateService.renderDialTemplate(state);

                    setTimeout(function () {
                        loadState(state);
                    }, 400);
                });
            },

            /**
             * Renders the state of the app switching on lights, pulling the curtains setting the temperature
             * contained in stateData
             *
             * @param stateData
             * @type Object
             */
            loadState = function (stateData) {
                var loadedState = {
                    temperature: {
                        dials:{

                        }
                    }
                };
                $.each($(document).find('.light'), function (index, switchElement) {
                    var $switch = $(switchElement),
                        switchId = $switch.prop('id'),
                        lightOnInThisRoom = stateData[switchId].isOn,
                        $room = $switch.closest('.room').find('.room-light');

                    if (lightOnInThisRoom) {
                        LightService.switchLightOnIn($room);

                        loadedState[switchId] = {isOn: true};
                    }
                });

                $.each($(document).find('.curtains'), function (index, curtainElement) {
                    var $curtain = $(curtainElement),
                        curtainId = $curtain.prop('id'),
                        curtainsClosedInThisRoom = stateData[curtainId].isClosed;

                    if (!curtainsClosedInThisRoom) {
                        CurtainService.openCurtains($curtain);

                       loadedState[curtainId] = {isClosed: true};
                    }
                });

                $.each($(document).find('.temperature-dial'), function (index, dialElement) {
                    var $dial = $(dialElement),
                        dialId = $dial.prop('id'),
                        dialTemperature = stateData.temperature.dials[dialId];

                    $dial.val(dialTemperature);

                    TemperatureService.changeTemperature($dial);

                    loadedState.temperature.dials[dialId] = dialTemperature;
                });

                return loadedState;
            };

        return {
            getAndLoadState: getAndLoadState,
            loadState: loadState
        }

    });