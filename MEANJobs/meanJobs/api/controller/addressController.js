require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");

module.exports.getAddress = (req, res) => {
    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {
            console.log("Error in finding Address");
            res.status(500).json(err);
        } else {
            res.status(200).json(job.company.Address);
        }
    });
}
module.exports.getOneAddress = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, companies) => {
        if (err) {

            console.log("cannot find Address");
            res.status(404).json(err);

        } else if (!companies) {
            console.log("can not find an Address");
            res.status(404).json({ "message": "can't find a job with this Id" });
        }
        else {
           
            res.status(200).json(companies.company.Address);
        }
    });
}

module.exports.addAddress = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        if (err) {
            res.status(500).json(err);
        }
        const Address = { "state": req.body.state, city: req.body.city };

        job.company.Address = Address;
        job.save((err, com) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(com.company.Address);
            }
        });
    });
}

module.exports.updateCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {

        const response = { status: 204 };
        if (err) {

            response.status = 500;

            console.log("cannot find JobId");
            res.status(404).json(err);

        } else {

            job.company.Address.status = req.body.state;
            job.company.Address.city = req.body.city;

            job.save((err, updatedAddress) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {

                    res.status(response.status).json({ "message": "Company Updated Successfully" });
                }
            });
        }
    });
}



module.exports.deleteAddress = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        const response = { status: 204 };
        
        if (err) {

            response.status = 500;

            console.log("cannot find a company");
            res.status(404).json(err);

        } else {
            job.company.Address.remove();
            job.save((err, deletedCompany) => {
                if (err) {
                    res.status(500).json({ "message": "Can not be deleted" })
                } else {
                    res.status(response.status).json({ "message": "Address Deleted Successfully" });
                }
            })
        }
    });
}








