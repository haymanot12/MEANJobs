
const express = require("express");
require("./api/data/db.js");
const app = express();
let routes=require("./api/route")

app.set("port",5000);

app.use(express.json({extended:false}));

app.use("/api",(req,res,next)=>{
    next();
})
app.use("/api",routes);

let server = app.listen(app.get("port"),()=>{
    console.log("Listening port " +app.get("port"));
});