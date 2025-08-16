"use strict";


//const getElement = (selector) => document.querySelector(selector);
//const errorMessage = getElement("#error");


document.addEventListener("DOMContentLoaded", () =>{

    console.warn("Chart bids page loaded and JS is working!");

    getElement("#chart_non_vkp").addEventListener("click", chartNonVkp)

    getElement("#chart_vkp").addEventListener("click", chartVkp)
});

async function chartVkp() {

    bidLineCounter = 0;
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";

    if (isDataBefore !== "") {

        let validLines = [];
        let lines = isDataBefore.split(/\r?\n/);

        try {
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

            const combinedKeywords = [
                ...(jsonData.tree || []),
                ...(jsonData.riverdrag || []),
                ...(jsonData.aco || []),
                ...(jsonData.doom || []),
                ...(jsonData.bat || []),
                ...(jsonData.mani || [])
            
            ].map(k => k.toLowerCase().trim());

            lines.forEach(line => {
                const trimmed = line.trim();
                const lowerLine = trimmed.toLowerCase();
                const vkpTypes = ["vkp"];


                if (trimmed !== "") {
                    const matchesKeyword = combinedKeywords.some(keyword => lowerLine.includes(keyword));
                    
                    if (matchesKeyword && lowerLine.includes(vkpTypes)) {
                        const equalsClose = trimmed
                            // remove after @
                            .split('@')[0]
                            // replace leading dash
                            .replace(/^-\s*/, "=close ")  
                            // prepend =addloot if needed                   
                            .replace(/^([^\-=])/, "=addloot $1")          
                            // keep up to point value     
                            .replace(/([0-9]+)\s*(akp|btkp|ktkp|tkp)\b.*$/, "$1 $2") 
                            .trim();

                            
                        validLines.push(equalsClose);
                    }
                    
                }
            });

            results = validLines;
            getElement("#input_text").value = results.join('\n');
            isDataAfter = results;
            console.log("Charted!");

        } catch (err) {
            console.error("Error:", err);
        }
    } else {
        console.log("Nothing to chart");
    }
}


async function chartNonVkp(){

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
        
      try{
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

            // Combine all keyword arrays into one and normalize to lowercase
            const combinedKeywords = [
                ...(jsonData.hrung || []),
                ...(jsonData.mord || []),
                ...(jsonData.necro || []),
                ...(jsonData.base || []),
                ...(jsonData.prime || []),
                ...(jsonData.gele || []),
                ...(jsonData.bt || []),
                ...(jsonData.dhio || [])
            ].map(k => k.toLowerCase().trim());
        
            lines.forEach(line => {
                const trimmed = line.trim();
                const lowerLine = trimmed.toLowerCase();
                const kpTypes = ["dkp", "akp", "btkp"];
                
                if (trimmed !== "") {
                    const matchesKeyword = combinedKeywords.some(keyword => lowerLine.includes(keyword));

                    const hasKpType = kpTypes.some(type => lowerLine.includes(type));

                    if (matchesKeyword && hasKpType ) {
        
                        const equalsClose = trimmed
                             // replace leading dash
                            .replace(/^-\s*/, "=close ")                     
                            // if no dash or =, prepend
                            .replace(/^([^\-=])/, "=close $1")       
                            // keep up to '100 akp', remove the rest        
                            .replace(/([0-9]+)\s*(akp|btkp|ktkp|tkp)\b.*$/, "$1 $2")  
                            .trim();


                        validLines.push(equalsClose);
                    }
                }
            });
        

            results = validLines;
            getElement("#input_text").value = results.join('\n');
            isDataAfter = results;
            console.log("Charted!");

        }catch (err){
        console.error("Error:", err);
        }
        }else{
            console.log("Nothing to chart");
        }
}

