function Search(){ }

Search.searchContacts = function(searchVal) {

	var contactService = new ContactService();   
	
	if(!searchVal){
		searchVal = $("#search_text").val();
	}
 
    contactService.getContacts(function (data) {
   
		var results = []; 
		if( searchVal ) {

		    var regex = searchVal;
            var re = new RegExp(regex,"i");

			for(var i = 0; i < data.length; i++ ){
				if(data[i].first_name.match(re) || data[i].last_name.match(re)) {
				
					results.push( data[i] );
				}
			}
		}
		else{
			results = data;
		}

		var rows = Template.renderTemplateArray(null, "searchResultRow", results);
		var template = $("#searchResults").html();
		Template.merge("#myApp",template);
		Template.merge("#search-results",rows);
    },
	function (data) {
	    alert("Error getting Contacts");
	});
}
