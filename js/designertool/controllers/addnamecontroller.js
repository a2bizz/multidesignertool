customInkControllers.controller('AddNameCtrl', ['$scope','$http','webServices','popupManager', function($scope,$http,webServices,popupManager) {
	//alert("name")
	nameWidth=183;
	nameHeight=42;
	numberHeight=168;
	numberWidth=185;
	$scope.nameBackColorHex=nameBackColorHex;
	$scope.numberBackColorHex=numberBackColorHex;
	$scope.nameColorLabel=nameColorLabel;
	$scope.numberColorLabel=numberColorLabel;
	$scope.setColorForNameNumber=function()
	{
		$scope.nameBackColorHex=nameBackColorHex;
		$scope.numberBackColorHex=numberBackColorHex;
		$scope.nameColorLabel=nameColorLabel;
		$scope.numberColorLabel=numberColorLabel;
		$scope.$apply();
	}
	if(!nameColor)
	{
		var obj=new Object();
		//obj.productId=productId;
		webServices.customServerCall($http,dataAccessUrl+'designersoftware/color/name',obj,'namecolors',$scope);
		//webServices.customServerCall($http,siteUrl+'php/xml/namenumbercolorandsize.json',obj,'namecolors',$scope);
	}
	else
	{
		$scope.nameColor=nameColor;
		$scope.nameNumberFontsData=nameNumberFontsData;
		//var sc=angular.element('.tool-wrap').scope();
			//sc.nameSizes = nameSizes;
	}
	$scope.loadNameNumberFont=function()
	{
		var obj=new Object();
		obj.fontsCategoryId=1;
		webServices.customServerCall($http,dataAccessUrl+'designersoftware/fonts/nameNumberFont',obj,'nameNumberFont',$scope);
	}
	$scope.nameLabel="Select a Color";
	$scope.namePageSelection=selectedNamePage;
	//$scope.$apply();
	if(drawAreaGrp)
	selectedDrawAreaTitle=drawAreaGrp.get("clipTitle")
	canvas.discardActiveObject();
	canvas.renderAll();
	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
	$scope.dataArrays(currentView);
	previewArr[currentView]=canvas.toDataURL();
	canvasArr[currentView]=JSON.stringify(canvas);
	canvasArr[currentView]=JSON.stringify(canvas);
	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
	$scope.nameColorLabel=nameColorLabel;
	$scope.numberColorLabel=numberColorLabel;
	$scope.nameBackColorHex=nameBackColorHex;
	$scope.numberBackColorHex=numberBackColorHex;
	if(global_SelectedItem)
	{
		if(global_SelectedItem.get("shapeType") == "Name" || global_SelectedItem.get("shapeType") == "Number")
		{
		canvas.setActiveObject(global_SelectedItem);
		canvas.renderAll()
		}
	}
	//$scope.namePageSelection="nameColor";
	//alert(angular.element(".nameNumberLogoImage").attr("class"))
	//alert($scope.imageUrl+"assets/images/namelogo.jpg")
	//alert("hfdsjdfhj")
	
	
	$scope.noPersonalization=function()
	{
		popupManager.close("addNameNumberClose")
	}
	$scope.openAddNamePage2=function()
	{
		$scope.namePageSelection="namePage2";
		$scope.$apply();
		$scope.updateNamePage2();
		$scope.$apply();
		
	}
	$scope.openNameColorChooser=function(obj)
	{
		
		if(angular.element(obj).attr("id")=="chooseNameColor")
		{
			if(!(nameSideNextIndex==currentView))
			{
				currentView=(nameView==0)?1:0;
				$scope.switchNameNumberViews('','','nameselect');
				
			}
			nameSelectedColor=nameColorLabel;
			
		}
		else
		{
			if(!(numberSideNextIndex==currentView))
			{
				currentView=(numberView==0)?1:0;
				$scope.switchNameNumberViews('','','numberselect');
			}
			
			nameSelectedColor=numberColorLabel;
			
		}
		$scope.namePageSelection="nameColor";
		$scope.$apply();
	}
	$scope.showColor=function(obj)
	{
		$scope.nameLabel="Color:"+" "+angular.element(obj).attr("ctitle");
		$scope.$apply();
	}
	$scope.showNameColorLabel=function(obj)
	{
		$scope.nameLabel="Select a Color";
		$scope.$apply();
	}
	
	$scope.changeNameColor=function(obj)
	{
		
		//var filter=
		global_SelectedItem = canvas.getActiveObject();
		if(global_SelectedItem)
		{
			rgb_value=angular.element(obj).css("backgroundColor");
			nameSelectedColor=angular.element(obj).attr("ctitle");
			if(global_SelectedItem.get("shapeType")=="Name")
			{
				nameColorPrice=angular.element(obj).attr("price");
				nameFillColor=rgb_value;
				nameColorLabel=nameSelectedColor;
				$scope.nameColorLabel=nameColorLabel;
				///nameHexColor=
				$scope.nameBackColorHex=angular.element(obj).attr("pcolor");
				nameBackColorHex=$scope.nameBackColorHex;
				global_SelectedItem.set({colorTitle:nameColorLabel});
				
			}
			else if(global_SelectedItem.get("shapeType")=="Number")
			{
				numberColorPrice=angular.element(obj).attr("price");
				numberFillColor=rgb_value;
				numberColorLabel=nameSelectedColor;
				$scope.numberColorLabel=numberColorLabel;
				$scope.numberBackColorHex=angular.element(obj).attr("pcolor");
				numberBackColorHex=$scope.numberBackColorHex;
				global_SelectedItem.set({colorTitle:numberColorLabel});
				
			}
			
			
			
			
			
			//$scope.getHex(rgb_value)
			global_SelectedItem.fill=rgb_value
			colorPickerValue =rgb_value;
			$scope.namePageSelection="namePage2";
			$scope.$apply();
			global_SelectedItem.set({"text_color":angular.element(obj).attr("pcolor")});
			global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
			global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
			canvas.renderAll();
			$scope.updateNamePage2();
			$scope.$apply();
			$scope.calculateViewWiseColor();
			canvasArr[currentView]=JSON.stringify(canvas);
			updateUndoRedo()
			//console.log(global_SelectedItem);
		}
	}
	//alert(nameCheck)
	
	$scope.updateNamePage2=function()
	{
		//alert("update")
	//console.log(nameCheck)
	
		if(nameCheck==true)
		{
			
			//alert(nameFontSelectIndx)
			selectedNamePage="namePage2"
			//angular.element(".addNameCheck").attr("checked",true);
			document.getElementById('addNameCheckId').checked=true;
			angular.element(".selectSideName").removeClass("disabled");
			document.getElementById('nameSide').selectedIndex =nameView;
			document.getElementById('nameHeight').selectedIndex = nameHeightSelectIndx;
			//setTimeout(function(){
				document.getElementById('nameFont').selectedIndex =nameFontSelectIndx;
			//},5000)
			
			//document.getElementById('nameSide').selectedIndex = 1;
			//$scope.$apply();


		}
		if(numberCheck==true)
		{
			//alert(numberFontSelectIndx)
			selectedNamePage="namePage2"
		//	angular.element(".addNumberCheck").attr("checked",true);
			document.getElementById('addNumberCheckId').checked=true;
			angular.element(".selectSideNumber").removeClass("disabled");
			document.getElementById('numberSide').selectedIndex =numberView;
			document.getElementById('numberHeight').selectedIndex = numberHeightSelectIndx;
			document.getElementById('numberFont').selectedIndex = numberFontSelectIndx;
			//$scope.$apply();
		}
		
	}
	$scope.setStandardPosition=function(obj)
	{
		//alert(angular.element(obj).attr("id"))
		
		if(angular.element(obj).attr("id")=="nameStdPos")
		{
			if(nameObj)
			{
				canvas.discardActiveObject();
				canvas.setActiveObject(nameObj)
				canvas.renderAll();
				//alert(viewWiseScale[currentView])
				nameObj.set({left:193*viewWiseScale[currentView]*resCanRatio,top:160*viewWiseScale[currentView]*resCanRatio})
				nameObj.setCoords();
				canvas.renderAll();	
				global_SelectedItem=nameObj;canvas.getActiveObject()
				if(global_SelectedItem)
				{
					var rotationObj=global_SelectedItem.get("oCoords").tl;
					var ratioX=193*viewWiseScale[currentView]*resCanRatio;//(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);
					var ratioY=160*viewWiseScale[currentView]*resCanRatio;//(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);
					var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
					var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);
		
					//console.log(ratioX);
					//console.log(ratioY);
					global_SelectedItem.set({originalRatWidth:ratioW})
					global_SelectedItem.set({originalRatHeight:ratioH})
					global_SelectedItem.set({originalRatLeft:ratioX})
					global_SelectedItem.set({originalRatTop:ratioY})
					canvas.renderAll();
				}	
			}
			
			
		}
		else
		{
			if(numberObj)
			{
				canvas.discardActiveObject();
				canvas.setActiveObject(numberObj)
				canvas.renderAll();
			//	alert(viewWiseScale[currentView])
				numberObj.set({left:193*viewWiseScale[currentView]*resCanRatio,top:211*viewWiseScale[currentView]*resCanRatio});
				numberObj.setCoords();
				canvas.renderAll();
				global_SelectedItem=numberObj;//canvas.getActiveObject()
				if(global_SelectedItem)
				{
					
					var rotationObj=global_SelectedItem.get("oCoords").tl;
					var ratioX=193*viewWiseScale[currentView]*resCanRatio;//(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
					var ratioY=211*viewWiseScale[currentView]*resCanRatio;//(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
					var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
					var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;
		
					//console.log(ratioX);
					//console.log(ratioY);
					global_SelectedItem.set({originalRatWidth:ratioW})
					global_SelectedItem.set({originalRatHeight:ratioH})
					global_SelectedItem.set({originalRatLeft:ratioX})
					global_SelectedItem.set({originalRatTop:ratioY})
					global_SelectedItem.setCoords();
					canvas.renderAll();
				}	
			}
		}
		var objects=canvas.getObjects();
		for(var i=0;i<objects.length;i++)
		{
			//console.log(objects[i])
		}
		
	
	}
	$scope.addNameNumber=function(obj)
	{
		nameWidth=183;
		nameHeight=42;
		numberHeight=168;
		numberWidth=185;
		if(angular.element(obj).attr("class")=="addNameCheck")
		{
			document.getElementById('nameFont').selectedIndex = nameFontSelectIndx;
			nameSidePreIndex=1;
			nameSideNextIndex=1;
			nameHeightSelectIndx=1;
			document.getElementById('nameSide').selectedIndex = 1;
			document.getElementById('nameHeight').selectedIndex = 1;
			if(angular.element("#nameSide").hasClass("disabled"))
			{
				nameCheck=true;
				nameView=1;
				if(nameObj || numberObj)
				{
					canvas.remove(nameObj);
					canvas.remove(numberObj);
					canvas.renderAll();
					nameObj=null;
					numberObj=null;
				}
				nameAndNumberSelectedColor=nameBackColorHex;
				//nameSelectedColor=nameColorLabel;
				selectedNamePage="namePage2"
				angular.element(".selectSideName").removeClass("disabled");
				shapeType="Name";
				//$scope.setNameNumData();
				currentView=0;
				$scope.switchNameNumberViews('',$scope,shapeType);
				$scope.$apply();
				
			}
			else
			{
				
				canvas.remove(nameObj);
				nameObj=null;
				canvas.renderAll();
				angular.element(".selectSideName").addClass("disabled");
				//alert(nameView)
				//canvasArr[currentView]=JSON.stringify(canvas);
				if(!(nameView==currentView))
				{
					currentView=(nameView==0)?1:0;
					$scope.switchNameNumberViews('','',"namedelete")
				}
				else
				{
					for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
					
					$scope.dataArrays(currentView);
	    			previewArr[currentView]=canvas.toDataURL();
	    			canvasArr[currentView]=JSON.stringify(canvas);
	    			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
				}
				
				
				nameCheck=false;
				nameView=1;
				if(nameCheck==false && numberCheck==false)
				selectedNamePage="home";
				//canvasArr[currentView]=JSON.stringify(canvas);
				
				
			}
		}
		else
		{
			document.getElementById('numberFont').selectedIndex = nameFontSelectIndx;
			numberSidePreIndex=1;
			numberHeightSelectIndx=4;
			document.getElementById('numberSide').selectedIndex = 1;
			document.getElementById('numberHeight').selectedIndex = 4;
			numberSideNextIndex=1;
			if(angular.element("#numberSide").hasClass("disabled"))
			{
				numberCheck=true;
				numberView=1;
				if(nameObj || numberObj)
				{
					canvas.remove(nameObj);
					canvas.remove(numberObj);
					canvas.renderAll();
					nameObj=null;
					numberObj=null;
				}
				nameAndNumberSelectedColor=numberBackColorHex;
				selectedNamePage="namePage2"
				//nameSelectedColor=numberColorLabel;
				angular.element(".selectSideNumber").removeClass("disabled");
				shapeType="Number";
				//$scope.setNameNumData();
				currentView=0;
				$scope.switchNameNumberViews('',$scope,shapeType);
				$scope.$apply();
			
				
			}
			else
			{
				
				canvas.remove(numberObj);
				canvas.renderAll();
				angular.element(".selectSideNumber").addClass("disabled");
				numberObj=null;
				if(!(numberView==currentView))
				{
					currentView=(numberView==0)?1:0;
					$scope.switchNameNumberViews('','',"numberdelete")
				}
				else
				{
					for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
					$scope.dataArrays(currentView);
					
	    			previewArr[currentView]=canvas.toDataURL();
	    			canvasArr[currentView]=JSON.stringify(canvas);
	    			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
				}
				//canvasArr[currentView]=JSON.stringify(canvas);
				numberCheck=false;
				if(nameCheck==false && numberCheck==false)
				selectedNamePage="home";
				numberView=1;
				//canvasArr[currentView]=JSON.stringify(canvas);
				
				
				
			}
		}
	}
	
	$scope.addNameOnly=function(str)
	{
		angular.element(".addNameCheck").attr("checked",true);
		nameSidePreIndex=1;
		nameSideNextIndex=1;
		document.getElementById('nameSide').selectedIndex = 1;
		nameCheck=true;
		nameView=1;
		nameAndNumberSelectedColor=nameBackColorHex;
		nameAndNumberFillColor=nameFillColor;
		selectedNamePage="namePage2"
		angular.element(".selectSideName").removeClass("disabled");
		shapeType="Name";
		currentView=0;
		//alert(nameNumPersonalization)
		$scope.switchNameNumberViews('',$scope,shapeType,str);
		$scope.$apply();
	}
	$scope.addNumOnly=function(str)
	{
		angular.element(".addNumberCheck").attr("checked",true);
		numberSidePreIndex=1;
		numberSideNextIndex=1;
		document.getElementById('numberSide').selectedIndex = 1;
		numberCheck=true;
		numberView=1;
		nameAndNumberSelectedColor=numberBackColorHex;
		nameAndNumberFillColor=numberFillColor;
		angular.element(".selectSideNumber").removeClass("disabled");
		shapeType="Number";
		currentView=0;
		$scope.switchNameNumberViews('',$scope,shapeType,str);
		$scope.$apply();
	}
	$scope.checkNameNum=function(str)
	{
		if(shapeType=="Name")
		{
			nameAndNumberSelectedColor=nameBackColorHex;
			nameAndNumberFillColor=nameFillColor;
			if(nameObj)
			{
				canvas.remove(nameObj);
				canvas.renderAll();
				nameObj=null;
			}
			$scope.setNameNumData(str);
		}
		else
		{
			nameAndNumberSelectedColor=numberBackColorHex;
			nameAndNumberFillColor=numberFillColor;
			if(numberObj)
			{
				canvas.remove(numberObj);
				canvas.renderAll();
				numberObj=null;
			}
			$scope.setNameNumData(str);
		}
	}
	$scope.setNameNumData=function(str)
	{
		$scope.$parent.$parent.addObjectLoaderVariable=true;
		//alert("setData"+str)
		//alert(nameAndNumberSelectedColor)
		//fontTTF="Fonts/academic.ttf";
		//fontTTF;//="Fonts/arial.ttf";
		var obj=new Object();
		obj.text_val=(shapeType=="Name")?"EXAMPLE":"00";
    	obj.font_name =(shapeType=="Name")?nameFontTTF:numberFontTTF;
    	obj.color =nameAndNumberSelectedColor;
    	obj.distortValue =0;
    	obj.arc= '';
    	obj.shapeType=shapeType,
   		obj.globalTextName=(shapeType=="Name")?"Name":"Number";
		obj.align="west";
    	obj.rot= '';
    	webServices.customServerCall($http,siteUrl+'php/mychangecolor.php',obj,'addNameNumber',$scope,str);
	}
	$scope.changeNameSide=function()
	{
		
			if(stopPropagationFlag)
			{
				if(!(nameSideNextIndex==currentView))
				{
					//alert("glk")
					shapeType="Name";
					//canvas.remove(nameObj);
					
					//nameObj=null;
					//canvas.renderAll();
					currentView=(nameSideNextIndex==0)?1:0;
					//console.log(currentView)
					//canvasArr[nameView]=JSON.stringify(canvas);
					$scope.switchNameNumberViews('')
				}
			}
			else
			{
				stopPropagationFlag=true;
			
			}
		
	}
	
	$scope.changeNumberSide=function()
	{
		if(stopPropagationFlag)
			{
				if(!(numberSideNextIndex==currentView))
				{
					//alert("number")
					shapeType="Number";
					//canvas.remove(numberObj);
				//
					//numberObj=null;
					//canvas.renderAll();
					//console.log("numberClick")
					
					currentView=(numberSideNextIndex==0)?1:0;
					//console.log(currentView);
					//canvasArr[numberView]=JSON.stringify(canvas);
					$scope.switchNameNumberViews('')
				}
			}
			else
			{
				stopPropagationFlag=true;
			}
	}
	$scope.changeNameNumberHeight=function(obj,event)
	{
		if(angular.element(obj).attr("id")=="nameHeight")
		{
			if(nameObj)
			{
				
				var indx=obj.selectedIndex;
				nameHeightSelectIndx=indx;
				var inchValue=parseInt(angular.element(obj.options[indx]).attr("value"));
				scaleRatioFlag=false;
				numberHeight=scaleRatioWidth=(183*inchValue)/2;
				nameHeight=scaleRatioHeight=(42*inchValue)/2;
				nameObj.set({width:scaleRatioWidth*resCanRatio,height:scaleRatioHeight*resCanRatio});
				canvas.renderAll()
				canvasArr[currentView]=JSON.stringify(canvas);
				global_SelectedItem=canvas.getActiveObject()
				if(global_SelectedItem)
				{
					var rotationObj=global_SelectedItem.get("oCoords").tl;
					var ratioX=(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
					var ratioY=(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
					var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
					var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;
		
		
					global_SelectedItem.set({originalRatWidth:ratioW})
					global_SelectedItem.set({originalRatHeight:ratioH})
					global_SelectedItem.set({originalRatLeft:ratioX})
					global_SelectedItem.set({originalRatTop:ratioY})
				}	
			}
		}
		else
		{
			if(numberObj)
			{
				
				var indx=obj.selectedIndex;
				numberHeightSelectIndx=indx;
				var inchValue=parseInt(angular.element(obj.options[indx]).attr("value"));
				scaleRatioFlag=false;
				numberWidth=scaleRatioWidth=(185*inchValue)/8;
				numberHeight=scaleRatioHeight=(168*inchValue)/8;
				numberObj.set({width:scaleRatioWidth*resCanRatio,height:scaleRatioHeight*resCanRatio});
				canvas.renderAll()
				canvasArr[currentView]=JSON.stringify(canvas);
				global_SelectedItem=canvas.getActiveObject()
				if(global_SelectedItem)
				{
					var rotationObj=global_SelectedItem.get("oCoords").tl;
					var ratioX=(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
					var ratioY=(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
					var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
					var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;
		
		
					global_SelectedItem.set({originalRatWidth:ratioW})
					global_SelectedItem.set({originalRatHeight:ratioH})
					global_SelectedItem.set({originalRatLeft:ratioX})
					global_SelectedItem.set({originalRatTop:ratioY})
				}	
			}
		}
	}
	$scope.changeNameNumberFont=function(obj,event)
	{
		var getObj=canvas.getActiveObject();
		if(angular.element(obj).attr("id")=="nameFont"  && getObj)
		{
			nameObj=getObj;
			if(nameObj)
			{
				shapeType="Name";
				var color=nameObj.get("text_color")
				var indx=obj.selectedIndex;
				nameFontSelectIndx=indx;
				nameFontTitle=parseInt(angular.element(obj.options[indx]).attr("value"));
				nameFontTTF=angular.element(obj.options[indx]).attr("font")
			}
		}
		else if(angular.element(obj).attr("id")=="numberFont" && getObj)
		{
			numberObj=getObj;
			if(numberObj)
			{
				shapeType="Number";
				var color=numberObj.get("text_color")
				var indx=obj.selectedIndex;
				numberFontSelectIndx=indx;
				numberFontTitle=parseInt(angular.element(obj.options[indx]).attr("value"));
				numberFontTTF=angular.element(obj.options[indx]).attr("font")
			}
		}
		if(nameObj || numberObj)
		{
			
			$scope.$parent.$parent.addObjectLoaderVariable=true;
		//console.log(color)
			var obj=new Object();
			obj.text_val=(shapeType=="Name")?"EXAMPLE":"00";
	    	obj.font_name =(shapeType=="Name")?nameFontTTF:numberFontTTF;
	    	obj.color =color;//nameAndNumberSelectedColor;
	    	obj.distortValue =0;
	    	obj.arc= '';
	    	obj.shapeType=shapeType,
	   		obj.globalTextName=(shapeType=="Name")?"Name":"Number";
			obj.align="west";
	    	obj.rot= '';
	    	webServices.customServerCall($http,siteUrl+'php/mychangecolor.php',obj,'updateNameNumber',$scope);
		}
		
	}
	$scope.changeNameNumberSide=function(obj,event)
	{
		//alert(nameFontSelectIndx)
		//alert(angular.element(obj).attr("id"))
		//alert("anadikumar")
		stopPropagationFlag=false;
		event.stopPropagation();
		$scope.$apply();
		if(angular.element(obj).attr("id")=="nameSide")
		{
			
			document.getElementById('nameFont').selectedIndex = nameFontSelectIndx;
			nameSideNextIndex=document.getElementById('nameSide').selectedIndex;
			//console.log(nameObj)
			shapeType="Name";
			canvas.remove(nameObj);
			nameObj=null;
			//console.log("change")
			canvas.renderAll();
			nameAndNumberSelectedColor=nameBackColorHex;
			nameAndNumberFillColor=nameFillColor;
			//canvasArr[1]=JSON.stringify(canvas);
			nameView=(document.getElementById('nameSide').selectedIndex);
			currentView=(document.getElementById('nameSide').selectedIndex==0)?1:0;
			//alert(currentView)
			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
			$scope.dataArrays(currentView);
	    	previewArr[currentView]=canvas.toDataURL();
			canvasArr[currentView]=JSON.stringify(canvas);
			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
			$scope.switchNameNumberViews('',$scope)
			
		}
		if(angular.element(obj).attr("id")=="numberSide")
		{
			document.getElementById('numberFont').selectedIndex = nameFontSelectIndx;
			numberSideNextIndex=document.getElementById('numberSide').selectedIndex;
			shapeType="Number";
			
			//console.log(numberObj)
			canvas.remove(numberObj);
			numberObj=null;
			canvas.renderAll();
			nameAndNumberSelectedColor=numberBackColorHex;
			nameAndNumberFillColor=numberFillColor;
			//canvasArr[1]=JSON.stringify(canvas);
			//console.log("change")
			numberView=(document.getElementById('numberSide').selectedIndex);
			//alert(numberView)
			
			currentView=(document.getElementById('numberSide').selectedIndex==0)?1:0;
			//alert(currentView)
			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
			$scope.dataArrays(currentView);
			
	    	previewArr[currentView]=canvas.toDataURL();
			canvasArr[currentView]=JSON.stringify(canvas);
			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
			$scope.switchNameNumberViews('',$scope)
			event.stopPropagation();
		}
		$scope.$apply();
	}
	$scope.updateNameNumber=function(imgpath)
	{
		var img = fabric.document.createElement('img');
		//nsole.log(img)
		 img.onload = function() 
		 {
	       if(shapeType=="Name")
	       {
	       	 nameObj.set('_originalElement',img)
	 	  		nameObj.set('_element',img)
	 	  		nameObj.set({fontTTF:nameFontTTF,
					fontSelectedIndx:nameFontSelectIndx,
					fontTitle:nameFontTitle,})
	 	  		nameObj.setCoords();
		 	 canvas.renderAll();
		  	
		 	canvas.calcOffset();
		  	canvas.discardActiveObject();
		  	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
		  	$scope.dataArrays(currentView);
	    	previewArr[currentView]=canvas.toDataURL();
	    	canvas.setActiveObject(nameObj)
		  	canvas.renderAll();
			canvasArr[currentView]=JSON.stringify(canvas);
			for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
		  	$scope.$parent.$parent.addObjectLoaderVariable=false;
	       }
	       else
	       {
	       	numberObj.set('_originalElement',img)
	 	  	numberObj.set('_element',img)
	 	  	numberObj.set({fontTTF:numberFontTTF,
					fontSelectedIndx:numberFontSelectIndx,
					fontTitle:numberFontTitle,})
	 	  	numberObj.setCoords();
		 	canvas.renderAll();
		 	canvas.calcOffset();
		  	canvas.discardActiveObject();
		  	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
		  	$scope.dataArrays(currentView);
		  	
	    	previewArr[currentView]=canvas.toDataURL();
	    	canvas.setActiveObject(numberObj)
	    	canvas.renderAll();
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
			canvasArr[currentView]=JSON.stringify(canvas);
		  	$scope.$parent.$parent.addObjectLoaderVariable=false;
	       }
	     
	     
	    }; 
	
	    img.class="canvas-img";
	    img.crossorigin="";
	    img.src = siteUrl+imgpath;
	    $scope.$parent.$parent.addObjectLoaderVariable=false;
	}
	$scope.addNameNumberOnCanvas=function(imgpath,str)
	{
		
			angular.forEach(maintainDrawAreaArr,function(obj){
			if(obj.get("clipTitle")==selectedDrawAreaTitle)
			{
			if(drawAreaGrp)
			drawAreaGrp.set({shadow: 'red 0px 0px 0px'})
			drawAreaGrp=obj;
			drawAreaGrp.set({shadow: 'red 0px 0px 2px'})
			
			}
		})
		fabric.Image.fromURL(siteUrl+imgpath,function(img)
            	{
            		
            		//var leftX=(canWidth-300)/2;
            		//var topY=(canHeight-120)/2;
            		//img.scale(0.5)
            	//	console.log(numberWidth)
            		if(shapeType=="Name")
					img.set({name:"Name",
					left:193*resCanRatio,"textColorPrice":nameColorPrice,
					top:160*resCanRatio,width:nameWidth*resCanRatio,
					height:nameHeight*resCanRatio,
					originalRatWidth:nameWidth,
					originalRatHeight:nameHeight,originalRatLeft:193,
					originalRatTop:160,fontTTF:nameFontTTF,
					fontTitle:nameFontTitle,
					fontSelectedIndx:nameFontSelectIndx,
					shapeType:shapeType,
					colorTitle:nameColorLabel,
					fill:nameAndNumberFillColor,
					text_color:nameAndNumberSelectedColor,
					text:"EXAMPLE",hasControls:false
					});
					else
					img.set({name:'Number',
					"textColorPrice":numberColorPrice,
					left:193*resCanRatio,top:211*resCanRatio,
					width:numberWidth*resCanRatio,
					height:numberHeight*resCanRatio,
					originalRatWidth:numberWidth,
					originalRatHeight:numberHeight,
					colorTitle:numberColorLabel,
					
					originalRatLeft:193,originalRatTop:221,
					fontTTF:numberFontTTF,
					fontSelectedIndx:numberFontSelectIndx,
					fontTitle:numberFontTitle,
					shapeType:shapeType,
					
					fill:nameAndNumberFillColor,
					text_color:nameAndNumberSelectedColor,
					text:"00",hasControls:false
					});
					if(drawAreaGrp)
					img.set({clipTitle:drawAreaGrp.get("clipTitle")})
					canvas.add(img);
					//img.center();
					//alert(shapeType)
					if (shapeType=="Name") 
					{
						nameObj=img;
					}
					else
					numberObj=img;
					img.setControlVisible("tr",false);
					img.setControlVisible("br",false);
					img.setControlVisible("bl",false);
					img.setControlVisible("tl",false);
					
					img.setCoords();
					canvas.calcOffset();
					canvas.renderAll();
					//alert(currentView)
					for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}
					$scope.dataArrays(currentView);
	    			previewArr[currentView]=canvas.toDataURL();
	    			canvas.setActiveObject(img)
	    			canvas.renderAll();
					canvasArr[currentView]=JSON.stringify(canvas);
					for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
					if(str)
					{
						//alert(str)
						if(str=="nameAndNumber")
						{
							$scope.addNumOnly();
						}
						else
						{
							$scope.$parent.$parent.addObjectLoaderVariable=false;
							$scope.$parent.$parent.$apply();
						}
					}
					else
					{
						$scope.$parent.$parent.addObjectLoaderVariable=false;
						$scope.$parent.$parent.$apply();
						
					}
					
					
					 
					
					updateUndoRedo();
				});
	}
	$scope.showDeleteIcon=function(obj)
	{
		//alert("anadi")
		var indx = angular.element(obj).index();
		//alert(indx)
		if (indx >= 1) {
			var childArray = angular.element(".number-tb tbody").children();
			var innerChild = angular.element(childArray[indx]).children();
			
			angular.element(innerChild[0]).css({
				"visibility" : "visible"
			});
			
			preDeleteObj = angular.element(innerChild[0]);
		}
		$scope.$apply();
	}
	$scope.hideDeleteIcon=function(obj)
	{
		if (preDeleteObj) {
			angular.element(preDeleteObj).css({
				"visibility" : "hidden"
			});
		}
		$scope.$apply();
	}
	$scope.addNameNumberRow=function()
	{
		
		tableRowCounter++;
		var rowElement='<tr class="tableRow_'+tableRowCounter+'" ><td  class="rowdeleteTr"><img class="rowdelete" src="'+$scope.imageUrl+'assets/images/rowdelete.png" alt="no-image"></img></td><td><input type="text" class="textbox1" /></td><td><input type="number" min="1" class="textbox2" /></td><td class="size"><div class="custom-select"><select id="tableSelectSize_'+tableRowCounter+'" class="tableSizeHolder"><option>YXS</option></select></div></td></tr>'
		var sizeThumb='';
		angular.element(".number-tb").append(rowElement);
		angular.forEach(nameSizes,function(size,index)
		{
			if(index==0)
			{
				sizeThumb+='<option value=""></option>';
			}
			else
			{
				sizeThumb+='<option value="'+size.title+'">'+size.title+'</option>';
			}
			
		});
		//alert(sizeThumb)
		angular.element("#tableSelectSize_"+tableRowCounter).html(sizeThumb);
		
	}
	
	$scope.closeNameNumberSizePopUp=function()
	{
		popupManager.close("addNameNumberSizeClose")
	}
	$scope.deleteNameNumberRow=function(obj)
	{
		var indx=parseInt(angular.element(obj).parent().parent().index());
		var childArray=angular.element(".number-tb tbody").children();
		//alert(childArray.length)
		if(parseInt(childArray.length)<8)
		{
			//alert("dfdlf")
			var removeClass="."+angular.element(childArray[indx]).attr("class");
			
			angular.element(".number-tb tr").remove(removeClass);
			$scope.addNameNumberRow()
		}
		else
		{
			var removeClass="."+angular.element(childArray[indx]).attr("class");
			//alert(removeClass)
			angular.element(".number-tb tr").remove(removeClass);
			
		}
	}
	$scope.calculateNameAndNumber=function(obj)
	{
		nameNumberQuantArr=new Array();
		nameNumberSendInfoArr=new Array();
		nameNumberQuantity=0;
		
		var nameArr = angular.element(".textbox1");
		var numArr = angular.element(".textbox2");
		var quantArr=angular.element(".tableSizeHolder");
		//alert(quantArr.length)
		//console.log(quantArr)
		var nameAndNumberSizeLabel='';
		//console.log("cal")
		
		
		var sizeCounter=quantArr.length;
		for (var i = 0; i < nameArr.length; i++) 
		{
			//console.log(quantArr[i].selectedIndex);
			//console.log(angular.element(quantArr[i].options[quantArr[i].selectedIndex]).attr("value"))
			//if(angular.element(quantArr[i].options[quantArr[i].selectedIndex]))
			//{
				//alert(nameSideNextIndex)
				var size=angular.element(quantArr[i].options[quantArr[i].selectedIndex]).attr("value");
				var obj={"selectIndx":quantArr[i].selectedIndex,
				"rowIndx":angular.element(nameArr[i]).parent().parent().index(),
				"name":angular.element(nameArr[i]).val(),
				"number":angular.element(numArr[i]).val(),
				"size":size,"nameCheck":nameCheck,
				"numberCheck":numberCheck,
				"nameSide":nameSideNextIndex,
				"numSide":numberSideNextIndex,
				"nameHeightIndx":nameHeightSelectIndx,
				"numberHeightIndx":numberHeightSelectIndx,
				"nameBackColorHex":nameBackColorHex,
				"numberBackColorHex":numberBackColorHex,
				"nameColorLabel":nameColorLabel,
				"numberColorLabel":numberColorLabel,
				"nameColorPrice":nameColorPrice,
				"numberColorPrice":numberColorPrice,
				"nameFontTTF":nameFontTTF,
				"numberFontTTF":numberFontTTF,
				"nameFontSelectIndx":nameFontSelectIndx,
				"numberFontSelectIndx":numberFontSelectIndx,
				"nameFontTitle":nameFontTitle,
				"numberFontTitle":numberFontTitle,
				};
				nameNumberQuantArr.push(obj);
			//}
		}
		
		//console.log(nameNumberQuantArr)
		var nameCounter = 0;
		var numCounter = 0;
		var totalSizeCounter=0;
		angular.forEach(nameSizes,function(size,index){
			var sizeCounter=0;
			var numC=0;
			var nameC=0;
			for (var i = 0; i < nameNumberQuantArr.length; i++) 
			{
				if (size.title == nameNumberQuantArr[i].size)
				{
					
					if(nameNumberQuantArr[i].size!='')
					{
						sizeCounter++;
						totalSizeCounter++;
					}
					
					if(nameNumberQuantArr[i].name!='')
					{
						nameCounter++;
						nameC++;
					}
					
					if(nameNumberQuantArr[i].number!='')
					{
						numCounter++;
						numC++;
					}
				}
			}
			
			
			var max=Math.max(nameC,numC);
			var nameAndNumberLabel = (nameCounter + " " + "names and" + " " + numCounter + " " + "numbers on" + " " + totalSizeCounter + " " + "items");
			angular.element(".nameAndNumberLabel").html('');
			var labelThumb = '<b>Totals</b>: ' + nameAndNumberLabel + '';
			angular.element(".nameAndNumberLabel").html(labelThumb);
			
			
			
			if(sizeCounter!=0)
			{
				nameAndNumberSizeLabel += "(" + max + "/" + sizeCounter + ")" + " " + size.title + " ";
				angular.element(".totalNameAndNumber").html('');
				var labelThumb1 = '<b>Sizes</b>: ' + nameAndNumberSizeLabel + '';
				angular.element(".totalNameAndNumber").html(labelThumb1);
			}
		});
		
		
		
		for (var i = 0; i < nameNumberQuantArr.length; i++) 
			{
				//if (nameNumberQuantArr[i].name!='' || nameNumberQuantArr[i].number!='')
				//{
					nameNumberQuantity++;
					nameNumberSendInfoArr.push(nameNumberQuantArr[i]);
				//}
			}
			if(nameNumberQuantity==0)
			nameNumberQuantity=1;
	}
	$scope.windowW=angular.element(window).width();
    $scope.windowH=angular.element(window).height();
	$scope.namePopupX=Math.abs(($scope.windowW-angular.element('.enterNameNumberPopUp').width())/2);
   	$scope.namePopupY=Math.abs(($scope.windowH-angular.element('.enterNameNumberPopUp').height())/2);
   	$scope.nameSizePopupX=Math.abs(($scope.windowW-angular.element('.enterNameNumberSizePopUp').width())/2);
   	$scope.nameSizePopupY=Math.abs(($scope.windowH-angular.element('.enterNameNumberSizePopUp').height())/2);
    angular.element('.enterNameNumberPopUp').css({"left":$scope.namePopupX+"px","top":$scope.namePopupY+"px"})
    angular.element('.enterNameNumberSizePopUp').css({"left":$scope.nameSizePopupX+"px","top":$scope.nameSizePopupY+"px"})
	
}]);