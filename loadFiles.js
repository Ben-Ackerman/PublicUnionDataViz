STATE_LAWS = []

US_STATES = []


var loadData = async function() {
    let results = await Promise.all([
        d3.csv("unionLawsProcessed.csv"),
        d3.json("https://d3js.org/us-10m.v1.json")
       // d3.json("test.json")
    ]).catch(error => { 
        throw error;
    });
    console.log("finished")
    STATE_LAWS = results[0];
    US_STATES = results[1];
    buildMap(US_STATES, STATE_LAWS);
    setColor(STATE_LAWS, 55, occupationsToConsider);
}

loadData()
