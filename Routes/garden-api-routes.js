var db = require("../models");

module.exports = function(app) {
    // app.get("/api/garden", function(req, res) {
    //     db.User.findAll({
    //         include: [db.Chef]
    //     }).then(function(chefGetResults) {
    //         res.json(chefGetResults)
    //     })
    // })
    app.post("/api/garden/new/:uid", (req,res)=>{
        console.log(req.body)
        db.Plant.create(req.body).then(data=>console.log(data))
})

    app.get("/api/garden/:uid", (req,res)=>{
        
    });

    app.get("/api/all/garden", (req,res)=>{
        console.log('getting all plants....')
        db.Plant.findAll().then(data=> res.json(data))
    })

    
    app.put("/api/garden/location/:id", function(req, res) {
        console.log(req.body, req.params.id)
        db.Plant.update({
            positionLeft: req.body.left,
            positionTop: req.body.top
          }, {
            where: {
              id: req.params.id
            }
          });

    })
}