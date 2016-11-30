# Sinri.js

Sinri.js is a lighter javascript toolkit for web developers, with jQuery-like style.

[![Code Climate](https://codeclimate.com/github/sinri/sinri.js/badges/gpa.svg)](https://codeclimate.com/github/sinri/sinri.js) [![Issue Count](https://codeclimate.com/github/sinri/sinri.js/badges/issue_count.svg)](https://codeclimate.com/github/sinri/sinri.js)

It is not for those hackers, nor senior and professional frontend engineer when dealing with top projects. However, it is designed for those use frontend technology just for a short-time tool and do not want to be bothered by the variousity between versions of jQuery.

So anyone prefer React or Angular.js or Vue.js or any other top frontend plans could neglect this project.

# API Usage

The main object is `SINRI_JS`. If `$` was not used by others, it could be used as a shortcus.

## Window Event

There are two functions on window's being loaded, `ready` and `loaded`.

	$.ready(callback) // simulate the jQuery ready

	$.loaded(callback) // capsulize the window.onload

## Selector

First, use `SINRI_JS(query_string)` to get the base chain function.

Second, follow the functions, including

	val() // Get value of the selected element
	val(value_to_set) // Set value of the selected element
	attr(name) // Get value of the named attribute of the selected element
	attr(name,value_to_set) // Set value of the named attribute of the selected element
	html() // Get innerHTML of the selected element
	html(value_to_set) // Set innerHTML of the selected element
	text() // Get innerText of the selected element
	text(value_to_set) // Set innerText of the selected element

	eprop(name) // Get value [name] of the selected element (such as one_input.checked)
	eprop(name,value_to_set) // Set the value [name] of the selected element

	on(event,function,useCapture) // set the event-function mapping of selected element

## AJAX

Just like old style jQuery AJAX.

	$.ajax({
		url:'api/subset',
		method:'get',//optional: get(default),post,put,delete
		header:{H:V},//optional: headers
		data:DATA,//optional: string or object
		beforeSend:function(method,url,data){
			console.log('beforeSend: ',method,url,data);
		},//optional
		done:function(data,code){
			console.log('done with code ',code);
			console.log(data);
		},//optional
		fail:function(data,code){
			console.log('fail with code ',code);
			console.log(data);
		},//optional
		always:function(data,code){
			console.log('always with code ',code);
			console.log(data);
		}//optional
	});

