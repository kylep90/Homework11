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

    app.get("/api/notes/:id", (req, res)=>{
        const info = parseInt(req.params.id);
        console.log("Info:", info)
        var need
        fs.readFile("../Develop/db/db.json", (err, data)=>{ 
            need = db[info]; //Why do I need to use db and not data?
            console.log("Need:",need);
        })
        res.json(need);
    })

    app.post("/api/notes", (req, res)=> {
        var newdata = req.body
        const number = db.length + 1;
        newdata.id = number;
        console.log("Original data", newdata, number);
        console.log(typeof newdata)
        fs.readFile("../Develop/db/db.json", (err, data) =>{

            var json = JSON.parse(data);
            console.log(data)
            json.push(newdata);
            console.log("All notes: ", json);
            
            fs.writeFile("../Develop/db/db.json", JSON.stringify(json),(err) => {
                if (err) throw err;
                console.log('The file has been saved!');
              });
            res.send(json);


        })
        
})
    
    app.delete("/api/notes/:id", (req, res)=>{
        const info = db.find(c => c.id === parseInt(req.params.id));
        console.log(info);
        if (!info) 
        return res.send("Note not found");

        const index = db.indexOf(info);
        db.splice(index, 1);

        res.send(info);
    })
    // })
}