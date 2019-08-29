# site-scrape
---------------
## Table of Contents
1. [Abstract](#abstract)
2. [Coding Overview](#overview)
3. [Features](#Features)
4. [Backlog](#Backlog)
5. [My Role](#Myrole)
6. [Shout Outs](#ShoutOuts)

<a name="abstract"></a>
## Abstract
The Site Scraper application is designed to scrape a site for posts, display those posts with a link, summary and an image, and allow users to add notes and save favorites.


Heroku (Prod): https://warm-journey-95389.herokuapp.com

<a name="overview"></a>
## Coding Overview
The application is built with;
* HTML
* CSS
* Bootstrap 
* Javascript
* JQuery 
* AJAX 
* MongoDB
* Node.js
* Font Awesome 
* NPM Packages 
  * Express 
  * Mongoose 
  * Handlebars
  * Animate.css

<a name="Features"></a>
## Features 
The app has the following features: 
* Scrapes https://wordswithlisbeth.com and saves the posts to a mongoDB. 
* You can view all posts or a list of favorites. 
* Click a link to go directly to the post. 
* Add or update a note associated with the article. 
    * The note is stored in a new collection, and is associated to the post. 
* Save/Remove a post to favorites. 
    * This updates a flag in the DB indicating whether the post is a favorite or not. 
* Users can clear and rescrape the articles. 

<a name="Backlog"></a>
## Backlog
Because of the amount of time we had to complete this assignment, I had to trim the following features from my MVP:
* Removing a note from an article. 
* Adding multiple notes to an article. 
* Scraping more articles than the initial 10. 

<a name="Myrole"></a>
## My Role 

I coded all aspects of this app, including the custom CSS, using the class examples as a guide. 

<a name="ShoutOuts"></a>
## Shout Outs 
Coding is a social activity, and no one can do it alone. The following people helped me get through this homework:

* My TA's and instructor.
* My husband and peers who spent countless hours pair programming with me, answering questions, and helping me debug.
* Class resources.
* Myself. Because I keep on going without giving up.
 


