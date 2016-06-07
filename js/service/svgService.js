define('SvgService', ['jquery', 'svg', 'StateService', 'EventService'],
    function ($, svg, StateService, EventService) {
        var houseLoadEvents = EventService.houseLoadEvents,
            /**
             * Loads the SVG document containing the house models
             * and starts loading the state of the house from the "backend"
             *
             * @see StateService.getAndLoadState
             */
            loadHouse = function () {
                var $house = $("#house");

                $house.trigger(houseLoadEvents.beforeLoad);

                $house.svg({
                        onLoad: function () {
                            var $svg = $house.svg('get');
                            $svg.load('img/houseAutomationPlan.svg',
                                {addTo: true, changeSize: false});

                            StateService.getAndLoadState();
                        },
                        settings: {}
                    }
                );

                $house.trigger(houseLoadEvents.afterLoad);
            };

        return {
            loadHouse: loadHouse
        }
    });