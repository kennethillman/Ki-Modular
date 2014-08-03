
/*
My pages
*/ 


;(function(document,$) {


    window.jsMyPages = window.jsMyPages || {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    jsMyPages.jsInit = function() {
       
         //console.log('Template JS loaded');
         //jsMyPages.jsEqualHeights();
         //jsMyPages.jsItemCount();

         //jsMyPages.jsSetAllToMaxHeight(element,min);



         
    };

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    jsMyPages.jsSetAllToMaxHeight = function(element,min){

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
////// MBS - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    jsMyPages.jsEqualHeights = function () {


	    $('.js-section-template').each(function () {

	      	$('p' , this).css('height', 'auto').setAllToMaxHeight()﻿;

	    });

    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Item count
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    jsMyPages.jsItemCount = function () {


        $('.js-section-template .js-container').each(function () {

            var el = $(this);
            var elCount =  el.children().size();

            el.parent().addClass('mbs-count-' + elCount);

        });

    };
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Object + Enquire.js
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     jsMyPages.jsObject =  {

            objectInit: function() {
                  
                    // enquire.js
                    enquire.register("screen and (min-width:768px)", {
              
                            setup : function() {

                              console.log('jsObject setup');  
                            
                            },
                            match : function() {
                            
                                console.log('jsObject match');

                            },
                            unmatch : function() {

                                console.log('jsObject unmatch');

                            }

                    }, true); 


            }, // objectInit



/* - - - Mobile - - - */

            objectMobileClick: function() {
                    
            }, // objectMobileClick


            objectMobileClickReset: function() {
                   
            }, // objectMobileClickReset


            objectMobileDestroy: function() {
                   
            }, // objectMobileDestroy



/* - - - Desktop - - - */

            objectDesktopClick: function() {

            }, // objectDesktopClick


            objectDesktopClickReset: function() {
                
            }, // objectDesktopClickReset


            objectDesktopDestroy: function() {
                   
            } // objectMobileDestroy




     }; // jsMyPages.jsObject END

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Load
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).on('load', function(){
      
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Ready
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('ready', function(){

        jsMyPages.jsInit();
      
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
  		//jsMyPages.jsEqualHeights();
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////
