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

// renders contact list elements
PhoneList.view.fillContactList = function() {
    var contEl = document.getElementById('contacts');
    if ('object' == typeof contEl) {
        var i = PhoneList.data.contacts.length;
        while (i--) {
            contEl.innerHTML += doTemplate('<span><a href="#">{vorname} {nachname}' +
                                           '<span class="detail">{abteilung}</span>' +
                                           '<span class="detail">{durchwahl}</span>' +
                                           '<span class="detail">{nummer}</span>' +
                                           '<span class="detail">{handy}</span>' +
                                           '<span class="detail">{skype}</span></a>' +
                                           '</span>', PhoneList.data.contacts[i]);
        }
    }
}

PhoneList.data.retrieveContacts = function() {
    var contacts = localStorage.getItem('contacts');

    if (null !== contacts) {
        PhoneList.data.contacts = JSON.parse(contacts);
        PhoneList.view.fillContactList();
        return;
    } else {
        microAjax("mock/phoneMock.json", function (res) {
            PhoneList.data.contacts = JSON.parse(res);
            localStorage.setItem('contacts', res);
            PhoneList.view.fillContactList();
        });
        return;
    }
};

// Loads data from localStorage or via XHR - calls ready() once data is ready
domready(function () {
    PhoneList.data.retrieveContacts();
});