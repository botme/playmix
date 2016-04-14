angular
  .module('spotifyApp', ['spotify'])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('3ea18075797748588f0b73993721586a');
    SpotifyProvider.setRedirectUri('http://botme.github.io/playmix/callback.html');
    SpotifyProvider.setScope('playlist-read-private,playlist-read-public,playlist-modify-public, playlist-modify-private');
  })
  .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.artists.items;
      });
    };

    $scope.login = function () {
      Spotify.login().then(function (data) {
        console.log(data);
        alert("You are now logged in");
      }, function () {
        console.log('didn\'t log in');
      })
    };

    //Tracks
    // Spotify.getTrack('0eGsygTp906u18L0Oimnem').then(function (data) {
    //   console.log('=================== Track ===================');
    //   console.log(data);
    // });

    // Spotify.getTracks('0eGsygTp906u18L0Oimnem,1lDWb6b6ieDQ2xT7ewTC3G').then(function (data) {
    //   console.log('=================== Tracks - String ===================');
    //   console.log(data);
    // });

    // Spotify.getTracks(['0eGsygTp906u18L0Oimnem','1lDWb6b6ieDQ2xT7ewTC3G']).then(function (data) {
    //   console.log('=================== Tracks - Array ===================');
    //   console.log(data);
    // });

  }]);
$(document).ready(function(){


});