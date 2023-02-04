const express= require("express");
const app = express();
const PORT = 3016;
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// displays homepage using index.html
app.get("/", (req,res) => 
    res.sendFile(path.join(__dirname,"./index.html"))
)
app.get("/notes", (req,res) => 
    res.sendFile(path.join(__dirname,"./index.html"))
)

app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
});