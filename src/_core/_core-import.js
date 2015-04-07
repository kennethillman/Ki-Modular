
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// REKRYTERING - CORE JS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//var fm = {};
//var fmCore = {};
var fmCoreRw = {};
//var fmCorerw = {}; 


//window.fm = window.fm || {};
//window.rw= window.rw|| {};
//window.fm.rw= window.fm.rw|| {};


// Libs
@@include('../../../ui/_scripts/libs/modernizr.js')
@@include('../../../ui/_scripts/libs/jquery-1.11.0.js')
@@include('../../../ui/_scripts/libs/jquery-migrate-1.2.1.min.js') // min används. ominifierad verkade smälla, kolla igen.

// Plugins
@@include('../../../ui/_scripts/plugins/hyphenate.js')              // ... Everywere
@@include('../../../ui/_scripts/plugins/jquery.cookie.js')          // ... vart?
@@include('../../../ui/_scripts/plugins/jquery.sequence.js')        // Alla sliders + EP, kanske göra till Module?
@@include('../../../ui/_scripts/plugins/jquery.debounce.js')        // FM {} -> CORE
@@include('../../../ui/_scripts/plugins/jquery.socialite.js')       // Startsidan + resten
@@include('../../../ui/_scripts/plugins/jquery.waypoints.js')       // Vart? startsidan?
@@include('../../../ui/_scripts/plugins/jquery.ilightbox-2.1.5.js') // Vart? startsidan?


// Ki -> Move these to each BLOCK folder!

// App / Section / Module
/* include('... url to section .../FM.s.professionguide-teaser-interactive.js') */
@@include('../../../ui/_scripts/plugins/jquery.professionguide-teaser-interactive.js')
@@include('../../../ui/_scripts/plugins/jquery.dynamic-text-ep.js')

@@include('../../../ui/_scripts/plugins/jquery.related-content.js')
@@include('../../../ui/_scripts/plugins/jquery.sticky-sub-menu.js')
@@include('../../../ui/blocks/sections/s-training/p-training.js')
@@include('../../../ui/blocks/modules/m-application-teaser/m-application-teaser.js') // KI -> Made module

// FM
//@@include('../../../ui/_scripts/FM.temp.place.plugins.js') // Ki -> remove later
@@include('../../../ui/_scripts/FM.helper.js')              // Se över denna. scopa på rätt sätt.
@@include('../../../ui/_scripts/FM.detect.js')              // Se över denna. scopa på rätt sätt.
@@include('../../../ui/_scripts/FM.tests.js')              // Se över denna. scopa på rätt sätt.
@@include('../../../ui/_scripts/FM.index.js')               // aj aj aj. måste gås igenom noga
@@include('../../../ui/blocks/framework/s-header/s-header-navigation-desktop.js')         // ladda ej i mobilen? Bryt ut?
@@include('../../../ui/blocks/framework/s-header/s-header-navigation-mobile.js')          // ladda ej i desktop? Bryt ut?



// TEMP LOCATION
// LAzy load 2000  

addListener(window, 'load', function (event) {


    function isElementInViewport (el) {

        //special bonus for those using jQuery
        /*if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }*/

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= ((window.innerHeight || document.documentElement.clientHeight) + preloadMargin)// && 
            /*or $(window).height() */
           // rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );

    }

    var toLoad = document.querySelectorAll('[data-src]');
    var toLoadLength = toLoad.length;
    var nextI = 0;
    var preloadMargin = 200; // <- decides how far ahed we want to load images

    //console.log('setting up', toLoad);
    function checkImages(e) {
        var currEl;
        for(;nextI<toLoadLength;nextI++) {
            currEl = toLoad[nextI];
            //console.log(nextI, currEl);
            if(isElementInViewport(currEl)) {
                (function(el) {
                    //setTimeout(function() {
                    var img = document.createElement('img');
                    img.onload = function(loadEvent) {
                        //console.log('load img',loadEvent, this);
                        el.style.backgroundImage = 'url('+this.src+')';
                        el.className += " loaded";
                        img = undefined;
                        el = undefined;
                    };
                    img.src = el.getAttribute('data-src');
                    //console.log(img); //document.documentElement.body.appendChild(img);
                    //}, 0);
                })(currEl);
            } else {
                //nextI--;
                break;
            }
        }
    } 

    checkImages();

    
    $(window).on('scroll', checkImages);

}); 





