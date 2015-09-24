customInkControllers.controller('SwapItemDetailCtrl', ['$scope','$http','webServices','popupManager', function($scope,$http,webServices,popupManager) {
		
		//alert("aman")
		$scope.swapInfo=false;
		$scope.swapHoverInfo=true;
		$scope.productName=productSelectedName;
		$scope.moreThanColor=false;
		$scope.singleColor=false;
		var obj=new Object();
		obj.configProductId=subProductId;
		selectedSwapColorName='';
		customSwapColorsArr=new Array();
		//alert(obj.configProductId)
		selectedColorThumbFlag=false;
		webServices.customServerCall($http,dataAccessUrl+'designer/index/swapitem',obj,'swapcolors',$scope);
		
		
		$scope.changeProductColor=function(obj)
		{
			//alert(selectedSwapColorName)
			//alert(angular.element(obj).attr("ctitle"))
			if(angular.element(obj).attr("ctitle")!=selectedSwapColorName)
			{
				selectedSwapColorName=angular.element(obj).attr("ctitle");
				$scope.selectedColorName=selectedSwapColorName;
				$scope.selectedQuantity=angular.element(obj).attr("minqty");
				$scope.selectedSizes=angular.element(obj).attr("sizes");
				productId=angular.element(obj).attr("pid");
				selectedSizes=$scope.selectedSizes;
				selectedQuantity=$scope.selectedQuantity;
                               
				sleevePrint=swapPrint;
			//console.log(swapPrint)
				if(sleevePrint==0)
				{
					var childs=angular.element(".tool-links ul li");
					angular.element(childs[1]).css({"display":"none"})
				}
				else
				{
					angular.element(".tool-links ul li").css({"display":"block"});
					
				}
				angular.forEach(customSwapColorsArr, function(expander,i) 
				{
					expander.colorSelected = false;
					if(i<swapcolors.colors.length)
					{
						
					
						if(swapcolors.colors[i].title==selectedSwapColorName)
						{
							selectedColorThumbFlag=true;
							expander.colorSelected = true;
							expander.$apply();
							/***************************Parent Method********************************/
							var parScope=angular.element("#swap-text").scope();
							parScope.selectProductByColorId();
							
							
						}
					}	
					else
					{
						if(swapcolors.moreColors[i-swapcolors.colors.length].title==selectedSwapColorName)
						{
							selectedColorThumbFlag=true;
							expander.colorSelected = true;
							expander.$apply();
							/***************************Parent Method********************************/
							var parScope=angular.element("#swap-text").scope();
							parScope.selectProductByColorId();
						}
					}
					
					expander.$apply();
					
				});
			}
		}
		
		$scope.updateColorQuantity=function(obj)
		{
			
			$scope.swapInfo=true;
			$scope.swapHoverInfo=false;
			$scope.selectedColorName=angular.element(obj).attr("ctitle");
			$scope.selectedQuantity=angular.element(obj).attr("minqty");
			$scope.selectedSizes=angular.element(obj).attr("sizes");
			$scope.$apply();
		}
		
		$scope.resetColorQuantity=function()
		{
			if(selectedColorThumbFlag)
			{
				$scope.selectedColorName=selectedSwapColorName;
				$scope.selectedQuantity=selectedQuantity;
				$scope.selectedSizes=selectedSizes;
				
			}
			else
			{
				$scope.swapInfo=false;
				$scope.swapHoverInfo=true;
			}
			$scope.$apply();
		}
    
}]);
