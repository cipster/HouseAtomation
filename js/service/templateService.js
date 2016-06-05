define('TemplateService', ['jquery', 'mustache'], function ($, Mustache) {
    /**
     * Renders the Dial Template ( "templates/temperature-dials.mustache" ) with values from stateData
     *
     * @param stateData
     * @type Object
     */
    var renderDialTemplate = function (stateData) {
        var $temperatureDials = $('#temperature-dials'),
            renderedDialTemplate;

        $.get('templates/temperature-dials.mustache', function (template) {
            Mustache.parse(template);

            renderedDialTemplate = Mustache.render(template, stateData);

            $temperatureDials.html(renderedDialTemplate);
        });
    };

    return {
        renderDialTemplate: renderDialTemplate
    };
});