define('CurtainService', ['EventService'], function (EventService) {
    var curtainEvents = EventService.curtainEvents,
        /**
         * Pulls the curtains open or closed based on the css class <code>.curtains-open</code>
         *
         * @see openCurtains
         * @see closeCurtains
         *
         * @param $curtains $('#curtainId')
         * @type jquery
         */
        curtainPull = function ($curtains) {
            if ($curtains.hasClass('curtains-open')) {
                closeCurtains($curtains);
            } else {
                openCurtains($curtains);
            }
        },
        /**
         * Opens the curtains specified by the jquery object <code>$curtains</code>
         *
         * Triggers event <code>curtains.open</code> before the curtains are pulled open
         * Triggers event <code>curtains.opened</code> after the curtains are pulled open
         *
         * @see closeCurtains
         * @see curtainPull
         *
         * @param $curtains
         * @type jquery $('#curtainId')
         */
        openCurtains = function ($curtains) {
            $curtains.trigger(curtainEvents.beforeOpen);
            $curtains.addClass('curtains-open');
            $curtains.trigger(curtainEvents.afterOpen);

            var closed = false;
            saveCurtainState($curtains, closed);
        },
        /**
         * Closes the curtains specified by the jquery object <code>$curtains</code>
         *
         * Triggers event <code>curtains.close</code> before the curtains are pulled closed
         * Triggers event <code>curtains.closed</code> after the curtains are pulled closed
         *
         * @see openCurtains
         * @see curtainPull
         *
         * @param $curtains $('#curtainId')
         * @type jquery
         */
        closeCurtains = function ($curtains) {
            $curtains.trigger(curtainEvents.beforeClosed);
            $curtains.removeClass('curtains-open');
            $curtains.trigger(curtainEvents.afterClosed);

            var closed = true;
            saveCurtainState($curtains, closed);
        },
        /**
         * Sends the curtain state to the "backend" for the specified $curtains
         *
         * @param $curtains $('#curtainId')
         * @type jquery
         * @param isClosed true or false
         * @type boolean
         */
        saveCurtainState = function ($curtains, isClosed) {
            var curtainId = $curtains.prop('id'),
                data = {
                    curtainId: curtainId,
                    isClosed: isClosed
                };

            $.post('curtain-pull', data)
                .fail(function () {
                    console.log("curtain-pull not implemented yet")
                });
        };

    return {
        curtainPull: curtainPull,
        openCurtains: openCurtains,
        closeCurtains: closeCurtains
    };
});