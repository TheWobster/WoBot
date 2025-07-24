"use strict";

//const getElement = (selector) => document.querySelector(selector);
//const errorMessage = getElement("#error");

document.addEventListener("DOMContentLoaded", () =>{

    console.warn("Monthly transfer page loaded and JS is working!");

    getElement("#chart_non_vkp").addEventListener("click", chartNonVkpTransfer);

    getElement("#chart_vkp").addEventListener("click", charVkpTransfer)

});

function chartNonVkpTransfer(){

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

            if(trimmed.includes("0akp") ||
                trimmed.includes("0btkp") ||
                trimmed.includes("0dkp")){

                trimmed = trimmed.replace(/(\d)(akp|btkp|dkp)/g, "$1 $2");

            }
            if(trimmed !== null && trimmed !== "" && trimmed.includes("=mt") && !trimmed.includes("vkp")){
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

function charVkpTransfer(){

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

            if(trimmed.includes("0vkp")){

                trimmed = trimmed.replace(/(\d)(vkp)/g, "$1 $2");

            }
            if(trimmed !== null && trimmed !== "" && trimmed.includes("=mt") && trimmed.includes("vkp")){
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