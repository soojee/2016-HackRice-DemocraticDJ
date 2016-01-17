var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    http = require('http');
    
mongoose.connect("mongodb://localhost/spotifye");
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema setup
var songSchema = new mongoose.Schema({ 
    name: String,
    songID: String,
    playlist: String,
    rating: Number
});

var Song = mongoose.model("Song", songSchema);

//Routes
app.get('/', function(req, res){
    res.render("home");
});

//List all songs
app.get('/songs', function(req, res){
    Song.find({}, function(err, allSongs){
        if(err){
            console.log("Error");
        } else{
            res.render("songs", {songs: allSongs});
        }
    });
});

//Add new song
app.post('/songs', function(req, res){
    var songName = req.body.songName;
    var params = {name: songName, songID: "spotify:track:0hgsUnkawqDllP4OF4g9MN", playlist: "ABC", rating: 1}
    Song.create(params, function(err, newSong){
        if(err){
            console.log("Error");
        } else {
            res.redirect('/songs');
        }
    });
});

//Upvote
app.put('/songs/up', function(req, res){
    var songToUp = req.body.songUp;
     Song.find({name: songToUp}, function(err, song){
        if(err){
            console.log("Error");
        } else {
            song.rating = song.rating + 1;
        }
    });
});

//Downvote
app.put('/songs/down', function(req, res){
    var songToDown = req.body.songID;
    Song.find({songID: songToDown}, function(err, song){
        if(err){
            console.log("Error");
        } else {
            song.rating = song.rating - 1;
        }
    });
});


//Methods
function rearrange(){
    
}

app.listen(3000, function(){
     console.log("Server started!");
 });


