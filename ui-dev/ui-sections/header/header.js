
/*
EON - HEADER
*/ 


;(function(document,$) {


    window.eonHeader = window.eonHeader || {};

    // Scope Variables
    var eonBw = $('body').width();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// EON - Init
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    eonHeader.eonInit = function() {
       
        eonHeader.eonGlobalNav();
        eonHeader.eonMainNav.mainInit();
        eonHeader.eonTabNav.tabInit();
         

               /*  $('.eon-nav-second-level').each(function () {

                        $(this).addClass('yoyo');
                       $(this, '> li').setAllToMaxHeight();

                }); */ 

         
        
    };


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// EON - Equal heights
/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Thanks Paul Irish
	$.fn.setAllToMaxHeight = function(){
		return this.height( Math.max.apply(this, $.map( this , function(e){ return $(e).height() }) ) );
	}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// EON - Global navigation
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    eonHeader.eonGlobalNav = function () {

        // Close 

            $('.eon-header-global .eon-btn-close').on('click',function () {
                var el = $(this);
                el.closest('.eon-header-global').fadeOut('fast').addClass('is-hidden-mobile');
                return false;
            });


        // Arrow

            $('.eon-global-left .eon-btn-arrow-mobile').on('click',function () {

                var el = $(this);
                var elParent = $(this).parent();

                if(elParent.hasClass('is-expanded')){
                    elParent.removeClass('is-expanded');
                } else {
                    elParent.addClass('is-expanded');
                }

                return false;
            });

    };

   
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// EON - Tab navigation mobile and search desktop
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     eonHeader.eonTabNav =  {

            tabInit: function() {
                  
                    // enquire.js
                    enquire.register("screen and (min-width:768px)", {
              
                            setup : function() {

                                eonHeader.eonTabNav.tabMobileClick();
                                eonHeader.eonTabNav.globalCloneMobile();
                                
                            },
                            match : function() {

                                eonHeader.eonTabNav.tabMobileDestroy();
                                eonHeader.eonTabNav.tabDesktopClick();
                                eonHeader.eonTabNav.globalCloneDestroy();
                                
                            },
                            unmatch : function() {

                                eonHeader.eonTabNav.tabDesktopDestroy();
                                eonHeader.eonTabNav.tabMobileClick();
                                eonHeader.eonTabNav.globalCloneMobile();

                            }

                    }, true); 


            }, // tabInit


            tabDesktopClickReset: function(el,elParent) {
                   
                    $('.eon-header-mobileAndExtras a').each(function () {

                        var el = $(this);
                        var elData =  el.attr('data-header-tab');
                        var elParent = $(this).closest('.eon-s-header');
                        var classParent = elData+'-is-expanded' ;

                        elParent.removeClass(classParent);

                    }); 

                    $('.eon-header-mobileAndExtras li').removeClass('is-expanded');
                    $('.eon-main-nav menu li').removeClass('is-expanded'); // Expanded submenus
                   
            }, // tabDesktopClickReset


            tabDesktopClick: function() {

                $('.eon-header-mobileAndExtras a').on('click',function () {
        
                    var el = $(this);
                    var elData =  el.attr('data-header-tab');
                    var elParent = $(this).closest('.eon-s-header');
                    var classParent = elData+'-is-expanded';
                    var classTarget = '.eon-header-' + elData;
                    var targetHeight   = $(classTarget).outerHeight(); 

                    
                    //console.log(targetHeight);


                    // if somthing is expanded
                    if(elParent.is('[class*="-is-expanded"]')) { 
                            
                           // if this one is expanded
                           if(elParent.hasClass(classParent)){

                                // Animate contract accordingly
                                elParent.animate({
                                    paddingBottom: 0 ,
                                }, 350, function() {

                                    // Reset after anmation done
                                    eonHeader.eonTabNav.tabDesktopClickReset();

                                });
      
                             } else {
                            
                                   // if any expanded -> Reset
                                   eonHeader.eonTabNav.tabDesktopClickReset();

                                    // Animate expand  accordingly
                                    elParent.animate({
                                        paddingBottom: targetHeight ,
                                    }, 350);

                                    // Add expanded classes 
                                    el.parent().addClass('is-expanded');
                                    elParent.addClass(classParent);
                              }

                    // else, if nothing is expanded
                    } else {

                        // Animate expand accordingly
                        elParent.animate({
                            paddingBottom: targetHeight ,
                        }, 350);

                        // Add expanded classes
                        el.parent().addClass('is-expanded');
                        elParent.addClass(classParent);     

                    }

                    return false;
                });
                    
            }, // tabDesktopClick


            tabDesktopDestroy: function(el,elParent) {

                  //console.log('tabDesktopDestroy');
                  $('.eon-header-mobileAndExtras a').off('click');
                   
            }, // tabMobileDestroy


            tabMobileDestroy: function(el,elParent) {

                  $('.eon-header-mobileAndExtras a').off('click');
                  eonHeader.eonTabNav.tabDesktopClickReset();
                   
            }, // tabMobileDestroy


            tabMobileClickReset: function(el,elParent) {
                   
                    $('.eon-header-mobileAndExtras a').each(function () {

                        var el = $(this);
                        var elData =  el.attr('data-header-tab');
                        var elParent = $(this).closest('.eon-s-header');
                        var classParent = elData+'-is-expanded' ;

                        elParent.removeClass(classParent);

                    }); 

                    $('.eon-header-mobileAndExtras li').removeClass('is-expanded');
                    $('.eon-main-nav menu li').removeClass('is-expanded'); // Expanded submenus
                   
            }, // tabMobileClickReset


            tabMobileClick: function() {

                $('.eon-header-mobileAndExtras a').on('click',function () {
        
                    var el = $(this);
                    var elData =  el.attr('data-header-tab');
                    var elParent = $(this).closest('.eon-s-header');
                    var classParent = elData+'-is-expanded' ;

                       // console.log(classParent);

                    if(elParent.hasClass(classParent)){
                        eonHeader.eonTabNav.tabMobileClickReset(el,elParent);
                    } else {
                        eonHeader.eonTabNav.tabMobileClickReset(el,elParent);
                        el.parent().addClass('is-expanded');
                        elParent.addClass(classParent);
                    } 

                    return false;
                });
                    
            }, // tabMobileClick


// ** Extra for global "CLONE"

            globalCloneMobile: function(el,elParent) {
                   
                $( ".eon-global-right menu li" ).clone().appendTo( ".eon-nav-top-level");
                $( ".eon-global-left" ).clone().appendTo(".eon-main-nav");

            }, // globalCloneMobile

// ** Extra for global "CLONE"

            globalCloneDestroy: function(el,elParent) {
                   
                $( ".eon-nav-top-level .eon-extra").remove();
                $( ".eon-main-nav .eon-global-left").remove();

            } // globalCloneDestroy


     }; // eonHeader.eonTabNav END


   


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// EON - Main navigation mobile and desktop
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     eonHeader.eonMainNav =  {

            mainInit: function() {
                  
                    // enquire.js
                    enquire.register("screen and (min-width:768px)", {
              
                            setup : function() {
                                
                                $('.eon-main-nav menu > li > menu').parent().addClass('has-sub');
                                eonHeader.eonMainNav.mainMobileClick();

                            },
                            match : function() {

                                eonHeader.eonMainNav.mainMobileDestroy();
                                eonHeader.eonMainNav.mainDesktopClose();
                                eonHeader.eonMainNav.mainDesktopClick();
                                
                            },
                            unmatch : function() {

                                eonHeader.eonMainNav.mainDesktopDestroy();
                                eonHeader.eonMainNav.mainMobileClick();

                            }

                    }, true); // True -> makes the "matched" work for ie8

            }, // mainInit


            mainDesktopClose: function() {
                   
                // Close menu
                $('.eon-main-nav .eon-btn-close > a').on('click',function () {
                    $(this).closest('.is-expanded').children('a').trigger('click');    
                    return false;
                });
       



                // Close menu
                $('.eon-header-login  .eon-btn-close, .eon-header-cart  .eon-btn-close, .eon-header-search  .eon-btn-close').on('click',function () {

                     var el = $(this);
                     var elTarget =  '.eon-tab-' + el.attr('data-parent') + '> a';
                    // console.log(elTarget);

                    $(elTarget).trigger('click');    

                    return false;
                });

            }, // mainDesktopClose


            mainDesktopClickReset: function(el,elParent) {
                
                    $('.eon-header-mobileAndExtras a').each(function () {

                        var el = $(this);
                        var elData =  el.attr('data-header-tab');
                        var elParent = $(this).closest('.eon-s-header');
                        var classParent = elData+'-is-expanded' ;

                        elParent.removeClass(classParent);

                    }); 

                $('.eon-header-mobileAndExtras li').removeClass('is-expanded');
                $('.eon-main-nav .is-expanded').removeClass('is-expanded');

            }, // mainDesktopClickReset


            mainDesktopClick: function() {

                    // Toggle menu (Desktop)
                    $('.eon-main-nav menu .has-sub > a').on('click',function () {
                       
                        var el          = $(this);
                        var elParent    = $(this).parent();
                        //var elEqual     = $('.eon-s-header .eon-main-nav .eon-nav-second-level > li + li');
                        var elEqual     = $('.eon-s-header .eon-main-nav .eon-nav-second-level > li');
                        var animatedParent  = $('.eon-s-header');


                    // if somthing is expanded
                    if(animatedParent.is('[class*="-is-expanded"]')) { 


                            // Check if main menu is expanded
                            if(animatedParent.hasClass('mainNav-is-expanded')){

                                    // Check if the clicked links es expanded or not
                                    if(elParent.hasClass('is-expanded')){                                   
                           
                                        animatedParent.animate({paddingBottom: 0,}, 450, function() {
                                            el.parent().removeClass('is-expanded');
                                            animatedParent.removeClass('mainNav-is-expanded');
                                            eonHeader.eonMainNav.mainDesktopClickReset();
                                        });

                                    } else {
                    
                                        
                                        // Remove class from all
                                        eonHeader.eonMainNav.mainDesktopClickReset();

                                        // Set class to this one
                                        el.parent().addClass('is-expanded');
                                       
                                        // Set variable with correct data
                                        //elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li + li');
                                        elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li');
                                        elEqual.css('height','auto').setAllToMaxHeight()﻿;

                                        // Set variable with correct data
                                        subMenuHeight = el.next('.eon-nav-second-level').outerHeight();

                                        // Animate menu
                                        animatedParent.animate({paddingBottom: subMenuHeight,}, 450);

                                    }

                            } else {


                                         // Remove class from all
                                        eonHeader.eonMainNav.mainDesktopClickReset();

                                        // Add classes
                                        el.parent().addClass('is-expanded');
                                        animatedParent.addClass('mainNav-is-expanded');
                                        
                                        // Set variable with correct data
                                        // elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li + li');
                                        elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li');
                                        elEqual.css('height','auto').setAllToMaxHeight()﻿;
                                        
                                        // Set variable with correct data
                                        subMenuHeight = el.next('.eon-nav-second-level').outerHeight();

                                        // Animate menu
                                        animatedParent.animate({paddingBottom: subMenuHeight,}, 450);

                            }

                    // else, if nothing is expanded
                    } else {
                        
                                        // Remove class from all
                                        eonHeader.eonMainNav.mainDesktopClickReset();

                                        // Add classes
                                        el.parent().addClass('is-expanded');
                                        animatedParent.addClass('mainNav-is-expanded');
                                        
                                        // Set variable with correct data
                                        //elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li + li');
                                        elEqual = $('.eon-s-header .eon-main-nav .is-expanded .eon-nav-second-level > li');
                                        elEqual.css('height','auto').setAllToMaxHeight()﻿;
                                        
                                        // Set variable with correct data
                                        subMenuHeight = el.next('.eon-nav-second-level').outerHeight();

                                        // Animate menu
                                        animatedParent.animate({paddingBottom: subMenuHeight,}, 450);

                    } // if [class*="-is-expanded"] END    




                       
                      
                        return false;
                    });

                    
            }, // mainDesktopClick


            mainDesktopDestroy: function(el,elParent) {

               // console.log('mainDesktopDestroy');
                $('.eon-main-nav menu a').off('click');
                $('.eon-main-nav .eon-btn-close > a').off('click');
                
                // Reset height
                // $('.eon-s-header .eon-main-nav .eon-nav-second-level > li + li').css('height','auto');
                $('.eon-s-header .eon-main-nav .eon-nav-second-level > li').css('height','auto');

                // Reset Margin
                $('.eon-s-header').css('paddingBottom','0');
                   
            }, // mainMobileDestroy

            mainMobileDestroy: function(el,elParent) {

               // console.log('mainMobileDestroy');
                $('.eon-main-nav menu a').off('click');
                   
            }, // mainMobileDestroy

            mainMobileClickReset: function(el,elParent) {
                   
                // Används ej?
                // console.log('mainMobileClickReset');
                

            }, // mainMobileClickReset

            mainMobileClick: function() {
           
                    // Toggle menu mobile
                    $('.eon-main-nav menu .has-sub > a').on('click',function () {
                        
                        var el = $(this);
                        var elParent = $(this).parent();

                        if(elParent.hasClass('is-expanded')){

                            // Remove class
                            el.parent().removeClass('is-expanded');

                        } else {
                            
                            // Add class
                            el.parent().addClass('is-expanded');

                        }
                        return false;
                    });

            } // mainMobileClick

     };

          


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// Load
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    $(window).on('load', function(){
      eonHeader.eonInit();


    });


/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

})(document,jQuery);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////// END
/////////////////////////////////////////////////////////////////////////////////////////////////////////


    

