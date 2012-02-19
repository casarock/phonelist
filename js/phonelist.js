function fillContactList(contacts) {
    // overview page
    var contactList = $('#contactList');
    var i = contacts.length;
    while (i--) {
        var listItem = document.createElement('li');
            var para = document.createElement('p');
                para.innerHTML = 'Durchwahl ' + contacts[i].durchwahl;

            var link = document.createElement('a');
                link.setAttribute('href', '#detail');
                link.setAttribute('class', 'detailLink');
                link.setAttribute('data-userid', contacts[i].ID);
                link.innerHTML = contacts[i].vorname + ' ' + contacts[i].nachname;
                link.appendChild(para);

            listItem.appendChild(link);
        contactList.append(listItem);
    }
    contactList.listview('refresh');

    // detail page
    $('.detailLink').bind('click', function() {
        var userId        = this.getAttribute('data-userid');
        var contactDetail = $('#contactDetail');
            contactDetail.children().remove();
        var i = contacts.length;
        while (i--) {
            if (contacts[i].ID === userId) {
                var contact = contacts[i];
                break;
            }
        }

        $('#detailHeader').html(contact.vorname + ' ' + contact.nachname);

        var listItem = document.createElement('li');
            var heading  = document.createElement('h2');
                heading.innerHTML = contact.vorname + ' ' + contact.nachname;
            var para1    = document.createElement('p');
                para1.innerHTML = 'Abteilung: ' + contact.abteilung;
            var para2    = document.createElement('p');
                para2.innerHTML = 'Durchwahl: ' + contact.durchwahl;
            var para3    = document.createElement('p');
                para3.innerHTML = 'Nummer: ' + contact.nummer;
            var para4    = document.createElement('p');
                para4.innerHTML = 'E-Mail: ' + contact.email;
            var para5    = document.createElement('p');
                para5.innerHTML = 'Handy: ' + contact.handy;
            var para6    = document.createElement('p');
                para6.innerHTML = 'Skype: ' + contact.skype;
                
            listItem.appendChild(heading);
            listItem.appendChild(para1);
            listItem.appendChild(para2);
            listItem.appendChild(para3);
            listItem.appendChild(para4);
            listItem.appendChild(para5);
            listItem.appendChild(para6);

            contactDetail.append(listItem);

        window.setTimeout(function() {
          $('#contactDetail').listview('refresh');
        }, 400);
    });
}

function initPhonelist() {
    $.getJSON("mock/phoneMock.json", function(data) {
        fillContactList(data);
    }); 
}
