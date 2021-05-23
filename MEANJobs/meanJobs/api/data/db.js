let mongoose = require("mongoose");
require("./jobs-model.js");
let dbUrl = "mongodb://localhost:27017/listOfJobsDb";

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on("connected",()=>{
        console.log("Mongoose connected to "+dbUrl);
});
mongoose.connection.on("disconnected",()=>{
        console.log("Mongoose Disconnected");
});

mongoose.connection.on("error",(err)=>{
    console.log("Mongoose connection error "+err);
});

process.on("SIGINT",()=>{
    mongoose.connection.close(()=>{
        console.log("mongoose disconnected by alpplication Interuption");
        process.exit(0);
    });
});
process.on("SIGTERM",()=>{
    mongoose.connection.close(()=>{
        console.log("Mongoose disconnected by application termination");
        process.exit(0);
    });
});

process.once("SIGUSR2",()=>{
    mongoose.connection.close(()=>{
        console.log("Mongoose Disconnected by User");
        process.kill(process.pid);
    });
});
