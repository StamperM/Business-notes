const express = require("express");
const app = express();
const PORT = 3016;
const fs = require("fs");
var uniqid = require('uniqid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const path = require('path');


// displays homepage using index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});
// displays html for notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
// gets the notes json.so it can display on the html notes page
app.get("/api/notes",(req,res) =>{
    res.sendFile(path.join(__dirname, "./db/db.json"))
})
// when a note is saved  a newNote object is created and sent to the db.json. 
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            note_id: uniqid(),
        };

        // get notes the current notes and parses it
        fs.readFile("./db/db.json", "utf8",(err,data) => {
            if (err){
                console.error(err);
            } else{
                // notes to a string
                const parseNotes = JSON.parse(data);
//              takes newNote and adds it to the value of db
                parseNotes.push(newNote)

                // write the file with parsedNotes which will include the new note
                fs.writeFile(
                    './db/db.json',JSON.stringify(parseNotes,"utf8", (err)=> {}),
                    (writeErr) => 
                    writeErr
                )
            }

        })
}
})
   



app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

