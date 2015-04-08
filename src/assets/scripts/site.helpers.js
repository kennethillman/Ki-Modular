

// KI
// - Move critical tests to "firstSteps"


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// FM - HELPER
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


; (function (window, $) {

    // Scope set
    window.FM = window.FM || {};
    var helper = window.FM.helper = FM.helper || {};


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// HAS CLASS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Ki -> Fick ej att fungera i FM.detect.js -> se kommentar i den filen för felet.

    helper.hasClass = function (element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// SET EQUAL HEIGHTS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 1. element = Equal heights for specific css class
    // 2. rwd-collapse-width = Choose break point in pixels to "destroy" equal heights. ex. for mobile "480" px  

    helper.setEqualHeight = function (element, rwdCollapseWidth, excludeClass) {

        if ($(element).parents().hasClass(excludeClass)) {
            return false;
        }

        var bodyWidth = $('body').width();

        if (bodyWidth > rwdCollapseWidth) {

            $(element).css('min-height', '0');
            var biggestHeight = 0;

            $(element).each(function () {

                if ($(this).height() > biggestHeight) {
                    biggestHeight = $(this).height();
                }
            });

            $(element).css('min-height', biggestHeight);

        } else {
            $(element).css('min-height', '0');
        }

    };


})(window, jQuery);




// Move this


// ***************************************************************************
// STICKY NAVIGATION  (Affixiated)
// ***************************************************************************

// Makes the desktop meny stick to the top when scrolling
// Not active now. Needs CSS adjustments when activated får (Tablet & Mobile)

/* FM.stickyNav = function () {

    var body = $('body');
    var header = $('.scaffold-wrapper.header');
    var menu = $('.scaffold-wrapper.mainmenu');

    var headerHeight = header.height();
    var menuHeight = menu.height();
    var menuOffset = menu.offset().top;
    var scrollTop = $(window).scrollTop();
    var width = $('.scaffold-wrapper').width();

    if (scrollTop >= headerHeight) {
        body.addClass('sticky-nav');
        header.css('margin-bottom', menuHeight);
    } else {
        body.removeClass('sticky-nav');
        header.css('margin-bottom', '0');
    }

}; */


































