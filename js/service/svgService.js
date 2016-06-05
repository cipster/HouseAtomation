define('SvgService', ['jquery', 'svg', 'StateService'], function ($, svg, StateService) {

    /**
     * Loads the SVG document containing the house models
     * and starts loading the state of the house from the "backend"
     *
     * @see StateService.getAndLoadState
     */
    var loadHouse = function () {
        var $house = $("#house");
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

    };

    return {
        loadHouse: loadHouse
    }
});