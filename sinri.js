//SINRI.JS
var SINRI_JS_OBJECT={
	version:'0.3',
	_elements:[],

	// private use

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

	// capsulized element

	val:function(){
		if(this._elements.length===1){
			if(arguments.length===0){
				return this._elements[0].value;
			}else{
				this._elements[0].value=arguments[0];
			}
		}
	},
	attr:function(){
		if(this._elements.length===1){
			// console.log(this._elements[0].attributes);
			if(arguments.length<=0){
				return null;
			}
			else if(arguments.length===1){
				return this._elements[0].getAttribute(arguments[0]);
			}
			else{
				this._elements[0].setAttribute(arguments[0],arguments[1]);
			}
		}
	},
	html:function(){
		if(this._elements.length===1){
			if(arguments.length===0){
				return this._elements[0].innerHTML;
			}else{
				this._elements[0].innerHTML=arguments[0];
			}
		}
	},
	text:function(){
		if(this._elements.length===1){
			if(arguments.length===0){
				return this._elements[0].innerText;
			}else{
				this._elements[0].innerText=arguments[0];
			}
		}
	},

	eprop:function(){
		if(this._elements.length===1){
			if(arguments.length===0){
				return undefined;
			}
			else if(arguments.length===1){
				return this._elements[0][arguments[0]];
			}
			else{
				this._elements[0][arguments[0]]=arguments[1];
			}
		}
	},

	//// Event

	on:function(){
		var useCapture=false;
		if(arguments.length<2){
			return false;
		}else if(arguments.length===2){
			useCapture=false;
		}else{
			useCapture=arguments[2];
		}
		for(var i=0;i<this._elements.length;i++){
			this._elements[i].addEventListener(arguments[0],arguments[1],useCapture);
		}
	}
};
var SINRI_JS_OBJECT_OF_AJAX={
	hotfix:function(){
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
	},
	processMethod:function(method){
		if(!method)method='GET';
		method=method.toUpperCase();
		return method;
	},
	processAsync:function(async){
		if(!async)async=true;
		return async;
	},
	processUser:function(user){
		if(!user)user=null;
		return user;
	},
	processPass:function(pass){
		if(!pass)pass=null;
		return pass;
	},
	processDataType:function(dataType){
		if(!dataType){
			dataType='html';
		}else{
			dataType=dataType.toLowerCase();
		}
		return dataType;
	},
	getUrlWithQueryString:function(url,data){
		var query=null;
		if(SINRI_JS.isString(data)){
			query=data;
		}else{
			query=[];
			for(var k1 in data){
				query.push(encodeURIComponent(k1)+'='+encodeURIComponent(data[k1]));
			}
			query=query.join('&');
		}
		if(url.indexOf('?')>=0){
			url=url+'&'+query;
		}else{
			url=url+'?'+query;
		}
		return url;
	},
	getPostData:function(data){
		var postData=null;
		if(SINRI_JS.isString(data)){
			postData=data;
		}else{
			postData=[];
			for(var k2 in data){
				postData.push(encodeURIComponent(k2)+'='+encodeURIComponent(data[k2]));
			}
			postData=postData.join('&');
		}
	},
	ajax:function(obj){
		SINRI_JS_OBJECT_OF_AJAX.hotfix();
		/*
		 * obj contains
		 * url,method,data,
		 */
		var method=SINRI_JS_OBJECT_OF_AJAX.processMethod(obj.method);
		var async=SINRI_JS_OBJECT_OF_AJAX.processAsync(obj.async);
		var user=SINRI_JS_OBJECT_OF_AJAX.processPass(obj.user);
		var pass=SINRI_JS_OBJECT_OF_AJAX.processPass(obj.pass);
		var dataType=SINRI_JS_OBJECT_OF_AJAX.processDataType(obj.dataType);
		var callback_for_beforeSend=obj.beforeSend;
		var callback_for_done=obj.done;
		var callback_for_fail=obj.fail;
		var callback_for_finally=obj.always;

		var url=obj.url;
		var data=obj.data;
		var header=obj.header;

		if(!url){
			return null;
		}
		if((method=='GET' || method=='DELETE') && data){
			url=SINRI_JS_OBJECT_OF_AJAX.getUrlWithQueryString(url,data);
		}else if(data){
			var postData=SINRI_JS_OBJECT_OF_AJAX.getPostData(data);
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
			// console.log('ajax tobe readyState='+this.readyState+' status='+this.status);
			if (this.readyState === 4){
				if(this.status === 200) {
					// correct final status
					if(dataType=='json'){
						var json=JSON.parse(this.responseText);
						if(json){
							if(callback_for_done){callback_for_done(json,this.status);}
						}else{
							if(callback_for_fail){callback_for_fail(this.responseText,this.status);}
						}
					}else{
						if(callback_for_done){callback_for_done(this.responseText,this.status);}
					}
					if(callback_for_finally){callback_for_finally(this.responseText,this.status);}
				}else{
					// not correct final status
					if(callback_for_fail){callback_for_fail(this.responseText,this.status);}
					if(callback_for_finally){callback_for_finally(this.responseText,this.status);}
				}
			}
		};
		if(callback_for_beforeSend){
			callback_for_beforeSend(method,url,data);
		}
		xhttp.open(method,url,async,user,pass);

		if(header && header.length>0){
			for(var header_name in header){
				xhttp.setRequestHeader(header_name,header[header_name]);
			}
			if(method==='POST' && !header['Content-type']){
				xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}
		}

		if(method==='GET' || method==='DELETE'){
			xhttp.send();
		}else{
			xhttp.send(postData);
		}
		// console.log('confirm async');
	}
};
var SINRI_JS_OBJECT_OF_TOOLKIT={
	isString:function(data){
		return (Object.prototype.toString.call(data) === '[object String]');
	}
};
var SINRI_JS_OBJECT_OF_WINDOW={
	ready:function(func){
		var tid = setInterval( 
			function () {
				console.log('check ready get readyState as '+document.readyState);
				if ( document.readyState !== 'complete' ) return;
				clearInterval( tid );
				func.call(window);
			}, 
			100
		);
	},
	loaded:function(func){
		window.onload=func;
	},
}
var SINRI_JS=function(){
	//SELECTOR
	if(arguments.length===1){
		var instance=SINRI_JS();
		var list = instance.querySelectors(arguments[0]);
		if(list.length===0){
			instance.setElements([]);
		}else{
			instance.setElements(list);
		}
		return instance;
	}

	return SINRI_JS_OBJECT;
};

for(var method_toolkit in SINRI_JS_OBJECT_OF_TOOLKIT){
	SINRI_JS[method_toolkit]=SINRI_JS_OBJECT_OF_TOOLKIT[method_toolkit];
}
for(var method_ajax in SINRI_JS_OBJECT_OF_AJAX){
	SINRI_JS[method_ajax]=SINRI_JS_OBJECT_OF_AJAX[method_ajax];
}
for(var method_window in SINRI_JS_OBJECT_OF_WINDOW){
	SINRI_JS[method_window]=SINRI_JS_OBJECT_OF_WINDOW[method_window];
}

/**
 * use $ as a shortcut just like jQuery.
 */
if(!$){
	var $=SINRI_JS;
}