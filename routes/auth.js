var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var Campground = require("../models/campground");
//ROOT ROUTE

router.get("/", function (req, res) {
    res.render("landing");
});


//REGISTRATION FORM

router.get("/register", function(req, res) {
   res.render("register", {page: "register"}); 
});

//HANDLING REGISTERING IN

router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emali: req.body.email,
        avatar: req.body.avatar
    });
    if(req.body.adminCode === "HeyAdmin!"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Registered Successfully! - Welcome To YelpCamp \""+ user.username +"\"");
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN FROM

router.get("/login", function(req, res) {
    res.render("login", {page: "login"});
});

//HANDLING LOGGING IN

router.post("/login", function(req, res, next){
    passport.authenticate("local",
    {   
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Logged In Successfully! - Welcome To YelpCamp \""+ req.body.username +"\""
    
    })(req, res);
});

//LOGOUT ROUTE

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You Logged Out Successfully!");
   res.redirect("/campgrounds");
});

// USER PROFILE

router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
     if(err){
         req.flash("error", "Something Went Wrong !");
         res.redirect("/");
     }
     Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
         if(err){
         req.flash("error", "Something Went Wrong !");
         res.redirect("/");
     }
          res.render("users/show", {user: foundUser, campgrounds: campgrounds});
     });
   });
});

module.exports = router;