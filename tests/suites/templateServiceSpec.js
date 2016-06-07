define(['jquery', 'jasmine-jquery', 'TemplateService'], function ($, jasmineJquery, TemplateService) {
    describe('TemplateService', function () {
        jasmine.getFixtures().fixturesPath = 'fixtures/html';
        jasmine.getJSONFixtures().fixturesPath = 'fixtures/json';

        var fixtureReader = jasmine.getFixtures(),
            dialFixture = fixtureReader.read('dialFixture.html'),
            expectedDialFixture = fixtureReader.read('expectedDialFixture.html'),
            stateFixture = getJSONFixture('stateFixture.json');

        setFixtures('<div id="temperature-dials">');

        it('.renderDialTemplate() should read state data and render the dial template', function () {
            var renderedDialTemplate,
                getAjax = spyOn($, 'get').and.callFake(function () {
                var deferred = $.Deferred();
                deferred.resolve(dialFixture);
                return deferred.promise();
            });

            renderedDialTemplate = TemplateService.renderDialTemplate(stateFixture);

            expect(getAjax).toHaveBeenCalled();
            expect(renderedDialTemplate).toContain(expectedDialFixture);
        });

    });

});