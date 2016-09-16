/************  App Config  ***********/
var express= require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
mongoose.connect("mongodb://localhost/restful_blog_app");    
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/************  Mongoose/Models Config  ***********/
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);





/************  RESTFUL Routes  ***********/
app.get("/", function(req,res){
   res.redirect("/blog");
});

app.get("/blog", function(req,res){
    Blog.find({}, function(err, blog){
       if(err){
           console.log(err);
       } else {
           res.render("index", {blog: blog});
       }
    });
});

//new Route
app.get("/blog/new", function(req, res){
   res.render("new"); 
});

app.post("/blog",function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blog");
        }
    }); 
});

//SHOW ROUTE
app.get("/blog/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

//EDIT ROUTE
app.get("/blog/:id/edit", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foundBlog});
       }
   })
});


//UPDATE ROUTE
app.put("/blog/:id", function(req, res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.render("Error!");
       } else {
           res.redirect("/blog/"+req.params.id);
       }
   });
});


//DESTROY
app.delete("/blog/:ide", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log("Error!");
        } else {
            res.redirect("/blog");
            console.log("Deleted!!");
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Blog is now running!") 
});