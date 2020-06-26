// var notes = require("../db/notes.js")
// const server = require("../server.js");
var db = require("../db/db.json");
const fs = require("fs");
console.log(db)

module.exports = function (app){ //app - represents express
    app.get("/api/notes", (req, res)=>{
        fs.readFile("../Develop/db/db.json", (err, data)=> {
            console.log("Data as a string", data);
            const dataJson = JSON.parse(data);
            console.log("DataJSON as a string:", dataJson);
          res.json(dataJson);        //display the notes data in json format.  
        });
        
    })

    app.post("/api/notes", (req, res)=> {
        const data = req.body
        console.log(JSON.parse(data))
        fs.writeFile("../Develop/db/db.json", data, (err, data)=> {
            if (err) throw err;
            console.log(data);
        // const dataJson = JSON.parse(data);
        
        db.push(data);
        res.json(db);
        console.log(db);

    })
})
    
    app.delete("/api/notes/:id", (req, res)=>{
        const info = db.find(c => c.id === parseInt(req.params.id));
        if (!info) 
        return res.send("Note not found");

        const index = db.indexOf(info);
        db.splice(index, 1);

        res.send(info);
    })
    // })
}