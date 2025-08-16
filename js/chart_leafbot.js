"use strict";


//const getElement = (selector) => document.querySelector(selector);
//const errorMessage = getElement("#error");


document.addEventListener("DOMContentLoaded", () =>{

    console.warn("Chart leafbot page loaded and JS is working!");

    getElement("#chart_non_vkp").addEventListener("click", chartNonVkp)

    getElement("#chart_vkp").addEventListener("click", chartVkp)

});

function chartNonVkp(){

    bidLineCounter = 0;
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";

    if(isDataBefore != ""){

        let validLines = [];
        //split into array by return new line character
        let lines = isDataBefore.split(/\r?\n/);
        
        lines.forEach(line => {
            let trimmed = line.trim();

            if(trimmed !== null && trimmed !== "" && trimmed.includes("=close")){
                //add valid line to array
                validLines.push(trimmed);
            }
        });

        results = validLines;
        getElement("#input_text").value = results.join('\n');
        isDataAfter = results;
    }else{
        console.log("No input data");
    }
}

function chartVkp(){

    bidLineCounter = 0;
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";


    if(isDataBefore != ""){

        let validLines = [];
        //split into array by return new line character
        let lines = isDataBefore.split(/\r?\n/);
        
        lines.forEach(line => {
            let trimmed = line.trim();

            if(trimmed !== null && trimmed !== "" && trimmed.includes("=addloot")){
                //add valid line to array
                validLines.push(trimmed);
            }
        });

        results = validLines;
        getElement("#input_text").value = results.join('\n');
        isDataAfter = results;
    }else{
        console.log("No input data");
    }
}

