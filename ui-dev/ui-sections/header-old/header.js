
/*
Header
*/ 



    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };


;(function(document,$) {


    window.jsHeaderOld = window.jsHeaderOld || {};

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    jsHeaderOld.jsInit = function() {
       
        console.log('header.js');

        setTimeout(function(){
            $('body').addClass('show-myPages');
        },500);

         //$('body').addClass('show-myPages');
         //jsHeaderOld.jsEqualHeights();
         //jsHeaderOld.jsItemCount();
         //jsHeaderOld.jsSetAllToMaxHeight(element,min);







        $( ".eon-section-myPages .eon-widget" ).hover(
          function() {
            $( this ).addClass('hover');


                $('.chart').easyPieChart({
                  easing: 'easeOut',
                      barColor:'#6b0000',
                      trackColor:'#850502',
                    scaleColor:false,
                    lineWidth:20,
                    lineCap:'circle',
                  onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                  }
                });

                $('.chart2').easyPieChart({
                  easing: 'easeOut',
                      barColor:'#6b0000',
                      trackColor:'#850502',
                    scaleColor:false,
                    lineWidth:20,
                    lineCap:'circle',
                  onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                  }
                });


                var chart = window.chart = $('.chart').data('easyPieChart');
                var chart2 = window.chart2 = $('.chart2').data('easyPieChart');


          }, function() {
            $( this ).removeClass('hover');
          }
        );


        $('.eon-section-myPages .eon-widget.kwh .value .kwh').countTo({
            from: 0,
            to: 2791,
            speed: 1600,
            refreshInterval: 50,
            onComplete: function(value) {
                //console.debug(this);
            }
        });

$('.eon-section-myPages .eon-widget.kwh .value .kwh2').countTo({
            from: 0,
            to: 36,
            speed: 1600,
            refreshInterval: 50,
            onComplete: function(value) {
               // console.debug(this);
            }
        });

$('.eon-section-myPages .eon-widget.kwh .value .kwh3').countTo({
            from: 0,
            to: 46,
            speed: 1600,
            refreshInterval: 50,
            onComplete: function(value) {
               // console.debug(this);
            }
        });
         
$('.eon-section-myPages .eon-widget.kwh .value .kwh4').countTo({
            from: 0,
            to: 256,
            speed: 1600,
            refreshInterval: 50,
            onComplete: function(value) {
               // console.debug(this);
            }
        });

        $('.eon-section-myPages .eon-widget.kwh .value .kwh5').countTo({
            from: 0,
            to: 49,
            speed: 1600,
            refreshInterval: 50,
            onComplete: function(value) {
               // console.debug(this);
            }
        });

    };




/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    jsHeaderOld.jsSetAllToMaxHeight = function(element,min){

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

    jsHeaderOld.jsStickyProto = function () {

        var body = $('body');
        var scrollPosition = $('body').scrollTop();
        var targetHeight = $('.eon-section-myPages').innerHeight();

        var lastScrollTop = 0;
        var st;
        var direction;

        if(scrollPosition >= targetHeight){
                body.addClass('fix-it');

        } else {
                body.removeClass('fix-it').removeClass('animate-out');
        }

        console.log(targetHeight);
        console.log(scrollPosition);


 

    };



/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    jsHeaderOld.jsEqualHeights = function () {


	    $('.js-section-template').each(function () {

	      	$('p' , this).css('height', 'auto').setAllToMaxHeight()﻿;

	    });

    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// MBS - Item count
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    jsHeaderOld.jsItemCount = function () {


        $('.js-section-template .js-container').each(function () {

            var el = $(this);
            var elCount =  el.children().size();

            el.parent().addClass('mbs-count-' + elCount);

        });

    };
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Object + Enquire.js
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     jsHeaderOld.jsObject =  {

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




     }; // jsHeaderOld.jsObject END

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

       //jsHeaderOld.jsInit();
      
    });


/*var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if (st > lastScrollTop){
       console.log('down');
       $('body').removeClass('animate-out');
   } else {
     console.log('up');
     $('body').addClass('animate-out');
   }
   lastScrollTop = st;
}); */

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Scroll
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(document).on('scroll', function(){
         
         // jsHeaderOld.jsStickyProto(); 

    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Resize
/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// jquery.debouncing.js, thanks Paul Irish

    $(window).smartresize(function(){
  		//jsHeaderOld.jsEqualHeights();
	});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////

