MultiLang.js
============

MultiLang.js is a JavaScript object to handle multilanguage, localisation, JSON file loading, detect default language, detect non-existing phrases etc.

It contains a working example page and a JSON example file with multiple languages. Initially created for Phaser.js games, but it can be applied to any JavaScript project or website.

How to use
----------
All translations are stored in a JSON file like this:

	{
	   "en": {
	      "Hello": "Hello World!",
	      "Yes": "Yes"
	   },
	   "fr": {
	      "Hello": "Bonjour à tous!",
	      "Yes": "Oui"
	   }
	}

And then MultiLang.js can be used like this:

	var multilang = new MultiLang('languages.json');
	multilang.setLanguage('fr');
	alert( multilang.get('Hello') );

Manage translations
-------------------
Keeping track of all the translated strings can be a challenge, even for smaller projects. See this [Excel spreadsheet](http://members.home.nl/bas.de.reuver/files/multilanguage.zip) to manage translations more easily. The translator(s) can fill the spreadsheet with translated texts and the JSON file can then be generated using a VBA macro. For more information [see here](http://stackoverflow.com/questions/20324967/localize-multi-plattform-projects-consolidate-string-files/20330497#20330497).

History
-------
2016-oct-28 upload project on github

Send any questions or comments to Bas de Reuver - bdr1976@gmail.com