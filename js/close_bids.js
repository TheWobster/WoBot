"use strict";


//const getElement = (selector) => document.querySelector(selector);
//const errorMessage = getElement("#error");


document.addEventListener("DOMContentLoaded", () =>{

    console.warn("Close bids page loaded and JS is working!");

    getElement("#close_non_vkp").addEventListener("click", closeNonVkp)

    getElement("#close_vkp").addEventListener("click", closeVkp)

    getElement("#close_all").addEventListener("click", closeAll)

});

async function closeVkp() {

    bidLineCounter = 0;
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";
    let lastLine;

    if (isDataBefore !== "") {

        let validLines = [];
        let lines = isDataBefore.split(/\r?\n/);

        try {
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

            const combinedItemKeywords = [
                ...(jsonData.doom || []),
                ...(jsonData.riverdrag || []),
                ...(jsonData.bat || []),
                ...(jsonData.tree || []),
                ...(jsonData.mani || []),
                ...(jsonData.egdropitems || [])
            ].map(k => k.toLowerCase().trim());

            const combinedBossDataKeywords = [
                ...(jsonData.bossnames || [])
            ].map(k => k.toLowerCase().trim() );
            
             

            let lastTrimmedLine = null;

            lines.forEach(line => {
                const trimmed = line.trim();
                const lowerLine = trimmed.toLowerCase();
                let lineMatch = "";

                if (trimmed !== "" && lowerLine.toLowerCase() !== lastTrimmedLine) {

                    const matchesItemKeyword = combinedItemKeywords.some(keyword => lowerLine.includes(keyword));

                    const matchesBossKeyword = combinedBossDataKeywords.some(keyword => lowerLine.includes(keyword));

                    if(matchesBossKeyword){

                        const killData = trimmed;
                        validLines.push(killData);
                    }

                    if (matchesItemKeyword && !trimmed.includes("-")) {

                        lineMatch = `- ${trimmed}`;
                        validLines.push(lineMatch);
                    }
                }
                lastTrimmedLine = lowerLine;
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


async function closeNonVkp(){

    bidLineCounter = 0;
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";
    let lastLine;
    

    if(isDataBefore != ""){

        let validLines = [];
        //split into array by return new line character
        let lines = isDataBefore.split(/\r?\n/);
        
      try{
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

        
            const combinedBossDataKeywords = [
                ...(jsonData.bossnames || [])
            ].map(k => k.toLowerCase().trim() );

            
            // Combine all keyword arrays into one and normalize to lowercase
            const combinedItemKeywords = [
                ...(jsonData.hrung || []),
                ...(jsonData.mord || []),
                ...(jsonData.necro || []),
                ...(jsonData.base || []),
                ...(jsonData.prime || []),
                ...(jsonData.gele || []),
                ...(jsonData.bt || []),
                ...(jsonData.dhio || []),
                ...(jsonData.egdropitems || [])
            ].map(k => k.toLowerCase().trim());

        
            //find matchng item lines
            lines.forEach(line => {

                //format line
                const cleanedLine = line.replace(/^[^a-zA-Z0-9]+/, "");
                const trimmed = cleanedLine.trim();
                const lowerLine = trimmed.toLowerCase();

                

                if(lastLine !== lowerLine){
                    //true or false line = combinedKeywords
                    if (trimmed !== "") {
                        //check for boss
                        const matchesBossKeyword = combinedBossDataKeywords.some(keyword => lowerLine.includes(keyword));

                        if(matchesBossKeyword && !trimmed.includes("Subtlety")){
                            const killData = trimmed;
                            validLines.push(killData);
                        }
                        //check for items
                        const matchesKeyword = combinedItemKeywords.some(keyword => lowerLine.includes(keyword));

                        if (matchesKeyword) {
                            
                            const lineMatch = `- ${trimmed.trim()}`;

                            validLines.push(lineMatch);
                        }
                    }
                }
                
                lastLine = lowerLine;

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

async function closeAll(){

    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";
    let lastLine;
    

    if(isDataBefore != ""){

        let validLines = [];
        //split into array by return new line character
        let lines = isDataBefore.split(/\r?\n/);
        
      try{
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

        
            const combinedBossDataKeywords = [
                ...(jsonData.bossnames || [])
            ].map(k => k.toLowerCase().trim() );

            //find matching boss data lines
            lines.forEach(line => {
                const trimmed = line.trim();
                const lowerLine = trimmed.toLowerCase();

                if(trimmed !== ""){
                    const matchesBossKeyword = combinedBossDataKeywords.some(keyword => lowerLine.includes(keyword));

                    if(matchesBossKeyword){
                        const killData = trimmed;
                        validLines.push(killData);
                    }
                }
            });

            
            // Combine all keyword arrays into one and normalize to lowercase
            const combinedItemKeywords = [
                ...(jsonData.hrung || []),
                ...(jsonData.mord || []),
                ...(jsonData.necro || []),
                ...(jsonData.base || []),
                ...(jsonData.prime || []),
                ...(jsonData.gele || []),
                ...(jsonData.bt || []),
                ...(jsonData.dhio || []),
                ...(jsonData.mani || []),
                ...(jsonData.doom || []),
                ...(jsonData.riverdrag || []),
                ...(jsonData.bat || []),
                ...(jsonData.tree || []),
                ...(jsonData.egdropitems || [])
            ].map(k => k.toLowerCase().trim());

        
            //find matchng item lines
            lines.forEach(line => {

                //format line
                const cleanedLine = line.replace(/^[^a-zA-Z0-9]+/, "");
                const trimmed = cleanedLine.trim();
                const lowerLine = trimmed.toLowerCase();

                

                if(lastLine !== lowerLine){
                    //true or false line = combinedKeywords
                    if (trimmed !== "") {
                        const matchesKeyword = combinedItemKeywords.some(keyword => lowerLine.includes(keyword));
                        if (matchesKeyword) {
                            
                            const lineMatch = `- ${trimmed.trim()}`;

                            validLines.push(lineMatch);
                        }
                    }
                }
                
                lastLine = lowerLine;

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

