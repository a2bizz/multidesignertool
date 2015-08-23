var myDirective=angular.module('myDirective',[]);

myDirective.directive('customBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			//alert("ana")
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			//alert(indx)
			//alert(colors.colors[indx].title)
			//alert(scope.imageUrl+"/assets/images/selected.png")
			angular.element(angular.element(element[0]).parent()).css({"backgroundColor":"#"+colors.colors[indx].colorCode})
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			if(colors.colors[indx].title==selectedColorName)
			{
				//console.log(scope);
				var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				parScope.selectedQuantity=colors.colors[indx].minQty;
				parScope.selectedSizes=colors.colors[indx].sizeRange;
				productColorId=colors.colors[indx].colorId;
				productColorValue=colors.colors[indx].colorCode;
				
				scope.colorSelected=true;
			}
			else
			scope.colorSelected=false;
			
			customColorsArr.push(scope);
		}
	}
});

myDirective.directive('moreBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(angular.element(element[0]).parent()).css({"backgroundColor":"#"+colors.moreColors[indx].colorCode})
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			if(colors.moreColors[indx].title==selectedColorName)
			{
				scope.colorSelected=true;
				var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				parScope.selectedQuantity=colors.moreColors[indx].minQty;
				parScope.selectedSizes=colors.moreColors[indx].sizeRange;
				productColorId=colors.moreColors[indx].colorId;
				productColorValue=colors.moreColors[indx].colorCode;
			}
			else
			scope.colorSelected=false;
			
			customColorsArr.push(scope);
		}
	}
});


myDirective.directive('swapBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			//alert(indx)
			//alert(colors.colors[indx].title)
			//alert(selectedColorName)
			//alert("jfdhjghjdhgj")
			//alert(swapcolors.colors[indx].title)
			if(swapcolors.colors[indx].title==selectedColorName)
			{
				scope.colorSelected=(selectedProductName==productSelectedName)?true:false;
				if(scope.colorSelected)
				{
					var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
					parScope.swapInfo=true;
					parScope.swapHoverInfo=false;
					selectedColorThumbFlag=true;
					selectedSwapColorName=swapcolors.colors[indx].title;
					parScope.selectedQuantity=swapcolors.colors[indx].minQty;
					parScope.selectedSizes=swapcolors.colors[indx].sizeRange;
					
				}
			}
			else
			scope.colorSelected=false;
			customSwapColorsArr.push(scope);
		}
	}
});

myDirective.directive('moreswapBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			if(swapcolors.moreColors[indx].title==selectedColorName)
			{
				scope.colorSelected=(selectedProductName==productSelectedName)?true:false;
				if(scope.colorSelected)
				{
					var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
					parScope.swapInfo=true;
					parScope.swapHoverInfo=false;
					selectedColorThumbFlag=true;
					selectedSwapColorName=swapcolors.moreColors[indx].title;
					parScope.selectedQuantity=swapcolors.moreColors[indx].minQty;
					parScope.selectedSizes=swapcolors.moreColors[indx].sizeRange;

				}
			}
			else
			scope.colorSelected=false;
			customSwapColorsArr.push(scope);
		}
	}
});


myDirective.directive('nameBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			//alert(indx)
			//alert(colors.colors[indx].title)
			if(nameColor[indx].title==nameSelectedColor)
			{
				//console.log(scope);
				//var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				//parScope.selectedQuantity=colors.colors[indx].minquantity;
				//parScope.selectedSizes=colors.colors[indx].sizeRange;
				
				
				scope.colorSelected=true;
			}
			else
			scope.colorSelected=false;
			
			nameColorsArr.push(scope);
		}
	}
});


myDirective.directive('textBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			//alert(indx)
			//alert(colors.colors[indx].title)
			if(initFontData.root.colors.color[indx].name==textAndOutlineColorTitle)
			{
				//console.log(scope);
				//var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				//parScope.selectedQuantity=colors.colors[indx].minquantity;
				//parScope.selectedSizes=colors.colors[indx].sizeRange;
				
				
				scope.textColorSelected=true;
			}
			else
			scope.textColorSelected=false;
			
			textColorArr.push(scope);
		}
	}
});

myDirective.directive('artBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			//alert("link")
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			//alert(indx)
			//alert(colors.colors[indx].title)
			if(clipArtColors.colors[indx].title==artSelectedColorTitle)
			{
				//console.log(scope);
				//var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				//parScope.selectedQuantity=colors.colors[indx].minquantity;
				//parScope.selectedSizes=colors.colors[indx].sizeRange;
				
				
				scope.colorSelected=true;
			}
			else
			scope.colorSelected=false;
			
			artColorsArr.push(scope);
		}
	}
});

myDirective.directive('artImage',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			var indx=angular.element(element[0]).parent().index();
			
			//alert(angular.element(element[0]).parent().parent().index());
			//alert(initArtData.clipArtCategories.category[indx].url)
			
			angular.element(element[0]).attr("src",initArtData.clipArtCategories.category[indx].url)
			//alert(indx)
			//alert(colors.colors[indx].title)
			
		}
	}
});

myDirective.directive('nameFont',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			var indx=angular.element(element[0]).index();
			
			if(indx==nameNumberFontsData.length-1)
			document.getElementById('nameFont').selectedIndex =nameFontSelectIndx;
			
		}
	}
});

myDirective.directive('numberFont',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			var indx=angular.element(element[0]).index();
			if(indx==nameNumberFontsData.length-1)
			document.getElementById('numberFont').selectedIndex =numberFontSelectIndx;
			//alert(angular.element(element[0]).parent().parent().index());
			//alert(initArtData.clipArtCategories.category[indx].url)
			
			//angular.element(element[0]).attr("src",initArtData.clipArtCategories.category[indx].url)
			//alert(indx)
			//alert(colors.colors[indx].title)
			
		}
	}
});

myDirective.directive('catBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			var catIndx=angular.element(element[0]).parent().parent().index();
			var subCatIndx=angular.element(element[0]).parent().index();
			subCatIndx--;
			//alert(indx)
			//alert(angular.element(element[0]).parent().parent().index());
			//alert(initArtData.clipArtCategories.category[indx].url)
			
			//angular.element(element[0]).attr("src",initArtData.clipArtCategories.category[indx].url)
			//alert(indx)
			//alert(colors.colors[indx].title)
			scope.trueFalseFlag=false;
			selectCatArr.push({"scope":scope,"cattitle":selectCat[catIndx].name,"catid":selectCat[catIndx].catId,"subcattitle":selectCat[catIndx].subCategory[subCatIndx].name,"subcatid":selectCat[catIndx].subCategory[subCatIndx].subCatId})
			
		}
	}
});

myDirective.directive('artThumb',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			var indx=angular.element(element[0]).parent().index();
			
			//alert(angular.element(element[0]).parent().parent().index());
			//alert(initArtData.clipArtCategories.category[indx].url)
			
			angular.element(element[0]).attr("src",clipartData.cliparts.clipart[indx].thumb)
			//alert(indx)
			//alert(colors.colors[indx].title)
			
		}
	}
});

myDirective.directive('uploadBinding',function(){
	return {
		restrict:'A',
		
		link:function(scope,element, attrs)
		{
			
			
			//alert(angular.element(element[0]).parent().parent().index());
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",scope.imageUrl+"/assets/images/selected.png")
			//alert(indx)
			//alert(colors.colors[indx].title)
			//if(clipArtColors.colors[indx].title==artSelectedColorTitle)
			//{
				//console.log(scope);
				//var parScope=scope.$parent;//angular.element(element[0]).parent().parent().parent().scope();
				//parScope.selectedQuantity=colors.colors[indx].minquantity;
				//parScope.selectedSizes=colors.colors[indx].sizeRange;
				
				
				//scope.colorSelected=true;
			//}
			//else
			scope.colorSelected=false;
			
			uploadColorArr.push(scope);
		}
	}
});




myDirective.directive('namenumberRow',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			angular.element(".rowdelete").attr("src",scope.imageUrl+"assets/images/rowdelete.png");
			tableRowCounter++;
			angular.element(element[0]).attr("class","tableRow_"+tableRowCounter)
			
		}
	}
});

myDirective.directive('productImage',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",productsData[indx].imageSrc);
			
		}
	}
});

myDirective.directive('centerImage',function(){
	return {
		restrict:'A',
		
		
		link:function(scope,element, attrs)
		{	
			var src=siteUrl+"assets/images/center-icon.png"
			
			//var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",src);
			
		}
	}
});

myDirective.directive('horizontalImage',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			var src=siteUrl+"assets/images/horizontal-flip.png"
			
			//var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",src);
			
		}
	}
});
myDirective.directive('verticalImage',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			var src=siteUrl+"assets/images/vertical-flip.png"
			
			//var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",src);
			
		}
	}
});
myDirective.directive('deleteImage',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			var src=siteUrl+"assets/images/delete.png"
			
			//var indx=angular.element(element[0]).parent().parent().index();
			angular.element(element[0]).attr("src",src);
			
		}
	}
});

myDirective.directive('editImage',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			global_SelectedItem=canvas.getActiveObject();
	
			if(global_SelectedItem && global_SelectedItem.get("shapeType")=="clipart")
			{
				
				
				angular.element(".addArtNav ul li a").removeClass("disabled");
				angular.element(".editPage").addClass("disabled");
				//alert("p")
			}
	
			
		}
	}
});


myDirective.directive('greekLock',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			
				angular.element(".greekCheck").attr("checked",greekFlag);
		}
	}
});
myDirective.directive('artLock',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			
				angular.element(".art-lock").attr("checked",artLock);
		}
	}
});

myDirective.directive('convertColor',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			//alert("ana")
				angular.element(".convert1Color").attr("checked",conert1Flag);
		}
	}
});
myDirective.directive('productLayer',function(){
	return {
		restrict:'A',
		//src="{{imageUrl}}assets/images/rowdelete.png"
		
		link:function(scope,element, attrs)
		{
			selectedLayer=defaultLayerType;
			var indx=angular.element(element[0]).index();
			//var currentLayerobj=(currentView==0)?frontIndexObj:backIndexObj;
			//var childs=angular.element(element[0]).children();
			
			
			if(indx==0)
			angular.element(element[0]).addClass("active");
			//angular.element(element[0]).attr("src",productsData[indx].imageSrc);
			
		}
	}
});