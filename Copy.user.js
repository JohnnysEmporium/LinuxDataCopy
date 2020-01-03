// ==UserScript==
// @name         Copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://arcelormittalprod.service-now.com/*
// @grant        GM_setClipboard
// ==/UserScript==

'use strict';



function run_all(){

    if(document.readyState === 'complete'){
        clearTimeout(timeout);

        if(document.getElementById('incident.form_header') !== null){
            console.log('COPY')


            function copying(){
                var description = document.getElementById('incident.description').innerHTML;
                var server = document.getElementById('sys_display.incident.cmdb_ci').value
                var copy
                if(description.slice(0,30) == "Queue deph high sur le Serveur") {
                    var array = description.split(" ");
                    console.log(array);
                    copy = array[7] + " " + array[10] + " " + array[13];
                    GM_setClipboard(copy);
                    console.log(copy)
                } else if(description.slice(0,35) == "Probleme sur de channel sur le Serv"){
                    var array2 = description.split(" ");
                    console.log(array2);
                    copy = array2[8] + " " + array2[11] + " " + array2[14];
                    GM_setClipboard(copy);
                    console.log(copy)
                } else if(description.slice(0,9) == "Profile: " || description.slice(0,9) == "profile: "){
                    var array3 = description.split(" ");
                    console.log(array3);
                    copy = server + " " + array3[1] + " " + array3[5];
                    GM_setClipboard(copy);
                    console.log(copy)
                } else if(description.slice(0,13) == "Redemarrage d" || description.slice(0,13) == "redemarrage d"){
                    var service = description.slice(description.search("vice '")+6, description.search("' ne "))
                    copy = "\"" + server + "\" \"" + service + "\""
                    GM_setClipboard(copy)
                } else if(description.slice(0,10) == "Instance: " || description.slice(0,10) == "instance: "){
                    var instance = description.slice(description.search('ce: ')+4, description.search('ERROR')-14)
                    copy = "\"" + server + "\" \"" + instance + "\""
                    GM_setClipboard(copy)
                } else if(description.slice(0,21) == "The check of the file" || description.slice(0,21) == "the check of the file"){
                    var location = description.slice(23, description.search("' is"))
                    copy = "\"" + server + "\" \"" + location + "\""
                    GM_setClipboard(copy)
                } else {
                    var server_only = document.getElementById('sys_display.incident.cmdb_ci').value
                    if(server_only.search('-') !== -1){
                        server_only = server_only + '.armony.net';
                    } else {
                        server_only = server_only + '.appliarmony.net';
                    };
                    GM_setClipboard(server_only)
                };
            };

            function copying2(){
                var server_only = document.getElementById('sys_display.incident.cmdb_ci').value
                GM_setClipboard(server_only)
            };

            //ALT+1
            document.addEventListener('keydown', function(e){
                if (e.keyCode == 49 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
                    copying();
                }
                if (e.keyCode == 50 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
                    copying2();
                };
            }, false);

        };

    } else {
        console.log('timeout');
        var timeout = setTimeout(run_all, 100);
        timeout;
    };
};

run_all();
