// Adding npm packages  
var express = require("express"); 
var mongoose = require("mongoose"); 
// var expressLayouts = require("express-ejs-layouts"); 
var exphbs = require("express-handlebars");

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
mongoose.connect("mongodb://localhost/lisbeth", { useNewUrlParser: true });

// Listener to start the server
app.listen(PORT, () => {
    console.log("App running on Port " + PORT); 
})

// Root Route 
app.get("/", (req, res) => {
    // res.send("This is the main page"); 
    db.Posts.find({})
        .then((dbPosts) => {
            res.json(dbPosts); 
            console.log(dbPosts); 
            // console.log(res); 
        })
        .catch ((err) => {
            res.json(err); 
        })

    }) 

app.get("/scrape", (req, res) => {
    axios.get("https://wordswithlisbeth.com/blog/").then((response) => {
        var $ = cheerio.load(response.data)

        $(".entry-wrap").each((i, element) => {

            var title = $(element).find(".entry-title").text();
            var link = $(element).find(".entry-title").children().attr("href");
            var summary = $(element).find(".entry-content").text();

            db.Posts.create({
                title:title, 
                link:link,  
                summary:summary
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

app.get("/posts", (req, res) => {
    db.Posts.find({})
        .then((dbPosts) => {
            res.json(dbPosts); 
        })
        .catch ((err) => {
            res.json(err); 
        })
})