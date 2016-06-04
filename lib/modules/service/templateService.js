define(['jquery', 'mustache'], function ($, Mustache) {
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