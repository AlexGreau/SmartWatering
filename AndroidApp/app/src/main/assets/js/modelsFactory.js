// this file is dedicated to loading all built-in models buttons in the createNew modal to smoothen the process of adding a model to the list.

// object to avoid global variable "selectedModel" for button validNewModel
class modelsFactory{
    constructor (dictOfModels, selected) {
        this.dictOf_models = dictOfModels;
        this.selectedModel = selected;
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
    }

    addAllmodels(){
        var div = document.getElementById("listOfModels");
        var button;
        div.innerHTML = "";
        for (var i in this.dictOf_models){
            button = document.createElement("button");
            button.id =  build_buttonID(i);
            button.textContent = i;
            button.setAttribute("class", "button");
            div.appendChild(button);
        }
        this.addAllListeners();
        console.log("finished loading all built in models \n");
    }

    getSelected(){
        return this.selectedModel;
    }

    addModel(name, xml){
        this.dictOf_models[name] = xml;
    }

    loadSelectedModelIntoWorkspace() {
        var workspaceBlocks = Blockly.Xml.textToDom(this.dictOf_models[this.selectedModel]);

        // Clear and Load blocks to workspace.
        Blockly.mainWorkspace.clear();
        Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
        console.log("model loaded");
    }
   
}

function build_buttonID(name){
    return "" + name + "Btn";
}