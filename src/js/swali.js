// derived from http://www.degraeve.com/reference/simple-ajax-example.php
function xmlhttpPost(strURL) {
    var xmlHttpReq = false;
    var self = this;
    if (window.XMLHttpRequest) { // Mozilla/Safari
        self.xmlHttpReq = new XMLHttpRequest(); 
    }
    else if (window.ActiveXObject) { // IE
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.open('POST', strURL, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
            updatepage(self.xmlHttpReq.responseText);
        }
    }

    var params = getstandardargs().concat(getquerystring());
    var strData = params.join('&');
    self.xmlHttpReq.send(strData);
}
function getstandardargs() {
    var params = [
        'wt=json'
        , 'indent=true'
        , 'hl=true'
        , 'hl.fl=name,features'
        ];

    return params;
}
function getquerystring() {
    var form = document.forms['f1'];
    var query = form.query.value;
    qstr = 'q=' + escape(query);
    return qstr;
}

function check_verb (word) {
    var p = /(ni|u|a|tu|m|mu|wa|i|li|ya|ki|vi|zi|ku|pa)(li|ta|na|me)?[a-z]{3}/i;
    return (word.search (p) == 0);
} 

function remove_suffixes (word) {
    var p = /(?=(n|w)a$)/i;
    var s = word.search(p);
    if (s == -1) {
        return word;
    } else {
        return word.replace (p, "a");
    }
}

function remove_prefixes (word) {

}

// returns a possible list of queries
function generate_stem(query) {
    var result = [eval ("("+query+")"), ""];
    var list_query = query.split (" ");
    for (var i =0 ; i < list_query.length ; i++) {
        if (check_verb(list_query[i])) {
            // remove the suffixes
            list_query[i] = remove_suffixes (list_query[i]);
        }
        result[1] += list_query[i];
    }
    return result;
}

// this function does all the work of parsing the solr response and updating the page.
function updatepage(str){
    var resp = eval("("+str+")");                         // use eval to parse Solr's JSON response
    //printing the raw json data
    document.getElementById("raw").innerHTML = str;
    var html= "<br>Number of Results=" + resp.response.numFound+"<br>";
    // if (resp.response.numFound != 0) {
        // html += "Displaying results for " + generate_stem ((document.forms['f1'].query.value)).join (", ") +"<br><br>";
    // }
    document.getElementById("result").innerHTML = html;
    var first = resp.response.docs[0];
    // print all the results
    for(var i = 0; i < resp.response.docs.length; i++){
        var curdoc = resp.response.docs[i];
        // html += "<h4>"+curdoc.title+"</h4>";
        // html += curdoc.description+"<br>";
        var resource_name = curdoc.resourcename[0];
        var found_index = resource_name.search ("/./");
        var link = "." + resource_name.substring(found_index + 1, resource_name.length);
        // console.log(link);
        html += "<a href="+link+">"+curdoc.title+"</a>";
        html += "<br>";
    } 
  
    // dunno what this highlighting shit is. stuff on bottom of page
    var hl=resp.highlighting[first.id];
    if (hl.name != null) { html += "<br>name highlighted: " + hl.name[0]; }
    if (hl.features != null) { html += "<br>features highligted: " + hl.features[0]; }
    document.getElementById("result").innerHTML = html;
}
