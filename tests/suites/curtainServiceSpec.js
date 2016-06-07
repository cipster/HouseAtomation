define(['jquery', 'jasmine-jquery', 'CurtainService', 'EventService'],
    function ($, jasmineJquery, CurtainService, EventService) {
        describe('CurtainService', function () {
            var curtainsOpenFixture;
            var curtainsClosedFixture,
                saveCurtainFailure = function(e) {
                    e.error({});
                };

            beforeEach(function () {
                curtainsOpenFixture = $('<path id="bed-room-curtains" class="fil5 curtains curtains-open" d="M15.4239 8.365l33.7788 -0.0873c1.8302,2.3681 5.1309,5.0542 6.3142,7.3609 0.1675,0.3265 -0.2357,0.7306 -0.5081,1.1137l1.2368 1.8268 -4.2231 -0.4676 -1.7425 0.1609 -23.0905 0.6038 -11.7656 -10.5112z"></path>')
                curtainsClosedFixture = $('<path id="bed-room-curtains" class="fil5 curtains" d="M15.4239 8.365l33.7788 -0.0873c1.8302,2.3681 5.1309,5.0542 6.3142,7.3609 0.1675,0.3265 -0.2357,0.7306 -0.5081,1.1137l1.2368 1.8268 -4.2231 -0.4676 -1.7425 0.1609 -23.0905 0.6038 -11.7656 -10.5112z"></path>')
            });

            it('.curtainPull() should open the curtains in the room', function () {
                CurtainService.curtainPull(curtainsOpenFixture);

                expect(curtainsOpenFixture).not.toHaveClass('curtains-open');
            });

            it('.curtainPull() should close the curtains in the room', function () {
                CurtainService.curtainPull(curtainsClosedFixture);

                expect(curtainsClosedFixture).toHaveClass('curtains-open');
            });

            it('.curtainPull() should make call to backend when switching the light on or off', function () {
                var saveAjax = spyOn($, 'post').and.callFake(function () {
                    var postCall = $.Deferred();
                    postCall.reject(saveCurtainFailure);
                    return postCall.promise();
                });

                CurtainService.curtainPull(curtainsOpenFixture);

                expect(saveAjax).toHaveBeenCalled();
            });

            it('.openCurtains() should trigger curtains.open event before opening curtains', function () {
                var beforeEvent = spyOnEvent(curtainsClosedFixture, EventService.curtainEvents.beforeOpen);

                CurtainService.openCurtains(curtainsClosedFixture);

                expect(beforeEvent).toHaveBeenTriggered();
            });

            it('.openCurtains() should trigger curtains.opened event after opening curtains', function () {
                var afterEvent = spyOnEvent(curtainsClosedFixture, EventService.curtainEvents.afterOpen);

                CurtainService.openCurtains(curtainsClosedFixture);

                expect(afterEvent).toHaveBeenTriggered();
            });


            it('.closeCurtains() should trigger curtains.close event before opening curtains', function () {
                var beforeEvent = spyOnEvent(curtainsOpenFixture, EventService.curtainEvents.beforeClosed);

                CurtainService.closeCurtains(curtainsOpenFixture);

                expect(beforeEvent).toHaveBeenTriggered();
            });

            it('.closeCurtains() should trigger curtains.closed event after opening curtains', function () {
                var afterEvent = spyOnEvent(curtainsOpenFixture, EventService.curtainEvents.afterClosed);

                CurtainService.closeCurtains(curtainsOpenFixture);

                expect(afterEvent).toHaveBeenTriggered();
            });

        });
    });