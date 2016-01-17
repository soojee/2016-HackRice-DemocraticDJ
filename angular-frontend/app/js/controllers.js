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

  $scope.queue = function(id) {
    $.ajax({

    })
  }

/*       $scope.searchResults = [
        {'name': "songname", 'url': 'asdfasdsadfsadf'},
        {'name': "songname2", 'url': 'asdfasdsadfsadf'},
        {'name': "songname3", 'url': 'asdfasdsadfsadf'},
        {'name': "songname4", 'url': 'asdfasdsadfsadf'},
     ]*/

     $scope.url = $sce.trustAsResourceUrl("https://embed.spotify.com/?uri=spotify:track:" + $scope.songsearch /*4th1RQAelzqgY7wL53UGQt"*/);
}]);