var $house = $("#house"),
    $svg,
    $diningRoom,
    $diningRoomLight,
    $kitchen,
    $kitchenLight,
    $livingRoom,
    $livingRoomLight,
    $bedRoom,
    $bedRoomLight,
    $bedRoomLightCurtainsClosed,
    $bedRoom2,
    $bedRoom2Light,
    $bedRoom2LightCurtainsClosed,
    $bedRoom3,
    $bedRoom3Light,
    $bedRoom3LightCurtainsClosed,
    $bathroom,
    $bathroomLight,
    $bathroom2,
    $bathroom2Light,

    events = {
        lightEvents: {
            beforeOn: "light.open",
            afterOn: "light.opened",
            beforeOff: "light.close",
            afterOff: "light.closed"
        },
        curtainEvents: {
            beforeOpen: "curtains.open",
            afterOpen: "curtains.opened",
            beforeClosed: "curtains.close",
            afterClosed: "curtains.closed"
        },
        temperatureEvents: {
            beforeIncrease: "temperature.increase",
            afterIncrease: "temperature.increased",
            beforeDecrease: "temperature.decrease",
            afterDecrease: "temperature.decreased"
        }
    },

    loadHouseSvg = function () {
        $svg = $house.svg('get');
        $svg.load('data/houseAutomationPlan.svg', {addTo: true, changeSize: false});

        $diningRoom = $('#dining-room', $svg.root());
        $diningRoomLight = $('#dining-room-light', $svg.root());
        $kitchen = $('#kitchen', $svg.root());
        $kitchenLight = $('#kitchen-light', $svg.root());
        $livingRoom = $('#living-room', $svg.root());
        $livingRoomLight = $('#living-room-light', $svg.root());
        $bedRoom = $('#bed-room', $svg.root());
        $bedRoomLight = $('#bed-room-light', $svg.root());
        $bedRoomLightCurtainsClosed = $('#bed-room-curtains-closed', $svg.root());
        $bedRoom2 = $('#bed-room-2', $svg.root());
        $bedRoom2Light = $('#bed-room-2-light', $svg.root());
        $bedRoom2LightCurtainsClosed = $('#bed-room-2-curtains-closed', $svg.root());
        $bedRoom3 = $('#bed-room-3', $svg.root());
        $bedRoom3Light = $('#bed-room-3-light', $svg.root());
        $bedRoom3LightCurtainsClosed = $('#bed-room-3-curtains-closed', $svg.root());
        $bathroom = $('#bath-room', $svg.root());
        $bathroomLight = $('#bath-room-light', $svg.root());
        $bathroom2 = $('#bath-room-2', $svg.root());
        $bathroom2Light = $('#bath-room-2-light', $svg.root());
    },
    loadState = function () {
        $.getJSON('data/state.json').done(function (stateData) {
            console.log("Current house state is:");
            console.log(stateData);

            $.each($(document).find('.light'), function (index, switchElement) {
                var $switch = $(switchElement),
                    switchId = $switch.prop('id'),
                    lightOnInThisRoom = stateData[switchId].isOn,
                    $room = $switch.closest('.room').find('.room-light');

                if (lightOnInThisRoom) {
                    switchLightOnIn($room);
                }
            });

            $.each($(document).find('.curtains'), function (index, curtainElement) {
                var $curtain = $(curtainElement),
                    curtainId = $curtain.prop('id'),
                    curtainsClosedInThisRoom = stateData[curtainId].isClosed;

                if (!curtainsClosedInThisRoom) {
                    openCurtains($curtain);
                }
            });

            $.each($(document).find('.temperature-dial'), function (index, dialElement) {
                var $dial = $(dialElement),
                    dialId = $dial.prop('id'),
                    dialTemperature = stateData.temperature[dialId],
                    sideId = getTemperatureSide($dial),
                    $temperatureZone = $(sideId, $svg.root());

                    $dial.val(dialTemperature);
                    changeTemperature(dialTemperature, $temperatureZone);
            });

        });
    },
    lightSwitch = function ($room) {
        if ($room.hasClass('light-on')) {
            switchLightOffIn($room);
        } else {
            switchLightOnIn($room);
        }
    },
    curtainPull = function ($curtains) {
        if ($curtains.hasClass('curtains-open')) {
            closeCurtains($curtains);
        } else {
            openCurtains($curtains);
        }
    },
    switchLightOffIn = function ($room) {
        $room.trigger(events.lightEvents.beforeOff);
        $room.removeClass('light-on');
        $room.trigger(events.lightEvents.afterOff);
    },
    switchLightOnIn = function ($room) {
        $room.trigger(events.lightEvents.beforeOn);
        $room.addClass('light-on');
        $room.trigger(events.lightEvents.afterOn);
    },
    openCurtains = function ($curtains) {
        $curtains.trigger(events.curtainEvents.beforeOpen);
        $curtains.addClass('curtains-open');
        $curtains.trigger(events.curtainEvents.afterOpen);
    },
    closeCurtains = function ($curtains) {
        $curtains.trigger(events.curtainEvents.beforeClosed);
        $curtains.removeClass('curtains-open');
        $curtains.trigger(events.curtainEvents.afterClosed);
    },
    changeTemperature = function (temperature, $temperatureZone) {
        $temperatureZone.removeClass('cold perfect hot');

        if (temperature < 21) {
            $temperatureZone.addClass('cold');
        } else if (temperature < 24) {
            $temperatureZone.addClass('perfect');
        } else {
            $temperatureZone.addClass('hot');
        }
    },
    getTemperatureSide = function ($temperatureDial) {
        var sideId;
        if($temperatureDial.hasClass('left-side')){
            sideId = "#bed-room-left-heat";
        } else if ($temperatureDial.hasClass('right-side')) {
            sideId = "#bed-room-right-heat";
        } else {
            sideId = "#living-room-heat";
        }

        return sideId;
    };

$(document).ready(function () {
    $house.svg({
            onLoad: loadHouseSvg,
            settings: {}
        }
    );

    loadState();

    $(document).on('click', '.light', function () {
        var $room = $(this).closest('.room').find('.room-light');
        lightSwitch($room);
    });

    $(document).on('click', '.curtains', function () {
        var $curtains = $(this);

        curtainPull($curtains);
    });

    $(document).on('change', '.temperature-dial', function () {
        var $temperatureDial = $(this),
            temperature = $temperatureDial.val(),
            sideId = getTemperatureSide($temperatureDial),
            $temperatureZone = $(sideId, $svg.root());

        changeTemperature(temperature, $temperatureZone);
    })

});