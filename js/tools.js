"use strict";

const getElement = (selector) => document.querySelector(selector);

let bidLineCounter = 0;
let stackUndo = [];
let stackRedo = [];
let showInstructions = false;

document.addEventListener("DOMContentLoaded", () =>{

    const logArea = document.getElementById("console_log_textarea");

    // Store the original console.log
    const originalLog = console.log;

    // Override console.log
    console.log = function (...args) {
        // Call the original log function
        originalLog.apply(console, args);

        // Format message
        const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');

        // Append to textarea
        logArea.value += message + '\n';

        // Optional: auto-scroll to bottom
        logArea.scrollTop = logArea.scrollHeight;
    };

    console.warn("Tools page loaded and JS is working!");
    console.log("Hi there! Let's get started!");

    getElement("#undo").addEventListener("click", () =>{

        undo(getElement("#input_text").value)
        loadLastUndoData();
    });

    getElement("#redo").addEventListener("click", () =>{

        redo(getElement("#input_text").value)
        loadLastRedoData();
    });

    getElement("#clear").addEventListener("click", clear)

    getElement("#copy_next").addEventListener("click", copyNext)

    getElement("#copy_previous").addEventListener("click", copyPrevious)

    getElement("#instructions_show_hide").addEventListener("click", toggleInstructions)
});

function toggleInstructions(){

    if(showInstructions == false){
        showInstructions = true;
    }else{
        showInstructions = false;
    }

    if(showInstructions){

        getElement("#instructions").style.display = "flex";

    }else{

        getElement("#instructions").style.display = "none";
    }

}

function copyPrevious(){

    const inputData = getElement("#input_text").value;

    let lines = [];
    lines = inputData.split(/\r?\n/);

   // Check if current index is within range
        if (bidLineCounter > 0) {

            bidLineCounter--;
            const lineToCopy = lines[bidLineCounter].trim();

            navigator.clipboard.writeText(lineToCopy)
                .then(() => {
                    console.log("Copied:", lineToCopy);
                     
                })
                .catch(err => {
                    console.error("Failed to copy:", err);
                });
        }else{
            console.log("Cannot copy; Start of bids");
        }

}


function copyNext(){

    const inputData = getElement("#input_text").value;

    let lines = [];
    lines = inputData.split(/\r?\n/);

   // Check if current index is within range
        if (bidLineCounter < lines.length) {
            const lineToCopy = lines[bidLineCounter].trim();

            navigator.clipboard.writeText(lineToCopy)
                .then(() => {
                    console.log("Copied:", lineToCopy);
                    bidLineCounter++; 
                })
                .catch(err => {
                    console.error("Failed to copy:", err);
                });
        }else{
            console.log("Cannot copy; End of bids");
        }

}


function undo(originalData){

    if(stackUndo.length > 0){
        const current = getElement("#input_text").value;
        stackRedo.push(current);

        const lastUndoData = stackUndo.pop();
        getElement("#input_text").value = lastUndoData;
    }else {
        console.log("Nothing to undo");
    }
}

function loadLastUndoData(){
    let lastUndoData = "";
    if(stackUndo.length > 0){

        lastUndoData = stackUndo.pop();
        getElement("#input_text").value = lastUndoData;
    }
}

function redo(originalData){

    if(stackRedo.length > 0){
        const current = getElement("#input_text").value;
        stackUndo.push(current);

        const lastRedoData = stackRedo.pop();
        getElement("#input_text").value = lastRedoData;
    }else{
        console.log("Nothing to redo");
    }
}

function loadLastRedoData(){
    let lastRedoData = "";
    if(stackRedo.length > 0){

        lastRedoData = stackRedo.pop();
        getElement("#input_text").value = lastRedoData;

    }
    
}

function pushToStackUndo(){

    const current = getElement("#input_text").value;
    stackUndo.push(current);
    //clear redo stack
    stackRedo = [];
}

function clear(){

    if(getElement("#input_text").value != ""){

        getElement("#input_text").value = "";
        errorMessage.style.display = "none";
        console.log("Cleared!");
    }else{
        console.log("Nothing to clear");
    }
}

