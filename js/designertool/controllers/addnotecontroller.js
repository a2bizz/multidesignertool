customInkControllers.controller('AddNoteCtrl', ['$scope','$http','webServices','$location', function($scope,$http,webServices,$location) 
{
	angular.element("#textNotes").val(notes)
	$scope.updateShow="false";
	$scope.updateNote=function()
	{
		
		$scope.updateShow=true;
		$scope.$apply();
		notes=angular.element("#textNotes").val()
			//$scope.genPdfTest();
			//console.log(notes)
		//webServices.customServerCall($http,siteUrl+'php/testphp.php',obj,'test',$scope);
		//webServices.customServerCall($http,siteUrl+'php/xml/layers.json',obj,'changetoolproduct',$scope);
		//webServices.customServerCall($http,dataAccessUrl+'designersoftware/hoodies_index/swapitem',obj,'changetoolproduct',$scope);
	}
	$scope.noteChange=function()
	{
		$scope.updateShow=false;
		$scope.$apply();
	}
}]);