angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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
          center : {},
          events: {
            map: {
              enable: ['context'],
              logic: 'emit'
            }
          }
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
