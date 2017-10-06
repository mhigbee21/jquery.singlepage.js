function ContactService(){}

ContactService.prototype.getContacts = function(callback,errorCallback){

	$.getJSON( "contacts.json",function( data ) {
            callback( data );
        })
        .fail(function(data){
            if( errorCallback ){
                errorCallback(data);
            } else {
                console.log("Error getting contacts!");
            }
        }
    );
};
