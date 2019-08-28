// Adding npm packages  
var express = require("express"); 
var mongoose = require("mongoose"); 
// var expressLayouts = require("express-ejs-layouts"); 
var exphbs = require("express-handlebars");

// bringing in the mongo objectID 


// Scrapers 
var axios = require("axios"); 
var cheerio = require("cheerio"); 

// Setting up the app and the port 
var app = express();
var PORT = process.env.PORT || 5000;

// Define the db
var db = require("./models"); 

// //ejs 
// app.use(expressLayouts); 
// app.set("view engine", "ejs"); 

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Mongo DB Connection 
var DB_Connect = process.env.MONGODB_URI || "mongodb://localhost/lisbeth"; 

mongoose.connect(DB_Connect, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err); 
    }
    else {
        console.log("connected to the db"); 
    }
});
// mongoose.connect(MONGODB_URI); 
// mongoose.connect("mongodb://localhost/lisbeth", { useNewUrlParser: true });

// Listener to start the server
app.listen(PORT, () => {
    console.log("App running on Port " + PORT); 
})

// Root Route - Displays a list of the articles that were scraped 
app.get("/", (req, res) => {
    // res.send("This is the main page"); 
    db.Posts.find({})
        .then((posts) => {
            // res.json(dbPosts); 
            // console.log(posts); 
            // console.log(res); 
            res.render("posts", {
                posts: posts
            }); 
        })
        .catch ((err) => {
            res.json(err); 
        })

    }) 

    // View saved posts 
app.get("/saved", (req, res) => {

    db.Posts.find({ isSaved: true })
        .then((saved) => {
            console.log(saved);  
            res.render("posts", {
                posts: saved
            }); 
        })
        .catch ((err) => {
            res.json(err); 
        })

    }) 



// Scrapes the site for articles 
app.get("/scrape", (req, res) => {
    axios.get("https://wordswithlisbeth.com/blog/").then((response) => {
        var $ = cheerio.load(response.data)

        $(".entry-wrap").each((i, element) => {

            var title = $(element).find(".entry-title").text().trim();
            var link = $(element).find(".entry-title").children().attr("href");
            var summary = $(element).find(".entry-content").text().trim();
            var image = $(element).find(".entry-thumb").children().attr("src"); 
            console.log(image); 

            db.Posts.create({
                title:title, 
                link:link,  
                summary:summary, 
                image:image
            }, 
            (err, insert) => {
                if (err) {
                    console.log(err); 
                }
                else {
                    console.log(insert); 
                }
            })
                
        })
    })

    res.send("Got the articles!"); 
})

// Get a specific post by ID and add a note 
app.get("/posts/:id", function (req, res) {
    db.Posts.findOne({ _id:req.params.id })
    .populate("note")
    .then(function(dbPosts) {
        res.json(dbPosts); 
    })
    .catch(function(err){
        res.json(err); 
    }); 
})

app.post("/posts/:id", function (req, res) {
    db.Notes.create(req.body)
    // console.log(req.body)
        .then(function(dbNote) {
            console.log(req.body)
            return db.Posts.findOneAndUpdate( { _id: req.params.id }, { note: dbNote._id }, { new: true } ); 
        })
        .then (function (dbPosts) {
            res.json(dbPosts); 
        })
        .catch(function(err) {
            res.json(err); 
        })
})


// Updates the article to isSaved 
app.put("/api/posts/:id", function (req, res) {
    console.log(req.body); 
    console.log(req.params); 
    
    db.Posts.findOneAndUpdate( { _id: req.params.id }, req.body, { new: true })
        .then(function(dbPosts) {
            console.log(dbPosts)
            res.json(dbPosts); 
        })
})




// Shows the posts in raw json
app.get("/posts", (req, res) => {
    db.Posts.find({})
        .then((dbPosts) => {
            res.json(dbPosts); 
        })
        .catch ((err) => {
            res.json(err); 
        })
})