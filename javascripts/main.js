angular
  .module('spotifyApp', ['spotify'])
  .config(function (SpotifyProvider) {
    SpotifyProvider.setClientId('3ea18075797748588f0b73993721586a');
    SpotifyProvider.setRedirectUri('http://botme.github.io/playmix/callback.html');
    SpotifyProvider.setScope('playlist-read-private playlist-modify-private playlist-modify-public');
  })
  .controller('MainController', ['$scope', 'Spotify', function ($scope, Spotify) {

    $scope.searchArtist = function () {
      Spotify.search($scope.searchartist, 'artist').then(function (data) {
        $scope.artists = data.artists.items;
      });
    };
    var user_id = '';
    $scope.login = function () {
      	Spotify.login().then(function (data) {
	
	      	Spotify.getCurrentUser().then(function (udata) {

	      		user_id = udata['id'];

	      		Spotify.getUserPlaylists( user_id ).then(function (pdata) {
					$scope.playlists = pdata['items'];
				});

			});
       

		}, function () {
			console.log('didn\'t log in');
		});
      	var remixed_items_uris = [];
		$scope.get_playlist = function (user_id,playlist_id,playlist_name) {
			var xcount = 0;
			$scope.new_name = playlist_name + ' Remixed';
			Spotify.getPlaylistTracks(user_id, playlist_id).then(function (data) {
				
			    //$scope.track_items = data['items'];

				var remixed_items_ar = [];

				$.each(data['items'],function(key,item){

					var og_name = item.track.name;
					var og_id = item.track.id;
					var to_search = og_name + ' remix';

				   	Spotify.search(to_search, 'track', {limit:2} ).then(function (sdata) {

				   		$.each(sdata.tracks.items,function(skey,sitem){
				   			if (sitem.name != og_name && sitem.id != og_id) {
				   				remixed_items_ar.push(sitem);
				   				console.log(sitem);
				   				remixed_items_uris.push(sitem.uri);
				   				return false;
				   			}
				   		});
				   		
				   		
					});
					if (xcount > 10) {
				   		return false;
				   	};
				   	xcount++;
				});

			    $scope.remixed_items = remixed_items_ar;
			});
		};

		$scope.create_remixed_playlist = function () {
			var pname = $scope.new_name;
			Spotify.createPlaylist(user_id, { name: pname }).then(function (npdata) {

				console.log('playlist created');

				Spotify.addPlaylistTracks(user_id, npdata.id, remixed_items_uris).then(function (data) {
					console.log('tracks added to playlist');
				});

			});
		};

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