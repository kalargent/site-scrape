// Adding npm packages  
var express = require("express"); 
var mongoose = require("mongoose"); 

// Scrapers 
var axios = require("axios"); 
var cheerio = require("cheerio"); 

// Setting up the app and the port 
var app = express();
var PORT = process.env.PORT || 3000;

// Define the db
var db = require("./models"); 

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
    res.send("This is the main page"); 
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

// Get route to scrape entries from the web Site 
// app.get("/scrape", (req, res) => {
//     axios.get("https://wordswithlisbeth.com/blog/").then((response) => {
//         var $ = cheerio.load(response.data); 

//         $(".entry-wrap").each((i, element) => {
//             var title = $(element).find(".entry-title").text();
//             var link = $(element).find(".entry-title").children().attr("href");
//             var summary = $(element).find(".entry-content").text();

//             if (title && link && summary) {
//                 db.posts.insert ({
//                     title: title, 
//                     link: link,
//                     summary: summary 
//                 }, 
//                 (err, insert) => {
//                     if (err) {
//                         console.log(err); 
//                     } else {
//                         console.log("database insert successful"); 
//                     }
//                 }); 
//             }
//         }); 
//     }); 

//     res.send("Got the articles!!"); 

// })
