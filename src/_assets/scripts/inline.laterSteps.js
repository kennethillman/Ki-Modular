/**
 * Encapsulate all code 
 * within the $vizzit object
 * @type object
 */
$vizzit =
{
    /**
	 * Customer ID
	 * @type string
	 */
    customer: 'forsvarsmakten2013_se',

    /**
	 * This guid will be used for cookie
	 * It should be set to null if running locally
	 * @type string
	 */
    guid: null,

    /**
	 * Host of vizzit
	 * @type string
	 */
    host: 'www.vizzit.se'
};

/**
 * User information
 * @type object
 */
$vizzit.user =
{
    /**
	 * Username set by the customer website
	 * @type string
	 */
    name: (typeof $vizzit_user !== 'undefined')
		? $vizzit_user
		: '',

    /**
	 * Anonymize IP
	 * Keeping the old 'true' for support
	 * @type bool
	 */
    ip: (typeof $vizzit_anonymizeIP !== 'undefined' && ($vizzit_anonymizeIP === true || $vizzit_anonymizeIP === 'true'))
		? true
		: false
};

/**
 * Client browser information
 * @type object
 */
$vizzit.client =
{
    // IE uses userLanguage
    // Other browsers use language
    language: window.navigator.userLanguage
		   || window.navigator.language
		   || null,

    /**
	 * Java information
	 * @type object
	 */
    java:
	{
	    /**
		 * Determine if java is enabled
		 * @return bool
		 */
	    enabled: function () {
	        return navigator.javaEnabled();
	    }
	},

    /**
	 * Flash information
	 * @type object
	 */
    flash:
	{
	    /**
		 * Determine if client has flash
		 * @todo Are these checks really up to date? They seem kinda weird..
		 * @return bool
		 */
	    enabled: function () {
	        // Internet explorer - enabled
	        if (navigator.appName == 'Microsoft Internet Explorer')
	            if (navigator.appVersion.indexOf('Mac') === -1)
	                if (navigator.appVersion.indexOf('3.1') === -1)
	                    return true;

	        // Shockwave Flash plugin - enabled
	        if (navigator.plugins && navigator.plugins["Shockwave Flash"]
			|| navigator.plugins["Shockwave Flash 2.0"])
	            return true;

	        // Disabled
	        return false;
	    },

	    /**
		 * Get flash version
		 * @todo I found out that this is in fact a copy paste from
		 *       http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
		 *       I modified the style very slightly, but I won't even bother adding
		 *       comments on this since I don't think it's up to date at all
		 * @return string
		 */
	    version: function () {
	        try {
	            try {
	                var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');

	                try {
	                    axo.AllowScriptAccess = 'always';
	                }
	                catch (e) {
	                    return '6,0,0';
	                }
	            } catch (e) { }

	            return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
	        }
	        catch (e) {
	            try {
	                if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)
	                    return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
	            } catch (e) { }
	        }

	        return '0,0,0';
	    }
	}
};

/**
 * Cookie methods
 * @type object
 */
$vizzit.cookie =
{
    // Our cookie key
    key: '___vizzit=',

    /**
	 * Get cookie
	 * @return string
	 */
    get: function () {
        // Find position of cookie by using its key
        var start = document.cookie.indexOf(this.key);

        // Couldn't find the cookie
        if (start === -1)
            return null;

        // If the key's position is 0 but the key
        // still can't be found there, return null
        // @todo Do we really need this? Could this even happen?
        if (start === 0 && this.key != document.cookie.substring(start, this.key.length))
            return null;

        // Get end of cookie
        var pos = start + this.key.length;
        var end = document.cookie.indexOf(';', pos);

        // No end was found, this means that there's
        // nothing after our cookie, thus our cookie's
        // end position is in fact the end of the whole cookie
        if (end === -1)
            end = document.cookie.length;

        // Get cookie and decode it
        var cookie = document.cookie.substring(pos, end);
        return decodeURIComponent(cookie);
    },

    /**
	 * Set cookie
	 * @return void
	 */
    set: function (cookie) {
        // No guid was set by server, create one in javascript instead
        if (cookie === null)
            cookie = $vizzit.cookie.guid();

        // Set expiration date
        var expiration = new Date(new Date().getTime() + 365 + 86400000).toGMTString();

        // Set the cookie
        document.cookie = this.key + encodeURIComponent(cookie) + ';expires=' + expiration + ';path=/';
    },

    /**
	 * Create a sort of guid, not a real one but it is quite random
	 * This is only used for local runs, otherwise this is made server-side
	 * Example: 25394c1518774629b92193==:1424706077
	 * @return string
	 */
    guid: function () {
        var guid = 'xxxxxxxxxxxx4xxxyxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        guid += '==:';
        guid += Math.floor(new Date().getTime() / 1000);
        return guid;
    }
};

/**
 * API Socket
 * @type object
 */
$vizzit.socket =
{
    /**
	 * Send visit information
	 * @return void
	 */
    pixel: function () {
        // Create url path
        // Add a randomized number to it 
        // so as to avoid any caching issues
        var url = '//' + $vizzit.host + '/vizzittag/assets/pixel.js';
        url += '?' + Math.random();

        // Add customer "d" flag
        url += '&d=' + $vizzit.customer;

        // Add referrer, location and cookie
        url += '&r=' + encodeURIComponent(document.referrer);
        url += '&l=' + encodeURIComponent(document.location);
        url += '&c=' + encodeURIComponent($vizzit.cookie.get());

        // Add screen size
        url += '&sx=' + screen.width;
        url += '&sy=' + screen.height;

        // Add browser information
        url += '&bl=' + $vizzit.client.language;
        url += '&fe=' + $vizzit.client.flash.enabled();
        url += '&fv=' + $vizzit.client.flash.version();
        url += '&je=' + $vizzit.client.java.enabled();

        // Add user information
        url += '&u=' + $vizzit.user.name;
        url += '&anonip=' + $vizzit.user.ip;

        // Send information to vizzit by script tag
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    /**
	 * Send click information
	 * This only slightly differs from pixel due
	 * to how click.gif's api is written
	 * @param object event (event.target is the element of which the user clicked)
	 * @param object handle (this is the element of which the event was set on)
	 * @return void
	 */
    click: function (event, handle) {
        // Create url path
        // Add a randomized number to it 
        // so as to avoid any caching issues
        var url = '//' + $vizzit.host + '/vizzittag/assets/click.gif';
        url += '?' + Math.random();

        // Add location set from previous tagging method (vizzit.tag.js)
        url += '&l=' + encodeURIComponent(handle.vizzit.location);

        // Add referrer and cookie
        url += '&r=' + encodeURIComponent(document.location);
        url += '&c=' + encodeURIComponent($vizzit.cookie.get());

        // Add customer "d" flag
        url += '&d=' + $vizzit.customer;

        // Add screen size
        url += '&sx=' + screen.width;
        url += '&sy=' + screen.height;

        // Add browser information
        url += '&bl=' + $vizzit.client.language;
        url += '&fe=' + $vizzit.client.flash.enabled();
        url += '&fv=' + $vizzit.client.flash.version();
        url += '&je=' + $vizzit.client.java.enabled();

        // Add user information
        url += '&u=' + $vizzit.user.name;
        url += '&anonip=' + $vizzit.user.ip;

        // Send information to vizzit by img tag
        var img = document.createElement('img');
        img.setAttribute('src', url);
        img.setAttribute('width', '1');
        img.setAttribute('height', '1');
        document.body.appendChild(img);
        setTimeout('', 100);
    }
};

/**
 * Event handling
 * @type object
 */
$vizzit.event =
{
    /**
	 * Add event on element
	 * @param object element
	 * @return void
	 */
    add: function (element) {
        // Make sure element exists (just a precaution to avoid console errors)
        if (typeof element === 'undefined' || element === null)
            return false;

        // Make sure our little event doesn't exist already
        if (element['onclick'] !== null)
            if (element['onclick'].toString().indexOf('$vizzit.event.click') !== -1)
                return false;

        // Use addEventListener if the browser supports it
        // Browsers: Chrome, Firefox, Safari, Opera and IE 9+
        if (element.addEventListener)
            element.addEventListener('click', $vizzit.event.click, true);

            // Otherwise use attachEvent
            // Browsers: Internet Explorer, Opera
        else if (element.attachEvent)
            element.attachEvent('onclick', $vizzit.event.click);
    },

    /**
	 * Event click
	 * @param object element
	 * @return void
	 */
    click: function (event) {
        $vizzit.socket.click(event, this);
    }
};

/**
 * Sets events on irregular types of links
 * @type object
 */
$vizzit.tag =
{
    /**
	 * Tag javascript link
	 * @param object link
	 * @return bool
	 */
    javascript: function (link) {
        if (!/^javascript/.test(link.href))
            return false;

        // Set location
        link.vizzit = { location: link.href };

        // Add an event on this element
        $vizzit.event.add(link);

        return true;
    },

    /**
	 * Tag external link
	 * @param object link
	 * @return bool
	 */
    external: function (link) {
        if (link.host === location.host)
            return false;

        // Set external-type location
        link.vizzit = { location: '/vizzit_external/' + link.href };

        // Add an event on this element
        $vizzit.event.add(link);

        return true;
    },

    /**
	 * Tag document
	 * @param object link
	 * @return bool
	 */
    document: function (link) {
        if (!/\.(pdf|doc|xls|docx|ppt|pptx|xlsx|zip|rtf|wmv|exe)$/.test(link.pathname))
            return false;

        // Set document location
        link.vizzit = { location: link.pathname };

        // Add an event on this element
        $vizzit.event.add(link);

        return true;
    },

    /**
	 * Same as document really, but since .htm
	 * is simply an abbreviation of .html, duplicates may occur
	 * if the website has our tag script installed on their .htm pages
	 * Thus this is separate and only used on selective customers
	 * @param object link
	 * @return bool
	 */
    htm: function (link) {
        if (!/\.(htm)$/.test(link.pathname))
            return false;

        // Set document location
        link.vizzit = { location: link.pathname };

        // Add an event on this element
        $vizzit.event.add(link);

        return true;
    }
};

/**
 * Application functions
 * @return void
 */
$vizzit.app =
{
    /**
	 * Main application function
	 * @return void
	 */
    main: function () {
        // Handle cookie
        $vizzit.app.cookie();

        // Store visit
        $vizzit.app.record();

        // Window onload
        $vizzit.app.window();
    },

    /**
	 * Cookie
	 * @return void
	 */
    cookie: function () {
        // Cookies are actively disabled, just skip it
        if (typeof ($vizzit_enableCookies) !== 'undefined')
            if ($vizzit_enableCookies === false)
                return;

        // Set cookie if not already set
        if (!$vizzit.cookie.get())
            $vizzit.cookie.set($vizzit.guid);
    },

    /**
	 * Record visit
	 * @return void
	 */
    record: function () {
        $vizzit.socket.pixel();
    },

    /**
	 * Events
	 * @return void
	 */
    events: function () {
        // Get link elements
        var links = document.getElementsByTagName('a');

        // Go through each tag and check if it's a document
        for (i = 0; i < links.length; i++) {
            var link = links[i];

            // Attempt to tag it as a javascript "link"
            if (false)
                if ($vizzit.tag.javascript(link))
                    continue;

            // Attempt to tag it as an external link
            if ($vizzit.tag.external(link))
                continue;

            // Attempt to tag it as a document
            if ($vizzit.tag.document(link))
                continue;

            // Attempt to tag it as an htm file
            if (false)
                if ($vizzit.tag.htm(link))
                    continue;
        }
    },

    /**
	 * On load function
	 * @param object event
	 * @return void
	 */
    onload: function (event) {
        $vizzit.app.events();
    },

    /**
	 * Window onload event
	 * @return void
	 */
    window: function () {
        // Add window.onload in a non-obtrusive way
        if (window.onload) {
            // Store old onload function
            var currentOnLoad = window.onload;

            // Create new onload function, which includes the old
            var newOnLoad = function () {
                currentOnLoad();
                $vizzit.app.onload();
            };

            // Add it to window.onload
            window.onload = newOnLoad;
        }
            // No current onload function exists,
            // add it directly instead
        else {
            window.onload = $vizzit.app.onload;
        }
    }
};

/**
 * Starts the whole script
 */
$vizzit.app.main();