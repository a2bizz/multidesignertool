customInkControllers.controller('AddArtCtrl', ['$scope','$http','webServices','popupManager',
function($scope,$http,webServices,popupManager) {
	//$scope.initArtData='';
	//$scope.artCatArr='';
	//alert("ana")
	
	$scope.artWidth=0;
	$scope.artHeight=0
	$scope.seeDetailFlag=false;
	$scope.artColorLabel="Select a Color";
	global_SelectedItem=canvas.getActiveObject();
	
	if(global_SelectedItem)
	{
		if(global_SelectedItem.get("shapeType")=="clipart" || global_SelectedItem.get("shapeType")=="UploadImage")
		{
			$scope.artEditFlag=false;
			$scope.artEditFlag2=false;
			$scope.artEditFlag1=true;
			artSwitchValue='3';
			var nw=0;
			nw=(global_SelectedItem.getWidth()/25).toFixed(2)
			var nh=0;
			nh=(global_SelectedItem.getHeight()/25).toFixed(2)
			
			$scope.artWidth=nw;
			
			$scope.artHeight=nh;
			
		
		$scope.subCategoryArt=subCategoryArt;
		
		$scope.clipartData=clipartData;
		$scope.switchValue = artSwitchValue;
		//artResetValue=artSwitchValue;
		//angular.element(".addArtNav ul li a").removeClass("disabled");
		//angular.element(".editPage").addClass("disabled");
		//alert("p")
		}
		else
		{
			clipartData='';
			artResetValue=1;
			$scope.switchValue = 1;
		}
		
	}
	else
	{
		clipartData='';
		artResetValue=1;
		$scope.switchValue = 1;
	}
	
	
	$scope.errorFlag=true;
	
	if(!initArtData)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Data...');
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/clipart/category', null, 'initArt', $scope);
		
	}
	else
	{
		//alert("ana")
		$scope.initArtData = initArtData;	
		artColorsArr=new Array();
		$scope.artSelectedColorTitle=artSelectedColorTitle;
		$scope.artSelectedColorCode=artSelectedColorCode;
		$scope.clipArtColors=clipArtColors;
	}
	$scope.loadClipColors=function()
	{
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/color/clip', null, 'clipColors', $scope);
		//webServices.customServerCall($http, siteUrl + 'php/xml/clipcolors.json', null, 'clipColors', $scope);
	}
	
	$scope.setSwitchValue=function()
	{
		if(canvas.getActiveObject())
		if (global_SelectedItem.get("shapeType") == "clipart" || global_SelectedItem.get("shapeType")=="UploadImage") 
		{
			var mainsc=angular.element(".art-wrapper").scope();
			if(mainsc)
					{
						//alert("ana")
						
						artSelectedColorTitle=global_SelectedItem.get("colorTitle");
						artSelectedColorCode=global_SelectedItem.get("text_color")
						mainsc.artSelectedColorTitle=artSelectedColorTitle;
						mainsc.artSelectedColorCode=artSelectedColorCode;
						
						//sc.$apply();
						mainsc.artEditFlag=false;
						mainsc.artEditFlag2=false;
						mainsc.artEditFlag1=true;
						mainsc.switchValue = '3';
						var nw=0;
						nw=(global_SelectedItem.getWidth()/25).toFixed(2)
						var nh=0;
						nh=(global_SelectedItem.getHeight()/25).toFixed(2)
						var sc=angular.element(".artWidthIn").scope();
						if(sc2)
						{
						sc.artWidth=nw;
						sc.$apply();
						}
						mainsc.artWidth=nw;
						var sc2=angular.element(".artHeightIn").scope();
						if(sc2)
						{
							sc2.artHeight=nh;
							sc2.$apply();
							//alert("ana")
						}
						
						mainsc.artHeight=nh;
						if(global_SelectedItem.get("shapeType")=="UploadImage")
						{
							conert1Flag=global_SelectedItem.get("convert1Flag");
							
							
							//angular.element(".convert1Color").attr("checked",conert1Flag);
							//alert(conert1Flag)
							if(conert1Flag==true)
							mainsc.chooseColorFlag=true;
							else
							mainsc.chooseColorFlag=false;
							mainsc.convert1Flag=true;
						}
						else
						{
							mainsc.chooseColorFlag=true;
							mainsc.convert1Flag=false;
						}
						mainsc.$apply();
						if(global_SelectedItem.get("shapeType")=="UploadImage")
						document.getElementById("convert1Color").checked=conert1Flag;
						angular.element(".addArtNav ul li a").removeClass("disabled");
						angular.element(".editPage").addClass("disabled");
					}
				}
	}
	$scope.loadSubCategory=function(obj)
	{
		
		angular.element(".mainCatTitle").addClass("disabled");
		
		angular.element(".mainCatTitle").css({"cursor":"auto"});
		angular.element(".mainCatTitle").off('mouseenter mouseleave','.mainCatTitle')
		$scope.artSubCatFlag=false;
		
		$scope.clipartFlag=true;
		if(obj)
		{
			popupManager.preloaderOpen("preloaderOpen",'Loading Data...');
			artCatSubTitle=angular.element(obj).attr("arttitle");
			$scope.catAndSubCatTitle=artCatSubTitle;
			var catId=angular.element(obj).attr("value");
			clipCatId=catId;
			$scope.switchValue = '2';
			artResetValue=2;
			var obj=new Object();
			obj.categoryId=catId;
			webServices.customServerCall($http, dataAccessUrl + 'designersoftware/clipart/category', obj, 'initArtSubCat', $scope);
		}
		else
		{
			
			
			$scope.switchValue = '2';
			//var obj=new Object();
			//obj.categoryId=clipCatId;
			//webServices.customServerCall($http, dataAccessUrl + 'designersoftware/clipart/category', obj, 'initArtSubCat', $scope);
		}
		$scope.$apply();
	}
	$scope.searchCliparts=function(obj)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Cliparts...');
		$scope.catAndSubCatTitle='';
		var clssName="."+angular.element(obj).parent().attr("class");
		var obj=new Object();
		obj.searchText=angular.element(clssName+" "+"input").val();
		//alert(obj.searchText)
		//alert(catId)
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/clipart/search', obj, 'clipartSearch', $scope);
		$scope.$apply();
	}
	$scope.resetPage=function()
	{
		//alert("fdhgsghf")
		if(!$scope.$$phase)
		{
			//alert(artResetValue)
			if(artResetInDeletePageFlag==true)
			{
				$scope.switchValue =3;
				$scope.$apply();
			}
			else
			{
				$scope.switchValue =artResetValue;
				$scope.$apply();
			}
			
		}
		
		
	}
	$scope.showPageAccordingToTab=function(obj)
	{
		var disClass=angular.element(".mainCatTitle").hasClass("disabled");
		var text='';
		text=angular.element(obj).text();
		text=text.toLowerCase();
		//alert(text);
		if(text=="edit")
		{
			global_SelectedItem=canvas.getActiveObject();
			
			if(global_SelectedItem && global_SelectedItem.get("shapeType")=="clipart")
			{
				$scope.artEditFlag=false;
				$scope.artEditFlag1=true;
				$scope.artEditFlag2=false;
			}
			else
			{
				$scope.artEditFlag=true;
				$scope.artEditFlag1=false;
				$scope.artEditFlag2=false;
			}
			$scope.switchValue = '3';
			$scope.$apply();
			angular.element(".addArtNav ul li a").removeClass("disabled");
			angular.element(".editPage").addClass("disabled");
			
			
		}
		else if(text=="browse gallery" || text=="browse")
		{
			canvas.discardActiveObject();
			canvas.renderAll();
			if(!clipartData)
			{
				$scope.switchValue = '1';
				artResetValue=1;
			}
			else
			{
				$scope.switchValue = '2';
				artResetValue=2;
			}
			
			$scope.$apply();
			if(!disClass)
			{
				angular.element(".mainCatTitle").removeClass('disabled')
				angular.element(".mainCatTitle").css({"cursor":"pointer"});
				angular.element(".mainCatTitle").off('mouseenter mouseleave','.mainCatTitle')
				angular.element(".mainCatTitle").on('mouseenter',function()
				{
					angular.element(".mainCatTitle").css({"color":"#47b7ee"});
				})
				angular.element(".mainCatTitle").on('mouseleave',function()
				{
					angular.element(".mainCatTitle").css({"color":"#000000"});
				})
			}
			
		}
		
		else if(text=="upload files" || text=="upload")
		{
			
			
			
			popupManager.open("uploadOpen1")
			$scope.seeDetailFlag=false;
			$scope.$apply();
		}
	}
	$scope.loadClipart=function(obj)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Cliparts...');
		angular.element(".mainCatTitle").removeClass("disabled");
		angular.element(".mainCatTitle").css({"cursor":"pointer"});
		angular.element(".mainCatTitle").off('mouseenter mouseleave','.mainCatTitle')
		angular.element(".mainCatTitle").on('mouseenter',function()
		{
			angular.element(".mainCatTitle").css({"color":"#47b7ee"});
		})
		angular.element(".mainCatTitle").on('mouseleave',function()
		{
			angular.element(".mainCatTitle").css({"color":"#000000"});
		})
		
		$scope.artSubCatFlag=true;
		artCatSubTitle=angular.element(obj).text();
		$scope.subCatTitle=artCatSubTitle;
		var catId=angular.element(obj).attr("subcatId");
		var obj=new Object();
		obj.categoryId=catId;
		//alert(catId)
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/clipart', obj, 'clipart', $scope);
		$scope.$apply();
	}
	$scope.convert1Color=function(obj)
	{
		//alert(angular.element(obj).attr("checked"))
		//alert($scope.switchValue);
		//alert("jd")
		var get_Obj=canvas.getActiveObject();
		if(get_Obj && get_Obj.get("shapeType")=="UploadImage")
		{
			artResetInDeletePageFlag=true;
			if(get_Obj.get("convert1Flag")==false)
			{
				//alert("hgfh")
				//$scope.editUploadedImage(true);
				//alert(get_Obj.get("clipUpload"))
				popupManager.preloaderOpen("preloaderOpen",'Loading Image!');
				var obj=new Object();
				obj.src=get_Obj.get("originalSrc");
				obj.color="#"+artSelectedColorCode;
				obj.clipUpload=get_Obj.get("clipUpload");
				obj.dirPath=dirPath;
				webServices.customServerCall($http,siteUrl+'php/convert1color.php',obj,'convert1color',$scope);
				$scope.chooseColorFlag=true;
				if(get_Obj.get("clipUpload")=="upload")
				$scope.uploadColorFlag=false;
				$scope.$apply();
						//mainsc.convert1Flag=true;
				//get_Obj.get("convert1Flag")
			}
			else
			{
				//alert("jgj")
				//alert(get_Obj.get("clipUpload"))
				if(get_Obj.get("clipUpload")=="upload")
				$scope.uploadColorFlag=true;
				$scope.chooseColorFlag=false;
				$scope.$apply();
				$scope.editUploadedImage(false,'','')
			}
		}
	}
	$scope.addEffetsUploadImage=function(obj)
	{
		if(angular.element(obj).find("span").text()=="No-Effect")
		{
			var effectName="No-Effect";
		}
		else if(angular.element(obj).find("span").text()=="Black And White")
		{
			var effectName="Black And White";
		}
		else if(angular.element(obj).find("span").text()=="Sepia")
		{
			var effectName="Sepia";
		}
		else if(angular.element(obj).find("span").text()=="Vibrant")
		{
			var effectName="Vibrant";
		}
		else if(angular.element(obj).find("span").text()=="Vintage")
		{
			var effectName="Vintage";
		}
		else if(angular.element(obj).find("span").text()=="Sunshine")
		{
			var effectName="Sunshine";
		}
		var get_Obj=canvas.getActiveObject();
		if((get_Obj && get_Obj.get("shapeType")=="UploadImage")&& effectName!="No-Effect" )
		{
			popupManager.preloaderOpen("preloaderOpen",'Loading Image!');
				var obj=new Object();
				obj.src=get_Obj.get("originalSrc");
				obj.effectName=effectName;
				obj.clipUpload=get_Obj.get("clipUpload");
				obj.dirPath=dirPath;
				webServices.customServerCall($http,siteUrl+'php/effect.php',obj,'effectImage',$scope);
		}
		else
		{
			artResetInDeletePageFlag=true;
			if(get_Obj.get("clipUpload")=="upload")
				$scope.uploadColorFlag=true;
				$scope.chooseColorFlag=false;
				$scope.$apply();
				$scope.editUploadedImage(false,'','')
		}
	}
	$scope.editUploadedImage=function(str,convertSrc,effecturl)
	{
		angular.element(".art-selected-color").css({"backgroundColor":"#"+artSelectedColorCode})
		//alert("sdhdsgh")
		//console.log(canvas.getActiveObject())
		var get_Obj=canvas.getActiveObject()
		//console.log(get_Obj)
		var rotationObj=get_Obj.get("oCoords").tl;
	//	console.log(rotationObj)
		var left=rotationObj.x;
		var top=rotationObj.y;
		var width=get_Obj.getWidth();
		var height=get_Obj.getHeight();
		var rot=get_Obj.getAngle();
		var flipX=get_Obj.get('flipX');
		var flipY=get_Obj.get('flipY');
		clipUpload=get_Obj.get('clipUpload');
		shapeType=get_Obj.get("shapeType");
		var colorArr=get_Obj.get("uploadColorArr");
		var src=get_Obj.get("originalSrc");
		if(clipUpload=="upload")
		var toolSrc=siteUrl+"php/"+get_Obj.get("originalSrc");
		else
		var toolSrc=imgpath+get_Obj.get("originalSrc");
		//alert(src)
		canvas.remove(get_Obj);
		canvas.renderAll();
		if(str==true)
		{
			if(convertSrc)
			{
				var effectSrc=siteUrl+'php/'+convertSrc;
				var convert1Flag=true;
			}
			
			else if(effecturl)
			{
				var effectSrc=siteUrl+'php/'+effecturl;
				var convert1Flag=false;
			}
			
			fabric.Image.fromURL(effectSrc,function(img)
			{
				
				img.set({originalRatLeft:left,
						originalRatTop:top,
						originalRatWidth:width,
						originalRatHeight:height,
						left:left,clipUpload:clipUpload,
						top:top,width:width,height:height,
						flipX:flipX,flipY:flipY,angle:rot,
						name:"Image",shapeType:shapeType,
						text_color:artSelectedColorCode,
						uploadColorArr:colorArr,
						effectUrl:effecturl,
						convertSrc:convertSrc,
						convert1Flag:convert1Flag,
						originalSrc:src,textColorPrice:artSelectedColorPrice,
						colorTitle:artSelectedColorTitle})
						var color="#"+artSelectedColorCode;
				// global_SelectedItem=img;
				// var fil= new fabric.Image.filters.RemoveWhite({
				  // threshold: 280,
				  // distance: 50
				// });
				// img.filters.push(fil);
// 				
				// img.filters.push(new fabric.Image.filters.Grayscale());
				// img.applyFilters(canvas.renderAll.bind(canvas));
// 
// 
// 		
// 				
				// img.applyFilters(canvas.renderAll.bind(canvas));
				 // var filter = new fabric.Image.filters.Tint({
				   // color: color,
				   // opacity: 0.6
				 // });
				 // img.filters.push(filter);
		 		// img.applyFilters(canvas.renderAll.bind(canvas));
				if(drawAreaGrp)
				img.set({clipTitle:drawAreaGrp.get("clipTitle")})	
				canvas.add(img);
				img.lockUniScaling=artLock;
				canvas.setActiveObject(img);
				canvas.renderAll();
				popupManager.preloaderClose();	
				// var hexColor="0x"+artSelectedColorCode;
				// var arr=hex2Rgb((hexColor));
				// var rgbcolor='rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
				// global_SelectedItem.fill=rgbcolor
				// colorPickerValue =rgbcolor;
				// global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
				// global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				artResetInDeletePageFlag=false;
				updateUndoRedo();
			});
		}
		else
		{
			fabric.Image.fromURL(toolSrc,function(img)
			{
				
				img.set({originalRatLeft:left,
						originalRatTop:top,
						originalRatWidth:width,
						originalRatHeight:height,
						left:left,
						clipUpload:clipUpload,top:top,
						width:width,height:height,flipX:flipX,
						flipY:flipY,angle:rot,name:"Image",
						shapeType:shapeType,
				text_color:artSelectedColorCode,
				convertSrc:'',originalSrc:src,
				textColorPrice:artSelectedColorPrice,
				colorTitle:artSelectedColorTitle})
				
				if(shapeType=="UploadImage")
				{
					//console.log(uploadedImageColorArr)
					img.set({clipUpload:clipUpload,uploadColorArr:colorArr,convert1Flag:false,effectUrl:''})
					//popupManager.close("uploadClose2");
				}
				if(drawAreaGrp)
				img.set({clipTitle:drawAreaGrp.get("clipTitle")})
				canvas.add(img);
				img.lockUniScaling=artLock;
				canvas.setActiveObject(img);
				canvas.renderAll();
				artResetInDeletePageFlag=false;
				updateUndoRedo();
			})
		}
		
	}
	$scope.setClipArtData=function(obj)
	{
		clipColorable=parseInt(angular.element(obj).attr("colorable"));
		var originalSrc=angular.element(obj).attr("originSrc");
		
		
		artSwitchValue=3;
		$scope.artEditFlag=false;
		$scope.artEditFlag1=true;
		$scope.artEditFlag2=false;
		if(clipColorable==1)
		{
			shapeType="clipart"
			$scope.chooseColorFlag=true;
			$scope.convert1Flag=false;
		}
		else
		{
			shapeType="UploadImage";
			conert1Flag=false;
			clipUpload='clip',
			$scope.chooseColorFlag=false;
			$scope.convert1Flag=true;
			angular.element(".convert1Color").attr("checked",conert1Flag)
			angular.element(".addArtNav ul li a").removeClass("disabled");
			angular.element(".editPage").addClass("disabled");
		}
		$scope.addClipartOnCan((imgpath+originalSrc),shapeType,originalSrc)
		
		
		
		
		$scope.switchValue = '3';
		$scope.$apply();
		angular.element(".art-selected-color").css({"backgroundColor":"#"+artSelectedColorCode})
		angular.element(".addArtNav ul li a").removeClass("disabled");
		angular.element(".editPage").addClass("disabled");
	}
	$scope.addClipartOnCan=function(src,type,orinSrc)
	{
		//alert(src)
		
		
		fabric.Image.fromURL(src,function(img)
		{
			
			var cW=drawAreaGrp.width;
			var cH=drawAreaGrp.height;
			var oW=img.width;
			var oH=img.height;
			//console.log(oW)
			//console.log(oH)
			var cR=cW/cH;
			var oR=oW/oH;
			var nW = 20;
			var nH = 20;
			var scaleW;
			var scaleH;
		
		if(cR>oR)
		{
			nH=cH;
			nW=(oW*nH)/oH;
			scaleW=nW/oW;
			scaleH=nH/oH;
		}
		else
		{
			nW=cW;
			nH=(nW*oH)/oW;
			scaleW=nW/oW;
			scaleH=nH/oH;
		}
		//console.log(resCanRatio)
		///console.log(nW+"\n"+nH)
		$scope.artWidth=(nW/25).toFixed(2);
		$scope.artHeight=(nH/25).toFixed(2);
		//console.log($scope.artWidth)
		//console.log($scope.artHeight)
		var left=drawAreaGrp.getLeft()*1/resCanRatio+(drawAreaGrp.getWidth()*1/resCanRatio-nW)/2;
		var top=drawAreaGrp.getTop()*1/resCanRatio+(drawAreaGrp.getHeight()*1/resCanRatio-nH)/2;
			//console.log(nW+"\n"+nH)
			img.set({left:left*resCanRatio,top:top*resCanRatio,width:nW*resCanRatio,height:nH*resCanRatio,originalRatWidth:nW,originalRatHeight:nH,originalRatLeft:left,originalRatTop:top,flipX:false,flipY:false,name:"Image",shapeType:type,
			text_color:artSelectedColorCode,colorable:clipColorable,originalSrc:orinSrc,textColorPrice:artSelectedColorPrice,colorTitle:artSelectedColorTitle})
			if(shapeType=="clipart")
			{
				if(clipColorable==1)
				{
					global_SelectedItem=img;
					var hexColor="0x"+artSelectedColorCode;
					var arr=hex2Rgb((hexColor));
					var rgbcolor='rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
					global_SelectedItem.fill=rgbcolor;
					colorPickerValue =rgbcolor;
					global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
					global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				}
			}
			if(shapeType=="UploadImage")
			{
				//console.log(uploadedImageColorArr)
				img.set({originalSrc:orinSrc,clipUpload:clipUpload,uploadColorArr:uploadedImageColorArr,convertSrc:'',convert1Flag:false})
				popupManager.close("uploadClose2");
			}
			
			img.setCoords();
			if(drawAreaGrp)
			img.set({clipTitle:drawAreaGrp.get("clipTitle")})
			canvas.add(img);
			img.lockUniScaling=artLock;
			canvas.setActiveObject(img);
			canvas.renderAll();
			canvas.calcOffset();
			angular.element(".art-selected-color").css({"backgroundColor":"#"+artSelectedColorCode})
			updateUndoRedo();
		})
		
	}
	
	$scope.showArtColorLabel=function(obj)
	{
		$scope.artColorLabel="Select a Color";
		$scope.$apply();
	}
	
	$scope.showArtColor=function(obj)
	{
		$scope.artColorLabel="Color:"+" "+angular.element(obj).attr("ctitle");
		$scope.$apply();
	}
	$scope.backPrevious=function()
	{
				$scope.artEditFlag2=false;
				$scope.artEditFlag=false;
				$scope.artEditFlag1=true;
				$scope.$apply();
	}
	$scope.changeArtColor=function(obj)
	{
		global_SelectedItem = canvas.getActiveObject();
		if(global_SelectedItem)
		{
			var rgb_value=angular.element(obj).css("backgroundColor");
			
			if(global_SelectedItem.get("shapeType")=="clipart" || global_SelectedItem.get("shapeType")=="UploadImage")
			{
				artSelectedColorFill=rgb_value;
				artSelectedColorTitle=angular.element(obj).attr("ctitle");;
				
				///nameHexColor=
				artSelectedColorCode=angular.element(obj).attr("pcolor");
				//alert(artSelectedColorCode)
				artSelectedColorPrice=angular.element(obj).attr("cprice");
				$scope.artSelectedColorTitle=artSelectedColorTitle;
				$scope.artSelectedColorCode=artSelectedColorCode;
				$scope.artEditFlag2=false;
				$scope.artEditFlag=false;
				$scope.artEditFlag1=true;
				
				$scope.$apply();
				if(global_SelectedItem.get("shapeType")=="clipart")
				{
					global_SelectedItem.fill=rgb_value
					colorPickerValue =rgb_value;
					global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
					global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
					canvas.renderAll();
					global_SelectedItem.set({"text_color":angular.element(obj).attr("pcolor"),
					textColorPrice:artSelectedColorPrice,colorTitle:artSelectedColorTitle});
					updateUndoRedo();
				}
				else if(global_SelectedItem.get("shapeType")=="UploadImage")
				{
					popupManager.preloaderOpen("preloaderOpen",'Loading Image!');
					var obj=new Object();
					obj.src=global_SelectedItem.get("originalSrc");
					obj.color="#"+artSelectedColorCode;
					clipUpload=global_SelectedItem.get("clipUpload");
					obj.clipUpload=global_SelectedItem.get("clipUpload");
					obj.dirPath=dirPath;
					webServices.customServerCall($http,siteUrl+'php/convert1color.php',obj,'convert1color',$scope);
				}
				
				
				
			}
			
			
			
			$scope.$apply();
			$scope.calculateViewWiseColor();
			canvasArr[currentView]=JSON.stringify(canvas);
			angular.element(".art-selected-color").css({"backgroundColor":"#"+artSelectedColorCode})
			
		}
	
	}
}]);

customInkControllers.controller('Art2Controller', ['$scope','$http','webServices','popupManager',
function($scope,$http,webServices,popupManager) {
	
	artColorsArr=new Array();
	
}]);
 