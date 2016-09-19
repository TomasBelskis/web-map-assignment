angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $http) {

  $scope.lat="0.0";
  $scope.long="0.0";
  $scope.alti="0.0";
  $scope.acc="0.0";
  $scope.altAcc="0.0";
  $scope.head="0.0";
  $scope.speed="0.0";
  $scope.time="0.0";
  //$scope.yourLoc={};
  $ionicPlatform.ready(function(){
    $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

      var posOptions = {
           enableHighAccuracy: true,
           timeout: 20000,
           maximumAge: 10000
       };

       $cordovaGeolocation
       .getCurrentPosition(posOptions)

       .then(function (position) {
         
          //variables that store differnt data returned from geolocation plugin
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          var alti = position.coords.altitude;
          var accu = position.coords.accuracy;
          var altiAcc = position.coords.altitudeAccuracy;
          var heading = position.coords.heading;
          var speed = position.coords.speed;
          var time = position.timestamp;

          console.log(lat + '   ' + long);
          $scope.lat=lat;
          $scope.long=long;
          $scope.alti=alti;
          $scope.acc=accu;
          $scope.altAcc=altiAcc;
          $scope.head=heading;
          $scope.speed=speed;
          $scope.time=time;

          $ionicLoading.hide();
       }, function(err) {
          console.log(err);
          $ionicLoading.hide();
       });

       var watchOptions = {timeout : 20000, enableHighAccuracy: true};
       var watch = $cordovaGeolocation.watchPosition(watchOptions);

       watch.then(
          null,

          function(err) {
             console.log(err);
             $ionicLoading.hide();
          },

          function(position) {
             var lat  = position.coords.latitude;
             var long = position.coords.longitude;
             var alti = position.coords.altitude;
             var accu = position.coords.accuracy;
             var altiAcc = position.coords.altitudeAccuracy;
             var heading = position.coords.heading;
             var speed = position.coords.speed;
             var time = position.timestamp;

             console.log(lat + '' + long);
             $scope.lat=lat;
             $scope.long=long;
             $scope.alti=alti;
             $scope.acc=accu;
             $scope.altAcc=altiAcc;
             $scope.head=heading;
             $scope.speed=speed;
             $scope.time=time;
          }
       );
       $ionicLoading.hide();
      
   });//map function end

})//dash controller end
/*.controller('DashCtrl', function($scope) {})*/

.controller('MapCtrl', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, $http, leafletData, leafletMarkerEvents){
  $scope.$on("$ionicView.beforeEnter", function() {
    console.log("Map tab control loaded");
  });

 //Array that stores all of the markers
 $scope.map={};
 $scope.map.markers={};
 $scope.amneties={};
 $scope.map.center={
            lat: 53.42021074718376,
            lng: -6.476871434302018,
            zoom: 15
          };
 $scope.map.defaults={};
 $scope.yourLoc={};
 $scope.markerArray=new Array();
 $scope.acc=0.0;
 $scope.lat=0.0;
 $scope.long=0.0;
 $scope.distance = 0.0;
 $scope.degs=0;
 $scope.selectedMarkerlatlng={};


//creates leaflet map with default parameters
 $scope.map = {
         defaults: {
            tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            maxZoom: 18,
            zoomControlPosition: 'topleft'
          },
          center : {
            lat: 53.42021074718376,
            lng: -6.476871434302018,
            zoom: 15
          },
          markers : $scope.markerArray,
          pathToMarker:{
              p1: {
                        color: 'red',
                        weight: 0,
                        latlngs: [     
                        ],
                        message: "",
                    },
               accIndicator: {
                    type: "circleMarker",
                    color:'red',
                    weight:2,
                    radius: 1,
                    latlngs:
                    {
                      lat:53.42021074718376,
                      lng:-6.476871434302018
                    }
                }
          },
          events: {
            //map: {
              //enable: ['context'],
              //logic: 'emit'
            //},
            markers:{
                      enable: leafletMarkerEvents.getAvailableEvents(),
                      //logic: 'emit'
                    }
          }
          
    };//end of map
 
    $ionicPlatform.ready(function(){


    });
  
    $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

       //Options for geolocation plugin
       var posOptions = {
           enableHighAccuracy: true,
           timeout: 60000,
           maximumAge: 60000
       };

       //acquers location using cordova geolocation plugin
       $cordovaGeolocation
       .getCurrentPosition(posOptions)

       .then(function (position) {

        //Stores position coords retrieved by the pluging into local variables
        var lat  = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log(lat + '   ' + lng);

        //stores your location into global scope
        $scope.lat=position.coords.latitude;
        $scope.long=position.coords.longitude;
        $scope.acc=position.coords.accuracy;

        //centers map on your location  
        $scope.map.center.lat = position.coords.latitude;
        $scope.map.center.log = position.coords.longitude;

        //sets path values for drawing path when marker is selected
        $scope.map.pathToMarker.accIndicator.latlngs.lat = position.coords.latitude;
        $scope.map.pathToMarker.accIndicator.latlngs.lng = position.coords.longitude;
        $scope.map.pathToMarker.accIndicator.radius=position.coords.accuracy;

        //marker for where you are on the map
        $scope.yourLoc={ 
            lat: $scope.lat,
            lng: $scope.long,
            draggable:false,
            focous:true,
            icon:{
             iconUrl:'img/youHere.png',
             shadowUrl:'img/marker-shadow.png', 
             iconAnchor: [13, 40], 
             popupAnchor: [0, -35]
            },
            autoPan:false,
            message: "You are here!",
       };

       //Test marker
       /*
       var testMarker={
            lat: 53.5583339958321,
            lng: -6.790452003479004,
            draggable:false,
            focous:true,
            icon:{
                
            },
            autoPan:false,
            message: "Test marker",
       };*/

       //pushing into marker array your location marker
       $scope.markerArray.push($scope.yourLoc);
       //$scope.markerArray.push(testMarker);
       $ionicLoading.hide();
       }, function(err) {
          console.log(err);
          $ionicLoading.hide();
       });

       //Watch paremeter for the watch geolocation function which tracks
       //change in location and retrieves position dynamically
       var watchOptions = {timeout : 60000, enableHighAccuracy: true};
       var watch = $cordovaGeolocation.watchPosition(watchOptions);

       watch.then(
          null,

          function(err) {
             console.log(err);
             $ionicLoading.hide();
          },

          function(position) {
             //stores position into local variables 
             var lat  = position.coords.latitude;
             var long = position.coords.longitude;

             //Stores postion coords into scope variables 
             $scope.lat=position.coords.latitude;
             $scope.long=position.coords.longitude;
             $scope.acc=position.coords.accuracy;

             //centers the map on actively changing possition if movement is detected
             $scope.map.center.lat = position.coords.latitude;
             $scope.map.center.lng = position.coords.longitude;

             console.log(lat + '' + long);
             $scope.lat=lat;
             $scope.long=long;
           
            //stores the live cordinates for most accuracy
            //inn order to calculate distance and bearing point
            var latLng2 = {
                lat:position.coords.latitude,
                lng:position.coords.longitude
            };

            //Calculates distance as the user position keeps changing and updates the display on map
            $scope.distanceCalc = haversineDistance($scope.selectedMarkerlatlng,latLng2);

            //rotates arrow once a marker has been selected, actively rotates if movement detected
            $scope.degs = getBearing(latLng2, $scope.selectedMarkerlatlng);
            $scope.rotateCanvas($scope.degs);
          }
       );

       $ionicLoading.hide();

      //pulls data of the webpages as a json object
      $http.get('http://mf2.dit.ie:8080/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dit:dublin_food&outputFormat=json&srsName=epsg:4326').success(function(data){
     

      // stored data from the website into an array as a complete json
      $scope.RecData = data;
      $scope.amneties = $scope.RecData.features;

      //parsing json 
      $scope.amneties =angular.fromJson($scope.amneties);
      $scope.propertiesVar =  $scope.amneties.properties;

      //console.log("Properties " + $scope.properties);
      //$scope.amneties = $.map(scope.amneties, function(el) { return el });
      
      var count = 0;
      //gets lenght of json object keys, 1504 markers in total that are stored on the website
      var size = Object.keys($scope.amneties).length;
     

      //iterates through object size
      for(var i = 0; i<size; i++){

        //acces the marker coordanates and formulates them
        var markerCoordanates = $scope.amneties[i].geometry.coordinates.toString();
          markerCoordanates = markerCoordanates.replace(/\[/g,""); // removes bracket
          markerCoordanates = markerCoordanates.replace(/\]/g,"");//removes bracket
          var longLat = markerCoordanates.split(",");// splits on comma
          //console.log("lat: "+longLat[1]+" long: " +longLat[0]);

          //formatting a message for markers popup of the description of the amnety
           var markerMsg ="<h6>Amnety Description</h6>";
              markerMsg+="Name: " + $scope.amneties[i].properties.name + "<br>";
              markerMsg+="Name: " + $scope.amneties[i].properties.cuisine + "<br>";
              markerMsg+="Website: " + $scope.amneties[i].properties.website+ "<br>";
              markerMsg+="Category: " + $scope.amneties[i].properties.category;
              //console.log(markerMsg);

          //extracts marker category used to decide which icon to use based on amnety category
          var markerLayer = $scope.amneties[i].properties.category.toString();

          //checks if marker layer not null, 
          if(markerLayer!=null){

            //checks for what type of amnety it is, sets a custom marker icon based 
            //on type of amnety it is 
            if(markerLayer=="fast_food"){
                $scope.markerArray.push({
                lat: parseFloat(longLat[1]),
                lng: parseFloat(longLat[0]),
                icon:{
                  iconUrl:'img/fast-food.png',
                  shadowUrl:'img/marker-shadow.png',
                  iconAnchor: [13, 40], 
                  popupAnchor: [0, -35]
                },
                draggable:false,
                focous:false,
                autoPan:false,
                message: markerMsg,
                group: "restaurant",
              });
            }else if(markerLayer=="cafe"){
               $scope.markerArray.push({
                lat: parseFloat(longLat[1]),
                lng: parseFloat(longLat[0]),
                icon:{
                  iconUrl:'img/cafe.png',
                  shadowUrl:'img/marker-shadow.png',
                  iconAnchor: [13, 40], 
                  popupAnchor: [0, -35]
                },
                draggable:false,
                focous:false,
                autoPan:false,
                message: markerMsg,
                group: "restaurant",
             });
             }else{
                $scope.markerArray.push({
                lat: parseFloat(longLat[1]),
                lng: parseFloat(longLat[0]),
                draggable:false,
                focous:false,
                autoPan:false,
                message: markerMsg,
                group: "restaurant",
               });
             }
        
          }
      }
          //Loging the array after data parsing has been completed
          console.log($scope.markerArray);
      });//end http get

    //setting array div to visible
    document.getElementById('arrow').style.visibility = 'visible';

    //extract html element stores reference into var
    var canvas = document.getElementById('arrow-canvas');
    var context = canvas.getContext('2d');

  
    //calls map object that returns the map that had been created
    leafletData.getMap("map").then(function(map){

    console.log(map.getSize());

    //gets size of map sets it to global scope variable
    $scope.mapSize=map.getSize();
    console.log("Map.y: "+ $scope.mapSize.y + "Map.x: " + $scope.mapSize.x);
    canvas.style.top = (($scope.mapSize.y / 2) - (canvas.height / 2)).toFixed() + "px";
    canvas.style.left = (($scope.mapSize.x / 2) - (canvas.width / 2)).toFixed() + "px";

    //canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    
    //get arrow image
    var arrowImage = new Image();
    arrowImage.onload = function () {
        context.drawImage(arrowImage, ((canvas.width / 2) - (arrowImage.width / 2)), ((canvas.height / 2) - (arrowImage.height / 2)));
        var degs = 0;
        $scope.rotateCanvas(degs);
    };
    arrowImage.src = 'img/arrow.png';
    
    //sets rotate canvas to a scope function so it can be called from other functions outside
    //of leafletDate.Getmap
    $scope.rotateCanvas = function(degs){
      context.restore();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(degs * Math.PI / 180);
      context.drawImage(arrowImage, -arrowImage.width / 2, -arrowImage.width / 2);
    };

  });
  
  //getBearing function
  function getBearing(latLng1, latLng2) {
      // updated - φ is latitude, λ is longitude, note that angles need to be in radians to pass to trig functions!
      var lat1 = latLng1.lat * (Math.PI / 180);
      var lat2 = latLng2.lat * (Math.PI / 180);
      var lon1 = latLng1.lng * (Math.PI / 180);
      var lon2 = latLng2.lng * (Math.PI / 180);

      var y = Math.sin(lon2 - lon1) * Math.cos(lat2);
      var x = Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);

      //var brng = Math.atan2(y, x).toDegrees();
      return (Math.atan2(y, x)) * (180 / Math.PI);
  }
    //get distance function
    function haversineDistance(latLng1, latLng2) {

      var R = 6371000; // metres
      var lat1 = latLng1.lat * (Math.PI / 180);
      var lat2 = latLng2.lat * (Math.PI / 180);
      var deltaLat = (latLng2.lat - latLng1.lat) * (Math.PI / 180);
      var deltaLon = (latLng2.lng - latLng1.lng) * (Math.PI / 180);

      var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return ((R * c)/1000).toFixed(3); //return in KM metres to 3 decimal places for clarity

    }

  //  console.log("Map Height" + mapSize);
  //  gets event data
  $scope.map.events = {
                markers: {
                    enable: leafletMarkerEvents.getAvailableEvents(),
                }
            };

  //on marker click event fires off when marker is clicked
  $scope.$on("leafletDirectiveMarker.map.click", function(event, args){
                var leafEvent = args.leafletEvent;//gets leaflet events part of args
                  console.log("clicked a marker");

                    //draws a path to the marker with a red line
                    $scope.map.pathToMarker.p1={
                        color: 'red',
                        weight: 4,
                        latlngs: [
                            { lat: leafEvent.latlng.lat, lng: leafEvent.latlng.lng },
                            { lat: $scope.lat, lng: $scope.long},
                        ],
                    };

             //stores selected marker coords
              $scope.selectedMarkerlatlng={
                lat:leafEvent.latlng.lat,
                lng:leafEvent.latlng.lng
            };

            //retrieves your stored coords
               var latLng2 = {
                lat:$scope.lat,
                lng:$scope.long
            };

             // calls the distance calculate functiion and displays the result on the map
             $scope.distanceCalc = haversineDistance($scope.selectedMarkerlatlng,latLng2);
             console.log("distance calculated" + haversineDistance($scope.selectedMarkerlatlng,latLng2));

            //rotates arrow once a marker has been selected
            $scope.degs = getBearing(latLng2, $scope.selectedMarkerlatlng);
            $scope.rotateCanvas($scope.degs);
          });
            
          

      
})//End maps controller

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
