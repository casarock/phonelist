// ###### js/ready.js ######
/*
  * domready (c) Dustin Diaz 2012 - License MIT
  */
!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('domready', function (ready) {

  var fns = [], fn, f = false
    , doc = document
    , testEl = doc.documentElement
    , hack = testEl.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , addEventListener = 'addEventListener'
    , onreadystatechange = 'onreadystatechange'
    , readyState = 'readyState'
    , loaded = /^loade|c/.test(doc[readyState])

  function flush(f) {
    loaded = 1
    while (f = fns.shift()) f()
  }

  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f)
    flush()
  }, f)


  hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
      doc.detachEvent(onreadystatechange, fn)
      flush()
    }
  })

  return (ready = hack ?
    function (fn) {
      self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
          try {
            testEl.doScroll('left')
          } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
          }
          fn()
        }()
    } :
    function (fn) {
      loaded ? fn() : fns.push(fn)
    })
})
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
// check dependencies
if ('function' != typeof microAjax) {
    console.log('missing microAjax');
}
if ('function' != typeof doTemplate) {
    console.log('missing tweettemplate');
}
if ('function' != typeof domready) {
    console.log('missing domready');
}

var PhoneList = {};
PhoneList.data = {};
PhoneList.view = {};

// builds app after data has been loaded
PhoneList.data.ready = function() {
    domready(function () {
        PhoneList.view.fillContactList();
    })
}

// renders contact list elements
PhoneList.view.fillContactList = function() {
    var contEl = document.getElementById('contacts');
    if ('object' == typeof contEl) {
        var i = PhoneList.data.contacts.length;
        while (i--) {
            contEl.innerHTML += doTemplate('<span><span>{vorname} {nachname}</span>' +
                                           '<span class="detail">{abteilung}</span>' +
                                           '<span class="detail">{durchwahl}</span>' +
                                           '<span class="detail">{nummer}</span>' +
                                           '<span class="detail">{handy}</span>' +
                                           '<span class="detail">{skype}</span>' +
                                           '</span>', PhoneList.data.contacts[i]);
        }
    }
}

// Loads data from localStorage or via XHR - calls ready() once data is ready
PhoneList.data.retrieveContacts = (function() {
    var contacts = localStorage.getItem('contacts');

    if (null !== contacts) {
        PhoneList.data.contacts = JSON.parse(contacts);
    } else {
        microAjax("mock/phoneMock.json", function (res) {
            PhoneList.data.contacts = JSON.parse(res);
            localStorage.setItem('contacts', res);
        });
    }
    PhoneList.data.ready();
})();

