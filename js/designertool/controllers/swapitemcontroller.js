customInkControllers.controller('SwapItemCtrl', ['$scope','$http','webServices','popupManager', function($scope,$http,webServices,popupManager) {
	
	
	customColorsArr=new Array();
	//$scope.moreThanColor="true";
	//alert()
	$scope.selectBorderFlag=selectedBorderFlag;
	$scope.selectedLayerEnabled=selectedLayerEnabled;
	$scope.hoodiesOrBlanket=hoodiesOrBlanket;
	if(productType=="multilayer")
	{
		$scope.frontBackIndxObj=(currentView==0)?frontIndexObj:backIndexObj;
		$scope.selectedLayerColorData=selectedLayerColorData;
		//console.log(selectedLayerColorData)
	}
	if(!colors)
	{
		var obj=new Object();
		obj.productId=productId;
		webServices.customServerCall($http,dataAccessUrl+'designersoftware/index/swapitem',obj,'colors',$scope);
	}
	else
	{
		//console.log(colors)
		
		customColorsArr=new Array();
		$scope.colors=colors.colors;
		
		$scope.moreThanColor=(colors.moreColors)?true:false;
		//alert()
		$scope.blanketsBorderData=blanketsBorderData;
		$scope.selectedBlanketThumb=selectedBlanketThumb;
		$scope.morecolors=colors.moreColors;
		$scope.selectedColorName=selectedColorName;
		$scope.selectedQuantity=selectedQuantity;
		$scope.selectedSizes=selectedSizes;
		$scope.selectedProductName=selectedProductName;
		$scope.selectedBlanketThumb=selectedBlanketThumb;
		//alert(hoodieFlag=="true")
		productDetailData=(hoodieFlag=="true")?productDetailData:colors.productDetails;
		//productDetailData=colors.productDetails;
		$scope.productDetailData=productDetailData;
		//console.log($scope.productDetailData)
		
	}
	$scope.setBorderFlag=function()
	{
		
		$scope.selectBorderFlag=selectedBorderFlag;
		$scope.$apply();
	}
	$scope.changeBorderStyle=function(event,obj)
	{
		event.preventDefault();
		event.stopPropagation();
		angular.element(".custom-drop-down").toggle();
		var grp=backCanvas.item(0);
		if(grp)
		{
			//alert(angular.element(obj).attr("layerid"))
			if(selectedBlanketLayerId!=angular.element(obj).attr("layerid"))
			{
				selectedBlanketLayerId=angular.element(obj).attr("layerid");
				selectedBlanketThumb=angular.element(obj).find("img").attr("src");
				$scope.selectedBlanketThumb=selectedBlanketThumb;
				$scope.$apply();
				if(backIndexObj)
				{
					var indx=angular.element(obj).index();
					var layerImage=blanketsBorderData[indx].url;
					var layerType=blanketsBorderData[indx].layerType;
					var layerId=blanketsBorderData[indx].layerId;
					backIndexObj[1].src=layerImage;
					backIndexObj[1].layerId=layerId;
					var img = fabric.document.createElement('img');
					//console.log(img)
					 img.onload = function() 
					 {
				       
				      grp.item(1).set('_originalElement',img)
				 	  grp.item(1).set('_element',img)
					  backCanvas.renderAll();
					  var child=angular.element("#"+layerType).children();
						angular.element(child[1]).css("backgroundColor");
					  global_SelectedItem=grp.item(1)
					  colorPickerValue=angular.element(child[1]).css("backgroundColor");;
					  global_SelectedItem.fill = colorPickerValue;
				 	  global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
				 	  global_SelectedItem.applyFilters(backCanvas.renderAll.bind(backCanvas));
					  
				     
				    }; 
				
				    img.class="canvas-img";
				    img.crossorigin="";
				    img.src = layerImage;
					
				}
			}
		}
	}
	$scope.setBlanketBorderData=function()
	{
		
		angular.forEach(blanketsBorderData,function(obj,i){
			//console.log(selectedBlanketLayerId)
			//..log(obj.layerId)
			if(selectedBlanketLayerId==obj.layerId)
			{
				selectedBlanketThumb=obj.thumb;
				$scope.selectedBlanketThumb=selectedBlanketThumb;
				console.log(selectedBlanketThumb)
			}
		})
		$scope.blanketsBorderData=blanketsBorderData;
	}
	$scope.changeProductColor=function(obj)
	{
		//alert("anadi")
		if(angular.element(obj).attr("ctitle")!=selectedColorName)
		{
			hoodiesOrBlanket='';
			$scope.selectBorderFlag=false;
			selectedColorName=angular.element(obj).attr("ctitle");
			$scope.selectedColorName=selectedColorName;
			$scope.selectedQuantity=angular.element(obj).attr("minqty");
			$scope.selectedSizes=angular.element(obj).attr("sizes");
			productId=angular.element(obj).attr("pid");
			productColorId=angular.element(obj).attr("cid");
			productColorValue=angular.element(obj).attr("pcolor");
			selectedSizes=$scope.selectedSizes;
			selectedQuantity=$scope.selectedQuantity;
			
			
			angular.forEach(customColorsArr, function(expander,i) 
			{
				expander.colorSelected = false;
				if(i<colors.colors.length)
				{
					
				
					if(colors.colors[i].title==selectedColorName)
					{
						expander.colorSelected = true;
						$scope.changeProductByColorId();
					}
				}	
				else
				{
					if(colors.moreColors[i-colors.colors.length].title==selectedColorName)
					{
						expander.colorSelected = true;
						$scope.changeProductByColorId();
					}
				}
				
				expander.$apply();
				
			});
		}
	}
	$scope.openSwapItemPopUp=function()
	{
		//alert("ana")
		//pSubcatTitle='';
		angular.element("#swapItemCategory").addClass("disabled");
		popupManager.preloaderOpen("preloaderOpen",'Loading Products..');
		if(!allCategory)
		{
			var parScope = angular.element('.tool-wrap').scope();

			parScope.swaptempalate = $scope.swaptempalates[0];
			var obj=new Object();
	    	obj.name="sparx";
	    	obj.address="sector 63"
			//webServices.customServerCall($http,siteUrl+'php/xml/productcatandsubcat.json',obj,'swap',$scope);
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/popup/category',obj,'swap',parScope);
		}
		else
		{
			//alert(pSubcatTitle)
			$scope.pCatTitle=pCatTitle;
			
			$scope.pSubCatTitle=pSubcatTitle;	
			$scope.showMe=(pSubcatTitle)?true:false;
			(pSubcatTitle)?angular.element("#swapItemCategory").removeClass("disabled"):angular.element("#swapItemCategory").addClass("disabled");
			var obj=new Object();
			obj.categoryId=selectedCatId;
			var parScope = angular.element('.tool-wrap').scope();

			parScope.swaptempalate = $scope.swaptempalates[0];
			//$scope.showMe=false;
			$scope.items=allCategory;
			
    		popupManager.open();
    		
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/popup/productlist',obj,'product',$scope)
		}	
	}
	
	$scope.openHoodiesBlanketPopUp=function()
	{
		
		if(hoodiesOrBlanket=="Hoodies")
		{
			if(!hoodisDesignData)
			{
				var obj=new Object();
				obj.categoryId=432
				obj.ptype="hoodies";
				webServices.customServerCall($http,dataAccessUrl+'designersoftware/popup/productlist',obj,'hoodiesproduct',$scope)
			}
			else
			{
				$scope.blanketOrHoodiesdata=hoodisDesignData;
				popupManager.open("hoodiesOpen")
			}
		}
		else if(hoodiesOrBlanket=="Blankets")
		{
			if(!blanketDesignData)
			{
				var obj=new Object();
				obj.categoryId=479;
				obj.ptype="blankets";
				webServices.customServerCall($http,dataAccessUrl+'designersoftware/popup/productlist',obj,'hoodiesproduct',$scope)
			}
			else
			{
				$scope.blanketOrHoodiesdata=blanketDesignData;
				popupManager.open("hoodiesOpen")
			}
		}
		
		
	}
	$scope.closeHoodiesPopup=function()
	{
		popupManager.close("hoodiesClose")
	}	$scope.setLayerIndex=function(obj)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Colors..');
		//alert(angular.element(obj).attr("layerid"))
		selectedLayer=angular.element(obj).attr("id");
		angular.element('.product-layer-holder div.product-layer').removeClass("active");
		angular.element(obj).addClass("active");
		var obj2=new Object();
		obj2.layerId=angular.element(obj).attr("layerid");
		webServices.customServerCall($http,dataAccessUrl+'designersoftware/hoodies_index/layercolors',obj2,'layersColors',$scope)
		
	}
	$scope.changeLayerColor=function(obj)
	{
		var rgbcolor=angular.element(obj).css("backgroundColor");
		var hexColor=angular.element(obj).attr("pcolor");
		//console.log(selectedLayer)
		//console.log(hexColor)
		var child=angular.element("#"+selectedLayer).children();
		
		angular.element(child[1]).css({"backgroundColor":"#"+hexColor});
		for(var i=0;i<frontIndexObj.length;i++)
		{
			if(frontIndexObj[i].indx==selectedLayer)
			{
				frontIndexObj[i].color=hexColor;	
			}	
		}
		for(var i=0;i<backIndexObj.length;i++)
		{
			if(backIndexObj[i].indx==selectedLayer)
			{
				backIndexObj[i].color=hexColor;	
			}	
		}
		//selectedViewCanvas=(currentView==0)?frontCanvas:backCanvas;
	    var grp=frontCanvas.item(0)
		if(grp)
		for(var j=0;j<grp.getObjects().length;j++)
		{
			var item=grp.item(j);
			
			if(item.get("layerIndx")==selectedLayer)
			{
				global_SelectedItem=item;
				colorPickerValue=rgbcolor;
				
				 global_SelectedItem.fill = colorPickerValue;
		 		 global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
		 		 global_SelectedItem.applyFilters(frontCanvas.renderAll.bind(frontCanvas));
		 		 
			}
			
			
		}
		var grp2=backCanvas.item(0)
		if(grp2)
		for(var j=0;j<grp2.getObjects().length;j++)
		{
			var item=grp2.item(j);
			
			if(item.get("layerIndx")==selectedLayer)
			{
				global_SelectedItem=item;
				colorPickerValue=rgbcolor;
				
				 global_SelectedItem.fill = colorPickerValue;
		 		 global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
		 		 global_SelectedItem.applyFilters(backCanvas.renderAll.bind(backCanvas));
		 		 
			}
			
			
		}
		//$scope.frontBackIndxObj=new Array();
		//$scope.$apply();
		//$scope.frontBackIndxObj=(currentView==0)?frontIndexObj:backIndexObj;
		$scope.$apply();
		//console.log(frontIndexObj)
	}
	
	$scope.closePopUp=function()
    {
    	
    	popupManager.close();
    }
	
	$scope.showProductByCatId=function(obj)
	{
		if(obj)
		{
			var parScope=angular.element(".tool-wrap").scope();
			parScope.swaptempalate = $scope.swaptempalates[0];
			parScope.selectedCatOrSubTitle=angular.element(obj).attr("pname")
			parScope.showMe=false;
			pCatTitle=angular.element(obj).attr("pname");
			//pSubcatTitle='';
			selectedCatId=angular.element(obj).attr("pcatid");
			swapCategoryId=selectedCatId;
    		parScope.pCatTitle=pCatTitle;
    		parScope.$apply();
    		$scope.loadProduct()
    	}
    	else
    	{
    		var parScope=angular.element(".tool-wrap").scope();
    		angular.element("#swapItemCategory").addClass("disabled");
    		parScope.showMe=false;
    		selectedCatId=swapCategoryId;
    		parScope.$apply();
    		$scope.loadProduct()
    	}
	}
	
	$scope.showProductBySubCatId=function(obj)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Products..');
		angular.element("#swapItemCategory").removeClass("disabled");
		var parScope = angular.element('.tool-wrap').scope();

		parScope.swaptempalate = $scope.swaptempalates[0];
		parScope.selectedCatOrSubTitle=angular.element(obj).attr("pname");
		pSubcatTitle=angular.element(obj).attr("pname");
	
		selectedCatId=angular.element(obj).attr("pcatid");
		parScope.showMe=(pSubcatTitle)?true:false;
		
		pCatTitle=angular.element(obj).parent().children(0).attr("pname");
		parScope.pCatTitle=pCatTitle;
		
		parScope.pSubCatTitle=pSubcatTitle;
		parScope.$apply();
		$scope.loadProduct();
	}
	
	$scope.updateColorQuantity=function(obj)
	{
		
		//alert(angular.element(obj).attr("sizes"))
		$scope.selectedColorName=angular.element(obj).attr("ctitle");
		$scope.selectedQuantity=angular.element(obj).attr("minqty");
		$scope.selectedSizes=angular.element(obj).attr("sizes");
		//alert(angular.element(obj).attr("sizes"))
		$scope.$apply();
	}
	
	$scope.resetColorQuantity=function()
	{
		$scope.selectedColorName=selectedColorName;
		$scope.selectedQuantity=selectedQuantity;
		$scope.selectedSizes=selectedSizes;
		$scope.$apply();
	}
	$scope.changeSwapProductView=function(obj)
	{
		detectArr.push(new Date().getTime());
		if(detectArr.length>=2)
		{
		}
		else
		{
		productSelectedName=angular.element(obj).attr("productcatname")
			
		subProductId=angular.element(obj).attr("pid")
		var subtitle=angular.element(obj).attr("designerlabel");
		
		selectedBorderFlag=false;
		$scope.selectBorderFlag=selectedBorderFlag;
		babyBlanketTitle=subtitle;
		if((subtitle=="blanket"))
		{
			angular.element(".banket-disabled").parent().addClass("disabled")
			hoodiesOrBlanket="Blankets";
		}
		else
		angular.element(".banket-disabled").parent().removeClass("disabled")
		if(subtitle=="hoodies")
		hoodiesOrBlanket="Hoodies";
		if((subtitle=="hoodies")||(subtitle==="blanket"))
		{
			$scope.hoodiesOrBlanket=hoodiesOrBlanket;
			selectedProductName=productSelectedName;
			$scope.selectedProductName=selectedProductName;
			$scope.loadHoodies();
		}
		else
		{
			detectArr=new Array();
			popupManager.preloaderOpen("preloaderOpen",'Loading Colors..');
			//alert(subProductId)
			//setTimeout(function(){
				var parScope = angular.element('.tool-wrap').scope();
				parScope.swaptempalate = $scope.swaptempalates[1];
			//},200)
			
		}
		parScope.$apply();
		}
		
		
	}
	$scope.changeProductViewDefault=function()
	{
		$scope.swaptempalate = $scope.swaptempalates[0];
		//productSelectedName=angular.element(obj).attr("productcatname")
		$scope.$apply();
	}
	
	$scope.selectProductByColorId=function()
	{
		selectedLayerEnabled=false;
		$scope.selectedLayerEnabled=selectedLayerEnabled;
		customColorsArr=new Array();
		colors=swapcolors;
		$scope.colors=colors.colors;
		$scope.moreThanColor=(colors.moreColors)?true:false;
		//alert($scope.moreThanColor)
		$scope.morecolors=colors.moreColors;
		selectedColorName=selectedSwapColorName;
		$scope.selectedColorName=selectedSwapColorName;
		productDetailData=colors.productDetails;
		$scope.productDetailData=productDetailData;
		selectedProductName=productSelectedName;
		$scope.selectedProductName=selectedProductName;
		$scope.selectedQuantity=selectedQuantity;
		$scope.selectedSizes=selectedSizes;
		//alert()
		$scope.changeProductByColorId();
		popupManager.close();
	}
	/***********************************All Popup Positions**************************************************/
	angular.element(".close-btn").attr("src",$scope.imageUrl+"assets/images/PopupCross.png")
    $scope.windowW=angular.element(window).width();
    $scope.windowH=angular.element(window).height();
    $scope.popupX=Math.abs(($scope.windowW-768)/2);
  
    $scope.popupY=Math.abs(($scope.windowH-460)/2);
    $scope.printpX=Math.abs(($scope.windowW-angular.element('.swapItemHoodiesPopup').width())/2);
   	$scope.printpY=Math.abs(($scope.windowH-angular.element('.swapItemHoodiesPopup').height())/2);
   // alert(angular.element('.enterNameNumberPopUp').width());
    angular.element('.swapItemPopup').css({"left":$scope.popupX+"px","top":$scope.popupY+"px"})
     angular.element('.swapItemHoodiesPopup').css({"left":$scope.printpX+"px","top":$scope.printpY+"px"})
    
    
}]);