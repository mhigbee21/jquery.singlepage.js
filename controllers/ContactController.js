function Contact(){

	var contactService = new ContactService();
	
	contactService.getContacts(function(data){
		Template.renderTemplateArray("#contactTable tbody","templateRow",data );
	},
	function(data){
		alert("Error getting Contacts");
	});
}

Contact.load = function(data){

    var html = "";

    if(data){
        html = Template.renderTemplate("contactTemplate",data);
    }else{
         html = Template.renderTemplate("contactTemplate");
    }

    $("#contactView").html( html );
    $("#contactModal").modal("show");
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

$( document ).ready(function() {
    var contact = new Contact();
});

