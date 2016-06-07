define('EventService', [], function () {
    return {
        "houseLoadEvents":{
          "beforeLoad": "house.load",
          "afterLoad": "house.loaded"
        },
        "lightEvents": {
            "beforeOn": "light.open",
            "afterOn": "light.opened",
            "beforeOff": "light.close",
            "afterOff": "light.closed"
        },
        "curtainEvents": {
            "beforeOpen": "curtains.open",
            "afterOpen": "curtains.opened",
            "beforeClosed": "curtains.close",
            "afterClosed": "curtains.closed"
        },
        "temperatureEvents": {
            "temperatureChange": "temperature.change",
            "temperatureChanged": "temperature.changed",
            "beforeIncrease": "temperature.increase",
            "afterIncrease": "temperature.increased",
            "beforeDecrease": "temperature.decrease",
            "afterDecrease": "temperature.decreased"
        }
    }
});