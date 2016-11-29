# sinri.js
Sinri.js Lighter jQuery

A lighter javascript toolkit for web developers.

# API Usage

The main object is `SINRI_JS`. If `$` was not used by others, it could be used as a shortcus.

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

## AJAX

Just like old style jQuery AJAX.

	$.ajax({
		url:'api/subset',
		method:'get',//optional: get(default),post,put,delete
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

