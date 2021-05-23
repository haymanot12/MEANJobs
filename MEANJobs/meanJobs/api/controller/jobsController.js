require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");


module.exports.getAllJobs = (req, res) => {

    const maxCount = 10;
    let offSet = 0;
    let count = 5;

    if (req.query && req.query.offSet) {
        offSet = parseInt(req.query.offSet);
    }
    if (req.query && req.query.count) {
        count = parseInt(query.count);

        //Limit checking
        if (count > maxCount) {
            count = maxCount;
        }
    }

    if (isNaN(offSet) || isNaN(count)) {
        res.status(404).json({ "message": "Offset and count should be a number" });
    }

    Jobs.find().skip(offSet).limit(count).exec((err, jobs) => {
      
        if (err) {

            console.log("Error in finding jobs");
            res.status(500).json(err);

        } else {
            res.status(200).json(jobs);
        }
    });

}

module.exports.getOneJob = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).exec((err, job) => {
       
        if (err) {

            console.log("cannot find JobId");
            res.status(404).json(err);

        } else if (!job) {

            console.log("can not find a job");
            res.status(404).json({ "message": "can't find a job with this Id" });

        }
        else {
            res.status(200).json(job);
        }
    });

}

module.exports.addOneJob = (req, res) => {

    if (req.body.jobTitle && req.body.description && req.body.salary) {
       
        const job = { jobTitle: req.body.jobTitle, description: req.body.description, salary: req.body.salary };

        Jobs.create(job, (err, newJob) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(newJob);
            }
        });

    } else {
        res.status(400).json({ "Message": "jobTitle and description and salary must filled" });

    }
}

module.exports.updateJob = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).exec((err, job) => {

        const response = { status: 204 };

        if (err) {

            response.status = 500;
            res.status(response.status).json(err);

        } else if (!job) {
            response.status = 404;
            res.status(response.status).json({ "message": "Job Id not Found" });
        }

        if (response.status !== 204) {
            res.status(res.status).json({ "Message": "can not found Job" });

        } else {

            if (req.body.jobTitle)
                job.jobTitle = req.body.jobTitle;
            if (req.body.description)
                job.description = req.body.description;
            if (req.body.salary)
                job.salary = parseFloat(req.body.salary);

            job.save((err, updatedJob) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.status(response.status).json({ "message": "Job Updated Successfully" });
                }
            });
        }
    });
}

module.exports.deleteJob = (req, res) => {
    const jobId = req.params.jobId;
    Jobs.findByIdAndRemove(jobId).exec((err, deletedJob) => {
        const response = { status: 204 };

        if (err) {
            response.status = 500;
            res.status(response.status).json(err);

        } else if (!deletedJob) {
            response.status = 404;
            res.status(response.status).json({ "message": "Job Id not Found" });
        } else {

            res.status(response.status).json({ "message": "Job Deleted Successfully" });

        }
    });
}







