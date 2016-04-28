angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation) {

  $scope.lat="0.0";
  $scope.long="0.0";
  $scope.alti="0.0";
  $scope.acc="0.0";
  $scope.altAcc="0.0";
  $scope.heading="0.0";
  $scope.speed="0.0";
  $scope.time="0.0";
  
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
     $cordovaGeolocation
     .getCurrentPosition(posOptions)

     .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat + '   ' + long);
     }, function(err) {
        console.log(err);
     });

     var watchOptions = {timeout : 3000, enableHighAccuracy: false};
     var watch = $cordovaGeolocation.watchPosition(watchOptions);

     watch.then(
        null,

        function(err) {
           console.log(err);
        },

        function(position) {
           var lat  = position.coords.latitude;
           var long = position.coords.longitude;
           console.log(lat + '' + long);
        }
     );

     watch.clearWatch();

  $scope.geolocatorTest = function(){
    navigator.geolocation.getCurrentPosition(function(position){
      alert('Latitude: '          + position.coords.latitude          + '\n' +
           'Longitude: '         + position.coords.longitude         + '\n' +
           'Altitude: '          + position.coords.altitude          + '\n' +
           'Accuracy: '          + position.coords.accuracy          + '\n' +
           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
           'Heading: '           + position.coords.heading           + '\n' +
           'Speed: '             + position.coords.speed             + '\n' +
           'Timestamp: '         + position.timestamp                + '\n');
    });
    $scope.lat=position.coords.latitude;
    $scope.long=position.coords.longitude;
    $scope.alti=position.coords.altitude;
    $scope.acc=position.coords.accuracy;
    $scope.altAcc=position.coords.altitudeAccuracy;
    $scope.heading=position.coords.heading;
    $scope.speed=position.coords.speed;
    $scope.time=position.timestamp;
  };
})

.controller('MapCtrl', function($scope){
  $scope.$on("$ionicView.beforeEnter", function() {
    console.log("Map tab control loaded");

  });

  angular.extend($scope,{
    user:{
      lat: 51.505,
      lng: -0.09,
      zoom: 4
    },
    defaults:{
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      maxZoom: 18,
      zoomControlPosition: 'bottomleft'
    },
    markers:{},
    center:{},
    events:{}
  });

  $scope.user={
    lat: 51.505,
    lng: -0.09,
    zoom: 4
  };

  $scope.map = {
          defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'topleft'
          },
          markers : {},
          center : {
            lat: 51.505,
            lng: -0.09,
            zoom: 4
          },
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
        };

    $scope.geolocatorTest = function(){
      navigator.geolocation.getCurrentPosition(function(position){
        alert('Latitude: '          + position.coords.latitude          + '\n' +
             'Longitude: '         + position.coords.longitude         + '\n' +
             'Altitude: '          + position.coords.altitude          + '\n' +
             'Accuracy: '          + position.coords.accuracy          + '\n' +
             'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
             'Heading: '           + position.coords.heading           + '\n' +
             'Speed: '             + position.coords.speed             + '\n' +
             'Timestamp: '         + position.timestamp                + '\n');
      });
    };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

angular.module("demoapp", ['leaflet-directive'])
      .controller("BasicFirstController", [ "$scope", function($scope) {
          // Nothing here!
    }]);
