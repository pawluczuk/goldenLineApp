var $selectMainCategory = $("#mainCategory").selectize();
var selectMainCategory = $selectMainCategory[0].selectize;

var $selectSubcategory = $("#subcategory").selectize();
var selectSubcategory = $selectSubcategory[0].selectize;

var $networkParameter = $("#networkParameter").selectize();
var networkParameter = $networkParameter[0].selectize;

selectMainCategory.on('change', function() {
	retrieveSubcategories(function() {
		retrieveResults();
	});
});

function retrieveSubcategories(callbackFunc) {
	var categories = selectMainCategory.getValue();
	if (!categories.length) return;
	var categoriesQuery = '';
	categories.forEach(function(entry, i ) {
		if (i !== 0) categoriesQuery += '+';
		categoriesQuery += entry;
	});
	var subcategoriesJSONurl = '/data?categories=' + categoriesQuery;
	var options = [];
	$.getJSON(subcategoriesJSONurl, function(data) {
		$.each(data, function(i, entry){
			entry.subcategories.forEach(function(subcategory) {
				options.push({text : subcategory.name, value: subcategory.name});
			});
		});
		selectSubcategory.clearOptions();
		selectSubcategory.load(function(callback) {
			callback(options);
		});
		callbackFunc();
	});
}

function retrieveCategories(callbackFunc) {
	var categoriesJSONurl = '/jsoncategories';
	var options = [];
	$.getJSON(categoriesJSONurl, function(data) {
		$.each(data, function(){
			options.push({ text : this.name, value : this._id});
		});
		selectMainCategory.clearOptions();
		selectMainCategory.load(function(callback) {
			callback(options);
		});
		callbackFunc();
	});
}

function retrieveResults() {

}

retrieveCategories(function() {
	retrieveSubcategories(function() {
		retrieveResults();
	});
});



