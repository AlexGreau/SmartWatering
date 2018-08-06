// this file is dedicated to loading all built-in models buttons in the createNew modal to smoothen the process of adding a model to the list.

// buttons are in a list


// object to avoid global variable "selectedModel" for button validNewModel
class modelsFactory{
    constructor (dictOfModels, selected) {
        this.dictOf_models = dictOfModels;
        this.selectedModel = selected ;
    }

    addAllListeners(){
        for (var i in this.dictOf_models){
            var id = build_buttonID(i);
            var btn = document.getElementById(id);
            var temp = this;
            btn.onclick = function(){  
               temp.selectedModel = this.textContent;
               console.log (this.textContent + " pressed")
            }
        }
  /*      this.dictOf_models.forEach(element => {
            var id = build_buttonID(element);
            var btn = document.getElementById(id);
            var temp = this;
           btn.onclick = function(){  
               temp.selectedModel = element;
               console.log (element + " pressed")
            }
        })*/
    }

    addAllmodels(){
        var div = document.getElementById("listOfModels");
        var button;
        for (var i in this.dictOf_models){
            button = document.createElement("button");
            button.id =  build_buttonID(i);
            button.textContent = i;
            button.setAttribute("class", "button");
            div.appendChild(button);
        }
  /*      this.dictOf_models.forEach(element => {
            id = build_buttonID(element)
            button = document.createElement("button");
            button.id=  element + "Btn";
            button.textContent = id;
            button.setAttribute("class", "button");
            div.appendChild(button);
        });
  */  
        this.addAllListeners()
    }

    load_BuiltInModels(){    
        this.addAllmodels();
        console.log("finished loading all built in models \n")
    }

    getSelected(){
        return this.selectedModel;
    }
   
}

function build_buttonID(name){
    return "" + name + "Btn";
}









/*function buildID(name){
    return "" + name + "Btn";
}

function addAllListeners(listOfModels){
    listOfModels.forEach(element => {
        var id = buildID(element);
        var btn = document.getElementById(id);
       btn.onclick = function(){  
            console.log(id + " button pressed");
        }
    })
}

function addAllmodels(listOfModels){
    var div = document.getElementById("listOfModels");
    var id,button;
    listOfModels.forEach(element => {
        id = buildID(element)
        button = document.createElement("button");
        button.id=  element + "Btn";
        button.textContent = id;
        button.setAttribute("class", "button");
        div.appendChild(button);
    });

    addAllListeners(listOfModels)
}


function load_BuiltInModels(modelsList){
    var modelsList = ["cactus", "tomato","defaut"];

    addAllmodels(modelsList);
    console.log("finished loading all built in models \n")
}*/