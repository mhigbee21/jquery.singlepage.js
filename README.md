# jquery.singlepage.js

You can run code without a webserver if you use Mozilla Firefox, clone the project and open index.html in firefox.

## Router:
No need to hard code routes or write your own router... 

```
usage: /#{{htmlfilename}}
/#red -> red.html
/#blue -> blue.html
```

```
<script src="js/jquery-3.2.1.min.js"> </script>
<script src="js/jquery.singlepage.js?v=1"></script>

<script>
//home is the default route will load home.html 
$(document).ready(function () {
	var router = new Router("#myApp", "home").load();
});
</script>

        
<div id="myApp"></div>
```

## Route Parameters
The router supports nvp routes or SEO friendly routes 

NVP Example: 

```
Load red.html 
 <a class="nav-link disabled" href="/#red/?first_name=red&last_name=leader">Red Page</a>

red.html parse the params
<script>
$( document ).ready(function() {
	var firstName = Router.getUriParameterByName('first_name');
	$("#firstName").html( firstName );
	var lastName = Router.getUriParameterByName('last_name'); 
	$("#lastName").html( lastName );
});
</script>
```

SEO Friendly Example:

```
Load blue.html

 <a class="nav-link disabled" href="/#blue/first_name/blue/last_name/leader">Blue Page</a>


blue.html parse params

<script>
$(document).ready(function () {
        var firstName = Router.getPathVariable('first_name');
        $("#firstName").html(firstName);
        var lastName = Router.getPathVariable('last_name');
        $("#lastName").html(lastName);
});
</script>
```

NO need to inject controllers or services... Simply use them as needed...
See contact.html and contacts.html 

```
js/controllers/ContactController.js 
js/services/ContactServices.js
```


## Templates
Templates uses mustache merge tags 

```
<script id="contactTemplate" type="text/template">
<p>contactid: {{contactid}}</p>
<p>first name: {{firstName}}</p>
</script>

<script>
 var data = $(target).data();
 var html = Template.renderTemplate("contactTemplate",data);
 $("#contactView").html( html );
</script>


<div id="contactView"></div>


```

