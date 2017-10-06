function Contact() {

    var contactService = new ContactService();
	
	contactService.getContacts(function(data){
		Template.renderTemplateArray("#contactTable tbody","templateRow",data );
	},
	function(data){
		alert("Error getting Contacts");
	});
}

Contact.load = function(target){
    var data = $(target).data();

    var html = "";

    if(data){
        html = Template.renderTemplate("contactTemplate",data);
    }else{
         html = Template.renderTemplate("contactTemplate");
    }

    $("#contactView").html( html );
    $("#contactModal").modal("show");
};

Contact.prototype.loadContact = function(id){

	var contactService = new ContactService();

    contactService.getContacts(function(data){
    
	  	for(var i = 0; i < data.length; i++ ){
	  		if(data[i].id == id ) {
				var html = Template.renderTemplate("contactPage",data[i]);
				$("#contactView").html( html );
				break;
			}
		}	

	},
    function(data){
        consol.log("Error getting Contacts");
    });

};


Contact.clearMessages = function(){
	$("#contactModalSaved").hide();		
	$("#contactModalError").hide();
}

Contact.saved = function(data){
	$("#contactModalSaved").show();
}

Contact.saveError = function(data){
	$("#contactModalError").show();
}
