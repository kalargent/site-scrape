// Adding npm packages  
var express = require("express"); 

// Setting up the app and the port 
var app = express();
var PORT = process.env.PORT || 3000;

// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Mongo DB Connection 
// mongoose.connect("mongodb://localhost/lisbeth", { useNewUrlParser: true });

// Listener to start the server
app.listen(PORT, () => {
    console.log("App running on Port " + PORT); 
})