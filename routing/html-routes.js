var path = require("path");

module.exports = function (app){

    //Home
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    //Notes
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    })
}