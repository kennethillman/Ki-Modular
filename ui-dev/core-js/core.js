
/*
Core
*/ 


;(function(document,$) {


    window.core = window.core || {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// ui - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    core.uiInit = function() {
       
         core.loadCss.init();
         //core.uiChildrenCount();
         //core.uiSetAllToMaxHeight(element,min);
         
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// ui - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    core.uiSetAllToMaxHeight = function(element,min){

        if(bodyWidth >= min){
            element.css('height', 'auto').height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) );
        } else {
            $(element).css('height', 'auto');
        }

        // Onload
        self.onWindowResize();
        
        // Resize
        $(window).smartresize(function(){
            self.onWindowResize.apply(self);
        });

    }

  // Thanks Paul Irish
  $.fn.setAllToMaxHeight = function(){
    return this.height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) );
  }


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// ui - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    core.uiEqualHeights = function () {


      $('.ui-section-template').each(function () {

          $('p' , this).css('height', 'auto').setAllToMaxHeight()﻿;

      });

    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// ui - Children count
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    core.uiChildrenCount = function () {


        $('.ui-section-template .ui-container').each(function () {

            var el = $(this);
            var elCount =  el.children().size();

            el.parent().addClass('ui-count-' + elCount);

        });

    };
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Load Css mobile first with Enquire.js
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  var cssLoaded = false;
  var cssM      = false;
  var cssMW     = false;
  var cssP      = false;
  var cssT      = false;
  var cssL      = false;
  var cssD      = false;
  var cssTV     = false;

  var metaEl    = $('head meta:last-child()');
  var linkEl    = $('head');


     core.loadCss =  {

            init: function() {
                  
                    // Mobile
                    enquire.register("screen and (max-width:479px)", {
                            match : function() {
                              if(!cssM){
                                cssM = true;
                                console.log('Load CORE VP320');
                                linkEl.append('<link rel="stylesheet" href="styles/vp320.css">');
                              }
                            }
                    }); 

                    // MobileWide
                    enquire.register("screen and (min-width:480px) and (max-width:767px)", {
                            match : function() {
                              if(!cssM && !cssMW){
                                cssM = true;
                                cssMW = true;
                                console.log('Load CORE-vp-320-480');
                                linkEl.append('<link rel="stylesheet" href="styles/vp-320-480.css">');
                              } else if(!cssMW){
                                cssM = true;
                                cssMW = true;
                                console.log('Load CORE-VP480');
                                linkEl.append('<link rel="stylesheet" media="only screen and (min-width: 480px)" href="styles/vp480.css">');
                              }
                            }
                    }); 

                    // Phablet
                    enquire.register("screen and (min-width:768px) and (max-width:940px)", {
                           match : function() {
                              if(!cssM && !cssMW && !cssP){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                console.log('Load CORE-vp-320-480-768');
                                linkEl.append('<link rel="stylesheet" href="styles/vp-320-480-768.css">');
                              } else if(!cssP){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                console.log('Load CORE-VP768');
                                linkEl.append('<link rel="stylesheet" media="only screen and (min-width: 768px)" href="styles/vp768.css">');
                              }
                            }
                    }); 

                    // Tablet
                    enquire.register("screen and (min-width:941px) and (max-width:1440px)", {
                           match : function() {
                              if(!cssM && !cssMW && !cssP && !cssT){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                cssT = true;
                                console.log('Load CORE-vp-320-480-768-1024');
                                linkEl.append('<link rel="stylesheet" href="styles/vp-320-480-768-1024.css">');
                              } else if(!cssT){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                cssT = true;
                                console.log('Load CORE-VP1024');
                                linkEl.append('<link rel="stylesheet" media="only screen and (min-width: 941px)" href="styles/vp1024.css">');
                              }
                            }
                    }); 

                    // Laptop
                    enquire.register("screen and (min-width:1300px)", {
                           match : function() {
                              if(!cssM && !cssMW && !cssP && !cssT && !cssL){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                cssT = true;
                                cssL = true;
                                console.log('Load CORE-vp-320-480-768-1024-1366');
                                linkEl.append('<link rel="stylesheet" href="styles/vp-320-480-768-1024-1366.css">');
                              } else if(!cssL){
                                cssM = true;
                                cssMW = true;
                                cssP = true;
                                cssT = true;
                                cssL = true;
                                console.log('Load CORE-VP1366');
                                linkEl.append('<link rel="stylesheet" media="only screen and (min-width: 1300px)" href="styles/vp1366.css">');
                              }
                            }
                    }); 


                    

            }, // cssInit



/* - - - Mobile - - - */

            cssMobileClick: function() {
                    
            }, // cssMobileClick


            cssMobileClickReset: function() {
                   
            }, // cssMobileClickReset


            cssMobileDestroy: function() {
                   
            }, // cssMobileDestroy



/* - - - Desktop - - - */

            cssDesktopClick: function() {

            }, // cssDesktopClick


            cssDesktopClickReset: function() {
                
            }, // cssDesktopClickReset


            cssDesktopDestroy: function() {
                   
            } // objectMobileDestroy




     }; // core.uiObject END

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Load
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).on('load', function(){
      $('body').removeClass('eon-loading');
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('ready', function(){

        core.uiInit();
      
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Scroll
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('scroll', function(){
            
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Resize
/////////////////////////////////////////////////////////////////////////////////////////////////////////

  // jquery.debouncing.js, thanks Paul Irish

    $(window).smartresize(function(){
      core.uiEqualHeights();
  });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////

