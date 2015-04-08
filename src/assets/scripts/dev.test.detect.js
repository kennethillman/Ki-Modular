


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// FM - DETECT
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////


; (function (window, $) {

    // Scope set
    var tests = window.fm.tests = fm.tests || {};
        
    ////// TEST DETECT -> hasWebSocket
    var ifWebSocket = fm.detect.hasWebSocket();
    console.log("fm.detect.hasWebSocket: " + ifWebSocket);

    ////// TEST DETECT -> getVideoFormatSupport
    var ifgetVideoFormatSupport = fm.detect.getVideoFormatSupport();
    console.log("fm.detect.getVideoFormatSupport: " + ifgetVideoFormatSupport);

    ////// TEST DETECT -> getOrientation
    var ifgetOrientation = fm.detect.getOrientation();
    console.log("fm.detect.getOrientation: " + ifgetOrientation);

    ////// TEST DETECT -> isAndroid
    var ifAndroid = fm.detect.isAndroid();
    console.log("fm.detect.isAndroid: " + ifAndroid);

    ////// TEST DETECT -> isIOS
    var ifIos = fm.detect.isIOS();
    console.log("fm.detect.isIOS: " + ifIos);



})(window, jQuery);






/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// TEST DETECTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
var ifWebSocket = fm.detect.hasWebSocket();
console.log("fm.detect.hasWebSocket (Out) : " + ifWebSocket);


var ifgetVideoFormatSupport = fm.detect.getVideoFormatSupport();
console.log("fm.detect.getVideoFormatSupport  (Out) : " + ifgetVideoFormatSupport);


var ifgetOrientation = fm.detect.getOrientation();
console.log("fm.detect.getOrientation  (Out) : " + ifgetOrientation);


var ifAndroid = fm.detect.isAndroid();
console.log("fm.detect.isAndroid  (Out) : " + ifAndroid);


var ifIos = fm.detect.isIOS();
console.log("fm.detect.isIOS (Out) : " + ifIos);

*/
////// TEST -> isMW
// FM.detect.isMW();

////// TEST -> isRW
// FM.detect.isRW();







