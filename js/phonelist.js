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
      var i = contacts.length;
      while (i--) {
          if (contacts[i].ID === userId) {
              var contact = contacts[i];
              break;
          }
      }
      
      $('#detailHeader').html(contact.vorname + ' ' + contact.nachname    );
      
      var listItem = document.createElement('li');
      var markup = '<li>' + 
                       '<h2>' + contact.vorname + ' ' + contact.nachname + '</h2>' + 
                       '<p>Abteilung: ' + contact.abteilung + '</p>' +
                       '<p>Durchwahl: ' + contact.durchwahl + '</p>' + 
                       '<p>Nummer: <a href="tel:' + contact.nummer + '">' + contact.nummer + '</a></p>' + 
                       '<p>E-Mail: <a href="mailto:' + contact.mail + '">' + contact.mail + '</a></p>' +
                       '<p>Handy: <a href="tel:' + contact.handy + '">' + contact.handy + '</a></p>' +
                       '<p>Skype: <a href="tel:' + contact.skype + '">' + contact.skype + '</a></p>' +
                   '</li>';
      listItem.innerHTML = markup;   
      
      contactDetail.children().remove();
      contactDetail.append(listItem);
      
      window.setTimeout(function() {
          $('#contactDetail').listview('refresh');
      }, 200);
    });
}

function initPhonelist() {
    $.getJSON("mock/phoneMock.json", function(data) {
        fillContactList(data);
    }); 
}
