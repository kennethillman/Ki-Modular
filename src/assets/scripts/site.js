(function(window, $) {
    // NEEDS Clean up!!!
    // Pluse put everything in functions so we can keep clean "ready,scroll,resize"
    //Prevent IE from throwing error if console not accessible...
    //var console;
    //typeof console==="undefined"&&(console={});typeof console.log==="undefined"&&(console.log=function(){});
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("chrome/") === -1) {
        if (ua.indexOf("safari/") !== -1 && ua.indexOf("windows") !== -1) {
            $('html').addClass('safari windows');
        }
    }
    //Used for debugging...
    function setTouch() {
        var t = getURLParameter("touch");
        if (t) {
            $("html").removeClass("no-touch").addClass("touch");
        }
    }
    setTouch();
    //Create some "Globals"
    //What site?
    var ishareOffsetRightW, isMW, isGMU;
    ishareOffsetRightW = $('body').hasClass('rw');
    isMW = $('body').hasClass('mw');
    isGMU = $('body').hasClass('gmu');
    //What kind of page?
    var isNewsArticlePage, isMigratedNewsArticlePage, isNewsNoticePage;
    isNewsArticlePage = $('body').hasClass('newsarticlepage');
    isMigratedNewsArticlePage = $('body').hasClass('migratednewsarticlepage');
    isNewsNoticePage = $('body').hasClass('newsnoticepage');
    var isNewsPage = false;
    if (isNewsArticlePage || isMigratedNewsArticlePage || isNewsNoticePage) {
        isNewsPage = true;
    }
    var highest = 0;
    var timer;

    function getURLParameter(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results === null) {
            return "";
        } else {
            return results[1];
        }
    }
    //Test for IE10...
    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        document.documentElement.className += ' msie-10';
    }

    function getContentGridCols() { //contentgrid momdule
        var pagewidth = $(window).innerWidth();
        var cols;
        if (pagewidth < 465) {
            cols = 1;
        } else if (pagewidth < 985) {
            cols = 2;
        } else if (pagewidth > 985) {
            if ($("#primary_content_area").hasClass("span-2")) {
                cols = 2;
            } else {
                cols = 3;
            }
        }
        return cols;
    }

    function responsiveSectionHeaderContent(elm, destination, origin) {
        var elmObj = $(elm);
        var destinationObj = $(destination);
        var originObj = $(origin);
        var pagewidth = $(window).innerWidth();
        if (pagewidth < 767) { //Narrow Screen
            if (elmObj.hasClass("moveable")) {
                elmObj.removeClass("moveable");
                elmObj.addClass("moved");
                moveElmInDOM(elmObj.parent(), destinationObj, 'before');
                elmObj.remove();
                $(elm).unwrap();
            }
        } else { //Wide Screen
            if (elmObj.hasClass("moved")) {
                elmObj.wrap("<div></div>");
                elmObj.removeClass("moved");
                elmObj.addClass("moveable");
                moveElmInDOM(elmObj.parent(), originObj, 'after');
            }
        }
    }
    /*** RW : content - grid ***/
    function renderContentGridLines() { // make this a plugin...
        var contentGridItems = $('.module.content-grid .item-body');
        var numberOfItems = contentGridItems.length;
        var numCols = getContentGridCols();
        contentGridItems.css("border-bottom", "1px solid #DDDDDD");
        if (numberOfItems % numCols === 0) {
            contentGridItems = contentGridItems.slice(-numCols);
        } else {
            contentGridItems = contentGridItems.slice(-(numberOfItems % numCols));
        }
        contentGridItems.css("border-bottom", "none");
        /* ie8 content-grid fix - adding classes since no suport for nth-child... */
        if ($("html").hasClass("msie-8")) {
            $('.module.content-grid .item').each(function(i) {
                i++;
                if (!(i % 3) && (i)) {
                    $(this).addClass("third");
                }
                if (!(i % 2) && (i)) {
                    $(this).addClass("second");
                }
            });
        }
    }

    function renderGridList() { // make this a plugin...
        var contentGridItems = $('.module.gridlist .item-body');
        var numberOfItems = contentGridItems.length;
        var numCols = getContentGridCols() + 1;
        //contentGridItems.css("border-bottom", "1px solid #DDDDDD");
        if (numberOfItems % numCols === 0) {
            contentGridItems = contentGridItems.slice(-numCols);
        } else {
            contentGridItems = contentGridItems.slice(-(numberOfItems % numCols));
        }
        contentGridItems.css("border-bottom", "none");
        /* ie8 content-grid fix - adding classes since no suport for nth-child... */
        if ($("html").hasClass("msie-8")) {
            $('.module.content-grid .item').each(function(i) {
                i++;
                if (!(i % 3) && (i)) {
                    $(this).addClass("third");
                }
                if (!(i % 2) && (i)) {
                    $(this).addClass("second");
                }
            });
        }
    }
    $(window).load(function() {
        SetEqualHeights();
        textChangeNav();
        $(window).trigger('resize');
        $('.mw .editorial-pod .paginator').addClass('-show');

    });
    $(document).ready(function() {
        textChangeNav();
        /************************************************************/
        /** Column labels *******************************************/
        /************************************************************/
        function initColumnLabels() {
            var column3HasContent = $('#secondary_content_area *.module:not(.module.headline)').length > 0;
            var column4HasContent = $('#tertiary_content_area *.module:not(.module.headline)').length > 0;
            var pageHasQuaternaryContent = $('#quaternary_content_area').length > 0;
            // if hgroup is empty add class 'empty' to hide the element for small screens...
            $('.module.headline > hgroup').each(function(i) {
                if ($(this).html() === "") {
                    $(this).parent().addClass("empty");
                }
            });
            if (isNewsPage) {
                return;
            }
            if (!column3HasContent) {
                hideColumnLabel("#secondary_content_area");
            }
            if (!column4HasContent) {
                hideColumnLabel("#tertiary_content_area");
            }
            if (pageHasQuaternaryContent) {
                $("#secondary_content_area .module.headline").css({
                    'margin-left': '0',
                    'padding-left': '0'
                });
            }
        }

        function hideColumnLabel(col) {
            //$(col + ' .module.headline h2').parent().css("border-bottom", "1px solid transparent");
            $(col + ' .module.headline h2').text("");
        }
        initColumnLabels();

        function removeColumnLabels() {
            if (!isMW) {
                $("#secondary_content_area .module.headline").remove();
                $("#tertiary_content_area .module.headline").remove();
            }
        }
        removeColumnLabels();
        /************************************************************/
        /** Socialised iframe loading *******************************/
        /************************************************************/
        var share = $('.scaffold-wrapper.share'),
            socialised = {},
            win = $(window),
            updateShare, updateTimeout;
        updateShare = function() {
            var moduleHeight = $('.module.tab-control').height() * 2;
            var windowScrollTop = win.scrollTop() + moduleHeight, // px to load "social buttons" before they get into view...
                windowScrollLeft = win.scrollLeft(),
                windowScrollRight = windowScrollLeft + win.width(),
                windowScrollBottom = windowScrollTop + win.height();
            for (var i = 0; i < share.length; i++) {
                if (socialised[i]) {
                    continue;
                }
                var sh = $(share[i]),
                    shareOffsetTop = sh.offset().top,
                    shareOffsetLeft = sh.offset().left,
                    shareOffsetRight = shareOffsetLeft + sh.width(),
                    shareOffsetBottom = shareOffsetTop + sh.height();
                // vertial point inside viewport
                if (shareOffsetTop >= windowScrollTop && shareOffsetTop <= windowScrollBottom) {
                    if ($('body').hasClass('startpage')) {
                        if ($(".module.tab-control").length) {
                            $(".instagram-click").click();
                            //Instagram.loadInstagram();
                            Twitter.loadTwitter();
                        }
                        socialised[i] = true;
                        Socialite.load(share[i]);
                        Socialite.setup({
                            facebook: {
                                lang: 'sv_SE',
                                appId: 384719778347463
                            }
                        });
                    } else {
                        socialised[i] = true;
                        Socialite.load(share[i]);
                        Socialite.setup({
                            facebook: {
                                lang: 'sv_SE',
                                appId: 384719778347463
                            }
                        });
                    }



                }
            }
        };



        onUpdate = function() {
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
            updateTimeout = setTimeout(updateShare, 100);
        };
        win.on('resize', onUpdate).on('scroll', onUpdate);
        setTimeout(updateShare, 100);





        /************************************************************/
        /** Helper tests (Scope check) ******************************/
        /************************************************************/
        //FM.Alert('MSG from index, function in helper!');
        //FM.Console('MSG from index, function in helper!');
        //FM.fireFunctionFromFM(alerts);
        //function alerts() {
        //alert('Called from index.js, fired from helper, fired function livs in index.js');
        //}
        /************************************************************/
        /** Enable JavaScript enhanced modules **********************/
        /************************************************************/
        if (isMW) {
            $('.stamplist').stampList();
            $('.related-content,.news-notices').relatedContent();
            $('.file-listing').fileListing();
            $(".rwd-truncate-150").rwdTruncate();
            renderContentGridLines(); // make this a plugin...
            renderGridList();
        } else if (ishareOffsetRightW) {
            $('.related-content').relatedContent();
        }
        $('.sticky-anchor').stickySubMenu();
        /************************************************************/
        /** BREADCRUMBS *********************************************/
        /************************************************************/
        var hashareOffsetBottomreadCrumbs = ($(".scaffold-wrapper.breadcrumbs li").length > 1) ? true : false;

        function initBreadcrumbs() {
            /* Remove unessesary sublinks... Should be done backend, but whatever... -DT */
            //$("#breadcrumbs .dropdown .dropdown").remove();
            /* remove duplicate links, to prevent active links from being in the dropdown */
            $("#breadcrumbs > ul > li").each(function() {
                var textvalue = $(this).find(' > a').text();
                if (!textvalue) {
                    textvalue = $(this).find(' > span').text();
                }
                $(this).find('ul li:only-child').each(function() {
                    $(this).parent().parent().remove();
                });
                $(this).find('li > a').each(function() {
                    if ($(this).text() === textvalue) {
                        $(this).addClass('selected');
                    }
                });
            });
            /* If there is no breadcrumbs, hide the area...  -DT */
            bcenabled = ($(".scaffold-wrapper.breadcrumbs a").length) ? true : false;
            if (!bcenabled) {
                $(".scaffold-wrapper.breadcrumbs").hide();
                if ($('body').hasClass('mw')) { //compensate page top padding in MW site for hidden breadcrumbs...
                    $(".scaffold.content").css({
                        "padding-top": "25px"
                    });
                }
            } else {
                $("#breadcrumbs > ul > li").each(function(i, elm) {
                    if ($(this).has("ul").length) {
                        $(elm).children("a, span").after("<a href='' class='dropdownlink'></a>");
                        $(elm).children("a:last").click(function(event) {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active");
                                $('#breadcrumbs > ul > li').removeClass("active-root");
                                $(this).siblings(".dropdown").hide();
                                return false;
                            }
                            $("#breadcrumbs .active").siblings(".dropdown").hide();
                            $("#breadcrumbs .active").removeClass("active");
                            $('#breadcrumbs .active-root').removeClass("active-root");
                            $(this).siblings(".dropdown").show();
                            $(this).addClass("active");
                            $(this).parent().addClass("active-root");
                            event.preventDefault();
                        });
                    }
                }),
                $("#breadcrumbs li.root").hover(function() {
                    $(this).find("a.dropdownlink").toggleClass("hover");
                });
                $("#breadcrumbs .dropdownlink").click(function(event) {
                    event.stopPropagation();
                });
            }
            // Add #breadcrumbs last-child selector for IE 7-8
            $("html.msie-lt-9 #breadcrumbs .root:last-child").addClass("last-child");
        }
        //initBreadcrumbs();
        // ***** iPhone Safari rotating from portrait to landscape bug.
        // ***** REMOVE?
        function handleMobileSafariScreenRotation() {
            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                var viewportmeta = document.querySelector('meta[name="viewport"]');
                if (viewportmeta) {
                    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
                    document.body.addEventListener('gesturestart', function() {
                        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
                    }, false);
                }
            }
        }
        handleMobileSafariScreenRotation();
        // EDIT MODE - EPISERVER - Automaticly update the content-grid row heights on content changes in edit mode
        // $(".module.content-grid").bind("DOMSubtreeModified", function () {   // !!! Craching firefox !!!
        // equalItemHeights();  
        //});
        //DynamicTextEP
        var sequence;

        //var sequence = $(".sequence").sequence().data("sequence");

        function bindEventHandlers() {
            // ***** ACCORDION
            $(".module.accordion h2, .module.accordion h3").click(function() {
                $(this).parent().toggleClass("active", 500).siblings().removeClass("active", 500);
            });
            // ***** Search result search-field reset
            $(".module.search .form .text .clear").click(function(e) {
                e.preventDefault();
                $(this).siblings("input").val("");
            });
            //Quick Search in page header...
            $("#quick_search_query").on("keydown", function(e) {
                //e.preventDefault();
                $(this).css("color", "rgba(40, 40, 40, 1.0)");
            });
            // ***** EP VIDEO PLAY - Resize the EP and start the associated video
            $(".module.ep-video .play").click(function(e) {
                var sequence = $(this).parents(".sequence").data("sequence");
                var el = $(this);
                var offsetPosition = el.parent().offset();
                var topPosition = offsetPosition.top - 52;
                sequence.isPaused = true;
                sequence.isHardPaused = true;
                if (!hashareOffsetBottomreadCrumbs) {} else {
                    if (ishareOffsetRightW) {
                        topPosition += 36;
                    }
                }
                var rightPosition = 30;
                el.parents(".inner-wrapper").addClass("video-mode");
                setTimeout(function() {
                    var videoId = el.parent().attr("data-video-id");
                    var videoUrl = "//www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1&showinfo=0&autohide=1&modestbranding=1";
                    el.parent().prepend("<div class='iframe-wrapper'><iframe src=" + videoUrl + " height='100%' width='100%' > </iframe></div>");
                    $("body").prepend(" <div class='scaffold-wrapper'><div class='scaffold relative'><a href='#' class='stop-video' style='top:" + topPosition + "px; right:" + rightPosition + "px;'></a></div></div>");
                }, 1000);
                $(".overlays .backdrop").fadeIn('slow');
                $(".inner-wrapper").removeClass("video-mode-removed");
                $("body").addClass("ep-video-show");
                return false;
            });
            //***** SITE QUICK SEARCH 
            $("#quick_search_button").click(function(e) {
                e.preventDefault();
                var q = $("#quick_search_query").val();
                var u = $(this).attr("data-search-page");
                var p = $(this).attr("data-search-params");
                if (q && q.length !== 0) {
                    u = u + p.replace('{q}', encodeURIComponent(q));
                }
                window.location = u;
                return false;
            });
            $("#quick_search_query").keydown(function(e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    $("#quick_search_button").click();
                }
            });
            //***** STANDARD VIDEO PLAY (gmu)
            $(".module.stdvideo .play").click(function() {
                var el = $(this);
                //var height = '460';
                //var width = '900'; pass as param?
                el.parents(".inner-wrapper").addClass("video-mode");
                setTimeout(function() {
                    var videoId = el.parent().attr("data-video-id");
                    var videoUrl = "//www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1&showinfo=0&autohide=1&modestbranding=1";
                    el.parent().prepend("<iframe src=" + videoUrl + " height='460' width='900' > </iframe>");
                }, 1000);
                $(".overlays .backdrop").fadeIn('slow');
                $(".inner-wrapper").removeClass("video-mode-removed");
                $("body").addClass("ep-video-show"); // ??
                return false;
            });
            // ***** EP VIDEO STOP - Stop the associated video and restore the EP's dimensions
            $(".ep-video-show .stop-video").live("click", function() {

                var sequence = $(".sequence").data("sequence");
                sequence.isPaused = false;
                sequence.isHardPaused = false;
                sequence.startAutoPlay();
                var el = $(this);
                el.addClass('clicked');
                el.parent().parent().remove();
                $(".inner-wrapper").removeClass("video-mode").addClass("video-mode-removed");
                $(".overlays .backdrop").fadeOut();
                $("body").removeClass("ep-video-show");
                $(".stop-video").remove();
                $(".ep-video .iframe-wrapper").remove();
                return false;
            }); // .stop-video END
            $(".ep-video-show .overlays .backdrop").live("click", function() {
                // $("body").addClass('backdrop-clicked');
                // $(".stop-video").trigger('click');
                // $(".ep-video-show .editorial-pod").unbind('click');
                // $(".ep-video-show .overlays .backdrop").unbind('click');
                return false;
            }); // backdrop click END
            $(".ep-video-show .editorial-pod").live("click", function() {
                $(".stop-video").trigger('click');
                $(".ep-video-show .editorial-pod").unbind('click');
                $(".ep-video-show .overlays .backdrop").unbind('click');
                return false;
            }); // editorial-pod click END
            // ***** TAB CONTROL TODO: Extend jQuery instead
            $(".tab-control .tabs a").click(function(e) {
                e.preventDefault();
                var el = $(this);
                el.parent().addClass("active").siblings().removeClass("active");
                el.parents(".tab-control").find(".pages > div:nth(" + $(this).parent().index() + ")").addClass("active").siblings().removeClass("active");
                // ** Instagram
                if (el.hasClass('instagram-click')) {
                    Instagram.loadInstagram();
                }
                // ** Twitter
                if (el.hasClass('twitter-click')) {
                    Twitter.loadTwitter();
                }
            });
            $(".tab-control .tabs li:first, .tab-control .pages > div:first").addClass("active"); // initial state
            // ***** SHOW MORE
            $(".show-more a").click(function(e) {
                e.preventDefault();
                $(this).parent().addClass("active");
                //            .hide()
                //            .siblings(".bodyextra").show("blind", 500);
            });
            $('.hide-more a').click(function(e) {
                e.preventDefault(e);
                $('.hide-more, .bodyextra').css("margin-top", "10px");
                $('.show-more.active').removeClass('active');
            });
            // ***** SHOW MORE amended.
            $('.ab-bodyextra').hide();
            $('.ab-show-more').css('visibility', 'visible');
            $('.ab-hide-more').show();
            $('.ab-show-more a').click(function(e) {
                e.preventDefault(e);
                $(this).parent().next('.ab-bodyextra').slideDown(175);
                if ($.browser.msie && parseInt($.browser.version) <= 8) {
                    $(this).parent().css('visibility', 'hidden');
                } else {
                    $(this).parent().animate({
                        'opacity': 0
                    }, 150);
                }
                $(this).css('cursor', 'default');
            });
            $('.ab-hide-more a').click(function(e) {
                e.preventDefault(e);
                $(this).parent().parent().slideUp(175);
                if ($.browser.msie && parseInt($.browser.version) <= 8) {
                    $(this).parent().parent().prev('.ab-show-more').css('visibility', 'visible');
                } else {
                    $(this).parent().parent().prev('.ab-show-more').animate({
                        'opacity': 1
                    }, 250);
                }
                $(this).parent().parent().prev('.ab-show-more').children().css('cursor', 'pointer');
            });
        }
        bindEventHandlers();
        // ***** ILITEBOX - START...
        // ilightboxes init function ...
        function initIlightBoxes() {
            var pagewidth = $(window).innerWidth();
            if ($("html").hasClass("touch") && (pagewidth < 768)) {
                $('.ilightbox').removeClass('ilightbox');
                return;
            }
            var activeSkin;
            if ($("body").hasClass("mw")) {
                activeSkin = 'mw';
            } else {
                activeSkin = 'rw';
            }
            var globalConfigObj = {
                skin: activeSkin,
                maxScale: 1.0,
                path: 'horizontal',
                controls: {
                    fullscreen: false,
                    thumbnail: false
                }
            };
            // Site feedback ...
            $('.feedback-ilightbox').iLightBox({
                skin: activeSkin,
                type: 'inline',
                innerToolbar: true,
                controls: {
                    fullscreen: false
                },
                callback: {
                    onHide: function() {
                        $('.feedback-form-wrapper').removeClass('expanded');
                    }
                }
            });
            // ... Site feedback
            // image-width-caption ...
            $('.image-width-caption .ilightbox').each(function() {
                var imgCaption = $(this).siblings('figcaption').find('.text').text();
                imgCaption += ' ';
                imgCaption += $(this).siblings('figcaption').find('.photographer').text();
                $(this).attr('data-caption', imgCaption);
                $(this).addClass('data-caption', imgCaption);
                $(this).bind('click', function(event) {
                    event.preventDefault();
                    $(this).iLightBox([{
                        url: $(this).attr('href'),
                        caption: imgCaption
                    }], globalConfigObj);
                });
            });
            // ... image-width-caption
            // contact-item ...
            $('.contact-item .ilightbox').each(function() {
                //Set Caption...
                var imgCaption = $(this).parent().siblings('.information').children('h2').text();
                $(this).attr('data-caption', imgCaption);
                //Set Temporary image src...
                var imgHighres = $(this).parent().siblings('.information').children('.links').children('.high-res').attr('href');
                $(this).attr('href', imgHighres);
                $(this).bind('click', function(event) {
                    event.preventDefault();
                    $(this).iLightBox([{
                        url: $(this).attr('href'),
                        caption: imgCaption
                    }], globalConfigObj);
                });
            });
            // ... contact-item
            // imagerotator ...
            $('.imagerotator').each(function(i) {
                var ilightboxObj = [];
                var index;
                $(this).find('.ilightbox').each(function(index) {
                    index = index;
                    var imgCaption = $(this).siblings('figcaption').find('.text').text();
                    imgCaption += ' ';
                    imgCaption += $(this).siblings('figcaption').find('.photographer').text();
                    var obj = {
                        url: $(this).attr('href'),
                        caption: imgCaption
                    };
                    ilightboxObj.push(obj);
                    $(this).bind('click', function(event) {
                        event.preventDefault();
                        $(this).iLightBox(ilightboxObj, {
                            skin: activeSkin,
                            //maxScale: 1.0,
                            path: 'horizontal',
                            //innerToolbar: true,
                            controls: {
                                fullscreen: false,
                                thumbnail: false,
                                arrows: true
                            },
                            startFrom: index
                        });
                    });
                });
            });
            // ... imagerotator
            // thumbnailgallery ...
            $('.thumbnailgallery').each(function(i) {
                var ilightboxObj = [];
                var index;
                $(this).find('.ilightbox').each(function(index) {
                    index = index;
                    var obj = {
                        url: $(this).attr('href')
                    };
                    ilightboxObj.push(obj);
                    $(this).bind('click', function(event) {
                        event.preventDefault();
                        $(this).iLightBox(ilightboxObj, {
                            skin: activeSkin,
                            //maxScale: 1.0,
                            path: 'horizontal',
                            controls: {
                                fullscreen: false,
                                thumbnail: false,
                                arrows: true
                            },
                            startFrom: index
                        });
                    });
                });
            });
            // ... thumbnailgallery
        }
        initIlightBoxes();
        // ***** ILITEBOX - END */
        // ***** LITEBOX - SHOW
        $("[data-litebox]").click(function(e) {
            var pagewidth = $(window).innerWidth();
            if ($("html").hasClass("touch") && (pagewidth < 768)) {
                return;
            }
            e.preventDefault();
            var litebox = $(this).attr("data-litebox");
            if ($(this).parents().hasClass('gmu-weeks')) {
                $("body").addClass("ep-video-show");
                return false;
            } else {
                $(".overlays ." + litebox).addClass("active");
                $(".overlays .backdrop").show();
            }
        });
        $(".overlays .close").on("mousedown", function(event) {
            $(this).addClass("active");
        });
        $(".overlays .close").on("mouseup", function(event) {
            $(this).removeClass("active");
        });
        // ***** LITEBOX / OVERLAY - HIDE
        $(".overlays .close, .overlays .backdrop").click(function(e) {
            e.preventDefault();
            $(".ep-video-show .stop-video").trigger('click');
            $(".overlays .backdrop").hide();
            $(".overlays .litebox.active").removeClass("active");
            $("body").removeClass("ep-video-show");
        });
        // ***********************************
        // ***** SEQUENCE - GENERAL - INITIATE
        //************************************
        var GlobalSequenceObject; //TODO: handle if more than one on a page...
        function initSequence() {

            $(".sequence").each(function(index) {
                var slideShow = 'slideShow' + index;
                var self = this;
                var html = $('html');
                var body = $('body');
                var activeFrame;
                var initEpHeight;
                var getTextHeight;
                var imageHeight;
                var contentWidth = $('.scaffold.content').width();
                var epAutoPlay = $(this).data('epAutoplay');
                var epAutoPlayDelay = $(this).data('epDelay');
                if (!epAutoPlay) {
                    epAutoPlay = false;
                }
                if (!epAutoPlayDelay) {
                    epAutoPlayDelay = 3000;
                }
                // TOUCH YES OR NO
                if (html.hasClass('touch')) {
                    // YES
                    // AUTOPLAY YES OR NO
                    var swipeConfig = {
                        left: "next",
                        right: "prev",
                        up: false,
                        down: false
                    };
                    var options;
                    if (epAutoPlay === true) {
                        options = {
                            autoPlay: true,
                            autoPlayDelay: epAutoPlayDelay,
                            pauseOnHover: false,
                            fallback: {
                                theme: "slide",
                                speed: 0
                            },
                            swipeEvents: swipeConfig
                        };
                        // YES
                        slideShow = $(this).sequence(options).data("sequence");
                        //GlobalSequenceObject = sequence;
                    } else {
                        options = {
                            autoPlay: false,
                            fallback: {
                                theme: "slide",
                                speed: 0
                            },
                            swipeEvents: swipeConfig
                        };
                        slideShow = $(this).sequence(options).data("sequence");
                        //GlobalSequenceObject = sequence;
                    }
                } else {
                    // NO
                    // AUTOPLAY YES OR NO
                    if (epAutoPlay === true) {
                        // YES
                        slideShow = $(this).sequence({
                            autoPlay: true,
                            autoPlayDelay: epAutoPlayDelay,
                            pauseOnHover: true,
                            fallback: {
                                theme: "slide",
                                speed: 0
                            }
                        }).data("sequence");
                        //GlobalSequenceObject = sequence;
                    } else {
                        // NO
                        slideShow = $(this).sequence({
                            autoPlay: false,
                            fallback: {
                                theme: "slide",
                                speed: 0
                            }
                        }).data("sequence");
                        //GlobalSequenceObject = sequence;
                    }
                }
                if (contentWidth === 960) {
                    imageHeight = 398;
                } else if (contentWidth === 720) {
                    imageHeight = 311;
                } else if (contentWidth === 440) {
                    imageHeight = 190;
                } else if (contentWidth === 320) {
                    imageHeight = 138;
                }
                $(this).find(".scaffold").has(".arrow").addClass("hasArrow");
                $(this).find("> ul li").each(function(i) {
                    i++;
                    $(this).addClass('frame').addClass('frame-' + i);
                });
                $(this).find("> ul li:first").addClass('current');
                slideShow.afterLoaded = function() {
                    var frameCount = this.numberOfFrames;
                    var paginationList = $(self).find(".pagination.clone");
                    /* INIT EP - START  */
                    if (body.hasClass('mw') && !$('body').hasClass('startpage') && $(self).parent().hasClass('editorial-pod')) {
                        getTextHeight = $(self).find('ul li:first-child').find('.image-info').height();
                        var initEpHeight = getTextHeight + imageHeight;
                        //$('#EditorialPod').animate({
                        //    height: initEpHeight
                        //}, 2000);
                    }
                    /* INIT EP - END */
                    if (frameCount > 1) {
                        if (paginationList.length < 2) {
                            var paginationItem = paginationList.find("li");
                            for (var i = 1; i < frameCount; i++) {
                                paginationItem.clone().appendTo(paginationList);
                            }
                            paginationItem.children(":first-child").addClass("active");
                        }
                    } else {
                        $(self).find(".paginator").remove();
                    }
                };
                slideShow.beforeCurrentFrameAnimatesOut = function() {
                    var paginationList = $(self).find(".pagination");
                    paginationList.find(".active").removeClass("active");
                    paginationList.children(":nth-child(" + this.nextFrameID + ")").children().addClass("active");
                };
                /* - - - - - - - - - - - - - */
                /* - - - - - - - - - - - - - */
                /*

                    ONLY MW
                    NOT STARPAGE
                    ONLY EP (Not other)

                    * INIT
                    
                    WINDOW SIZE
                        - * 1024 (image height + text holder) 
                        - * 768 (image height + text holder) 
                        - * mobile (dynamic height)

                    DIRECTION
                        - * Right 
                        - * Left
                            -- LAST
                            -- FIRST

                    IE 8 (check height, in css it was 10px less)
                    * ARROWS - FIX top postion 1024, 780, 480, 320
                    $.browser.version.slice(0, 1) <= "9"
                */
                var lastFrame = -1;
                if (!$.browser.msie && body.hasClass('mw') && !$('body').hasClass('startpage') && $(self).parent().hasClass('editorial-pod')) {
                    slideShow.beforeNextFrameAnimatesIn = function() {
                        //console.log("BEFORE_NEXT_FRAME_ANIMATES_IN");
                        if (!slideShow.currentFrame) {
                            return;
                        }
                        var direction = slideShow.direction;
                        var frame = slideShow.nextFrameID;
                        var frameCount = slideShow.numberOfFrames;
                        var imageInfo;
                        var getTextHeight;
                        if (frame === lastFrame) {
                            return;
                        }
                        lastFrame = frame;
                        contentWidth = $('.scaffold.content').width();
                        if (contentWidth === 960) {
                            imageHeight = 398;
                        } else if (contentWidth === 720) {
                            imageHeight = 311;
                        } else if (contentWidth === 440) {
                            imageHeight = 190;
                        } else if (contentWidth === 320) {
                            imageHeight = 138;
                        }
                        var newEPHeight;
                        if (direction === 1 && contentWidth >= 320) {
                            //console.log("A");
                            imageInfo = $(self).find('li').eq(frame - 1).find('.image-info');
                            getTextHeight = imageInfo.height();
                            newEPHeight = imageHeight + getTextHeight;
                            $('#EditorialPod').animate({
                                height: newEPHeight
                            }, 400);
                        } else if (contentWidth >= 320) {
                            if (frame === frameCount) {
                                //console.log("B");
                                getTextHeight = $(self).find("li:last-child").find('.image-info').height();
                                newEPHeight = imageHeight + getTextHeight;
                                $('#EditorialPod').animate({
                                    height: newEPHeight
                                }, 400);
                            } else {
                                //console.log("C");
                                getTextHeight = $(self).find('li').eq(frame - 1).find('.image-info').height();
                                newEPHeight = imageHeight + getTextHeight;
                                $('#EditorialPod').animate({
                                    height: newEPHeight
                                }, 400);
                            }
                        }
                    }; // beforeNextFrameAnimatesIn - END
                } else if ($.browser.msie && body.hasClass('mw') && !$('body').hasClass('startpage') && $(self).parent().hasClass('editorial-pod')) {
                    slideShow.afterNextFrameAnimatesIn = function() {
                        //console.log("AFTER_NEXT_FRAME_ANIMATES_IN");
                        if (!slideShow.currentFrame) {
                            return;
                        }
                        var direction = slideShow.direction;
                        var frame = slideShow.nextFrameID;
                        var frameCount = slideShow.numberOfFrames;
                        if (frame === lastFrame) {
                            return;
                        }
                        lastFrame = frame;
                        contentWidth = $('.scaffold.content').width();
                        if (contentWidth === 960) {
                            imageHeight = 398;
                        } else if (contentWidth === 720) {
                            imageHeight = 311;
                        } else if (contentWidth === 440) {
                            imageHeight = 190;
                        } else if (contentWidth === 320) {
                            imageHeight = 138;
                        }
                        var newEPHeight;
                        var imageInfo;
                        if (direction === 1 && contentWidth >= 320) {
                            //console.log("D");
                            imageInfo = $(self).find('li').eq(frame - 1).find('.image-info');
                            getTextHeight = imageInfo.height();
                            newEPHeight = imageHeight + getTextHeight;
                            $('#EditorialPod').animate({
                                height: newEPHeight
                            }, 400);
                            return false;
                        } else if (contentWidth >= 320) {
                            if (frame === frameCount) {
                                //console.log("E");
                                imageInfo = $(self).find("li").eq(frame - 1).find('.image-info');
                                getTextHeight = imageInfo.height();
                                newEPHeight = imageHeight + getTextHeight;
                                $('#EditorialPod').animate({
                                    height: newEPHeight
                                }, 400);
                            } else {
                                //console.log("F");
                                getTextHeight = $(self).find('li').eq(frame - 1).find('.image-info').height();
                                newEPHeight = imageHeight + getTextHeight;
                                $('#EditorialPod').animate({
                                    height: newEPHeight
                                }, 400);
                                getTextHeight = $(self).find('li').eq(frame - 1).find('.image-info').height();
                                newEPHeight = imageHeight + getTextHeight;
                                $('#EditorialPod').animate({
                                    height: newEPHeight
                                }, 400);
                            }
                        }
                    }; // afterNextFrameAnimatesIn - END
                } else if ($.browser.msie) {
                    //IE8, IE9 hack to fix text rendering in dynamic EP...
                    if ($('html').hasClass('msie-8') || $('html').hasClass('msie-9')) {
                        slideShow.afterNextFrameAnimatesIn = function() {
                            $(window).trigger('resize');
                        }
                    }
                }
                /* - - - - - - - - - - - - - */
                /* - - - - - - - - - - - - - */
            });
            if ($(".sequence .paginator a").length) {
                $(".sequence .paginator a").live("click", function(evt) {
                    evt.preventDefault();
                    var sequence = $(this).parents(".sequence").data("sequence");
                    sequence.currFrameID = $(this).parent().index();
                    sequence.nextFrameID = $(this).parent().index() + 1;
                    if ($(this).hasClass("prev")) {
                        sequence.prev();
                        return;
                    }
                    if ($(this).hasClass("next")) {
                        sequence.next();
                        return;
                    }
                    sequence.goTo(sequence.nextFrameID);
                });
            }
            // ***** SEQUENCE - MW - Options - - */
            var optionsMWAutoplay = {
                autoPlay: true,
                animateStartingFrameIn: true
            };
        }
        initSequence();
        /************************************************************/
        /** INIT FUNCTIONS ******************************************/
        /************************************************************/
        var isiPad = navigator.userAgent.match(/iPad/i) !== null;
        if (isiPad) {
            $('.ep-world').parent().parent().parent().addClass("hide");
        }
        /************************************************************/
        /** INIT FUNCTIONS ******************************************/
        /************************************************************/
        //Extending jquery with space selector, tests if element contains whitespace only...
        jQuery.expr[':'].space = function(elem) {
            var $elem = jQuery(elem);
            return !$elem.children().length && !$elem.text().match(/\S/);
        };
        // Clean up empty divs generated by EPiServer - 'cause they cause unwanted dividers to appear.
        // Preferably fix this backend... In the meantime we rely on this ugly hack... -d.tael
        function removeEmptyElm(where, what) { //"where" is the element to search in, "what" is the element(s) to remove if empty
            var searchPattern = where + " " + what;
            $(searchPattern).each(function(index) {
                if ($(this).is(':space')) {
                    $(this).remove();
                }
            });
        }
        removeEmptyElm("#secondary_content_area", "div");
        removeEmptyElm("#tertiary_content_area", "div");
        toggleTheme();
        DataProgress();
        //Test to see if stamplist is related to the Section Header...
        var stamplists = $(".module.stamplist");
        stamplists.each(function(i, e) {
            if ($(this).parent("div").prev("div").children("section").first().hasClass("section-header-box")) {
                $(this).addClass("moveable");
            }
        });
    }); /* ready END*/
    /************************************************************/
    /** WINDOW LOAD *********************************************/
    /************************************************************/
    $(window).load(function() {});
    /*---------------------------------------------*/
    /*################# Scroll ####################*/
    /*---------------------------------------------*/
    $(window).scroll(function() {});
    /*---------------------------------------------*/
    /*################# RESIZE ####################*/
    /*---------------------------------------------*/
    //$(window).resize(function () {});
    /* Plugin "Debouncing" , for WPO (Web Perfomance Optimazation) */
    $(window).smartresize(function() {
        SetEqualHeights();
        textChangeNav();
        navTight();
        //EPheightAdjust();
        EPheightAdjustFireOnce();
        //FM helper object
        FM.helper.setEqualHeight('.mw .equal-col', 767);
        responsiveSectionHeaderContent(".module.section-header-box", "#primary_content_area article.module", "#tertiary_content_area .module.headline");
        if ($('body').hasClass('mw')) {
            renderContentGridLines();
            //$(".rwd-truncate-150").rwdTruncate();
        }
    });
    /*---------------------------------------------*/
    /* ################ FUNCTIONS ################## */
    /*---------------------------------------------*/
    function SetEqualHeights() {
        if (isNewsPage) {
            FM.helper.setEqualHeight('.mw .equal-headline hgroup', 479);
            //    $('#secondary_content_area .equal-headline').remove();
            //    $('#tertiary_content_area .equal-headline').remove();
            //    $('#secondary_content_area .module').first().css(
            //        {
            //            "border-top": "1px solid transparent",
            //            "margin-top": "0",
            //            "padding-top": "0",
            //            "margin-bottom": "20px"
            //        }
            //    );
            //    $('#tertiary_content_area .module').first().css(
            //        {
            //            "border-top": "1px solid transparent",
            //            "margin-top": "0",
            //            "padding-top": "0",
            //            "margin-bottom": "20px"
            //        }
            //    );
        }
        FM.helper.setEqualHeight('.mw .equal-headline', 479);
        FM.helper.setEqualHeight('.content-grid .item-body', 479, 'three-editorial-teasers');
        FM.helper.setEqualHeight('.mw .equal-height-start-1', 479);
        FM.helper.setEqualHeight('.mw .equal-height-start-2', 479);
        FM.helper.setEqualHeight('.mw .equal-height-blog', 479);
        FM.helper.setEqualHeight('.mw .equal-height-blog', 479);
        FM.helper.setEqualHeight('.mw .equal-col', 767);
    }

    function toggleTheme() {
        $('#mw').off().on('click', function() {
            $("body").addClass('mw').removeClass('rw');
            $('link[href*="Recruitment?"]').before('<link href="/Styles/Corporate?v=123" rel="stylesheet">').remove();
            $('link[href*="Recruitment/S"]').before('<link href="/Templates/Corporate/Styles/index.css" rel="stylesheet">').remove();
        });
        $('#rw').off().on('click', function() {
            $("body").addClass('rw').removeClass('mw');
            $('link[href*="Corporate?"]').before('<link href="/Styles/Recruitment?v=123" rel="stylesheet">').remove();
            $('link[href*="Corporate/S"]').before('<link href="/Templates/Recruitment/Styles/index.css" rel="stylesheet">').remove();
        });
    }
    var epfire1024 = false;
    var epfire768 = false;

    function EPheightAdjustFireOnce() {
        if (ishareOffsetRightW) {
            return;
        }
        var contentWidth = $('.scaffold.content').width();
        if (contentWidth === 960 && !epfire1024) {
            epfire1024 = true;
            epfire768 = false;
            EPheightAdjust();
        } else if (contentWidth === 720 && !epfire768) {
            epfire1024 = false;
            epfire768 = true;
            EPheightAdjust();
        } else if (contentWidth < 720) {
            epfire1024 = false;
            epfire768 = false;
            EPheightAdjust();
        }
    }

    function EPheightAdjust() {
        var editorialPod = $('#EditorialPod');
        var contentWidth = $('.scaffold.content').width();
        var getTextHeight;
        var resizeEpHeight;
        var imageHeight;
        if (!$('#EditorialPod').hasClass('one-image') && $('body').hasClass('has-ep')) {
            var sequence = editorialPod.data('sequence');
            var getDirection;
            if (!sequence) {
                return;
            } else {
                getDirection = sequence.direction;
            }
            var frame = sequence.nextFrameID;
            var frameCount = sequence.numberOfFrames;
            if (!sequence.currentFrame) {
                getTextHeight = $('#EditorialPod').find('ul li:first-child').find('.image-info').height();
                if (contentWidth === 960 || contentWidth === 720) {
                    if (contentWidth === 960) {
                        imageHeight = 398;
                    } else if (contentWidth === 720) {
                        imageHeight = 311;
                    }
                    initEpHeight = getTextHeight + imageHeight;
                    editorialPod.css('height', initEpHeight);
                } else {
                    editorialPod.removeAttr("style");
                }
                return;
            }
            if (getDirection === 1) {
                getTextHeight = sequence.currentFrame.next().find('.image-info').height();
            } else if (getDirection === -1 && frame === frameCount) {
                getTextHeight = sequence.find('ul li:last-child').find('.image-info').height();
            } else {
                getTextHeight = sequence.currentFrame.prev().find('.image-info').height();
            }
            if ($('body').hasClass('mw') && !$('body').hasClass('startpage') && $('.sequence').parent().hasClass('editorial-pod')) {
                if (contentWidth === 960) {
                    resizeEpHeight = getTextHeight + 398;
                    editorialPod.height(resizeEpHeight);
                } else if (contentWidth === 720) {
                    resizeEpHeight = getTextHeight + 311;
                    editorialPod.height(resizeEpHeight);
                } else {
                    editorialPod.removeAttr("style");
                }
            }
        } else {
            getTextHeight = $('#EditorialPod').find('ul li:first-child').find('.image-info').height();
            if (contentWidth === 960 || contentWidth === 720) {
                if (contentWidth === 960) {
                    imageHeight = 398;
                } else if (contentWidth === 720) {
                    imageHeight = 311;
                }
                resizeEpHeight = getTextHeight + imageHeight;
                editorialPod.css('height', resizeEpHeight);
                editorialPod.addClass('FUBAR');
            } else {
                editorialPod.removeAttr("style");
            }
        }
    }
    var initWordExplanations = function() {
        $('.wordexpl:not(.dialog .wordexpl)').each(function(i, e) {
            var link_element = $(this);
            var myOpentip = new Opentip($(this), {
                tipJoint: "bottom left"
            });
            $.get($(this).attr('href'), function(data) {
                var result_header = $(data).find('.module.wordlist h2').text();
                var result_text = $(data).find('.module.wordlist .span-2 p').text();
                var tooltip_text = result_header + ": " + result_text;
                myOpentip.setContent(tooltip_text);
            });
        });
    };
    initWordExplanations();
    /* - - Short text - */
    var fireOnce = false;

    function textChangeNav() {
        if (!fireOnce) {
            if (!($.browser.msie && $.browser.version === '8.0')) {
                var breakpoint = window.getComputedStyle(document.body, ':before').getPropertyValue('content');
                $('.top-level > li > a, .top-level > li > div > a, .mw .tabSelector a, .sticky-dock ul li a').each(function() {
                    var el = $(this);
                    var shortText = $(this).attr('data-short-text');
                    var longText = $(this).text();
                    if (breakpoint.indexOf('768') || breakpoint.indexOf('480') || breakpoint.indexOf('320')) {
                        fireOnce = true;
                        if (shortText) {
                            el.wrapInner('<span class="org" />').append('<span class="short">' + shortText + '</span>').addClass('short');
                        } // shortText
                    } // breakpoint
                });
            } else {
                //IE 8 - do nothing...
            }
        } // fireOnce
    }
    /*---------------------------------------------*/
    /*############## IE FUNCTIONS #################*/
    /*---------------------------------------------*/
    function DataProgress() {
        $('.profilebar.new').each(function() {
            var el = $(this);
            var elData = el.attr('data-progress');
            elData = elData.substr(0, elData.length - 1);
            if (elData === '20') {
                el.find('.fill > div:nth-child(-n+1)').addClass('prog');
            }
            if (elData === '40') {
                el.find('.fill > div:nth-child(-n+2)').addClass('prog');
            }
            if (elData === '60') {
                el.find('.fill > div:nth-child(-n+3)').addClass('prog');
            }
            if (elData === '80') {
                el.find('.fill > div:nth-child(-n+4)').addClass('prog');
            }
            if (elData === '100') {
                el.find('.fill > div:nth-child(-n+5)').addClass('prog');
            }
        });
    }
    //******************************************
    //***** Inline images
    //******************************************
    function alignInlineArticleImages() {
        $('img.half-width').each(function(i) {
            var imgP, textP;
            imgP = $(this).closest('p');
            textP = imgP.next('p');
            imgP.before("<div class='wrapper inline-image'>");
            var wrapper = imgP.prev('.wrapper');
            imgP.appendTo(wrapper);
            if (textP.hasClass('imagecaption-half-width')) {
                textP.appendTo(wrapper);
            }
            if (i > 0) {
                wrapper.before("<p class='clearfix'></p>");
            }
        });
    }
    alignInlineArticleImages();
    //******************************************
    //***** LeseWeb
    //******************************************
    $('#activateReadWeb').click(function() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "//speech.leseweb.dk/script/qeu7xp36bmpbf6r4o7wd.js";
        document.getElementsByTagName("head")[0].appendChild(script);
        $('#startReading').show();
        $('#stopReading').show();
        $('#activateReadWeb').hide();
        return false;
    });
    //******************************************
    //***** Dom move
    //******************************************
    function moveElmInDOM(elementToMove, targetElement, position) {
        if (position === "prepend") {
            targetElement.prepend(elementToMove);
        } else if (position === "append") {
            targetElement.append(elementToMove);
        } else if (position === "before") {
            targetElement.before(elementToMove);
        } else if (position === "after") {
            targetElement.after(elementToMove);
        } else {
            targetElement.prepend(elementToMove);
        }
    }
    //******************************************
    //***** Dom copy
    //******************************************
    function copyElmToDOM(elementToCopy, targetElement, position) {
        var elementCopy = elementToCopy.clone();
        elementCopy.addClass("copyOfElement");
        if (position === "prepend") {
            targetElement.prepend(elementCopy);
        } else if (position === "append") {
            targetElement.append(elementCopy);
        } else if (position === "before") {
            targetElement.before(elementCopy);
        } else if (position === "after") {
            targetElement.after(elementCopy);
        } else {
            targetElement.prepend(elementCopy);
        }
    }
    //************************************************************
    //***** Helping IE8 to behave and survive in a modern world...
    //************************************************************
    function handleDividers() {
        var secondColModules = $('#secondary_content_area .module');
        var thirdColModules = $('#tertiary_content_area .module');
        var moduleCSS = {
            "border": "none",
            "margin-top": 0,
            "padding-top": 0
        };
        secondColModules.each(function(index) {
            if (index < 2) {
                $(this).css(moduleCSS);
            }
        });
        thirdColModules.each(function(index) {
            if (index < 2) {
                $(this).css(moduleCSS);
            }
        });
    }
    if ($("html").hasClass("msie-8") && $('body').hasClass('mw')) {
        handleDividers();
    }
    
    $('.module.ep-dynamic-text').dynamicTextEP();

    addListener(window, 'load', function (event) {

        $('.module.ep-dynamic-text').dynamicTextEP();

    });


}(this, jQuery));