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

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
});
// gets the notes json.
app.get("/api/note",(req,res) =>{
    res.sendFile(path.join(__dirname, "../db/db.json"))
})
app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            note_id: uniqid(),
        };

        // get notes
        fs.readFile("./db/db.json", "utf8",(err,data) => {
            if (err){
                console.error(err);
            } else{
                // notes to a string
                const parseNotes = JSON.parse(data);

                parseNotes.push(newNote)

                // write the file with newNote
                fs.writeFile(
                    './db/db.json',JSON.stringify(parseNotes,"utf8", (err)=> {}),
                    (writeErr) => 
                    writeErr
                )
            }

        })
}
})
    //     // convert data to a string to be saved
    //    const ToFile =(destination,content)=>
    //    fs.writeFile()

    //     res.status(200).json(response);


    // } else {
    //     res.status(406).json("did not save")
    // }






app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

