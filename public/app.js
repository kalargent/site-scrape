$.getJSON("/", data => {
    console.log("getting posts"); 
  for (var i = 0; i < data.length; i++) {
    $("#scrapedPosts").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "<br />" +
        data[i].summary +
        "</p>"
    );
  }
});
