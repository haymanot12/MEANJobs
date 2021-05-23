const mongoose = require("mongoose");

let addressSchema = new mongoose.Schema({
    state: String,
    city: String
});

let companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    Address: addressSchema
});

let jobsSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    description: String,
    salary: {
        type: Number,
        required: true
    },
    company: companySchema
});

mongoose.model("Jobs", jobsSchema, "listOfJobs");
