/************  App Config  ***********/
var express= require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/restful_blog_app");    
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


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

//SHWO ROUTE
app.get("/blog/:id", function(req, res){
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
          res.redirect("/blogs");
      } else {
          res.render("show", {blog: foundBlog});
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Blog is now running!") 
});