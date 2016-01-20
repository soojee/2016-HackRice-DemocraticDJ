function changeDisplayStuffs(trackID) {
  $.ajax({
    url: "https://api.spotify.com/v1/tracks/" + trackID,
    type: "GET",
    success: function(data) {
      var img = data.album.images[0].url;
      $("#text").text(data.name);
      $("#bg").attr("src", img);
      $("#album-pic").attr("src", img);
    }
  });
}
changeDisplayStuffs("1HbcclMpw0q2WDWpdGCKdS");
changeDisplayStuffs("79qlNzUpZzZeXLior0zdtz");

// Create an array of useful data from search query
function compileSearchTracks(searchQuery) {
  searchQuery = searchQuery.split(" ").join("%20");
  $.ajax({
    url: "https://api.spotify.com/v1/search?q=" + searchQuery + "&type=track",
    type: "GET",
    success: function(data) {
      var arr = [];
      var length = data.tracks.items.length;
      for(var i = 0; i < length; i++) {
        arr.push({
          name: data.tracks.items[i].name,
          id: data.tracks.items[i].id
        });
      }
    }
  });
}
compileSearchTracks("give me love");

// Find a new track from related
function findRelatedTrack(trackID) {
  $.get("https://api.spotify.com/v1/tracks/" + trackID).then(function(data) {
    var artistID = data.artists[0].id;
    $.get("https://api.spotify.com/v1/artists/" + artistID + "/related-artists").then(function(data) {
      var rn = Math.floor(data.artists.length * Math.random());
      var randArtistID = data.artists[rn].id;
      $.get("https://api.spotify.com/v1/artists/" + randArtistID + "/top-tracks?country=SE").then(function(data) {
        var rn = Math.floor(data.tracks.length * Math.random());
        track = data.tracks[rn];
      });
    });
  });
}
findRelatedTrack("1HbcclMpw0q2WDWpdGCKdS");

function getDatSong(songName, artistID) {
  songName = songName.split(" ").join("%20");
  $.get("https://api.spotify.com/v1/search?q=" + songName + "&type=track").then(function(data) {
    var track;
    var found = false;
    for(var i = 0; i < data.tracks.items.length; i++) {
      for(var j = 0; j < data.tracks.items[i].artists.length; j++) {
        if(artistID == data.tracks.items[i].artists[j].id) {
          found = true;
          track = data.tracks.items[i];
          break;
        }
      }
      if(found) break;
    }
    console.log(track.name);
    console.log(track.id);
    // TODO: do stuff with track
  });
}
getDatSong("Scars", "4EzkuveR9pLvDVFNx6foYD");