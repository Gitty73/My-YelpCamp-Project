var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

//ALL MIDDLEWARE GOES HERE

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err){
                req.flash("error", "Campground Not Found");
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You Are Not Authorized To Do That");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You Need To Be Looged In First To Proceed Further");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                req.flash("error", "Comment Not Found");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error", "You Are Not Authorized To Do That");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You Need To Be Looged In First To Proceed Further");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

module.exports = middlewareObj;