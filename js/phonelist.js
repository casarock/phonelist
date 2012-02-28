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
            contEl.innerHTML += doTemplate('<span style="display: block;">{vorname} {nachname}</span>', PhoneList.data.contacts[i]);
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
