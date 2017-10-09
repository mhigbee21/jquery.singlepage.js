/*!
 * jquery.singlepage.js v1.1 (https://github.com/mhigbee21/jquery.singlepage.js)
 * Copyright 2017 Mark Higbee
 * Licensed under the MIT license
 */
"use strict";
function Router(app, defaultRoute, path){
    this.app = app;
    this.path = path;
    this.defaultRoute = defaultRoute;
}

Router.prototype.load = function(){
    var app = this.app;
    var path = this.path;
    var defaultRoute = this.defaultRoute;

    function loadPage(){
        var hash = window.location.hash.replace(/^#/, '');
       
        if( hash.match(/\//)) {
            var data = hash.split(/\//);
            hash = data[0];
        }

        if( !hash ) {
            if(defaultRoute ){
                hash = defaultRoute;
            } else{
                hash = "index";
            }
        }

        hash = hash + ".html";

        if( !path ) { path = ""; }
        var template = path + hash;

        $(app).load(template);
        console.log(hash);
    }

    window.addEventListener("hashchange", function(){
        loadPage();
    }, false);

    loadPage();
};

Router.loadRoute = function(newPath){

	var url = window.location.href;
	var urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(url);
	var hostname = urlParts[1];
	var path = urlParts[2];

	if( path === newPath )
	{
		window.location.reload();
	}
	else
	{
		window.location.replace(newPath);
	}
};

Router.getPathVariable = function (variable, url) {
    if (!url) url = window.location.href;

    var parts = url.substr(1).split('/'), value;
    while (parts.length) {
        if (parts.shift() === variable) {
            value = parts.shift();
        } else {
            parts.shift();
        }
    }

    return value;
};

Router.getUriParameterByName = function (name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

function Template(app, path){
    this.app = app;
    this.path = "";
    if(!path) { this.path = path; }
}

Template.prototype.loadTemplate = function (template, data, callback){

    var file;
    if( this.path ) {
        file = this.path + template;
    }
    else{
        file = template;
    }

    if( data ){
         $.get(file,function(response){

            for( var key in data ){
                var regex = '{{'+key+'}}';
                var re = new RegExp(regex,"g");
                response = response.replace(re,data[key]);
            } 
			
			if( callback ){
                $(this.app).html(response,function(){ callback(); });
            } else{
                 $(this.app).html(response);
            }
        });
    } else {
        if( callback ){
            $(this.app).load(file,function(){
                callback();
            });
        }
        else{
              $(this.app).load(file);
        }
    }
};

/* example template
<script id="templateRow" type="text/template">
	<tr>
		<td><a href="javascript:void(0);" onclick="Contact.load({'contactid':'{{id}}'});">{{first_name}} {{last_name}}</a></td>
		<td>{{email}}</td>
	</tr>
</script>
*/

Template.merge = function(target,html){
	 $(target).html( html );
}

Template.renderTemplate = function (templateid, hash){
    var template = document.getElementById(templateid);
    if( template )
	{
		var templateHtml = template.innerHTML;

    	for( var key in hash ){
            var regex = '{{'+key+'}}';
            var re = new RegExp(regex,"g");
            templateHtml = templateHtml.replace(re,hash[key]);
    	}
    	return templateHtml;
	}
	return "";
};

Template.renderTemplateArray = function (target, templateid, objarray){
    var rows = "";
    for(var i = 0; i < objarray.length; i++ ){
        var row = Template.renderTemplate( templateid,objarray[i] );
        rows += row;
    }
    if(target){ 
		$(target).html( rows );
	}
	else{
		return rows;
	}
};

$( document ).ready(function() {

    $(document).on('click',"[data-show]",function () {
        var obj = $(this).data();
        if (obj.show === "modal") {
            $(obj.target).modal("show");
        } else {
            $(obj.target).show();
        }
    });

    $(document).on('mouseenter', "[data-show]", function () {
        $(this).css('cursor', 'pointer');
    }).on('mouseleave', "[data-show]", function () {
        $(this).css('cursor', 'arrow');
    });

    $(document).on('click', "[data-hide]", function () {
        var obj = $(this).data();
        if (obj.show === "modal") {
            $(obj.target).modal("hide");
        } else {
            $(obj.target).hide();
        }
    });

    $(document).on('mouseenter', "[data-hide]", function () {
        $(this).css('cursor', 'pointer');
    }).on('mouseleave', "[data-hide]", function () {
        $(this).css('cursor', 'arrow');
    });

    $(document).on('mouseenter', "[data-toggle]", function () {
        $(this).css('cursor', 'pointer');
    }).on('mouseleave', "[data-toggle]", function () {
        $(this).css('cursor', 'arrow');
    });

    $(document).on('mouseenter', "[data-dismiss]", function () {
        $(this).css('cursor', 'pointer');
    }).on('mouseleave', "[data-dismiss]", function () {
        $(this).css('cursor', 'arrow');
    });


	$("[data-copyright]").each(function(){
		var obj = $(this).data();
		var year;
		
		if( obj.copyright ){
			year = obj.copyright;
		}
		else{
			var today = new Date();
			year = today.getFullYear();
		}

		var content ="&copy; " + year;

		if( obj.copyrightHolder ){
			content += " "  + obj.copyrightHolder;
		}

		$(this).html(content);
	});

});

function Form(){}
// got this from developer.mozilla.org changed from AJAXSubmit to ajaxSubmit
// and added callback
// usage:
// <form action="" method="post" onsubmit="Form.ajaxSubmit(this,callback); return false;">
Form.ajaxSubmit = function (oFormElement, callback, errorCallback, progressCallback) {
  if (oFormElement.action !== undefined) { 
		console.log("There was an error sending the form. No Action was given");
		 if( errorCallback ){
            errorCallback();
        }
		return; 
	}
  var oReq = new XMLHttpRequest();

  oReq.addEventListener("error", function(evt){ 
		console.log("There was an error sending the form");

		if( errorCallback ){
			errorCallback(evt);
		}
  });

  oReq.addEventListener("progress", function(oEvent){
		if(  progressCallback ){
			progressCallback(oEvent);
		}
		else{
			var percentComplete = oEvent.loaded / oEvent.total;
			console.log("percentComplete: "+ percentComplete );
		}
  });

  oReq.onload =  function(){
        callback(oReq.responseText);
  };

  if (oFormElement.method.toLowerCase() === "post") {
    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
  } else {
    var oField, sFieldType, nFile, sSearch = "";
    for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
      oField = oFormElement.elements[nItem];
      if (!oField.hasAttribute("name")) { continue; }
      sFieldType = oField.nodeName.toUpperCase() === "INPUT" ?
          oField.getAttribute("type").toUpperCase() : "TEXT";
      if (sFieldType === "FILE") {
        for (nFile = 0; nFile < oField.files.length;
            sSearch += "&" + escape(oField.name) + "=" + escape(oField.files[nFile++].name));
      } else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || oField.checked) {
        sSearch += "&" + escape(oField.name) + "=" + escape(oField.value);
      }
    }
    oReq.open("get", oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, "?")), true);
    oReq.send(null);
  }
}
