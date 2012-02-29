PhoneList.events = {};

PhoneList.events.bind = function() {
    var openCloseTrigger = document.getElementsByClassName('openCloseTrigger');
    var i = openCloseTrigger.length;

    while (i--) {
        openCloseTrigger[i].addEventListener('click', function() {
            if (this.getElementsByTagName('div')[0].style.display !== 'block') {
                this.getElementsByTagName('div')[0].style.display = 'block';
            } else {
                this.getElementsByTagName('div')[0].style.display = 'none';
            }
        })
    }
}
