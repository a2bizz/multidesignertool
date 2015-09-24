

/* Controllers */
var siteUrl="http://magento.thefabricitsolutions.com/magento/NR298/tool/";

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.pid='id';
  $scope.orderProp = 'age';
  jquery("img").unveil(200);
  var obj = Object.create({}, { prop1: { value: 'val1', enumerable: true}, prop2: { value: 'val2', enumerable: false} });
  console.log(Object.keys(obj))
  //var obj=new Object();
 // obj.name="anadi";
 // obj.prop={"city":"banda","state":"up","currentArea":"Noida",enumerable:true};
  //obj.prop1={"city":"banda","state":"up","currentArea":"Noida",enumerable:false};
  for(prop in obj )
  {
  	console.log(prop)
  }
   var obj1=new Object();
  obj1.name="vijay";
  obj1.prop={"city":"vanaras","state":"up"};
  var targetObj=jquery.extend(true,{},obj,obj1);
  console.log(targetObj);
  
  var targetObj=jquery.extend({},obj,obj1);
  console.log(targetObj);
  console.log(Object.keys(obj1))
  
   var obj2=new Object();
  obj2.name="vijay";
  obj2.prop={"city":"vanaras","state":"up"};
  var serialiseJson=angular.toJson(obj2,false);
  console.log(serialiseJson)
  console.log(serialiseJson.name)
  var deserialiseJson=angular.fromJson(serialiseJson)
  console.log(deserialiseJson)
  console.log(deserialiseJson.name)
  
  
}]);


phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
  	var config = {params: {id: '5'}};
    $http.get('assets/phones/' + $routeParams.phoneId + '.json',config).success(function(data) {
    	
      $scope.phone = data;
       $scope.mainImageUrl = data.images[0];
    });
     $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
  
phonecatControllers.controller('serverDataCtrl' , ['$scope', '$routeParams', 'Phone', function($scope, $routeParams, Phone) {
  $scope.phpdata = Phone.get({phoneId:'serdata.php'}, function(phpdata) 
  {
  	//$scope.phpdata=jquery.parseJSON(phpdata);
  
  	
  });
  
  
    // $scope.setImage = function(imageUrl) {
      //$scope.mainImageUrl = imageUrl;
   // }
  }]);