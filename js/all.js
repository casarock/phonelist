//js/tweettemplate.js
// Big thanks to Thomas Fuchs for this one.
// http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
function doTemplate(s,d){
    for (var p in d) {
        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
    }
    return s;
}
//js/phonelist.js
// first line
