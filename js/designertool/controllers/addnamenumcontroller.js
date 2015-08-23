customInkControllers.controller('AddNameNumberCtrl', ['$scope','$http','webServices','popupManager', function($scope,$http,webServices,popupManager) 
{
	//alert("jhjhf")
	$scope.updateNamePage2();
	
	$scope.enterNameAndNumber=function()
	{
		
		
		$scope.resetNameNumberTable();
			
		if(nameCheck==true || numberCheck==true)
		{
			
			
			(nameCheck==true)?angular.element(".textbox1").removeClass("disabled"):angular.element(".textbox1").addClass("disabled");
			(numberCheck==true)?angular.element(".textbox2").removeClass("disabled"):angular.element(".textbox2").addClass("disabled");
			popupManager.open("nameSizeNumber")
		}
		
		else
		{
			popupManager.open("nameNumber")
		}
	}
	
}]);