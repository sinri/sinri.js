//SINRI.JS
var SINRI_JS_OBJECT={
	version:'0.1',
	_elements:[],

	init:function(){
		var instance=SINRI_JS();
		return instance;
	},

	setElements:function(list){
		this._elements=list;
		return this;
	},

	querySelector:function(query){
		return document.querySelector(query);
	},
	querySelectors:function(query){
		return document.querySelectorAll(query);
	},

	val:function(){
		if(this._elements.length==1){
			if(arguments.length==0){
				return this._elements[0].value;
			}else{
				this._elements[0].value=arguments[0];
			}
		}
	},
	attr:function(){
		if(this._elements.length==1){
			console.log(this._elements[0].attributes);
			if(arguments.length<=0){
				return null;
			}
			else if(arguments.length==1){
				var attr_name=arguments[0];
				return this._elements[0].getAttribute(attr_name);
			}
			else{
				var attr_name=arguments[0];
				var attr_value=arguments[1];
				this._elements[0].setAttribute(attr_name,attr_value);
			}
		}
	},
	html:function(){
		if(this._elements.length==1){
			if(arguments.length==0){
				return this._elements[0].innerHTML;
			}else{
				this._elements[0].innerHTML=arguments[0];
			}
		}
	},
	text:function(){
		if(this._elements.length==1){
			if(arguments.length==0){
				return this._elements[0].innerText;
			}else{
				this._elements[0].innerText=arguments[0];
			}
		}
	},

	///
	eprop:function(){
		if(this._elements.length==1){
			if(arguments.length==0){
				return undefined;
			}
			else if(arguments.length==1){
				return this._elements[0][arguments[0]];
			}
			else{
				this._elements[0][arguments[0]]=arguments[1];
			}
		}
	},

	//// AJAX
	ajax:function(obj){
		/*
		 * obj contains
		 * url,method,data,
		 */

		var url=obj.url;
		var method=obj.method;
		var data=obj.data;
		var async=obj.async;
		var user=obj.user;
		var pass=obj.pass;
		var dataType=obj.dataType;
		var callback_for_beforeSend=obj.beforeSend;
		var callback_for_done=obj.done;
		var callback_for_fail=obj.fail;
		var callback_for_finally=obj.always;

		if(!method){
			method='GET';
		}
		method=method.toUpperCase();
		if(!async){
			async=true;
		}
		if(!user){
			user=null;
		}
		if(!pass){
			pass=null;
		}
		if(!dataType){
			dataType='html';
		}else{
			dataType=dataType.toLowerCase();
		}

		if(!url){
			return null;
		}
		if((method=='GET' || method=='DELETE') && data){
			if((Object.prototype.toString.call(data) === '[object String]')){
				var query=data;
			}else{
				var query=[];
				for(var k in data){
					query.push(encodeURIComponent(k)+'='+encodeURIComponent(data[k]));
				}
				query=query.join('&');
			}
			if(url.indexOf('?')>=0){
				//XXXX?SSS + &K=V
				url=url+'&'+query;
			}else{
				//XXXX + ?K=V
				url=url+'?'+query;
			}
		}else if(data){
			if((Object.prototype.toString.call(data) === '[object String]')){
				var postData=data;
			}else{
				var postData=[];
				for(var k in data){
					postData.push(encodeURIComponent(k)+'='+encodeURIComponent(data[k]));
				}
				postData=postData.join('&');
			}
		}

		///// AJAX

		if (!XMLHttpRequest.prototype.sendAsBinary) {
			XMLHttpRequest.prototype.sendAsBinary = function(sData) {
				var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
				for (var nIdx = 0; nIdx < nBytes; nIdx++) {
					ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
				}
				/* send as ArrayBufferView...: */
				this.send(ui8Data);
				/* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
			};
		}

		var xhttp;
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		} else {
			// code for IE6, IE5
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.onreadystatechange = function() {
			/*
			 * Holds the status of the XMLHttpRequest.
				0: request not initialized 
				1: server connection established
				2: request received 
				3: processing request 
				4: request finished and response is ready
			 */
			console.log('ajax tobe readyState='+this.readyState+' status='+this.status);
			if (this.readyState == 4){
				if(this.status == 200) {
					// correct final status
					if(dataType=='json'){
						var json=JSON.parse(this.responseText);
						if(json){
							if(callback_for_done){
								callback_for_done.call(null,json,this.status);
							}
						}else{
							if(callback_for_fail){
								callback_for_fail.call(null,this.responseText,this.status)
							}
						}
					}else{
						if(callback_for_done){
							callback_for_done.call(null,this.responseText,this.status);
						}
					}
					if(callback_for_finally){
						callback_for_finally.call(null,this.responseText,this.status);
					}
				}else{
					// not correct final status
					if(callback_for_fail){
						callback_for_fail.call(null,this.responseText,this.status)
					}
					if(callback_for_finally){
						callback_for_finally.call(null,this.responseText,this.status);
					}
				}
			}
		};
		if(callback_for_beforeSend){
			callback_for_beforeSend.call(null,method,url,data);
		}
		xhttp.open(method,url,async,user,pass);
		if(method=='GET' || method=='DELETE'){
			xhttp.send();
		}else{
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhttp.send(postData);
		}
		console.log('confirm async');
	}
};
var SINRI_JS=function(){
	//SELECTOR
	if(arguments.length==1){
		var instance=SINRI_JS();
		var list = instance.querySelectors(arguments[0]);
		if(list.length==0){
			instance.setElements([]);
		}else{
			instance.setElements(list);
		}
		return instance;
	}

	return SINRI_JS_OBJECT;
};
SINRI_JS.ajax=SINRI_JS_OBJECT.ajax;
/**
 * use $ as a shortcut just like jQuery.
 */
if(!$){
	var $=SINRI_JS;
}