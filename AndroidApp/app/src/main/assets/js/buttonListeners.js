

function setButtonListeners(){
    setWindowListener();
    // menu button
    setMenuButtonListeners();
   
    // inside the menu :
    setCreateNewButtonListener();
    setTestsButtonListener();
    setSendButtonListener();
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
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        menuBtn.classList.toggle("change");
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it

}

function setCreateNewButtonListener(){
    var createBtn = document.getElementById("createBtn");
    var createModal = document.getElementById('createModal');
    createBtn.onclick = function(){
        var open = true;
        console.log("create New button pressed");
        createModal.style.display = "block";
  /*      window.onclick = function (event) {
            if (open == true && event.target == createModal) {
                createModal.style.display = "none";
                open = false;
            }
            console.log("open create = "  + open);
        }*/
    }
}

function setTestsButtonListener(){
    var createBtn = document.getElementById("testsBtn");
    createBtn.onclick = function(){
        console.log("Tests Button pressed");
    }
}

function setSendButtonListener(){
    var createBtn = document.getElementById("sendBtn");
    createBtn.onclick = function(){
        console.log("Send button pressed");
    }
}

function createNewModel(){
    console.log ("creating new model now")
    // loadModel(name)
}