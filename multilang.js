// MultiLang - BdR 2016
// JavaScript object to handle multilanguage, load phrases from JSON etc.

var MultiLang = function(url, lang, onload)
{
	// variables
	this.phrases = {};

	// language code from parameter or if null then default to browser language preference
	// Keep only first two characters, for example 'en-US' -> 'en', or 'nl-NL' -> 'nl' etc.
	this.selectedLanguage = (lang || navigator.language || navigator.userLanguage).substring(0, 2);
	
	// onLoad callback function, call after loading JSON
	this.onLoad = onload;

	// load json from url
	if (typeof url !== 'undefined') {
		var obj = this;
		var req = new XMLHttpRequest();

		// NOTE: will load asynchronously!
		req.open("GET", url, true);
		//req.setRequestHeader("User-Agent", navigator.userAgent);
		req.onreadystatechange = function (evt) {
			if (evt.target.readyState == 4 && evt.target.status == 200) // status == 200, do not allow "Cross origin requests"
			//if (evt.target.readyState == 4)// TESTING allow "Cross origin requests" to load from local harddisk
			{
				// load translations
				this.phrases = JSON.parse( evt.target.responseText );

				// verify that the currently selected language exists in the translations
				this.setLanguage(this.selectedLanguage);
				
				// do callback when loading JSON is ready
				if (this.onLoad) {
					this.onLoad();
				}

			};
		}.bind(obj); // NOTE: bind onreadyfunction to MultiLang instead of XMLHttpRequest, so MultiLang.phrases will be set instead of added to XMLHttpRequest
		req.addEventListener("error", function(e) {
			console.log('MultiLang.js: Error reading json file.');
		}, false);
		
		req.send(null);
	};

	this.setLanguage = function(langcode) {

		// check if language code <langcode> does not exist in available translations in json file
		// For example, available translated texts in json are 'en' and 'fr', but client language is 'es'
		if (!this.phrases.hasOwnProperty(langcode)) {
			// doesn't exist so default to the first available language, i.e. the top-most language in json file
			
			// NOTE: the order of properties in a JSON object are not *guaranteed* to be the same as loading time,
			// however in practice all browsers do return them in order
			for (var key in this.phrases) {
				if (this.phrases.hasOwnProperty(key)) {
					langcode = key; // take the first language code
					break;
				};
			};
		};

		// set as selected language code
		this.selectedLanguage = langcode;
	};

	this.get = function(key) {
		// get key phrase
		var str;

		// check if any languages were loaded
		if (this.phrases[this.selectedLanguage]) str = this.phrases[this.selectedLanguage][key];

		// if key does not exist, return the literal key
		str = (str || key);

		return str;
	};
}
