define(['lib/modules/service/eventService'], function (eventService) {
    var curtainEvents = eventService.curtainEvents,
        curtainPull = function ($curtains) {
            if ($curtains.hasClass('curtains-open')) {
                closeCurtains($curtains);
            } else {
                openCurtains($curtains);
            }
        },
        openCurtains = function ($curtains) {
            $curtains.trigger(curtainEvents.beforeOpen);
            $curtains.addClass('curtains-open');
            $curtains.trigger(curtainEvents.afterOpen);
        },
        closeCurtains = function ($curtains) {
            $curtains.trigger(curtainEvents.beforeClosed);
            $curtains.removeClass('curtains-open');
            $curtains.trigger(curtainEvents.afterClosed);
        };

    return {
        curtainPull: curtainPull,
        openCurtains: openCurtains
    };
});