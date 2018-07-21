var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE - SHOW ALL CAMPGROUNDS

router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
       if(err){
           console.log(err);
       }else {
           res.render("campground/list", {campgrounds: allCampgrounds, page: "campgrounds"});
       }
});
});

//CREATE ROUTE - ADD A CAMPGROUND TO DB

router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var descp = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: descp, author: author};
    Campground.create(newCampground, function (err, newlyCreated) {
        if(err){
            console.log(err);
           } else {
               req.flash("success", "New Campground Added Successfully!");
                res.redirect("/campgrounds");
            }
    });
});

//SHOW FORM TO CREATE NEW CAMPGROUND

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campground/new");
});

//SHOW MORE INFO ABOUT CAMPGROUND

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        }else{
            res.render("campground/show", {campground: foundCampground}); 
        }
    });
});

//EDIT ROUTE

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           res.redirect("back");
       }else{
           res.render("campground/edit", {campground: foundCampground});
       }
   });
});

//UPDATE ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           console.log("/campgrounds");
       }else{
           req.flash("success", "Campground Updated Successfully!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//DELETE ROUTE

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       }else{
           req.flash("success", "Campground Deleted Successfully!");
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;