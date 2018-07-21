var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
          name: "Mountain camping",
          image: "https://cdn.pixabay.com/photo/2017/06/17/03/17/gongga-snow-mountain-2411069__340.jpg",
          description: "There are three camps made for the night out.Lorem ipsum dolor sit amet consectetur adipiscing elit molestie, nullam id ultricies torquent velit tellus vel, hac libero bibendum feugiat senectus risus sagittis. Mi nisl sapien scelerisque non metus risus diam suscipit, varius nulla porttitor litora ut ornare mauris laoreet potenti, primis justo tortor donec fusce cum nascetur. Nibh quisque orci integer porta est turpis aptent mollis, molestie nunc fringilla nulla congue montes cum, vel fermentum senectus praesent ridiculus metus enim."
        },
        {
          name: "winter camping",
          image: "https://cdn.pixabay.com/photo/2014/07/04/17/59/tent-384108__340.jpg",
          description: "Camping done in coldest region to experience the thing.Lorem ipsum dolor sit amet consectetur adipiscing elit molestie, nullam id ultricies torquent velit tellus vel, hac libero bibendum feugiat senectus risus sagittis. Mi nisl sapien scelerisque non metus risus diam suscipit, varius nulla porttitor litora ut ornare mauris laoreet potenti, primis justo tortor donec fusce cum nascetur. Nibh quisque orci integer porta est turpis aptent mollis, molestie nunc fringilla nulla congue montes cum, vel fermentum senectus praesent ridiculus metus enim."
        },
        {
          name: "Night Fire camping",
          image: "https://cdn.pixabay.com/photo/2016/03/30/02/57/camping-1289930__340.jpg",
          description: "The night camp with fire for making the food for eating.Lacus dui aenean suspendisse cum ante euismod magnis, dapibus lobortis ultricies gravida sodales hac, laoreet duis ligula porta curae egestas. Maecenas conubia primis nulla platea auctor augue ridiculus iaculis, rutrum dictum erat arcu sapien venenatis urna commodo, congue felis curae senectus morbi cum per. Curae nisl nascetur laoreet sollicitudin ante luctus massa pharetra, pulvinar aliquam ligula consequat nibh sed porttitor elementum vitae, penatibus interdum purus nulla mus ullamcorper sapien."
        },
        {
          name: "Icy camping",
          image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/camping-1835352__340.jpg",
          description: "Mountainous camping near the mount everest.Lacus dui aenean suspendisse cum ante euismod magnis, dapibus lobortis ultricies gravida sodales hac, laoreet duis ligula porta curae egestas. Maecenas conubia primis nulla platea auctor augue ridiculus iaculis, rutrum dictum erat arcu sapien venenatis urna commodo, congue felis curae senectus morbi cum per. Curae nisl nascetur laoreet sollicitudin ante luctus massa pharetra, pulvinar aliquam ligula consequat nibh sed porttitor elementum vitae, penatibus interdum purus nulla mus ullamcorper sapien."
        }
    ];

function seedDB(){
Campground.remove({}, function(err){
  if(err){
      console.log(err);
  } 
  else{
      console.log("Removed All Campgrounds!");
          data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campground");
                    //add a comment
                    Comment.create(
                            {
                                text: "Wow, such a nice camping",
                                author: "Gopi"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("comment created");
                                }
                        });
                }
            }); 
        });
  }
});
}

module.exports = seedDB;