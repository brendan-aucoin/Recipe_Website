//all the global variables
const startingIngredientFields = 3;
const startingInstructionAreas = 2;
let currentNumIngredients = 0;
let currentNumInstructions = 0;
const ENTER_BUTTON = 13;

//call main and input once the document is ready
$(document).ready(function(){
   main();
   // input
   input();
});

//starts off my creating both ingredient and instruction lists
function main(){
   createIngredientList(startingIngredientFields);
   createInstructionList(startingInstructionAreas);
}

// handles the input for adding ingredients and instructions
function input(){
   addInput();
}

//creates a division containing the remove button and the input field
function createIngredientList(amount = 1){
   const container = document.getElementById("insert-ingredients-container");
   //creating the remove button tag
   for(let i =0; i < amount; i++){
      //creating the div tag
      let ingredientContainerTag = document.createElement('div');
      ingredientContainerTag.setAttribute('class',"ingredient-container");
      ingredientContainerTag.setAttribute("index",currentNumIngredients+1);
      //creating the remove button tag
      let removeIngredientButtonTag = createRemoveButton("delete-ingredient-button",currentNumIngredients,removeIngredientField);

      //creating the text field tag
      let ingredientTextFieldTag = createIngredientTextField();
      
      //adding everything to the ingredient container div
      ingredientContainerTag.appendChild(removeIngredientButtonTag);
      ingredientContainerTag.appendChild(ingredientTextFieldTag);
      //adding all the child elements to the parent container
      container.appendChild(ingredientContainerTag);
      currentNumIngredients++;
   }
}

 //creates an amount of instruction containers with the proper children elements
 function createInstructionList(amount = 1){
   const container = document.getElementById("insert-instructions-container");
   for(let i=0; i < amount; i++){
      let instructionContainerTag = document.createElement("div");
      instructionContainerTag.setAttribute("class","instruction-container");
      instructionContainerTag.setAttribute("index",currentNumInstructions+1);
      //creating the remove button
      let removeInstructionButtonTag = createRemoveButton("delete-instruction-button",currentNumInstructions,removeInstructionArea);

      //creating the text area tag
      let instructionAreaTag = document.createElement("textarea");
      instructionAreaTag.setAttribute("class","instruction-area");
      instructionAreaTag.setAttribute("index",currentNumInstructions+1);
      
      //adding everything to the current instruction container
      instructionContainerTag.appendChild(instructionAreaTag);
      instructionContainerTag.appendChild(removeInstructionButtonTag);
      instructionContainerTag.addEventListener("keyup",focusNextInstructionArea);
      //adding everything to the dom
      container.appendChild(instructionContainerTag);
      currentNumInstructions++;
   }
 }


//creates and returns a button tag with all the proper attributes and child elements
function createRemoveButton(className = "",currentNumCounter =0,eventFunc){
   const removeButtonTag = document.createElement('button');
   removeButtonTag.setAttribute('class',`${className}`);
   removeButtonTag.setAttribute('index',currentNumCounter+1);
   removeButtonTag.addEventListener("click",eventFunc);
   let iconTag = document.createElement("i");
   iconTag.setAttribute("class","fa fa-minus");
   iconTag.setAttribute("aria-hidden","true");
   iconTag.setAttribute("index",currentNumCounter+1);
   removeButtonTag.appendChild(iconTag);
   return removeButtonTag;
}

//creates the ingredient text field along with all the attributes it needs
function createIngredientTextField(){
   //creating the text field tag
   let ingredientTextFieldTag = document.createElement('input');
   ingredientTextFieldTag.setAttribute("class",`ingredient-field`);
   ingredientTextFieldTag.setAttribute("index",currentNumIngredients+1);
   ingredientTextFieldTag.setAttribute("type","text");
   ingredientTextFieldTag.setAttribute("placeholder","ingredient");
   //setting the keyup attribute
   ingredientTextFieldTag.addEventListener("keyup",focusNextIngredientField);
   return ingredientTextFieldTag;
}
//when you click on the add ingredient button
function addInput(){
   $("#add-ingredient-button").on('click',function(){
      //you want to add a new row of remove button and input field for ingredients
      addIngredient();
    
   });
   $("#add-instruction-button").on("click",function(){
      //you want to add a new row for the instructions
      addInstruction();
   });
}

//add 1 ingredient field
function addIngredient(){
   createIngredientList();
}

 //adds 1 instruction
 function addInstruction(){
   createInstructionList();
 }

//calls removeField specificially for ingredients
const removeIngredientField = event =>{
   currentNumIngredients = removeField(event,"insert-ingredients-container",currentNumIngredients);
}

//calls removeField with the parameters matching those of the instruction area
const removeInstructionArea = event=>{
   currentNumInstructions = removeField(event, "insert-instructions-container",currentNumInstructions);
 }


//removes a div and updates all the indecies of the children in the parent div
const removeField = (event,parentIdName,currentIndexCount) =>{
   //an inner function that updates all the indecies
   const updateIndecies = (currentIndexCount)=>{
      currentIndexCount = 0;
      for(let i =0; i < parentElem.childNodes.length;i++){
         let currentChild = parentElem.childNodes[i];
         currentChild.setAttribute("index",currentIndexCount+1);
         //go through the children of the current child
         for(let x = 0; x < currentChild.childNodes.length;x++){
            let innerChild = currentChild.childNodes[x];
            innerChild.setAttribute("index",currentIndexCount+1);
         }
         currentIndexCount++;
      }
      return currentIndexCount;
   }

   const parentElem = document.getElementById(parentIdName);
   if(parentElem.childNodes.length === 1){return currentIndexCount;}//you want to always keep 1 ingredient there
   event.currentTarget.parentNode.remove();//removes the parent node
   return updateIndecies(currentIndexCount);//update and return the new index
}

//gives focus to the next ingredient field by calling focusNextField with the arguments for ingredients
const focusNextIngredientField = event=>{
   focusNextField(event,currentNumIngredients,true,addIngredient);
}
//gives focus to the next instruction field by calling focusNextField with the arguments for instructions
const focusNextInstructionArea = event=>{
   focusNextField(event,currentNumInstructions,event.shiftKey,addInstruction);
}

//when you want to go to the next text field
const focusNextField = (event,currentCounter,extraCondition = true,addFunc) =>{
   //an inner function that sets the focus to the next text field or text area
   setFocus = currentElem =>{
      const nextIndex = parseInt(currentElem.getAttribute("index")) + 1;
      //get the first class name because that will be wether it will be a ingredient field or an instruction field
      const className = currentElem.className.split(" ");
      //the first index of class name will be the same as the next elements class name
      const nextElem = $(`.${className[0]}[index=${nextIndex}]`);
      nextElem.focus();
    }
    //if you click enter and the other condition is satisfied(shift) 
    if(event.keyCode === ENTER_BUTTON && extraCondition){
      const elem = event.path[0];//get the element you clicked enter on
      //if your on the last element you add a new text field or area before setting the focus
      if(elem.getAttribute("index") == currentCounter){
        addFunc();
      }
       setFocus(elem);
    }
 }



