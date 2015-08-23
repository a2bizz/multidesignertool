customInkControllers.controller('NameNumberPage1Ctrl', ['$scope','$http','webServices','popupManager', function($scope,$http,webServices,popupManager) 
{
	angular.element(".nameNumberLogoImage").attr("src",$scope.imageUrl+"/assets/images/namelogo.jpg");
	
}]);