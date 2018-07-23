// this file is dedicated to loading all built-in models buttons in the createNew modal to smoothen the process of adding a model to the list.
// buttons are in a list

function buildID(name){
    return "" + name;
}

function addAllmodels(listOfModels){
    var div = document.getElementById("listOfModels");
    var li,id,button;
    listOfModels.forEach(element => {
        id = buildID(element)
        button = document.createElement("button");
        button.id=  element + "Btn";
        button.textContent = id;
        button.setAttribute("class", "button")
        div.appendChild(button);
    });
}


function load_BuiltInModels(){
    var modelsList = ["cact", "tom","default"];

    addAllmodels(modelsList);
    console.log("finished loading all built in models \n")
}