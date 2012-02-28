var PhoneList = {};
PhoneList.data = {};
PhoneList.view = {};

PhoneList.data.retrieveContacts = (function() {
    var contacts = localStorage.getItem('contacts');

    if (null !== contacts) {
        PhoneList.data.contacts = JSON.parse(contacts);
        return;
    }

    microAjax("mock/phoneMock.json", function (res) {
        PhoneList.data.contacts = JSON.parse(res);
        localStorage.setItem('contacts', res);
    });
})();

PhoneList.view.getContactList = function() {

}

PhoneList.view.getDetailById = function() {

}