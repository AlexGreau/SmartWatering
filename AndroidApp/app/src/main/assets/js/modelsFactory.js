// this file is dedicated to loading all built-in models buttons in the createNew modal to smoothen the process of adding a model to the list.
// buttons are in a list

function buildID(name){
    return "" + name;
}

function addAllmodels(listOfModels){
    var ul = document.getElementById("listOfModels");
    var li,id;
    listOfModels.forEach(element => {
        id = buildID(element)
        li = document.createElement("li");
        li.appendChild(document.createTextNode(id));
        li.setAttribute(id,"zeub")
        ul.appendChild(li);
    });
}


function load_BuiltInModels(){
    var modelsList = ["cact", "tom","default"];

    addAllmodels(modelsList);
    console.log("finished loading all built in models \n")
}