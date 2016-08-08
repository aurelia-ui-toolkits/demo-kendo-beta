/*eslint-disable */
/*!
 * ASP.NET SignalR JavaScript Library v1.1.3
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */
(function(n,t){"use strict";function l(t,r){var u,f;if(n.isArray(t)){for(u=t.length-1;u>=0;u--)f=t[u],n.type(t)==="object"||n.type(f)==="string"&&i.transports[f]||(r.log("Invalid transport: "+f+", removing it from the transports list."),t.splice(u,1));t.length===0&&(r.log("No transports remain within the specified transport array."),t=null)}else if(n.type(t)==="object"||i.transports[t]||t==="auto"){if(t==="auto"&&i._.ieVersion<=8)return["longPolling"]}else r.log("Invalid transport: "+t.toString()),t=null;return t}function h(n){return n==="http:"?80:n==="https:"?443:void 0}function o(n,t){return t.match(/:\d+$/)?t:t+":"+h(n)}if(typeof n!="function")throw new Error("SignalR: jQuery not found. Please ensure jQuery is referenced before the SignalR.js file.");if(!t.JSON)throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");var i,s,e=t.document.readyState==="complete",f=n(t),r={onStart:"onStart",onStarting:"onStarting",onReceived:"onReceived",onError:"onError",onConnectionSlow:"onConnectionSlow",onReconnecting:"onReconnecting",onReconnect:"onReconnect",onStateChanged:"onStateChanged",onDisconnect:"onDisconnect"},c=function(n,i){if(i!==!1){var r;typeof t.console!="undefined"&&(r="["+(new Date).toTimeString()+"] SignalR: "+n,t.console.debug?t.console.debug(r):t.console.log&&t.console.log(r))}},u=function(t,i,u){return i===t.state?(t.state=u,n(t).triggerHandler(r.onStateChanged,[{oldState:i,newState:u}]),!0):!1},a=function(n){return n.state===i.connectionState.disconnected},v=function(n){var u,r;n._.configuredStopReconnectingTimeout||(r=function(n){n.log("Couldn't reconnect within the configured timeout ("+n.disconnectTimeout+"ms), disconnecting."),n.stop(!1,!1)},n.reconnecting(function(){var n=this;n.state===i.connectionState.reconnecting&&(u=t.setTimeout(function(){r(n)},n.disconnectTimeout))}),n.stateChanged(function(n){n.oldState===i.connectionState.reconnecting&&t.clearTimeout(u)}),n._.configuredStopReconnectingTimeout=!0)};i=function(n,t,r){return new i.fn.init(n,t,r)},i._={defaultContentType:"application/x-www-form-urlencoded; charset=UTF-8",ieVersion:function(){var i,n;return t.navigator.appName==="Microsoft Internet Explorer"&&(n=/MSIE ([0-9]+\.[0-9]+)/.exec(t.navigator.userAgent),n&&(i=t.parseFloat(n[1]))),i}()},i.events=r,i.changeState=u,i.isDisconnecting=a,i.connectionState={connecting:0,connected:1,reconnecting:2,disconnected:4},i.hub={start:function(){throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/hubs'><\/script>.");}},f.load(function(){e=!0}),i.fn=i.prototype={init:function(n,t,i){this.url=n,this.qs=t,this._={},typeof i=="boolean"&&(this.logging=i)},isCrossDomain:function(i,r){var u;return(i=n.trim(i),i.indexOf("http")!==0)?!1:(r=r||t.location,u=t.document.createElement("a"),u.href=i,u.protocol+o(u.protocol,u.host)!==r.protocol+o(r.protocol,r.host))},ajaxDataType:"json",contentType:"application/json; charset=UTF-8",logging:!1,state:i.connectionState.disconnected,keepAliveData:{},reconnectDelay:2e3,disconnectTimeout:3e4,keepAliveWarnAt:2/3,start:function(o,s){var h=this,c={waitForPageLoad:!0,transport:"auto",jsonp:!1},w,a=h._deferral||n.Deferred(),y=t.document.createElement("a"),p;if(n.type(o)==="function"?s=o:n.type(o)==="object"&&(n.extend(c,o),n.type(c.callback)==="function"&&(s=c.callback)),c.transport=l(c.transport,h),!c.transport)throw new Error("SignalR: Invalid transport(s) specified, aborting start.");return!e&&c.waitForPageLoad===!0?(f.load(function(){h._deferral=a,h.start(o,s)}),a.promise()):(v(h),u(h,i.connectionState.disconnected,i.connectionState.connecting)===!1)?(a.resolve(h),a.promise()):(y.href=h.url,y.protocol&&y.protocol!==":"?(h.protocol=y.protocol,h.host=y.host,h.baseUrl=y.protocol+"//"+y.host):(h.protocol=t.document.location.protocol,h.host=t.document.location.host,h.baseUrl=h.protocol+"//"+h.host),h.wsProtocol=h.protocol==="https:"?"wss://":"ws://",c.transport==="auto"&&c.jsonp===!0&&(c.transport="longPolling"),this.isCrossDomain(h.url)&&(h.log("Auto detected cross domain url."),c.transport==="auto"&&(c.transport=["webSockets","longPolling"]),c.jsonp||(c.jsonp=!n.support.cors,c.jsonp&&h.log("Using jsonp because this browser doesn't support CORS")),h.contentType=i._.defaultContentType),h.ajaxDataType=c.jsonp?"jsonp":"json",n(h).bind(r.onStart,function(){n.type(s)==="function"&&s.call(h),a.resolve(h)}),w=function(t,e){if(e=e||0,e>=t.length){h.transport||(n(h).triggerHandler(r.onError,["SignalR: No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization."]),a.reject("SignalR: No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization."),h.stop());return}var o=t[e],s=n.type(o)==="object"?o:i.transports[o];if(o.indexOf("_")===0){w(t,e+1);return}s.start(h,function(){s.supportsKeepAlive&&h.keepAliveData.activated&&i.transports._logic.monitorKeepAlive(h),h.transport=s,u(h,i.connectionState.connecting,i.connectionState.connected),n(h).triggerHandler(r.onStart),f.unload(function(){h.stop(!1)})},function(){w(t,e+1)})},p=h.url+"/negotiate",p=i.transports._logic.addQs(p,h),h.log("Negotiating with '"+p+"'."),n.ajax({url:p,global:!1,cache:!1,type:"GET",contentType:h.contentType,data:{},dataType:h.ajaxDataType,error:function(t){n(h).triggerHandler(r.onError,[t.responseText]),a.reject("SignalR: Error during negotiation request: "+t.responseText),h.stop()},success:function(t){var u=h.keepAliveData,e,f;if(h.appRelativeUrl=t.Url,h.id=t.ConnectionId,h.token=t.ConnectionToken,h.webSocketServerUrl=t.WebSocketServerUrl,h.disconnectTimeout=t.DisconnectTimeout*1e3,t.KeepAliveTimeout?(u.activated=!0,u.timeout=t.KeepAliveTimeout*1e3,u.timeoutWarning=u.timeout*h.keepAliveWarnAt,u.checkInterval=(u.timeout-u.timeoutWarning)/3):u.activated=!1,!t.ProtocolVersion||t.ProtocolVersion!=="1.2"){n(h).triggerHandler(r.onError,["You are using a version of the client that isn't compatible with the server. Client version 1.2, server version "+t.ProtocolVersion+"."]),a.reject("You are using a version of the client that isn't compatible with the server. Client version 1.2, server version "+t.ProtocolVersion+".");return}n(h).triggerHandler(r.onStarting),e=[],f=[],n.each(i.transports,function(n){if(n==="webSockets"&&!t.TryWebSockets)return!0;f.push(n)}),n.isArray(c.transport)?n.each(c.transport,function(){var t=this;(n.type(t)==="object"||n.type(t)==="string"&&n.inArray(""+t,f)>=0)&&e.push(n.type(t)==="string"?""+t:t)}):n.type(c.transport)==="object"||n.inArray(c.transport,f)>=0?e.push(c.transport):e=f,w(e)}}),a.promise())},starting:function(t){var i=this;return n(i).bind(r.onStarting,function(){t.call(i)}),i},send:function(n){var t=this;if(t.state===i.connectionState.disconnected)throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");if(t.state===i.connectionState.connecting)throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");return t.transport.send(t,n),t},received:function(t){var i=this;return n(i).bind(r.onReceived,function(n,r){t.call(i,r)}),i},stateChanged:function(t){var i=this;return n(i).bind(r.onStateChanged,function(n,r){t.call(i,r)}),i},error:function(t){var i=this;return n(i).bind(r.onError,function(n,r){t.call(i,r)}),i},disconnected:function(t){var i=this;return n(i).bind(r.onDisconnect,function(){t.call(i)}),i},connectionSlow:function(t){var i=this;return n(i).bind(r.onConnectionSlow,function(){t.call(i)}),i},reconnecting:function(t){var i=this;return n(i).bind(r.onReconnecting,function(){t.call(i)}),i},reconnected:function(t){var i=this;return n(i).bind(r.onReconnect,function(){t.call(i)}),i},stop:function(t,f){var e=this;if(e.state!==i.connectionState.disconnected){try{e.transport&&(f!==!1&&e.transport.abort(e,t),e.transport.supportsKeepAlive&&e.keepAliveData.activated&&i.transports._logic.stopMonitoringKeepAlive(e),e.transport.stop(e),e.transport=null),n(e).triggerHandler(r.onDisconnect),delete e.messageId,delete e.groupsToken,delete e.id,delete e._deferral}finally{u(e,e.state,i.connectionState.disconnected)}return e}},log:function(n){c(n,this.logging)}},i.fn.init.prototype=i.fn,i.noConflict=function(){return n.connection===i&&(n.connection=s),i},n.connection&&(s=n.connection),n.connection=n.signalR=i})(window.jQuery,window),function(n,t){"use strict";function u(f){var e=f.keepAliveData,o,s;f.state===i.connectionState.connected&&(o=new Date,o.setTime(o-e.lastKeepAlive),s=o.getTime(),s>=e.timeout?(f.log("Keep alive timed out.  Notifying transport that connection has been lost."),f.transport.lostConnection(f)):s>=e.timeoutWarning?e.userNotified||(f.log("Keep alive has been missed, connection may be dead/slow."),n(f).triggerHandler(r.onConnectionSlow),e.userNotified=!0):e.userNotified=!1),e.monitoring&&t.setTimeout(function(){u(f)},e.checkInterval)}function f(n){return n.state===i.connectionState.connected||n.state===i.connectionState.reconnecting}var i=n.signalR,r=n.signalR.events,e=n.signalR.changeState;i.transports={},i.transports._logic={pingServer:function(t,i){var f=i==="webSockets"?"":t.baseUrl,u=f+t.appRelativeUrl+"/ping",r=n.Deferred();return u=this.addQs(u,t),n.ajax({url:u,global:!1,cache:!1,type:"GET",contentType:t.contentType,data:{},dataType:t.ajaxDataType,success:function(n){n.Response==="pong"?r.resolve():r.reject("SignalR: Invalid ping response when pinging server: "+(n.responseText||n.statusText))},error:function(n){r.reject("SignalR: Error pinging server: "+(n.responseText||n.statusText))}}),r.promise()},addQs:function(t,i){var u=t.indexOf("?")!==-1?"&":"?",r;if(!i.qs)return t;if(typeof i.qs=="object")return t+u+n.param(i.qs);if(typeof i.qs=="string")return r=i.qs.charAt(0),(r==="?"||r==="&")&&(u=""),t+u+i.qs;throw new Error("Connections query string property must be either a string or object.");},getUrl:function(n,i,r,u){var o=i==="webSockets"?"":n.baseUrl,f=o+n.appRelativeUrl,e="transport="+i+"&connectionToken="+t.encodeURIComponent(n.token);return n.data&&(e+="&connectionData="+t.encodeURIComponent(n.data)),n.groupsToken&&(e+="&groupsToken="+t.encodeURIComponent(n.groupsToken)),r?(f+=u?"/poll":"/reconnect",n.messageId&&(e+="&messageId="+t.encodeURIComponent(n.messageId))):f+="/connect",f+="?"+e,f=this.addQs(f,n),f+="&tid="+Math.floor(Math.random()*11)},maximizePersistentResponse:function(n){return{MessageId:n.C,Messages:n.M,Disconnect:typeof n.D!="undefined"?!0:!1,TimedOut:typeof n.T!="undefined"?!0:!1,LongPollDelay:n.L,GroupsToken:n.G}},updateGroups:function(n,t){t&&(n.groupsToken=t)},ajaxSend:function(u,f){var e=u.url+"/send?transport="+u.transport.name+"&connectionToken="+t.encodeURIComponent(u.token);return e=this.addQs(e,u),n.ajax({url:e,global:!1,type:u.ajaxDataType==="jsonp"?"GET":"POST",contentType:i._.defaultContentType,dataType:u.ajaxDataType,data:{data:f},success:function(t){t&&n(u).triggerHandler(r.onReceived,[t])},error:function(t,i){i!=="abort"&&i!=="parsererror"&&n(u).triggerHandler(r.onError,[t,f])}})},ajaxAbort:function(i,r){if(typeof i.transport!="undefined"){r=typeof r=="undefined"?!0:r;var u=i.url+"/abort?transport="+i.transport.name+"&connectionToken="+t.encodeURIComponent(i.token);u=this.addQs(u,i),n.ajax({url:u,async:r,timeout:1e3,global:!1,type:"POST",contentType:i.contentType,dataType:i.ajaxDataType,data:{}}),i.log("Fired ajax abort async = "+r)}},processMessages:function(t,i){var u,f;if(t.transport){if(f=n(t),t.transport.supportsKeepAlive&&t.keepAliveData.activated&&this.updateKeepAlive(t),!i)return;if(u=this.maximizePersistentResponse(i),u.Disconnect){t.log("Disconnect command received from server"),t.stop(!1,!1);return}this.updateGroups(t,u.GroupsToken),u.Messages&&n.each(u.Messages,function(n,t){f.triggerHandler(r.onReceived,[t])}),u.MessageId&&(t.messageId=u.MessageId)}},monitorKeepAlive:function(t){var i=t.keepAliveData,f=this;i.monitoring?t.log("Tried to monitor keep alive but it's already being monitored"):(i.monitoring=!0,f.updateKeepAlive(t),t.keepAliveData.reconnectKeepAliveUpdate=function(){f.updateKeepAlive(t)},n(t).bind(r.onReconnect,t.keepAliveData.reconnectKeepAliveUpdate),t.log("Now monitoring keep alive with a warning timeout of "+i.timeoutWarning+" and a connection lost timeout of "+i.timeout),u(t))},stopMonitoringKeepAlive:function(t){var i=t.keepAliveData;i.monitoring&&(i.monitoring=!1,n(t).unbind(r.onReconnect,t.keepAliveData.reconnectKeepAliveUpdate),t.keepAliveData={},t.log("Stopping the monitoring of the keep alive"))},updateKeepAlive:function(n){n.keepAliveData.lastKeepAlive=new Date},ensureReconnectingState:function(t){return e(t,i.connectionState.connected,i.connectionState.reconnecting)===!0&&n(t).triggerHandler(r.onReconnecting),t.state===i.connectionState.reconnecting},clearReconnectTimeout:function(n){n&&n._.reconnectTimeout&&(t.clearTimeout(n._.reconnectTimeout),delete n._.reconnectTimeout)},reconnect:function(n,r){var u=i.transports[r],e=this;f(n)&&!n._.reconnectTimeout&&(n._.reconnectTimeout=t.setTimeout(function(){u.stop(n),e.ensureReconnectingState(n)&&(n.log(r+" reconnecting"),u.start(n))},n.reconnectDelay))},foreverFrame:{count:0,connections:{}}}}(window.jQuery,window),function(n,t){"use strict";var r=n.signalR,u=n.signalR.events,f=n.signalR.changeState,i=r.transports._logic;r.transports.webSockets={name:"webSockets",supportsKeepAlive:!0,send:function(n,t){n.socket.send(t)},start:function(e,o,s){var h,a=!1,l=this,c=!o,v=n(e);if(!t.WebSocket){s();return}e.socket||(h=e.webSocketServerUrl?e.webSocketServerUrl:e.wsProtocol+e.host,h+=i.getUrl(e,this.name,c),e.log("Connecting to websocket endpoint '"+h+"'"),e.socket=new t.WebSocket(h),e.socket.onopen=function(){a=!0,e.log("Websocket opened"),i.clearReconnectTimeout(e),o?o():f(e,r.connectionState.reconnecting,r.connectionState.connected)===!0&&v.triggerHandler(u.onReconnect)},e.socket.onclose=function(t){if(this===e.socket){if(a)typeof t.wasClean!="undefined"&&t.wasClean===!1?(n(e).triggerHandler(u.onError,[t.reason]),e.log("Unclean disconnect from websocket."+t.reason)):e.log("Websocket closed");else{s?s():c&&l.reconnect(e);return}l.reconnect(e)}},e.socket.onmessage=function(r){var f=t.JSON.parse(r.data),o=n(e);f&&(n.isEmptyObject(f)||f.M?i.processMessages(e,f):o.triggerHandler(u.onReceived,[f]))})},reconnect:function(n){i.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},stop:function(n){i.clearReconnectTimeout(n),n.socket!==null&&(n.log("Closing the Websocket"),n.socket.close(),n.socket=null)},abort:function(){}}}(window.jQuery,window),function(n,t){"use strict";var r=n.signalR,u=n.signalR.events,f=n.signalR.changeState,i=r.transports._logic;r.transports.serverSentEvents={name:"serverSentEvents",supportsKeepAlive:!0,timeOut:3e3,start:function(e,o,s){var h=this,l=!1,y=n(e),c=!o,v,a;if(e.eventSource&&(e.log("The connection already has an event source. Stopping it."),e.stop()),!t.EventSource){s&&(e.log("This browser doesn't support SSE."),s());return}v=i.getUrl(e,this.name,c);try{e.log("Attempting to connect to SSE endpoint '"+v+"'"),e.eventSource=new t.EventSource(v)}catch(p){e.log("EventSource failed trying to connect with error "+p.Message),s?s():(y.triggerHandler(u.onError,[p]),c&&h.reconnect(e));return}a=t.setTimeout(function(){l===!1&&(e.log("EventSource timed out trying to connect"),e.log("EventSource readyState: "+e.eventSource.readyState),c||h.stop(e),c?e.eventSource.readyState!==t.EventSource.CONNECTING&&e.eventSource.readyState!==t.EventSource.OPEN&&h.reconnect(e):s&&s())},h.timeOut),e.eventSource.addEventListener("open",function(){e.log("EventSource connected"),a&&t.clearTimeout(a),i.clearReconnectTimeout(e),l===!1&&(l=!0,o?o():f(e,r.connectionState.reconnecting,r.connectionState.connected)===!0&&y.triggerHandler(u.onReconnect))},!1),e.eventSource.addEventListener("message",function(n){n.data!=="initialized"&&i.processMessages(e,t.JSON.parse(n.data))},!1),e.eventSource.addEventListener("error",function(n){if(this===e.eventSource){if(!l){s&&s();return}e.log("EventSource readyState: "+e.eventSource.readyState),n.eventPhase===t.EventSource.CLOSED?(e.log("EventSource reconnecting due to the server connection ending"),h.reconnect(e)):(e.log("EventSource error"),y.triggerHandler(u.onError))}},!1)},reconnect:function(n){i.reconnect(n,this.name)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){i.ajaxSend(n,t)},stop:function(n){i.clearReconnectTimeout(n),n&&n.eventSource&&(n.log("EventSource calling close()"),n.eventSource.close(),n.eventSource=null,delete n.eventSource)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){"use strict";var r=n.signalR,f=n.signalR.events,e=n.signalR.changeState,i=r.transports._logic,u=function(){var u=null,f=1e3,i=0;return{prevent:function(){r._.ieVersion<=8&&(i===0&&(u=t.setInterval(function(){var t=n("<iframe style='position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;' src=''></iframe>");n("body").append(t),t.remove(),t=null},f)),i++)},cancel:function(){i===1&&t.clearInterval(u),i>0&&i--}}}();r.transports.foreverFrame={name:"foreverFrame",supportsKeepAlive:!0,timeOut:3e3,start:function(r,f,e){var s=this,h=i.foreverFrame.count+=1,c,o=n("<iframe data-signalr-connection-id='"+r.id+"' style='position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;' src=''></iframe>");if(t.EventSource){e&&(r.log("This browser supports SSE, skipping Forever Frame."),e());return}u.prevent(),c=i.getUrl(r,this.name),c+="&frameId="+h,n("body").append(o),o.prop("src",c),i.foreverFrame.connections[h]=r,r.log("Binding to iframe's readystatechange event."),o.bind("readystatechange",function(){n.inArray(this.readyState,["loaded","complete"])>=0&&(r.log("Forever frame iframe readyState changed to "+this.readyState+", reconnecting"),s.reconnect(r))}),r.frame=o[0],r.frameId=h,f&&(r.onSuccess=f),t.setTimeout(function(){r.onSuccess&&(r.log("Failed to connect using forever frame source, it timed out after "+s.timeOut+"ms."),s.stop(r),e&&e())},s.timeOut)},reconnect:function(n){var r=this;t.setTimeout(function(){if(n.frame&&i.ensureReconnectingState(n)){var u=n.frame,t=i.getUrl(n,r.name,!0)+"&frameId="+n.frameId;n.log("Updating iframe src to '"+t+"'."),u.src=t}},n.reconnectDelay)},lostConnection:function(n){this.reconnect(n)},send:function(n,t){i.ajaxSend(n,t)},receive:function(t,r){var u;i.processMessages(t,r),t.frameMessageCount=(t.frameMessageCount||0)+1,t.frameMessageCount>50&&(t.frameMessageCount=0,u=t.frame.contentWindow||t.frame.contentDocument,u&&u.document&&n("body",u.document).empty())},stop:function(t){var r=null;if(u.cancel(),t.frame){if(t.frame.stop)t.frame.stop();else try{r=t.frame.contentWindow||t.frame.contentDocument,r.document&&r.document.execCommand&&r.document.execCommand("Stop")}catch(f){t.log("SignalR: Error occured when stopping foreverFrame transport. Message = "+f.message)}n(t.frame).remove(),delete i.foreverFrame.connections[t.frameId],t.frame=null,t.frameId=null,delete t.frame,delete t.frameId,t.log("Stopping forever frame")}},abort:function(n,t){i.ajaxAbort(n,t)},getConnection:function(n){return i.foreverFrame.connections[n]},started:function(t){t.onSuccess?(t.onSuccess(),t.onSuccess=null,delete t.onSuccess):e(t,r.connectionState.reconnecting,r.connectionState.connected)===!0&&n(t).triggerHandler(f.onReconnect)}}}(window.jQuery,window),function(n,t){"use strict";var r=n.signalR,f=n.signalR.events,e=n.signalR.changeState,u=n.signalR.isDisconnecting,i=r.transports._logic;r.transports.longPolling={name:"longPolling",supportsKeepAlive:!1,reconnectDelay:3e3,init:function(n,r){var e=this,f,o=function(i){u(n)===!1&&(n.log("SignalR: Server ping failed because '"+i+"', re-trying ping."),t.setTimeout(f,e.reconnectDelay))};n.log("SignalR: Initializing long polling connection with server."),f=function(){i.pingServer(n,e.name).done(r).fail(o)},f()},start:function(o,s){var a=this,y=!1,p=function(){y||(y=!0,s(),o.log("Longpolling connected"))},l=0,c=null,v=function(i){t.clearTimeout(c),c=null,e(o,r.connectionState.reconnecting,r.connectionState.connected)===!0&&(o.log("Raising the reconnect event"),n(i).triggerHandler(f.onReconnect))},w=36e5;o.pollXhr&&(o.log("Polling xhr requests already exists, aborting."),o.stop()),a.init(o,function(){o.messageId=null,t.setTimeout(function(){(function e(s,h){var g=s.messageId,k=g===null,y=!k,d=!h,b=i.getUrl(s,a.name,y,d);u(s)!==!0&&(o.log("Attempting to connect to '"+b+"' using longPolling."),s.pollXhr=n.ajax({url:b,global:!1,cache:!1,type:"GET",dataType:o.ajaxDataType,contentType:o.contentType,success:function(r){var o=0,f;(l=0,c!==null&&v(),p(),r&&(f=i.maximizePersistentResponse(r)),i.processMessages(s,r),f&&n.type(f.LongPollDelay)==="number"&&(o=f.LongPollDelay),f&&f.Disconnect)||u(s)!==!0&&(o>0?t.setTimeout(function(){e(s,!1)},o):e(s,!1))},error:function(u,h){if(t.clearTimeout(c),c=null,h==="abort"){o.log("Aborted xhr requst.");return}l++,o.state!==r.connectionState.reconnecting&&(o.log("An error occurred using longPolling. Status = "+h+". "+u.responseText),n(s).triggerHandler(f.onError,[u.responseText])),i.ensureReconnectingState(s),a.init(s,function(){e(s,!0)})}}),y&&h===!0&&(c=t.setTimeout(function(){v(s)},Math.min(1e3*(Math.pow(2,l)-1),w))))})(o),t.setTimeout(function(){p()},250)},250)})},lostConnection:function(){throw new Error("Lost Connection not handled for LongPolling");},send:function(n,t){i.ajaxSend(n,t)},stop:function(n){n.pollXhr&&(n.pollXhr.abort(),n.pollXhr=null,delete n.pollXhr)},abort:function(n,t){i.ajaxAbort(n,t)}}}(window.jQuery,window),function(n,t){"use strict";function u(n){return n+s}function o(n,t,i){for(var f=n.length,u=[],r=0;r<f;r+=1)n.hasOwnProperty(r)&&(u[r]=t.call(i,n[r],r,n));return u}function h(t){return n.isFunction(t)?null:n.type(t)==="undefined"?null:t}function e(n){for(var t in n)if(n.hasOwnProperty(t))return!0;return!1}function f(n,t){var u=n._.invocationCallbacks,i,r;n.log("Clearing hub invocation callbacks with error: "+t),n._.invocationCallbackId=0,delete n._.invocationCallbacks,n._.invocationCallbacks={};for(r in u)i=u[r],i.method.call(i.scope,{E:t})}function r(n,t){return new r.fn.init(n,t)}function i(t,r){var u={qs:null,logging:!1,useDefaultPath:!0};return n.extend(u,r),(!t||u.useDefaultPath)&&(t=(t||"")+"/signalr"),new i.fn.init(t,u)}var s=".hubProxy";r.fn=r.prototype={init:function(n,t){this.state={},this.connection=n,this.hubName=t,this._={callbackMap:{}}},hasSubscriptions:function(){return e(this._.callbackMap)},on:function(t,i){var f=this,r=f._.callbackMap;return t=t.toLowerCase(),r[t]||(r[t]={}),r[t][i]=function(n,t){i.apply(f,t)},n(f).bind(u(t),r[t][i]),f},off:function(t,i){var f=this,o=f._.callbackMap,r;return t=t.toLowerCase(),r=o[t],r&&(r[i]?(n(f).unbind(u(t),r[i]),delete r[i],e(r)||delete o[t]):i||(n(f).unbind(u(t)),delete o[t])),f},invoke:function(i){var r=this,u=r.connection,c=n.makeArray(arguments).slice(1),l=o(c,h),e={H:r.hubName,M:i,A:l,I:u._.invocationCallbackId},f=n.Deferred(),s=function(t){var i=r._maximizeHubResponse(t);n.extend(r.state,i.State),i.Error?(i.StackTrace&&u.log(i.Error+"\n"+i.StackTrace),f.rejectWith(r,[i.Error])):f.resolveWith(r,[i.Result])};return u._.invocationCallbacks[u._.invocationCallbackId.toString()]={scope:r,method:s},u._.invocationCallbackId+=1,n.isEmptyObject(r.state)||(e.S=r.state),u.send(t.JSON.stringify(e)),f.promise()},_maximizeHubResponse:function(n){return{State:n.S,Result:n.R,Id:n.I,Error:n.E,StackTrace:n.T}}},r.fn.init.prototype=r.fn,i.fn=i.prototype=n.connection(),i.fn.init=function(i,r){var o={qs:null,logging:!1,useDefaultPath:!0},e=this;n.extend(o,r),n.signalR.fn.init.call(e,i,o.qs,o.logging),e.proxies={},e._.invocationCallbackId=0,e._.invocationCallbacks={},e.received(function(t){var i,o,f,r,h,s;t&&(typeof t.I!="undefined"?(f=t.I.toString(),r=e._.invocationCallbacks[f],r&&(e._.invocationCallbacks[f]=null,delete e._.invocationCallbacks[f],r.method.call(r.scope,t))):(i=this._maximizeClientHubInvocation(t),e.log("Triggering client hub event '"+i.Method+"' on hub '"+i.Hub+"'."),h=i.Hub.toLowerCase(),s=i.Method.toLowerCase(),o=this.proxies[h],n.extend(o.state,i.State),n(o).triggerHandler(u(s),[i.Args])))}),e.error(function(n,i){var f,r,u;if((!e.transport||e.transport.name!=="webSockets")&&i){try{if(f=t.JSON.parse(i),!f.I)return}catch(o){return}r=f.I,u=e._.invocationCallbacks[r],u.method.call(u.scope,{E:n}),e._.invocationCallbacks[r]=null,delete e._.invocationCallbacks[r]}}),e.reconnecting(function(){e.transport&&e.transport.name==="webSockets"&&f(e,"Connection started reconnecting before invocation result was received.")}),e.disconnected(function(){f(e,"Connection was disconnected before invocation result was received.")})},i.fn._maximizeClientHubInvocation=function(n){return{Hub:n.H,Method:n.M,Args:n.A,State:n.S}},i.fn._registerSubscribedHubs=function(){this._subscribedToHubs||(this._subscribedToHubs=!0,this.starting(function(){var i=[];n.each(this.proxies,function(n){this.hasSubscriptions()&&i.push({name:n})}),this.data=t.JSON.stringify(i)}))},i.fn.createHubProxy=function(n){n=n.toLowerCase();var t=this.proxies[n];return t||(t=r(this,n),this.proxies[n]=t),this._registerSubscribedHubs(),t},i.fn.init.prototype=i.fn,n.hubConnection=i}(window.jQuery,window),function(n){n.signalR.version="1.1.3"}(window.jQuery)
