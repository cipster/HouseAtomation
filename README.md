
<pre>
 __    __                                                                      __                                          __      __                     
/  |  /  |                                                                    /  |                                        /  |    /  |                    
$$ |  $$ |  ______   __    __   _______   ______          ______   __    __  _$$ |_     ______   _____  ____    ______   _$$ |_   $$/   ______   _______  
$$ |__$$ | /      \ /  |  /  | /       | /      \        /      \ /  |  /  |/ $$   |   /      \ /     \/    \  /      \ / $$   |  /  | /      \ /       \ 
$$    $$ |/$$$$$$  |$$ |  $$ |/$$$$$$$/ /$$$$$$  |       $$$$$$  |$$ |  $$ |$$$$$$/   /$$$$$$  |$$$$$$ $$$$  | $$$$$$  |$$$$$$/   $$ |/$$$$$$  |$$$$$$$  |
$$$$$$$$ |$$ |  $$ |$$ |  $$ |$$      \ $$    $$ |       /    $$ |$$ |  $$ |  $$ | __ $$ |  $$ |$$ | $$ | $$ | /    $$ |  $$ | __ $$ |$$ |  $$ |$$ |  $$ |
$$ |  $$ |$$ \__$$ |$$ \__$$ | $$$$$$  |$$$$$$$$/       /$$$$$$$ |$$ \__$$ |  $$ |/  |$$ \__$$ |$$ | $$ | $$ |/$$$$$$$ |  $$ |/  |$$ |$$ \__$$ |$$ |  $$ |
$$ |  $$ |$$    $$/ $$    $$/ /     $$/ $$       |      $$    $$ |$$    $$/   $$  $$/ $$    $$/ $$ | $$ | $$ |$$    $$ |  $$  $$/ $$ |$$    $$/ $$ |  $$ |
$$/   $$/  $$$$$$/   $$$$$$/  $$$$$$$/   $$$$$$$/        $$$$$$$/  $$$$$$/     $$$$/   $$$$$$/  $$/  $$/  $$/  $$$$$$$/    $$$$/  $$/  $$$$$$/  $$/   $$/ 

</pre>                                                                                                                                                     
                                                                                                                                                          
                                                                                                                                                          

Our house in the middle of the street


The ultimate javascript application for controlling your house. You can automagically turn on or off the lights, 
close or open the curtains and even change the temperature in each zone of the house.  

You can see it in action at [cipster.github.io/HouseAutomation](https://cipster.github.io/HouseAutomation/)

 or 
 
You can run its tests [here](https://cipster.github.io/HouseAutomation/) 


#Technologies

House automation uses: 

 * [jQuery](https://jquery.com/) as it's main tech for DOM manipulation. Documentation [here](https://api.jquery.com/)
 * [require.js](requirejs.org/) for asynchronous module loading. Documentation [here](http://requirejs.org/docs/api.html)
 * [jQuery SVG](http://keith-wood.name/svg.html) for manipulating .svg DOM with jQuery. Documentation [here](http://keith-wood.name/svgRef.html)
 * [Mustache](https://mustache.github.io/) for javascript templates. Documentation [here](https://github.com/janl/mustache.js) 
 * [Bootstrap](http://getbootstrap.com/) as it's main CSS framework. Documentation [here](http://getbootstrap.com/getting-started/) 
 * [bower](http://bower.io/) for dependency management. Documentation [here](http://bower.io/docs/api/)
 * [Jasmine](http://jasmine.github.io) for unit testing. Documentation [here](http://jasmine.github.io/2.2/introduction.html)
 * [jasmine-jquery](https://github.com/velesin/jasmine-jquery) for integration of Jasmine with jQuery. Documentation [here](https://github.com/velesin/jasmine-jquery/blob/master/README.md) 
    
#Getting started

Checkout using either [HTTPS](https://github.com/cipster/HouseAutomation.git) or [SSH](git@github.com:cipster/HouseAutomation.git)
Not that much to it, isn't it?

#Compatible browsers

This app runs smoothly on [Chrome](https://www.google.com/chrome/browser/desktop/index.html), [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [Opera](http://www.opera.com/).

Don't try it in Internet Explorer, use a *browser*!

#Events

House Automation exposes a few events for hooking into house functionality

|Event Type|Description|
|---|---|
|house.load| This event fires before the load of the house|
|house.loaded| This event fires after the house has been loaded|
|light.open| This event fires before a light has been turned on|
|light.opened| This event fires after a light has been turned on|
|light.close| This event fires before a light has been turned off|
|light.closed| This event fires after a light has been turned off|
|curtains.open| This event fires before any curtains are pulled open|
|curtains.opened| This event fires after any curtains are pulled open|
|curtains.close| This event fires before any curtains are pulled closed|
|curtains.closed| This event fires after any curtains are pulled closed|
|temperature.change| This event fires before any zone changes its temperature|
|temperature.changed| This event fires after any zone changes its temperature|

###Listening for events
```javascript
$(document).on('light.open', function(event){
    $('#someElement').doSomething();
});
```

