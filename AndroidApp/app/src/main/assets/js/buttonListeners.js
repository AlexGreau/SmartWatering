var xmlDom;
var xmlText;

var objectId;

function setButtonListeners(){
    setWindowListener();
    // menu button
    setMenuButtonListeners();
   
    // inside the menu :
    setCreateNewButtonListener();
    setSaveButtonListener();
    setSendButtonListener();
    validModelListener()
}

function setWindowListener(){
    var menu = document.getElementById('menuModal');
    var createnew = document.getElementById('createModal');
    window.onclick = function (event) {
        if (event.target == menu) {
            menuBtn.classList.toggle("change");
            menu.style.display = "none";
        }else if (event.target == createnew){
            createnew.style.display = "none";
        }
    }
}

function setMenuButtonListeners() {
    // Get the modal
    var modal = document.getElementById('menuModal');

    // Get the button that opens the modal
    var menuBtn = document.getElementById('menuBtn');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks on the button, open the modal
    menuBtn.onclick = function () {
        menuBtn.classList.toggle("change");
        modal.style.display = "block";
        // refresh models dict to make appear new saved models
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        menuBtn.classList.toggle("change");
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
}

function setObjectId(id) {
    objectId = id;
}

function getAllProg() {
objectId = "5b7a735762eb1808538b048b";
    var xhr = new XMLHttpRequest();
    var myURL = "http://134.59.129.150:8080/api/getallprog";
    xhr.open('GET', myURL+"?id="+objectId, true);
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Request finished. Do processing here.
            console.log(objectId + " _______ "+xhr.responseText);
            objectFromDB = xhr.responseText;
        }
    };

    xhr.onload = function () {};
    xhr.send(null);
}

function setCreateNewButtonListener(){
    var createBtn = document.getElementById("createBtn");
    var createModal = document.getElementById('createModal');
    createBtn.onclick = function(){
        var open = true;
        //refresh models ?
       // modelsFact.load_Models() // bugged
       getAllProg()
        console.log("create New button pressed");

        createModal.style.display = "block";
    }
}

function setSaveButtonListener(){

    var createBtn = document.getElementById("saveBtn");
    createBtn.onclick = function(){
        xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
        xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        console.log(xmlText);
        console.log('export ok');

        var titre = prompt("Please enter your programm name", "");


// Creation du formulaire
        var xhttp = new XMLHttpRequest();
        var myURL = "http://134.59.129.150:8080/api/saveprog";
        xhttp.open("POST", myURL, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Request finished. Do processing here.
                // document.getElementById("demo").innerHTML = this.responseText;
            }
        };

        if (titre != null) {
            xhttp.send("id=" + objectId + "&t=" + titre + "&p=" + xmlText);
            console.log('TITRE ' + titre + ' PROGRAM ' + xmlText + "ID "+objectId);
        }

        document.getElementById("menuModal").style.display = "none";
        document.getElementById('menuBtn').classList.toggle("change");

    }
}

function setSendButtonListener(){
    var createBtn = document.getElementById("sendBtn");
    // TODO : get Programm and send that
    createBtn.onclick = function() {
        var xml = Blockly.Xml.workspaceToDom(workspace);
        var xml_text = Blockly.Xml.domToText(xml);
//        console.error(xml_text);

        // Creation du formulaire
        var xhttp = new XMLHttpRequest();
        var myURL = "http://134.59.129.150:8080/api/setprog";
        xhttp.open("POST", myURL, true);
        // Send the proper header information along with the request
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhttp.onreadystatechange = function() {//Call a function when the state changes.
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                // Request finished. Do processing here.
                // document.getElementById("demo").innerHTML = this.responseText;
            }
        };

        xhttp.send("id=" + objectId + "&p=" + xml_text);
//        console.log("id=" + myURL);
        document.getElementById("menuModal").style.display = "none";
        document.getElementById('menuBtn').classList.toggle("change");
    }
}

function validModelListener(){
    var validCreate = document.getElementById("validCreate");
    var name;
    // listeners sur chaque button ?
    validCreate.onclick = function (){
        name = modelsFact.getSelected();
        loadModel(name);
        console.log("creating.." + name);
        document.getElementById("createModal").style.display = "none";
        document.getElementById("menuModal").style.display = "none";
        document.getElementById('menuBtn').classList.toggle("change");
    } 
}

