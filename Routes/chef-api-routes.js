const db = require("../models");
const fs = require('fs');
const path = require("path");
const aws = require('aws-sdk');
require('dotenv').config();

//Requires our keys from our .env file to protect our AWS
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: "ca-central-1"
});


const s3 = new aws.S3();

module.exports = function(app) {

    //Return all chefs
    app.get("/api/chef", function(req, res) {
        db.User.findAll({
            include: [db.Chef]
        }).then( chefGetResults => {
            res.json(chefGetResults)
        })
    })

    //Return all chefs in a team
    app.get("/api/chef/:id", function(req, res) {
        db.User.findAll({
            include: [db.Chef],
            where: {
                TeamId: req.params.id
            }
        }).then( chefGetTeamResults => {
            res.json(chefGetTeamResults)
            
        })
    });

    //Returns the chef with the give name and TeamId
    app.get("/api/chef/image/:id/:name", function(req, res) {
        db.User.findAll({
            include: [{
                model: db.Chef,
                where: {chefName: req.params.name}
            }],
            // include: [ db.Chef, { where: {chefName: req.params.name}}],
            where: {
                TeamId: req.params.id,
            }
        }).then( nameResults => {
            res.json(nameResults)
        })
    })

    //Creates a new chef
    app.post("/api/chef", function(req, res) {
        db.Chef.create(req.body).then( chefCreateResult => {
            res.json(chefCreateResult) 
        })
    });

    //Route that grabs the file from our log in page, and calls the upload file function
    app.post("/upload/file", function(req,res) {
        uploadFile(req.files.chef.name, req.files.chef.data)
        res.json(req.body)
    })

    //function to upload the image to our bucket
    const uploadFile = (fileName, fileContent) => {
        
    
        // Setting up S3 upload parameters
        const params = {
            Bucket: "cookingtogether",
            Key: fileName, // File name you want to save as in S3
            Body: fileContent
        };
    
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            console.log(`File uploaded successfully. ${data.Location}`);
        });

    };
    
}