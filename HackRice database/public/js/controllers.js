'use strict';

/* Controllers */
var spotifyListApp = angular.module('spotifyListApp', []);

spotifyListApp.controller('SpotifySongList', ['$scope', '$sce', '$http', function($scope, $sce, $http) {
  $scope.songs = [
      {'name': 'Bad Blood', 'votes': 0},
      {'name': 'Hello', 'votes': 0},
      {'name': 'Payphone', 'votes': 0}
  ];
  $scope.sortChoice = '-votes';
  $scope.url = null;
  $scope.searchResults = [];

  $scope.upvote = function(id) {
    // TODO: how are songs' changes reflected from Mongo to frontend?
    $http.put('/songs/up', id).success(function() {
      console.log('upvoted succesfully');
    })
  }

  $scope.search = function() {
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=" + $scope.songsearch.split(' ').join('%20') + "&type=track",
      type: "GET",
      success: function(data) {
        $scope.$apply(function() {$scope.searchResults = [];});
        var length = data.tracks.items.length;
        for(var i = 0; i < length; i++) {
          $scope.$apply(function() {
            $scope.searchResults.push({
              'name': data.tracks.items[i].name,
              'id': data.tracks.items[i].id,
              'artist': data.tracks.items[i].artists[0].name
            });
         });
        }
      }
    });
  }

  $scope.queue = function(result) {
    $.post('localhost:9000/songs', result, function success(data) {
      console.log('success');
    });
    // TODO: updating view
  }

     $scope.url = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:" + $scope.songsearch /*4th1RQAelzqgY7wL53UGQt"*/);
}]);