var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else{
          res.render("comment/new", {campground: campground}); 
       }
    });
});

//COMMENTS CREATE

router.post("/", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
     if(err){
         console.log(err);
         res.redirect("/campgrounds");
     } else{
         Comment.create(req.body.comment, function(err, comment){
             if(err){
                 console.log(err);
             }else {
                 //add id and author name to comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 //save  commnet
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 req.flash("success", "Comment Created Successfully!");
                 res.redirect('/campgrounds/' + campground._id);
             }
         });
     }
   });
});

//COMMENT EDIT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment) {
       if(err){
           res.redirect("back");
       }else{
           res.render("comment/edit", {campground_id: req.params.id, comment: foundComment});
       }
   });
});

//COMMENT UPDATE ROUTE

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "Comment Updated Successfully!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});


// DELETE COMMENT ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "Comment Deleted Successfully!");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});


module.exports = router;