// ###### js/tweettemplate.js ######
// Big thanks to Thomas Fuchs for this one.
// http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
function doTemplate(s,d){
    for (var p in d) {
        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
    }
    return s;
}
// ###### js/microajax.min.js ######
function microAjax(B,A){this.bindFunction=function(E,D){return function(){return E.apply(D,[D])}};this.stateChange=function(D){if(this.request.readyState==4){this.callbackFunction(this.request.responseText)}};this.getRequest=function(){if(window.ActiveXObject){return new ActiveXObject("Microsoft.XMLHTTP")}else{if(window.XMLHttpRequest){return new XMLHttpRequest()}}return false};this.postBody=(arguments[2]||"");this.callbackFunction=A;this.url=B;this.request=this.getRequest();if(this.request){var C=this.request;C.onreadystatechange=this.bindFunction(this.stateChange,this);if(this.postBody!==""){C.open("POST",B,true);C.setRequestHeader("X-Requested-With","XMLHttpRequest");C.setRequestHeader("Content-type","application/x-www-form-urlencoded");C.setRequestHeader("Connection","close")}else{C.open("GET",B,true)}C.send(this.postBody)}};
// ###### js/phonelist.js ######
var PhoneList = { contacts: {} };
PhoneList.getContacts = (function() {
    var contacts = localStorage.getItem('contacts');

    if (null !== contacts) {
        PhoneList.contacts = JSON.parse(contacts);
        return;
    }

    microAjax("mock/phoneMock.json", function (res) {
        PhoneList.contacts = JSON.parse(res);
        localStorage.setItem('contacts', res);
    });
})();


