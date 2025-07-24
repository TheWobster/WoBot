"use strict";

document.addEventListener("DOMContentLoaded", () =>{

    console.warn("Chart VoA page has loaded and JS is working!");

    getElement("#chart_vkp").addEventListener("click", chartVkp)

});

async function chartVkp() {
    pushToStackUndo();
    const inputData = getElement("#input_text").value;

    let results;
    let isDataBefore = inputData;
    let isDataAfter = "";

    if (isDataBefore !== "") {

        let validLines = [];
        const lines = isDataBefore.split(/\r?\n/);

        try {
            const response = await fetch("../json/loot_items.json");
            const jsonData = await response.json();

            // Combine and normalize all keywords
            const combinedKeywords = [
                ...(jsonData.tree || []),
                ...(jsonData.riverdrag || []),
                ...(jsonData.aco || []),
                ...(jsonData.doom || []),
                ...(jsonData.bat || [])
            ].map(k => k.toLowerCase().trim());

            for (let line of lines) {
                const trimmed = line.trim();
                const lowerLine = trimmed.toLowerCase();

                if (trimmed === "" || !lowerLine.includes("vkp")) continue;

                // Must match a keyword from JSON
                const matchesKeyword = combinedKeywords.some(keyword =>
                    lowerLine.includes(keyword)
                );
                if (!matchesKeyword) continue;

                // Clean up after '@' and format
                const cleaned = trimmed.split("@")[0].trim();
                const formatted = `=addloot ${cleaned}`;
                validLines.push(formatted);
            }

            results = validLines;
            getElement("#input_text").value = results.join('\n');
            isDataAfter = results;
            console.log("VoA charted!");

        } catch (err) {
            console.error("Error loading loot names:", err);
        }

    } else {
        console.log("Nothing to chart");
    }
}
