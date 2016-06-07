define(['jquery', 'jasmine-jquery', 'StateService', 'TemplateService'], function ($, jasmineJquery, StateService, TemplateService) {
    describe('StateService', function () {
        jasmine.getFixtures().fixturesPath = 'fixtures/html';
        jasmine.getJSONFixtures().fixturesPath = 'fixtures/json';

        var fixtureReader = jasmine.getFixtures(),
            expectedDialFixture,
            stateFixture,
            houseFixture,
            expectedStateFixture;

        beforeEach(function () {
            stateFixture = getJSONFixture('stateFixture.json');
            houseFixture = loadFixtures('houseFixture.html');
            expectedStateFixture = getJSONFixture('expectedStateFixture.json');
            expectedDialFixture = fixtureReader.read('expectedDialFixture.html');
        });

        it('.getAndLoadState() should load state with data from static file', function () {
            var getAjax = spyOn($, 'get').and.callFake(function () {
                    var deferred = $.Deferred();
                    deferred.resolve(stateFixture);

                    return deferred.promise();
                }),
                templateRendering = spyOn(TemplateService, 'renderDialTemplate').and.callFake(function () {
                    return expectedDialFixture;
                }),
                stateLoading = spyOn(StateService, 'loadState').and.callFake(function (param) {
                    //empty function
                });

            StateService.getAndLoadState();

            expect(getAjax).toHaveBeenCalled();
            expect(templateRendering).toHaveBeenCalled();

            setTimeout(function () {
                expect(stateLoading).toHaveBeenCalled();
                done();
            }, 200);
        });

        it('.loadState() should load expected state', function () {
            var loadedState = StateService.loadState(stateFixture);

            expect(loadedState).toEqual(expectedStateFixture);
        });
    });
});