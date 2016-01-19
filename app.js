var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    http = require('http');
    
mongoose.connect("mongodb://localhost/spotifye");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Schema setup
var songSchema = new mongoose.Schema({ 
    name: String,
    songID: String,
    artist: String,
    rating: Number
});

var Song = mongoose.model("Song", songSchema);

//Routes
app.get('/', function(req, res){
    res.render('index');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/host', function(req, res){
    res.render('host_');
})

app.get('/friend', function(req, res){
    res.render('friend');
})

//List all songs
app.get('/songs', function(req, res){
    Song.find({}, function(err, allSongs){
        if(err){
            console.log("Error");
        } else{
            res.json(allSongs);
        }
    });
});

//Add new song
app.post('/songs', function(req, res){
    console.log(req.body);
    var songName = req.body.name;
    var songId = req.body.id;
    var songArtist = req.body.artist;
    var params = {name: songName, songID: songId, artist: songArtist, rating: 1}
    Song.create(params, function(err, newSong){
        if(err)
            console.log("Error");
        res.send(newSong);
    });
});

//Remove song once finished playing
app.post('/removeSong', function(req, res) {
    Song.remove({'songID': req.body.songID}, function(err) {
        if (err) console.log(err);
        else
            res.send();
    });
});

//Upvote
app.put('/songs/up', function(req, res){
    var songURI = req.body.songID;
    console.log(req.body);
    Song.update({"songID": songURI}, {$inc: {'rating': 1}}, {multi: true}, function(err,song){
        if(err){
            console.log("Error");
        } else {
            res.send(song);
        }
    }
    );
});


app.listen(3000, function(){
     console.log("Server started!");
 });


