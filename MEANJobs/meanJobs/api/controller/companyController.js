require("express");
const { query, response } = require("express");
let mongoose = require("mongoose");
let Jobs = mongoose.model("Jobs");


module.exports.getAllCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, company) => {

        if (err) {

            console.log("Error in finding company");
            res.status(500).json(err);

        } else {
            res.status(200).json(company.company);
        }
    });

}
module.exports.getOneCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, companies) => {

        if (err) {
            res.status(404).json(err);

        } else if (!companies) {

            res.status(404).json({ "message": "can't find a Company with this Id" });

        }
        else {

            res.status(200).json(companies.company);
        }
    });
}

module.exports.addCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).exec((err, job) => {
        if (err) {
            res.status(500).json(err);
        }
        if(req.body.companyName){
            const company = { companyName: req.body.companyName };

            job.company = company;
            job.save((err, com) => {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(200).json(com);
                }
            });
        }
        else{
            res.status(400).json({"Message":"Company Name must be filled"});
        }
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
            job.company.companyName = req.body.companyName;
            job.save((err, updatedcompany) => {
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

module.exports.deleteCompany = (req, res) => {

    const jobId = req.params.jobId;

    Jobs.findById(jobId).select("company").exec((err, job) => {
        const response = { status: 204 };
        if (err) {
            response.status = 500;
            console.log("cannot find a company");
            res.status(404).json(err);

        } else {
            job.company.remove();
            job.save((err, deletedCompany) => {
                if (err) {
                    res.status(500).json({ "message": "Can not be deleted" })
                } else {
                    res.status(response.status).json({ "message": "Company Deleted Successfully" });
                }
            })
        }
    });
}








