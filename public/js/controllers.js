'use strict';

/* Controllers */
var spotifyListApp = angular.module('spotifyListApp', []);

spotifyListApp.controller('SpotifySongList', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $scope.songs = null;
  function refreshSongList(callback){
    $.get('/songs').then(function(data) {
      $scope.$apply(function() {
        $scope.songs = data.sort(function(a,b) {
          return b.rating - a.rating;
        });
      });
      if (callback != null) {
        callback()
      }
    });
  }

  $scope.url = null;
  refreshSongList(function() {
    $scope.$apply(function() {
      $scope.url = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:" + $scope.songs[0].songID);
    });
  });

  $scope.nextTrack = function() {
    $.post('/removeSong', {'songID': $scope.songs[0].songID}, function success() {
      refreshSongList(function() {
        $scope.$apply(function() {
          $scope.url = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:" + $scope.songs[0].songID);
        });
      });
    });
  }

  $scope.upvote = function(song) {
    // TODO: how are songs' changes reflected from Mongo to frontend?
    $.ajax({
      url: '/songs/up',
      type: 'PUT',
      data: {'songID': song.songID},
      success: function(data){
        //TODO
        console.log(data);
        refreshSongList(null);
        /*var index = null;
        $scope.songs.find(function callback(el, ind, ary) {
          if (el.songID = song.songID) index = ind;
          return;
        });
        console.log(index);*/
      },
      failure: function() {
        console.log('error');
      }
    }).then(function() {
      refreshSongList(null);
    })
  }

  $scope.queue = function(result) {
    $.post('/songs', result, function success(data) {
      console.log('refresh on enqueue');
      refreshSongList(null);
    });
    // TODO: updating view
  }

  $('.typeahead').typeahead({
    delay: 300,
    source: function(q, cb) {


      $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + q.split(' ').join('%20') /*$scope.songsearch.split(' ').join('%20')*/ + "&type=track",
        type: "GET",
        success: function(data) {
          var results = data.tracks.items.map(function(item) {
            return {
              'name': item.name,
              'id': item.id,
              'artist': item.artists[0].name
            }
          });
          cb(results);
        }

      });
    },
    displayText: function(item) {
      return item.name + ' by ' + item.artist;
    },
    updater: function(item) {
      $.post('/songs', item, function success(data) {
        console.log('refresh on enqueue');
        refreshSongList();
      });
    }
  });


}]);
