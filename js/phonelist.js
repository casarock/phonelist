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
            contEl.innerHTML += doTemplate('<span class="openCloseTrigger">' +
                                               '<span href="#">{vorname} {nachname}' +
                                                    '<div class="detail">' +
                                                        '<span>Abteilung: {abteilung}</span>' +
                                                        '<span>Nummer: ' +
                                                            '<a href="tel:+4961312120{durchwahl}">+4961312120{durchwahl}</a>' +
                                                        '</span>' +
                                                        '<span>Nummer: ' +
                                                            '<a href="tel:{nummer}">{nummer}</a>' +
                                                        '</span>' +
                                                        '<span>Handy: ' +
                                                            '<a href="tel:{handy}">{handy}</a>' +
                                                        '</span>' +
                                                        '<span>Skype: {skype}</span>' +
                                                    '</div>' +
                                               '</span>' +
                                           '</span>', PhoneList.data.contacts[i]);
        }
    }
    PhoneList.events.bind();
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

// Starts the app by retrieving the contacts
domready(function () {
    if (window.navigator.standalone == false) {
        window.scrollTo(0, 1);
    }
    PhoneList.data.retrieveContacts();
});