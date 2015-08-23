customInkControllers.controller('AddTextCtrl', ['$scope', '$http', 'webServices','popupManager',
function($scope, $http, webServices,popupManager) {
	//console.log($scope);
	//alert("text")
	$scope.initFontData
	$scope.textshapeArr
	$scope.currentShapeSettingArr
	$scope.textColorArr
	$scope.textOutlineArr
	$scope.textColorChooser
	$scope.fontCategoryArr;
	$scope.resizeValue = 1;
	$scope.maxResizeValue = 1;
	$scope.rotationAngle = 0;
	$scope.textLabel="Select a Color";
	/******************************show hide variables***********************/
	global_SelectedItem=canvas.getActiveObject();
	if(global_SelectedItem && global_SelectedItem.get("name")=="Text")
	{
		angular.element('#textArea').val(global_SelectedItem.text);
		
		var resValue=global_SelectedItem.get("resizeValue");
		$scope.resizeValue = resValue;//global_SelectedItem.get("resizeValue");
		$scope.maxResizeValue = global_SelectedItem.get("maxResizeValue");
		var angle=parseInt(global_SelectedItem.getAngle());
		$scope.rotationAngle = (angle > 360) ? (angle - 360) : angle;
		$scope.switchValue = 3;
		
		
		
	}
	else
	$scope.switchValue = 1;
	$scope.showTextArea = true;
	$scope.showTopHeader = true;
	$scope.showNextBtn = false;
	$scope.changeFontImageUrl
	/******************************end of show hide variables***********************/
	/******************************Text Properties variables***********************/
	
	$scope.textAlign = 'west';
	$scope.effectName
	$scope.arcValue = 0;
	$scope.ttfPath = '';
	$scope.color = '';
	$scope.rgbColor = 'rgb(0,0,0)';
	$scope.outlineColor = '';
	$scope.outlineWidth = 0;
	$scope.textColorPrice = 0;
	$scope.textOutlineColorPrice = 0;
	
	$scope.strokeFlag=true;
	$scope.nostrokeImage=true;
	$scope.outlineColorTitle='';
	/******************************end of Text Properties variables***********************/
	if(!initFontData)
	{
		popupManager.preloaderOpen("preloaderOpen",'Loading Text Data...');
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/text', null, 'initFont', $scope)
	}
	else
	{
		
		$scope.textshapeArr = initFontData.root.textShapes.textShape;
		$scope.currentShapeSettingArr = $scope.textshapeArr[shapeSettingIndex].shapeSetting;
		$scope.textColorArr =initFontData.root.colors.color;
		$scope.textOutlineArr =initFontData.root.textOutline;
		$scope.effectName = initFontData.root.textShapes.textShape[0].name;
		$scope.fontCategoryArr =initFontData.root.categories.category;
		//alert(changeFontImageUrl)
		$scope.changeFontImageUrl = changeFontImageUrl;
		//console.log(fontDataArr)
		$scope.fontDataArr=fontDataArr;
		$scope.showNextBtn=true;
		$scope.textColorTitle=textColorTitle; 
		$scope.color=textColor;
		$scope.textColorPrice=textColorPrice;
		$scope.outlineColor = textOutlineColor;
		$scope.outlineColorTitle=outlineColorTitle
		$scope.outlineWidth=outlineWidth;
		$scope.textOutlineColorPrice=textOutlineColorPrice;
		textColorArr=new Array();
		textOutArr=new Array();
		if(outlineColorTitle=='')
		$scope.nostrokeImage=true;
		else
		$scope.nostrokeImage=false;
		setTimeout(function(){
			$scope.showHeadingSelection();
			},100)
	}
	$scope.getFontData = function(id) 
	{
		var ob = new Object();
		ob.fontsCategoryId = id;
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/fonts/', ob, 'fontData', $scope);
	}
	$scope.getCategoryFontData = function(id) 
	{
		var ob = new Object();
		ob.fontsCategoryId = id;
		webServices.customServerCall($http, dataAccessUrl + 'designersoftware/fonts/', ob, 'fontCategoryData', $scope);
	}

	$scope.popIt = function() {
		if (greekPopUpWindow)
			greekPopUpWindow.close()
		greekPopUpWindow = window.open(greekPopUpUrl, 'name', 'height=710,width=300,resizable=true,toolbar=yes');
	}
	
	$scope.showColorLabel=function()
	{
		//alert("sd")
		$scope.textLabel="Select a Color";
		$scope.$apply();
	}
	$scope.showTextColorLabel=function(obj)
	{
		$scope.textLabel="Color:"+" "+angular.element(obj).attr("ctitle");
		$scope.$apply();
	}
	$scope.addUpdateText= function(type, ttfPath, arcValue, effectName) 
	{
		if(angular.element('#textArea').val()!='')
		{
			global_SelectedItem=canvas.getActiveObject();
			$scope.ttfPath = ttfPath;
			$scope.arcValue = arcValue;
			$scope.effectName = effectName;
			$scope.$parent.$parent.addObjectLoaderVariable = true;
	
			var obj = new Object();
			obj.txtcolor = $scope.color;
			obj.outlineColor = $scope.outlineColor;
			obj.colorTitle = $scope.textColorTitle;
			obj.outlineIndex = outlineIndex;
			obj.outlineType =outlineType;
			obj.flipX=false;
			obj.flipY=false;
			obj.angle=(type=="updateText")?global_SelectedItem.getAngle():0;
			obj.shapeSettingIndex=shapeSettingIndex;
			obj.outlineColorTitle =outlineColorTitle;
			obj.Font_Size = defaultFontSize;
			obj.data = angular.element('#textArea').val();
			obj.Font_name = $scope.ttfPath;
			
			obj.Arc_Value = archValue;//;;scope.arcValue;
			if(effectName=="Curve")
			{
				obj.rotate=arcRotate;
			}
			obj.roofGravity=roofGravity;
			obj.shapeSettingType=shapeSettingType;
			obj.shapeSelectIndx=shapeSelectIndx;
			obj.effectName = $scope.effectName;
			obj.Text_Align = textAlign;//$scope.textAlign;
			obj.outlineWidth = $scope.outlineWidth;
			obj.textColorPrice = $scope.textColorPrice;
			obj.textOutlineColorPrice = $scope.textOutlineColorPrice;
			//dataAccessUrl = 'http://magento.thesparxitsolutions.com/magento/NR317/';
			//alert(dataAccessUrl);
			webServices.customServerCall($http, siteUrl +'php/maketext.php', obj, type, $scope)
		}
		else
		{
			alert("There was no text entered. Type some text and click Next ");
		}
	}
	$scope.hideShadowColor=function(effect)
	{
		if(effect=="Bridge" || effect=="Valley")
		{
			angular.element("#textOutlineDropDown").addClass("disabled");
		}
		else
		{
			angular.element("#textOutlineDropDown").removeClass("disabled");
		}
	}
	$scope.resetTextPage=function()
	{
		angular.element('.addTextUl a').removeClass('selected');
		angular.element('.newTxt').addClass('selected');
		$scope.switchValue = 1;
		$scope.showTextArea = true;
		$scope.showTopHeader = true;
		angular.element('#textArea').val('');
		$scope.$apply();
	}
	$scope.deleteText = function() {
		angular.element('.addTextUl a').removeClass('selected');
		angular.element('.newTxt').addClass('selected');
		$scope.switchValue = 1;
		$scope.showTextArea = true;
		$scope.showTopHeader = true;
		angular.element('#textArea').val('');
		$scope.$apply();
		var ob = canvas.getActiveObject();
		canvas.remove(ob);
	}
	$scope.showHeadingSelection= function(target) {

		if (angular.element(target).hasClass('newTxt')) {
			
			angular.element('.addTextUl a').removeClass('selected');
			angular.element(target).addClass('selected');
			$scope.switchValue = 1;
			$scope.showTextArea = true;
			$scope.showTopHeader = true;
			canvas.discardActiveObject();
			angular.element('#textArea').val('');

		} else if (angular.element(target).hasClass('editTxt') && canvas.getActiveObject()) {
			angular.element('.addTextUl a').removeClass('selected');
			angular.element(target).addClass('selected');
			$scope.switchValue = 3;
			$scope.showTextArea = true;
			$scope.showTopHeader = true;
		} else if (angular.element(target).hasClass('editTxt')) {

			angular.element('.addTextUl a').removeClass('selected');
			angular.element(target).addClass('selected');
			$scope.switchValue = 2;
			$scope.showTextArea = false;
		} else if (target == undefined && canvas.getActiveObject()) 
		
		{
			//alert("dfjksjfk")
			var ob = canvas.getActiveObject();
			if(ob.get("name")=="Text")
			{
				angular.element('.addTextUl a').removeClass('selected');
				angular.element('.editTxt').addClass('selected');
				$scope.switchValue = 3;
				$scope.$apply();
				
				//console.log(ob)
				shapeSettingIndex=ob.get("shapeSettingIndex");
				
				$scope.showTextArea = true;
				$scope.showTopHeader = true;
				//$scope.$apply();
				//alert("ana")
				var sc=angular.element(".editTxtPage").scope();
				angular.element('#textArea').val(ob.text);
				// fill value in text Area
				textColor=ob.text_color;
				$scope.color = ob.text_color;
				//sc.color=ob.text_color;
				angular.element("#textColor").find("i").css({"backgroundColor":"#"+ob.text_color})
				//sc.$apply();
				$scope.textColorTitle=ob.get('colorTitle')
				outlineIndex=ob.get('outlineIndex')
				outlineColorTitle=ob.get('outlineColorTitle');
				outlineType=ob.get('outlineType');
				$scope.outlineWidth=ob.get("outlineWidth");
				outlineWidth=$scope.outlineWidth;
				effectName=ob.get("customEffectName");
				$scope.effectName=effectName;
				arcRotate=ob.get("arcRotate");
				roofGravity=ob.get("roofGravity");
				archValue=ob.get("arc_Value");
				$scope.hideShadowColor(effectName);
				textAlign=ob.get("align");
				//console.log(outlineColorTitle)
				// fill value in text Area
				shapeSettingType=ob.get("shapeSettingType");
				
				shapeSelectIndx=ob.get("shapeSelectIndx");
				$scope.outlineColorTitle=outlineColorTitle;
				$scope.outlineColor = ob.outlineColor;
				angular.element("#textColor").find("i").css({"backgroundColor":"#"+ob.outlineColor})
				textOutlineColor=$scope.outlineColor;
				textOutlineColorPrice=ob.get("textOutlineColorPrice");
				$scope.textOutlineColorPrice=textOutlineColorPrice;
				selectedFontCategoryIndex=ob.get("selectedFontCategoryIndex");
				normalSelectedIndx=selectedFontCategoryIndex;
				if(outlineColorTitle=='')
				$scope.nostrokeImage=true;
				else
				$scope.nostrokeImage=false;
				changeFontImageUrl=ob.get("changeFontImageUrl");
				selectedTtfPath=ob.get("fontTTF");
				normalFontTTF=selectedTtfPath;
				$scope.changeFontImageUrl=changeFontImageUrl;
				normalFontUrl=changeFontImageUrl;
				
				$scope.rgbColor = ob.fill;
				$scope.resizeValue = ob.resizeValue;
				$scope.maxResizeValue = ob.maxResizeValue;
				
				$scope.$apply();
				$scope.currentShapeSettingArr = $scope.textshapeArr[shapeSettingIndex].shapeSetting;
				(effectName=="Normal")?(angular.element("#shapeSettingDropDown").addClass("disabled")):(angular.element("#shapeSettingDropDown")).removeClass("disabled");
				setTimeout(function()
				{
					if(document.getElementById("shapeSettingDropDown"))
					document.getElementById("shapeSettingDropDown").selectedIndex=shapeSelectIndx;
				},100)
				if(document.getElementById("textOutlineDropDown"))
				document.getElementById("textOutlineDropDown").selectedIndex=outlineIndex;
				var scope = angular.element('#resizeInput').scope();
				//need to work only for input
				if (scope) 
				{
					var sc=angular.element('#rotationAngle').scope();
					var angle=parseInt(ob.getAngle());
					if(sc)
					sc.rotationAngle = (angle > 360) ? (angle - 360) : angle;
					
					scope.resizeValue = ob.get("resizeValue")
					scope.maxResizeValue = ob.maxResizeValue;
				}
				}

		} else if (target == undefined && canvas.getActiveObject() == null) 
		{
			
			angular.element('.addTextUl a').removeClass('selected');
			angular.element('.newTxt').addClass('selected');
			$scope.switchValue = 1;
			$scope.showTextArea = true;
			$scope.showTopHeader = true;
			angular.element('#textArea').val('');
		}
		$scope.$apply();
	}
	$scope.changeFontView = function() {

		$scope.switchValue = 4;
		$scope.showTextArea = false;
		$scope.showTopHeader = false;
		$scope.$apply();
		if(document.getElementById('fontCategoryDropDown').selectedIndex!=selectedFontCategoryIndex)
		{
			popupManager.preloaderOpen("preloaderOpen",'Loading Fonts...');
			var ob = new Object();
			ob.fontsCategoryId = initFontData.root.categories.category[selectedFontCategoryIndex].fontsCategoryId;
			webServices.customServerCall($http, dataAccessUrl + 'designersoftware/fonts/', ob, 'fontCategoryData', $scope);
			document.getElementById('fontCategoryDropDown').selectedIndex = selectedFontCategoryIndex;
		}
	}
	$scope.showTextShape = function() {

		$scope.switchValue = 5;
		$scope.showTextArea = false;
		$scope.showTopHeader = false;
		$scope.$apply();
	}
	$scope.changeTextShape= function(index) {

		shapeSettingIndex=index;	
		$scope.effectName = $scope.textshapeArr[index].name;
		effectName=$scope.textshapeArr[index].name;
		
		
		$scope.currentShapeSettingArr = $scope.textshapeArr[index].shapeSetting;
		global_SelectedItem = canvas.getActiveObject();
		global_SelectedItem.set({
			"customEffectName" : $scope.effectName
		});
		
		
		$scope.switchValue = 3;
		$scope.showTextArea = true;
		$scope.showTopHeader = true;
		$scope.$apply();
		(effectName=="Normal")? angular.element("#shapeSettingDropDown").addClass("disabled"):angular.element("#shapeSettingDropDown").removeClass("disabled");
		//alert(shapeSettingType)
		//if(shapeSettingType=='')
		shapeSelectIndx=4
		document.getElementById("shapeSettingDropDown").selectedIndex=shapeSelectIndx;
		$scope.imageMagickHit();
		$scope.hideShadowColor(effectName);
	}
	$scope.fontStyleCancelBtn = function() {

		$scope.switchValue = 3;
		$scope.showTextArea = true;
		$scope.showTopHeader = true;
		$scope.$apply();
		document.getElementById("textOutlineDropDown").selectedIndex=outlineIndex;
	}
	$scope.rotationAngle1= function(angle, sc) {
		
	}
	$scope.rotateText = function() {
		//alert($scope.rotationAngle)
		var rotationValue = angular.element('.rotateInput').val();
		var ob = canvas.getActiveObject();
		ob.originX = 'center';
		ob.originY = 'center';
		var rect = ob.getBoundingRect();
		var cenX = rect.left + rect.width / 2;
		var cenY = rect.top + rect.height / 2;

		ob.set({
			left : cenX,
			top : cenY
		});

		canvas.renderAll();
		ob.set({
			angle : rotationValue
		});
		ob.setCoords();
		canvas.calcOffset();
		canvas.renderAll();
		
		
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
	$scope.selectGreekFont=function()
	{
		
		if(greekFlag==false)
		{
			greekFlag=true
			if(greekSelectedIndx!=selectedFontCategoryIndex)
			{
				popupManager.preloaderOpen("preloaderOpen",'Greek Fonts...');
				selectedFontCategoryIndex=greekSelectedIndx;
				//initFontData.root.categories.category[greekSelectedIndx]
				var ob = new Object();
				ob.fontsCategoryId = initFontData.root.categories.category[greekSelectedIndx].fontsCategoryId;
				webServices.customServerCall($http, dataAccessUrl + 'designersoftware/fonts/', ob, 'greekFontCategoryData', $scope);
			}
		}
		else
		{
			greekFlag=false;
			selectedFontCategoryIndex=normalSelectedIndx;
			changeFontImageUrl = normalFontUrl
			selectedTtfPath = normalFontTTF;
			$scope.changeFontImageUrl = changeFontImageUrl;
		}
			
	}
	$scope.showTextColor= function(obj) 
	{
		textColorArr=new Array();
		textAndOutlineColorTitle=(angular.element(obj).attr("id")=="textColor")?textColorTitle:outlineColorTitle;
		$scope.textColorChooser = angular.element(obj).attr("id");
		$scope.strokeFlag=($scope.textColorChooser=="textColor")?false:true;
		$scope.switchValue = 6;
		$scope.showTextArea = false;
		$scope.showTopHeader = false;
		$scope.$apply();
		
	}
	$scope.changeFontColor= function(obj) {
		
		
		global_SelectedItem = canvas.getActiveObject();
		global_SelectedItem.set({
			"text_color" : angular.element(obj).attr("pcolor"),
			"textColorPrice" : angular.element(obj).attr("price"),
			colorTitle:angular.element(obj).attr("ctitle")
		});
		textColor=angular.element(obj).attr("pcolor");
		
		$scope.textColorTitle=angular.element(obj).attr("ctitle");
		textColorTitle=$scope.textColorTitle;
		$scope.color = angular.element(obj).attr("pcolor");
		$scope.switchValue = 3;
		$scope.$apply();
		$scope.imageMagickHit();
	}
	$scope.noOutlineColor=function(event)
	{
		event.stopPropagation();
		outlineIndex=0;
		outlineType="No Outline"
		$scope.nostrokeImage=true;
		$scope.outlineWidth=0;
		global_SelectedItem = canvas.getActiveObject();
		global_SelectedItem.set({
			outlineWidth:$scope.outlineWidth,
			outlineColor :'',
			textOutlineColorPrice:''
		});
		outlineColorTitle=''
		$scope.outlineColorTitle=outlineColorTitle;
		
		$scope.outlineColor = '';
		$scope.switchValue = 3;
		$scope.$apply();
		
		$scope.imageMagickHit();
		//event.stopPropagation();
	}
	$scope.changeOutlineColor= function(obj) {
		
		if(outlineType=="No Outline")
		{
			outlineIndex=0;
			outlineType="Medium"
			angular.forEach(textOutlineArr,function(obj,i){
				if(outlineType==obj.outlineName)
				{
					outlineIndex=i+2;
					$scope.outlineWidth=obj.value;
				}
				
			})
		}
		$scope.nostrokeImage=false;
		global_SelectedItem = canvas.getActiveObject();
		global_SelectedItem.set({
			outlineWidth:$scope.outlineWidth,
			outlineColor: angular.element(obj).attr("pcolor"),
			textOutlineColorPrice: angular.element(obj).attr("price")
		});
		outlineColorTitle=angular.element(obj).attr("ctitle");
		$scope.outlineColorTitle=outlineColorTitle;
	
		$scope.outlineColor = angular.element(obj).attr("pcolor");
		$scope.switchValue = 3;
		$scope.$apply();
		$scope.imageMagickHit();	
	}
	$scope.changeFontColorReal = function(obj) 
	{
		
		global_SelectedItem = canvas.getActiveObject();
		if (obj)
			$scope.rgbColor = angular.element(obj).css('backgroundColor');

		global_SelectedItem.fill = $scope.rgbColor;
		colorPickerValue = $scope.rgbColor;
		if (obj)
			global_SelectedItem.set({
				"text_color" : angular.element(obj).attr("pcolor")
			});
		else
			global_SelectedItem.set({
				"text_color" : $scope.color
			});
			
		global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
		global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
		canvas.renderAll();

		if (obj)
			$scope.color = angular.element(obj).attr("pcolor");
		this.fontStyleCancelBtn();
	}
	$scope.setAlignment = function(obj) {
		//$scope.$parent.$parent.addObjectLoaderVariable= true;
		global_SelectedItem = canvas.getActiveObject();
		var alignValue = angular.element(obj).attr('class');
		if (alignValue == 'leftAlign') {
			$scope.textAlign = 'west';
		} else if (alignValue == 'middleAlign') {
			$scope.textAlign = 'center';
		} else if (alignValue == 'rightAlign') {
			$scope.textAlign = 'east';
		}
		global_SelectedItem.set({
			"align" : $scope.textAlign
		});
		textAlign=$scope.textAlign;
		$scope.imageMagickHit();
	}
	$scope.imageMagickHit= function() {
	
		global_SelectedItem = canvas.getActiveObject();
		//	alert(global_SelectedItem.arc_Values);
		var obj = new Object();
		obj.colorTitle = global_SelectedItem.colorTitle;
		obj.outlineColorTitle=outlineColorTitle;
		obj.outlineType=outlineType;
		obj.txtcolor = global_SelectedItem.text_color;
		obj.outlineColor = global_SelectedItem.outlineColor;
		obj.angle=global_SelectedItem.getAngle();
		obj.Font_Size = global_SelectedItem.fontSizeValue;
		obj.outlineIndex=outlineIndex;
		obj.data = global_SelectedItem.text;
		obj.Font_name = global_SelectedItem.fontTTF;
		obj.Arc_Value = global_SelectedItem.arc_Value;
		obj.shapeSettingType=shapeSettingType;
		obj.shapeSelectIndx=shapeSelectIndx;
		obj.effectName = global_SelectedItem.customEffectName;
		obj.shapeSettingIndex=shapeSettingIndex;
		obj.Text_Align = global_SelectedItem.align;
		obj.outlineWidth = global_SelectedItem.outlineWidth;
		obj.textColorPrice = global_SelectedItem.textColorPrice;
		obj.textOutlineColorPrice = global_SelectedItem.textOutlineColorPrice;
		if(effectName=="Curve")
		{
			var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
			shapeSettingType=selectType;
			//alert(selectType)
			if(selectType=="Up Very Sharp")
			{
				arcRotate=0;
				archValue=1;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Up Sharp")
			{
				arcRotate=0;
				archValue=2;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Up Medium")
			{
				arcRotate=0;
				archValue=3;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Up Slight")
			{
				arcRotate=0;
				archValue=4;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Up Very Slight")
			{
				arcRotate=0;
				archValue=5;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Up Super Slight")
			{
				arcRotate=0;
				archValue=6;
				obj.Arc_Value = archValue;
				obj.rotate=0;
			}
			else if(selectType=="Down Super Slight")
			{
				arcRotate=180;
				archValue=7;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
			else if(selectType=="Down Very Slight")
			{
				arcRotate=180;
				archValue=5;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
			else if(selectType=="Down Slight")
			{
				arcRotate=180;
				archValue=4;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
			else if(selectType=="Down Medium")
			{
				arcRotate=180;
				archValue=3;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
			else if(selectType=="Down Sharp")
			{
				arcRotate=180;
				archValue=2;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
			else if(selectType=="Down Very Sharp")
			{
				arcRotate=180;
				
				archValue=1;
				obj.Arc_Value = archValue;
				obj.rotate=180;
			}
		}
		if(effectName=="Pinch" || effectName=="Bridge" || effectName=="Valley" )
		{
			var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
				shapeSettingType=selectType;
				//alert(selectType)
				if(selectType=="Very Small")
				{
					archValue=0.1;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Small")
				{
					archValue=0.3;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Medium")
				{
					archValue=0.4;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Large")
				{
					archValue=0.5;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Very Large")
				{
					archValue=0.6;
					obj.Arc_Value = archValue;
					
				}
		}
		if(effectName=="Bulge")
		{
			var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
				shapeSettingType=selectType;
				//alert(selectType)
				if(selectType=="Very Small")
				{
					archValue=.10;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Small")
				{
					archValue=.20;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Medium")
				{
					archValue=.30;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Large")
				{
					archValue=.40;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Very Large")
				{
					archValue=.50;
					obj.Arc_Value = archValue;
					
				}
		}
		if(effectName=="Arch")
		{
				var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
				shapeSettingType=selectType;
				//alert(selectType)
				if(selectType=="Up Very Small")
				{
					archValue=-4;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Up Small")
				{
					archValue=-8;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Up Medium")
				{
					archValue=-12;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Up Large")
				{
					archValue=-16;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Up Very Large")
				{
					archValue=-20;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Up Super Slight")
				{
					archValue=-24;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Down Very Small")
				{
					archValue=4;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Down Small")
				{
					archValue=8;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Down Medium")
				{
					archValue=12;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Down Large")
				{
					archValue=16;
					obj.Arc_Value = archValue;
					
				}
				else if(selectType=="Down Very Large")
				{
					archValue=20;
					obj.Arc_Value = archValue;
					
				}
				
		}
		if(effectName=="Roof")
		{
			var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
				shapeSettingType=selectType;
				//alert(selectType)
				if(selectType=="Top Small")
				{
					archValue=1;
					obj.Arc_Value = archValue;
					obj.roofGravity = "south";
					roofGravity="south";
					
				}
				else if(selectType=="Top Medium")
				{
					archValue=2;
					obj.Arc_Value = archValue;
					obj.roofGravity = "south";
					roofGravity="south";
					
				}
				else if(selectType=="Top Large")
				{
					archValue=3;
					obj.Arc_Value = archValue;
					obj.roofGravity = "south";
					roofGravity="south";
					
				}
				else if(selectType=="Middle Small")
				{
					archValue=.20;
					obj.Arc_Value = archValue;
					obj.roofGravity = "bottom";
					roofGravity="bottom";
					
				}
				else if(selectType=="Middle Medium")
				{
					archValue=.30;
					obj.Arc_Value = archValue;
					obj.roofGravity = "bottom";
					roofGravity="north";
					
				}
				else if(selectType=="Middle Large")
				{
					archValue=.60;
					obj.Arc_Value = archValue;
					obj.roofGravity = "bottom";
					roofGravity="bottom";
					
				}
				else if(selectType=="Bottom Small")
				{
					archValue=2;
					obj.Arc_Value = archValue;
					obj.roofGravity = "north";
					roofGravity="north";
					
				}
				else if(selectType=="Bottom Medium")
				{
					archValue=3;
					obj.Arc_Value = archValue;
					obj.roofGravity = "north";
					roofGravity="north";
					
				}
				else if(selectType=="Bottom Large")
				{
					archValue=4;
					obj.Arc_Value = archValue;
					obj.roofGravity = "north";
					roofGravity="north";
					
				}
				
		}
		if(effectName=="Wedge")
		{
			var selectType=document.getElementById("shapeSettingDropDown").options[shapeSelectIndx].value;
				shapeSettingType=selectType;
				//alert(selectType)
				if(selectType=="Middle Widen Slow")
				{
					archValue=5;
					obj.Arc_Value = archValue;
					obj.roofGravity = "left";
					roofGravity="left";
					
				}
				else if(selectType=="Middle Widen Medium")
				{
					archValue=4;
					obj.Arc_Value = archValue;
					obj.roofGravity = "left";
					roofGravity="left";
					
				}
				else if(selectType=="Middle Widen Fast")
				{
					archValue=3;
					obj.Arc_Value = archValue;
					obj.roofGravity = "left";
					roofGravity="left";
					
				}
				else if(selectType=="Middle Narrow Slow")
				{
					archValue=6;
					obj.Arc_Value = archValue;
					obj.roofGravity = "right";
					roofGravity="right";
					
				}
				else if(selectType=="Middle Narrow Medium")
				{
					archValue=4;
					obj.Arc_Value = archValue;
					obj.roofGravity = "right";
					roofGravity="right";
					
				}
				else if(selectType=="Middle Narrow Fast")
				{
					archValue=3;
					obj.Arc_Value = archValue;
					obj.roofGravity = "right";
					roofGravity="right";
					
				}
				
		}
		//console.log(obj)
		webServices.customServerCall($http, dataAccessUrl + 'designertool/php/maketext.php', obj, "updateText", $scope,'imagemagic')
	}
	$scope.setTextOutline=function(ob) 
	{
		
		outlineType=angular.element(ob).text();
		
		$scope.outlineWidth = angular.element(ob).prop('value');
		if($scope.outlineWidth==0)
		{
			$scope.nostrokeImage=true;
			outlineColorTitle='';
			$scope.outlineColor='';
		}
		else if($scope.nostrokeImage==true)
		{
			$scope.nostrokeImage=false;
			outlineColorTitle=global_SelectedItem.get("colorTitle");
			$scope.outlineColor=global_SelectedItem.get("text_color")
		}
		textOutlineColor=$scope.outlineColor;
		$scope.outlineColorTitle=outlineColorTitle;
		global_SelectedItem = canvas.getActiveObject();
		global_SelectedItem.set({
			"outlineWidth" : $scope.outlineWidth,
			outlineColor:$scope.outlineColor
		});
		$scope.imageMagickHit();
	}
	$scope.setResize= function() 
	{
		var pat=/^\d+(\.{0,1}\d{0,6})$/;
		var inputValue = angular.element('#resizeInput').val();
		global_SelectedItem = canvas.getActiveObject();
		if(pat.test(inputValue) && pat.test(inputValue))
		{
				var preResizeValue=global_SelectedItem.get("resizeValue");
				var nw=parseFloat(inputValue)*25;
				var nh=(global_SelectedItem.getHeight()*nw)/global_SelectedItem.getWidth()
				
				if(nw>drawAreaGrp.getWidth())
				{
					var nw=parseFloat(preResizeValue)*25;
					var nh=(global_SelectedItem.getHeight()*nw)/global_SelectedItem.getWidth()
					alert("You reached Maximum width limit");
				}
				if(nh>drawAreaGrp.getHeight())
				{
					var nw=parseFloat(preResizeValue)*25;
					var nh=(global_SelectedItem.getHeight()*nw)/global_SelectedItem.getWidth()
					alert("You reached Maximum height limit");
				}
			
				if(nw<1)
				nw=25;
				if(nh<1)
				nh=25;
				scaleRatioFlag=false;
			//alert(nw)
			//alert(nh)
			var resizeValue=(nw/25)
				scaleRatioWidth=nw;
				scaleRatioHeight=nh;
			
				global_SelectedItem.set({resizeValue:resizeValue,width:scaleRatioWidth,height:scaleRatioHeight});
				global_SelectedItem.setCoords();
				canvas.renderAll()
				maintainBoundry();
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
				else
				{
					alert("Please provide numeric value");
				}	
			
		
		
	}
	$scope.setShapeSetting= function(ob) {
		global_SelectedItem = canvas.getActiveObject();
		var effectVlue=angular.element(ob).prop('value')
		shapeSettingType=angular.element(ob).prop('value');
		shapeSelectIndx=document.getElementById("shapeSettingDropDown").selectedIndex;
		if(effectVlue==0)
		{
			
			effectName="Normal";
			$scope.effectName=effectName;
			archValue=0;
			shapeSettingType='';
			shapeSelectIndx=0;
			global_SelectedItem.set({customEffectName:effectName,arc_Value:archValue})
			angular.element("#shapeSettingDropDown").addClass("disabled")
			canvas.renderAll();
			
		}
		$scope.imageMagickHit();
		$scope.hideShadowColor(effectName);
	}}]);
