const express=require("express");
let router = express.Router();

let jobsController = require("../controller/jobsController");
let companyController = require("../controller/companyController");
let addressController = require("../controller/addressController");

router.route("/jobs").get(jobsController.getAllJobs).post(jobsController.addOneJob);
router.route("/jobs/:jobId").get(jobsController.getOneJob).put(jobsController.updateJob).delete(jobsController.deleteJob);

router.route("/jobs/:jobId/company").get(companyController.getAllCompany).post(companyController.addCompany);
router.route("/jobs/:jobId/company/:cId").get(companyController.getOneCompany).put(companyController.updateCompany).delete(companyController.deleteCompany);

router.route("/jobs/:jobId/company/:cId/address").get(addressController.getAddress).post(addressController.addAddress);
router.route("/jobs/:jobId/company/:cId/address/:addresId").get(addressController.getOneAddress).put(addressController.updateCompany).delete(addressController.deleteAddress);

module.exports=router;