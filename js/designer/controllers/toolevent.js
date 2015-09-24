angular.element(document).ready(function() {
	// angular.element(".container").css({"width":"1200px"});
	//alert(window.innerWidth+"\n"+window.innerHeight)	// angular.element("#back-can").spectrum({
        // color: "#ff0000",
        // preferredFormat: "hex",
    	// showInput: true,
        // showInitial: true,
        // chooseText: "Ok",
        // change: canvas_BackgroundColor
    // });
    if(window.innerWidth<767)
    {
    	mobileMode=true;
    	
    }
    else
    {
    	mobileMode=false;
    }
	angular.element("#file").customFile();
	/*****************************File-Upload**************************/
	var myform = angular.element("#UploadForm");
	//alert(myform)
	
	angular.element(myform).ajaxForm({
		beforeSend : function() 
		{
			//alert(angular.element(".customfile-filename").attr("title"))//brfore sending form
			//alert("anadi")
			if(angular.element(".customfile-filename").attr("title"))
			{
				//alert("before")
				//uploadColorArr=new Array();
				angular.forEach(uploadColorArr,function(obj,i){
						obj.colorSelected=false;
					})
				uploadThumb='';
				uploadCanvas.clear();
				uploadCanvas.renderAll();
					
				uploadColorEdit=false;
				var sc=angular.element('.tool-wrap').scope();
				var injector = angular.element('.tool-wrap').injector()
				var popUp = injector.get("popupManager");
				popUp.preloaderOpen("preloaderOpen",'Loading Image!');
				sc.uploadShow=false;
				sc.uploadColorLabel='Select Image Color(s):';
				sc.uploadArtColors=clipArtColors;
				sc.uploadErrorFlag=false;
				sc.$apply();
				angular.element('.upload1PopUp').css({"display":"none"})
				angular.element('.upload2PopUp').css({"display":"block"})
			}
			
			//initial color of status text
		},
		uploadProgress : function(event, position, total, percentComplete) 
		{//on progress
			//console.log(percentComplete)
			angular.element(".progress-bar-percentage").css({'width':percentComplete+'%'});
		},
		complete : function(response) 
		{
			//alert(response)
		//console.log(response.responseText)
			var result=angular.fromJson(response.responseText);
			//console.log(result.thumb)
			uploadThumb=result.thumb;
			if(!(result.errorStr=="Error"))
			{
				angular.element(".customfile-filename").attr("title",'')
				myform.resetForm();
				angular.element(".imageFile").val("");
				var large=uploadThumb.replace('/thumb','/large');
				var src=siteUrl+"php/"+large;
				//alert(src)
				fabric.Image.fromURL(src,function(img)
				{
					var cW=300;
					var cH=300;
					var oW=img.width;
					var oH=img.height;
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
					
				}
				else
				{
					nW=cW;
					nH=(nW*oH)/oW;
					
				}
				//console.log(nW+"\n"+nH)
				var left=(300-nW)/2;
				var top=(300-nH)/2;
					img.set({left:left,top:top,width:nW,height:nH,selectable:false});
					uploadCanvas.add(img);
					img.setCoords();
					uploadCanvas.renderAll();
					//console.log(uploadColorArr)
					uploadedImageColorArr=new Array();
					
					var sc=angular.element('.tool-wrap').scope();
					sc.uploadShow=true;
					angular.element('.preloader-overlay-wrapper').fadeOut(500);
					angular.element('.preloaderHolder').fadeOut(500)
					angular.forEach(uploadColorArr,function(ob,i)
					{
						if(i<4)
						{
							var preIndx=Math.floor((Math.random()*uploadColorArr.length)-1)
							//console.log(preIndx)
							if(preIndx>0)
							{
								uploadColorArr[preIndx].colorSelected=true;
								var obj={'color':clipArtColors.colors[preIndx].code,'price':clipArtColors.colors[preIndx].price,'indx':preIndx}
		    					uploadedImageColorArr.push(obj);
	    					}
						}
					});
					sc.$apply();
				});
			}
			else
			{
				var sc=angular.element('.tool-wrap').scope();
					sc.uploadErrorFlag=true;
					
					angular.element('.preloader-overlay-wrapper').fadeOut(500);
					angular.element('.preloaderHolder').fadeOut(500)
					sc.$apply();
				//alert("error")
			}
			//addUploadImage()
			
			
			
			
		}
	});
	
	angular.element(".tool-wrap").on(clickEventType, ".upload1PopUp img.closeNameSizePopup, .uploadCancel", function(event) {
	//alert("fkj")
	var sc=angular.element('.tool-wrap').scope();
		sc.uploadErrorFlag=false;
		sc.$apply();
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("uploadClose1");
	//console.log(injector)

	})
	angular.element(".tool-wrap").on(clickEventType, ".upload2PopUp img.closeNameSizePopup, .cancelUpload", function(event) {
	//alert("fkj")
	var sc=angular.element('.tool-wrap').scope();
	sc.uploadSelectColorFlag=false;
	sc.seeDetailFlag=false;
	sc.$apply();
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("uploadClose2");
	
	//console.log(injector)

	})
	
	angular.element(".tool-wrap").on(clickEventType, ".seeUploadDetail", function(event) {
	
		var sc=angular.element('.tool-wrap').scope();
		sc.seeDetailFlag=(sc.seeDetailFlag==false)?true:false;
		sc.$apply();
	})
	angular.element(".tool-wrap").on(clickEventType, ".upload-image-btn", function(event) {
	//alert("fkj")
	var sc=angular.element('.tool-wrap').scope();
	sc.seeDetailFlag=false;
	sc.$apply();
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.open("uploadOpen1");
	//console.log(injector)

	})
	
	angular.element(".tool-wrap").on(clickEventType, ".back-browse-popup", function(event) {
		//alert("fkj")
		var sc=angular.element('.tool-wrap').scope();
		sc.uploadSelectColorFlag=false;
		sc.seeDetailFlag=false;
		sc.$apply();
		angular.element(".upload2PopUp").css({"display":"none"})
		var injector = angular.element(this).injector()
		var popUp = injector.get("popupManager");
		popUp.open("uploadOpen1");
		//console.log(injector)

	})
	
	/******************************End File Upload************************************/
	/******************************Context Menu Event*******************************************/
	angular.element('.tool-product').bind("contextmenu", function() {
		return false;
	})
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		fabric.Object.prototype.cornerSize = 42;

	}
	angular.element(document).bind(clickEventType, function(event) {
		angular.element(".custom-drop-down").css({"display":"none"})
	});
	
	angular.element(document).bind("mousedown", function(event) {
		//console.log("jfhj")
		//console.log(event.currentTarget)
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".rightClickPopup2").css({
			"display" : "none"
		})
	});
	
	/*************************PopUp Url*************************************/
	angular.element(".tool-wrap").on(clickEventType, '#get_help', function(){		
		window.open(getHelpUrl, "", angular.element(this).attr('data-popup-options'));
	});
	
	angular.element(".tool-wrap").on(clickEventType,'#sleevePrint',function(){		
		window.open(sleevPrintUrl, "", angular.element(this).attr('data-popup-options'));
	});
	angular.element(".tool-wrap").on(clickEventType,'.viewSizing',function(){		
		window.open(sizePopup, "", angular.element(this).attr('data-popup-options'));
	});
	
	angular.element(".tool-wrap").on(clickEventType,'.contactuspath',function(){		
		window.open(contactUs, "", angular.element(this).attr('data-popup-options'));
	});
	angular.element(".tool-wrap").on(clickEventType,'.undo',function(){		
		unDo();
	});
	angular.element(".tool-wrap").on(clickEventType,'.redo',function(){		
		reDo();
	});
	angular.element(".tool-wrap").on(clickEventType,'.distres-effect',function(){		
		if(canvas.overlayImage)
		if(canvas.overlayImage.opacity==0)
		{
			//console.log(canvas.overlayImage)
			distressOpacity=1;
			canvas.overlayImage.opacity=1;
			canvas.renderAll();
		}
		else
		{
			distressOpacity=0;
			canvas.overlayImage.opacity=0;
			canvas.renderAll();
		}
	});
	
	/*************************End Popup url*******************************************/
	
	angular.element('.inner-canvas-holder-zoom').bind("mousedown", function(event) {
		//alert(event.which)
		if (event.which == 3) 
		{
			npx = event.pageX - angular.element('.tool-product').offset().left;
			npy = ((event.pageY) - angular.element('.tool-product').offset().top);
			//console.log(angular.element('.inner-canvas-holder-zoom').offset())
			global_SelectedItem = canvas.getActiveObject();
			if (global_SelectedItem) 
			{
				if(global_SelectedItem.get("shapeType")=="Name" || global_SelectedItem.get("shapeType")=="Number")
				{
					angular.element(".rightClickPopup").css({"width":"127px"})
					angular.element(".number-menu").css({"display":"block"});
					angular.element(".name-clip-menu").css({"display":"none"});
					
					
				}
				else
				{
					angular.element(".rightClickPopup").css({"width":"97px"})
					angular.element(".number-menu").css({"display":"none"});
					angular.element(".name-clip-menu").css({"display":"block"});
					
				}
				angular.element(".arrangeClickPopup").css({
					"display" : "none"
				});
				angular.element(".rightClickPopup").css({
					"display" : "block",
					"left" : (npx + "px"),
					"top" : (npy + "px")
				})
			} 
			else 
			{
				
				angular.element(".arrangeClickPopup").css({
					"display" : "none"
				});
				angular.element(".rightClickPopup").css({
					"display" : "none"
				})
				angular.element(".rightClickPopup2").css({
					"display" : "block",
					"left" : (npx + "px"),
					"top" : (npy + "px")
				})
			}
			event.stopPropagation();
			event.preventDefault();
		}
		else
		{
			angular.element(".rightClickPopup2").css({
					"display" : "none"
				});
		}
	})

	angular.element(".tool-wrap").on("mouseenter", '.rightClickPopup ul li', function(event) {
		//alert("fdhs")
		if (angular.element(this).attr("id") == "arrangeIcon") 
		{
			//console.log(angular.element("#arrangeIcon").position())
			//alert(angular.element(".rightClickPopup").width())
			//alert(angular.element(".rightClickPopup").height())
			if(mobileMode==false)
			{
				npxn = npx + parseInt(angular.element(".rightClickPopup").width())-3;
				npyn = npy + parseInt(angular.element(".rightClickPopup").height())-20;
			}
			else
			{
				npxn = npx;
				npyn = npy + parseInt(angular.element(".rightClickPopup").height())+5;
			}
			
			angular.element(".arrangeClickPopup").css({
				"display" : "block",
				"left" : (npxn + "px"),
				"top" : (npyn + "px")
			})
		}
		else
		{
			angular.element(".arrangeClickPopup").css({"display" : "none"});
		}

	})

	angular.element(".tool-wrap").on("mousedown", '.rightClickPopup', function(event) {

		event.stopPropagation();
		event.preventDefault();

	})
	angular.element(".tool-wrap").on("mousedown", '.rightClickPopup2', function(event) {

		event.stopPropagation();
		event.preventDefault();

	})

	angular.element(".tool-wrap").on("mousedown", '.arrangeClickPopup', function(event) {

		event.stopPropagation();
		event.preventDefault();

	})
	angular.element(".tool-wrap").on(clickEventType, '.close_tab', function(event) {
		
		
		//var windowWidth = jQuery(window).width();
		if(mobileMode==true)
		{
			angular.element(".tab-content").css({"display":"none"});
		}

	})
	
	/********************************End Context Menu**********************************/

	/******************************Canvas Controlls And Events******************************************/
	frontCanvas = new fabric.Canvas('frontCan', {
		controlsAboveOverlay : true
	});
	
	backCanvas = new fabric.Canvas('backCan', {
		controlsAboveOverlay : true
	});
	canvas = new fabric.Canvas('designCan', {
		controlsAboveOverlay : true
	});
	uploadCanvas= new fabric.Canvas('uploadDesignCan', {
		controlsAboveOverlay : true
	});
	uploadCanvas.selection=false;
	canvas.selection = false;
	selectedViewCanvas = frontCanvas;
	
	// var text=new fabric.Text("EXAMPLE",{left:200,top:300,width:200,height:50,fill:'#ff0000',fontFamily:'Verdana',fontWeight:'bold',fontSize:20})
	// canvas.add(text);
	// canvas.setActiveObject(text)
	// canvas.renderAll();	maintainRatio();
	angular.element(window).bind("resize",function(event)
	{
		//console.log("resize")
		maintainRatio();
	})
	canvas.observe("mouse:down", function() {
		
		var scope = angular.element(".nav-tabs").scope();
		global_SelectedItem = canvas.getActiveObject();
		
		canvas.renderAll();
		
		if (global_SelectedItem) 
		{
			// global_SelectedItem.setControlVisible("tr", false);
			// global_SelectedItem.setControlVisible("br", false);
			// global_SelectedItem.setControlVisible("bl", false);
			global_SelectedItem.lockScalingY = false;
			global_SelectedItem.lockScalingX = false;
			ORIGINAL_WIDTH = global_SelectedItem.getWidth();
			ORIGINAL_HEIGHT = global_SelectedItem.getHeight();
			//drawAreaGrp.set({
				//opacity : 1
			//});
			canvas.renderAll();
			//alert(global_SelectedItem.get("shapeType"))
//			console.log(global_SelectedItem.get("shapeType"))
			if(mobileMode==false)
			{
				
			
			if(global_SelectedItem.get("shapeType") == "drawArea")
			{
				selectedDrawAreaTitle=global_SelectedItem.get("clipTitle");
				if(drawAreaGrp)
				drawAreaGrp.set({shadow: 'red 0px 0px 0px'})
				drawAreaGrp=global_SelectedItem;
				drawAreaGrp.set({shadow: 'red 0px 0px 2px'})
				var textScope=angular.element("#add-text").scope();
				if(textScope)
				{
					textScope.switchValue=1;
					textScope.showHeadingSelection();
				}
			}
			if (global_SelectedItem.get("shapeType") == "Name" || global_SelectedItem.get("shapeType") == "Number") 
			{
				selectedDrawAreaTitle=global_SelectedItem.get("clipTitle");
				setClipDrawAreaByName(global_SelectedItem.get("clipTitle"));
				if(global_SelectedItem.get("shapeType") == "Name")
				{
					nameBackColorHex=global_SelectedItem.get("text_color");
					nameColorLabel=global_SelectedItem.get("colorTitle");
					angular.element("#selectedNameColorHolder").css({"backgroundColor":"#"+nameBackColorHex})
				}
				if(global_SelectedItem.get("shapeType") == "Number")
				{
					setClipDrawAreaByName(global_SelectedItem.get("clipTitle"));
					numberBackColorHex=global_SelectedItem.get("text_color");
					numberColorLabel=global_SelectedItem.get("colorTitle");
					angular.element("#selectedTextNumberColorHolder").css({"backgroundColor":"#"+numberBackColorHex})
				}
				
				global_SelectedItem.hasControls=false;
				canvas.renderAll();
				scope.changeView(4);
				var sc=angular.element("#add-name").scope();
				if(sc)
				{
					sc.setColorForNameNumber()
				}
				

			}
			if(global_SelectedItem.get("name")=="Text")
			{
				selectedDrawAreaTitle=global_SelectedItem.get("clipTitle");
				setClipDrawAreaByName(global_SelectedItem.get("clipTitle"));
				scope.changeView(2);
				
				var textScope=angular.element("#add-text").scope();
				if(textScope)
				{
					textScope.switchValue=3;
					textScope.showHeadingSelection();
				}
				
			}
			if (global_SelectedItem.get("shapeType") == "clipart" || global_SelectedItem.get("shapeType")=="UploadImage") 
			{
				
				//global_SelectedItem.hasControls=false;
				//global_SelectedItem.setControlVisible("tr", false);
				//global_SelectedItem.lockRotation=true
				selectedDrawAreaTitle=global_SelectedItem.get("clipTitle");
				setClipDrawAreaByName(global_SelectedItem.get("clipTitle"));
				global_SelectedItem.lockUniScaling=artLock;
				canvas.renderAll();
				//alert("anadi")
				scope.changeView(3);
				var mainsc=angular.element(".art-wrapper").scope();
				if(mainsc)
				{
					//alert("ana")
					//mainsc.setSwitchValue();
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
						//alert(conert1Flag)
						//alert(global_SelectedItem.get("clipUpload"))
						if(global_SelectedItem.get("clipUpload")=="upload" && conert1Flag==true)
						mainsc.uploadColorFlag=false;
						else if(global_SelectedItem.get("clipUpload")=="upload")
						mainsc.uploadColorFlag=true;
						else
						mainsc.uploadColorFlag=false;
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
					angular.element(".art-selected-color").css({"backgroundColor":"#"+artSelectedColorCode})
				}

			}
			}
		}
		else
		{
				var textScope=angular.element("#add-text").scope();
				if(textScope)
				{
					textScope.switchValue=1;
					textScope.showHeadingSelection();
				}
				var artScope=angular.element(".art-wrapper").scope();
				if(artScope)
				{
					//alert(2)
					artScope.resetPage();
					//2
					
				}
				if(drawAreaGrp)
				drawAreaGrp.set({shadow: 'red 0px 0px 0px'})
		}

		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		})
		
		
	})
	canvas.observe("object:removed", function() {
		var scope = angular.element(".nav-tabs").scope();
		scope.calculateViewWiseColor();
		//scope.$apply()
		if (currentSelectedTab == 1) 
		{
			if (canvas.getDeleteHandlerValue() == true) 
			{
				var textScope=angular.element("#add-text").scope();
				textScope.deleteText();
				canvas.setDeleteHandlerValue(false);
			}
		}
		
		var artScope=angular.element(".art-wrapper").scope();
		if(artScope)
		{
			//alert(1)
			artScope.resetPage();
			
			
		}
		//updateUndoRedo();
	});
	
	canvas.observe("object:modified", function() {
		designChangeFlag=true;

	});
	canvas.observe("object:scaling", function() 
	{
		//alert("dfhs")
		global_SelectedItem = canvas.getActiveObject();
		var textScope=angular.element("#add-text").scope();
		if(global_SelectedItem)
		{
			maintainBoundry();
			var rotationObj=global_SelectedItem.get("oCoords").tl;
			var ratioX=(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
			var ratioY=(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
			var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
			var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;			// console.log(global_SelectedItem.getHeight())
			// console.log(global_SelectedItem.getHeight()*1/resCanRatio)
			// console.log("p")
			// console.log(ratioW+"\n"+ratioH+"\n"+ratioX+"\n"+ratioY)
			global_SelectedItem.set({originalRatWidth:ratioW})
			global_SelectedItem.set({originalRatHeight:ratioH})
			global_SelectedItem.set({originalRatLeft:ratioX})
			global_SelectedItem.set({originalRatTop:ratioY})
			canvas.renderAll();
		}	
		if(textScope)
		{
			var newScope = angular.element('#resizeInput').scope()
			if(newScope)
			{
				
				var nw=0;
				nw=(global_SelectedItem.getWidth()/25).toFixed(2)
				newScope.resizeValue = nw;
				textScope.resizeValue = nw;
				//sc.$apply();
				
			// var resValue=0.0;
			// //console.log(global_SelectedItem.getWidth())
			// resValue=(global_SelectedItem.getWidth())/global_SelectedItem.originalImageWidth;
			// //console.log(resValue)
			// if(resValue==0)
			// resValue=0.1;
			// var initialresizeValue=resValue
			// resValue=resValue.toFixed(2);
			// textScope.resizeValue = resValue;
			// newScope.resizeValue = textScope.resizeValue;
			// //console.log(resValue)
			// var newGlobalW=(global_SelectedItem.originalImageWidth*initialresizeValue)/resValue;
			// var newGlobalH=(global_SelectedItem.originalImageHeight*initialresizeValue)/resValue;
			 global_SelectedItem.set({"resizeValue":textScope.resizeValue});
			// canvas.renderAll();
			textScope.$apply();
			}
			//console.log(newScope.resizeValue);
		}
		if(global_SelectedItem && global_SelectedItem.get("shapeType")=="clipart" || global_SelectedItem.get("shapeType")=="UploadImage")
		{
			var mainsc=angular.element(".art-wrapper").scope();
			var nw=0;
			nw=(global_SelectedItem.getWidth()/25).toFixed(2)
			var nh=0;
			nh=(global_SelectedItem.getHeight()/25).toFixed(2)
			var sc=angular.element(".artWidthIn").scope();
			sc.artWidth=nw;
			var sc2=angular.element(".artHeightIn").scope();
			sc2.artHeight=nh;
			mainsc.artWidth=nw;
			mainsc.artHeight=nh;
			sc.$apply();
			
		}
		
	});
	canvas.observe("object:added", function() {
		designChangeFlag=true;
		var scope = angular.element(".nav-tabs").scope();
		scope.calculateViewWiseColor();
		//scope.$apply()
	});
	canvas.observe("object:rotating", function() {
		global_SelectedItem=canvas.getActiveObject();
		if (currentSelectedTab == 1) 
		{
			var textScope=angular.element("#add-text").scope();
			if(textScope)
			{
				var newScope = angular.element('#rotationAngle').scope()
				var angle=parseInt(global_SelectedItem.getAngle())
				textScope.rotationAngle = (angle > 360) ? (angle - 360) : angle;
				if(newScope)
				newScope.rotationAngle=textScope.rotationAngle;
				textScope.$apply();
			}
		}
		maintainBoundry();
		if(global_SelectedItem)
		{
			var rotationObj=global_SelectedItem.get("oCoords").tl;
			var ratioX=(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
			var ratioY=(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
			var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
			var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;
			//console.log(rotationObj)
			//console.log(ratioX)
			//console.log(ratioY)

			global_SelectedItem.set({originalRatWidth:ratioW})
			global_SelectedItem.set({originalRatHeight:ratioH})
			global_SelectedItem.set({originalRatLeft:ratioX})
			global_SelectedItem.set({originalRatTop:ratioY})
		}	
	});

	canvas.observe("mouse:up", function() {
		//drawAreaGrp.set({
			//opacity : 0
		//});
		canvas.renderAll();
		canvasArr[currentView] = JSON.stringify(canvas);
		if (global_SelectedItem) {

			// global_SelectedItem.setControlVisible("tr", true);
			// global_SelectedItem.setControlVisible("br", true);
			// global_SelectedItem.setControlVisible("bl", true);
		}
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
			updateUndoRedo()
		}	
		// global_SelectedItem.setControlVisible("tl",false);
		canvas.renderAll();
		

	});
	canvas.observe("object:moving", function() {
		
		maintainBoundry();
		global_SelectedItem=canvas.getActiveObject();
		if(global_SelectedItem)
		{
			var rotationObj=global_SelectedItem.get("oCoords").tl;
			var ratioX=(rotationObj.x*global_SelectedItem.get("originalRatLeft"))/(global_SelectedItem.get("originalRatLeft")*resCanRatio);;
			var ratioY=(rotationObj.y*global_SelectedItem.get("originalRatTop"))/(global_SelectedItem.get("originalRatTop")*resCanRatio);;
			var ratioW=(global_SelectedItem.getWidth()*global_SelectedItem.get("originalRatWidth"))/(global_SelectedItem.get("originalRatWidth")*resCanRatio);
			var ratioH=(global_SelectedItem.getHeight()*global_SelectedItem.get("originalRatHeight"))/(global_SelectedItem.get("originalRatHeight")*resCanRatio);;

			//console.log(ratioW+"\n"+ratioH+"\n"+ratioX+"\n"+ratioY)

			global_SelectedItem.set({originalRatWidth:ratioW})
			global_SelectedItem.set({originalRatHeight:ratioH})
			global_SelectedItem.set({originalRatLeft:ratioX})
			global_SelectedItem.set({originalRatTop:ratioY})
		}	
	});

});
angular.element(".tool-wrap").on(clickEventType, '#delete-object, .art-delete', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {
		canvas.remove(global_SelectedItem);
		canvas.renderAll();
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		canvasArr[currentView] = JSON.stringify(canvas);
	}

})

angular.element(".tool-wrap").on(clickEventType, '#center-object , .moveToCenter', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {
		setClipDrawAreaByName(global_SelectedItem.get("clipTitle"));
		var boundingRect = global_SelectedItem.getBoundingRect();
		var sum = boundingRect.left + (boundingRect.width) / 2;

		var cenGap = parseInt(drawAreaGrp.getLeft()) + parseInt(drawAreaGrp.getWidth()) / 2 - sum;
		var leftPos = global_SelectedItem.getLeft() + cenGap
		global_SelectedItem.set('left', leftPos*resCanRatio).setCoords();
		canvas.renderAll();
		//canvas.remove(global_SelectedItem);
		//canvas.renderAll();
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
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

})

angular.element(".tool-wrap").on(clickEventType, '#backward-object', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {
		var index = canvas.getObjects().indexOf(global_SelectedItem);
		var canvasObjects = canvas.getObjects();
		if (canvasObjects[index]) {
			canvas.sendBackwards(canvasObjects[index]);
			canvas.renderAll();
			canvas.calcOffset();

		}
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
	}

})

angular.element(".tool-wrap").on(clickEventType, '#forward-object', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {
		var index = canvas.getObjects().indexOf(global_SelectedItem);
		var canvasObjects = canvas.getObjects();
		if (canvasObjects[index]) {
			canvas.bringForward(canvasObjects[index]);
			canvas.renderAll();
			canvas.calcOffset();

		}
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
	}

})

angular.element(".tool-wrap").on(clickEventType, '#bringback-object', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {
		//alert("dsk")
		canvas.sendToBack(global_SelectedItem);
		canvas.renderAll();
		canvas.calcOffset();
		if (drawAreaGrp) {
			canvas.sendToBack(drawAreaGrp);
			canvas.renderAll();
			canvas.calcOffset();
		}

		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
	}

})

angular.element(".tool-wrap").on(clickEventType, '#bringfront-object', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) {

		canvas.bringToFront(global_SelectedItem);
		canvas.renderAll();
		canvas.calcOffset();

		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
	}

})

angular.element(".tool-wrap").on(clickEventType, '#copy-object', function() {

//alert("copy")
	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) 
	{
		angular.element("#paste-object").removeClass("disabled")
		
		copyCutObject= fabric.util.object.clone(global_SelectedItem);
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".rightClickPopup2").css({
			"display" : "none"
		})
	}

})
angular.element(".tool-wrap").on(clickEventType, '#zoom-in, #zoom-out', function() {

//alert("copy")
		if(angular.element(this).attr("id")=="zoom-in")
		{
			angular.element("#zoom-in").addClass("disabled")
			angular.element("#zoom-out").removeClass("disabled")
			var scope = angular.element(this).scope();
			scope.zoomInOut();
		}
		else
		{
			angular.element("#zoom-in").removeClass("disabled")
			angular.element("#zoom-out").addClass("disabled")
			var scope = angular.element(this).scope();
			scope.zoomInOut();
		}
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".rightClickPopup2").css({
			"display" : "none"
		})
	

})
angular.element(".tool-wrap").on(clickEventType, '#cut-object', function() {

	global_SelectedItem = canvas.getActiveObject();
	if (global_SelectedItem) 
	{
		angular.element("#paste-object").removeClass("disabled")
		copyCutObject= fabric.util.object.clone(global_SelectedItem);
		canvas.remove(global_SelectedItem);
		canvas.renderAll();
		

		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".rightClickPopup2").css({
			"display" : "none"
		})
	}

})
angular.element(".tool-wrap").on(clickEventType,'#paste-object', function(event) {

	//global_SelectedItem = canvas.getActiveObject();
	//console.log(copyCutObject)
	//alert("canvas")
	if (copyCutObject) 
	{

		//alert("canvas");
		//console.log(copyCutObject)
	//	alert(angular.element(".rightClickPopup2").position().left);
		copyCutObject.set({left:angular.element(".rightClickPopup2").position().left,top:angular.element(".rightClickPopup2").position().top})
		//alert(angular.element(".rightClickPopup2").top());
		canvas.add(copyCutObject);
		canvas.renderAll();
		copyCutObject=fabric.util.object.clone(copyCutObject);
		angular.element(".arrangeClickPopup").css({
			"display" : "none"
		});
		angular.element(".rightClickPopup").css({
			"display" : "none"
		})
		angular.element(".rightClickPopup2").css({
			"display" : "none"
		})
	}

})
/************************************End Canvas controlls and Events*********************************************/
angular.element(".nav-tabs li").bind(clickEventType, function() 
{
	//alert(clickEventType)
	var scope = angular.element(this).scope();
	scope.changeView(angular.element(this).index() + 1)

})
/****************************Swap Item Tab Events*************************************************/
angular.element(".tool-wrap").on(clickEventType, '.differentProduct,#changeProduct', function() {

	var scope = angular.element(this).scope();
	scope.openSwapItemPopUp();

})
angular.element('.tool-wrap').on(clickEventType, '.select-layer-border', function(event) {
	event.preventDefault();
	event.stopPropagation();
	var scope = angular.element(this).scope();
	angular.element(".custom-drop-down").toggle();
	
});
angular.element('.tool-wrap').on(clickEventType, '.custom-drop-down ul li', function(event) {
	var scope = angular.element(this).scope();
	scope.changeBorderStyle(event,this);
	
});
angular.element(".tool-wrap").on(clickEventType, '.select-other-design', function() {

	var scope = angular.element(this).scope();
	scope.openHoodiesBlanketPopUp();

})

angular.element(".tool-wrap").on(clickEventType, '.swapItemHoodiesPopup img.close-btn', function() {

	var scope = angular.element(this).scope();
	scope.closeHoodiesPopup();

})

angular.element(".tool-wrap").on(clickEventType, '#swapChangeProduct', function() {

	var scope = angular.element(this).scope();
	scope.changeProductView();

})
angular.element(".tool-wrap").on(clickEventType, '#swapChangeProductDefault', function() {

	var scope = angular.element(this).scope();
	scope.changeProductViewDefault();

})
angular.element(".tool-wrap").on(clickEventType, '.pCatId', function() {
	//alert("fjsdkjf")
	var scope = angular.element("#swap-text").scope();
	scope.showProductByCatId(angular.element(this));

})



angular.element(".tool-wrap").on(clickEventType, '#swapItemCategory', function() {
	//alert("fjsdkjf")
	var scope = angular.element("#swap-text").scope();
	scope.showProductByCatId('');

})


angular.element(".tool-wrap").on(clickEventType, '.swapItemPopup img.close-btn', function() {

	var scope = angular.element("#swap-text").scope();
	scope.closePopUp(angular.element(this));

})
angular.element(".tool-wrap").on(clickEventType, '.pSubCatId', function() {

	var scope = angular.element("#swap-text").scope();
	scope.showProductBySubCatId(angular.element(this));

})
angular.element(".tool-wrap").on(clickEventType, '.swapIntialInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.changeProductColor(angular.element(this));
	//alert("in")

})
angular.element(".tool-wrap").on(clickEventType, '.swapDetailInfo ul li div', function() {
	//alert("jhfjhjh")
	//var scope=angular.element(this).scope();
	//	scope.changeProductColor(angular.element(this));

})

angular.element(".tool-wrap").on('mouseenter', '.swapIntialInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.updateColorQuantity(angular.element(this));

})

angular.element(".tool-wrap").on('mouseleave', '.swapIntialInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.resetColorQuantity();

})

angular.element(".tool-wrap").on('mouseenter', '.swapDetailInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.updateColorQuantity(angular.element(this));

})

angular.element(".tool-wrap").on('mouseleave', '.swapDetailInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.resetColorQuantity();

})

angular.element(".tool-wrap").on(clickEventType, '.sProductDetail', function() {

	var scope = angular.element("#swap-text").scope();
	scope.changeSwapProductView(this)

})

angular.element(".tool-wrap").on(clickEventType, '.swapDetailInfo ul li div', function() {

	var scope = angular.element(this).scope();
	scope.changeProductColor(angular.element(this));

})
/****************************Swap Item End Events*************************************************/

/*************************ADD Name Events***************************************/
angular.element(".tool-wrap").on(clickEventType, "#addNameNumber", function() {

	var scope = angular.element(this).scope();
	scope.openAddNamePage2(angular.element(this));
})

angular.element(".tool-wrap").on(clickEventType, "#backToNamePage2", function() {

	var scope = angular.element(this).scope();
	scope.openAddNamePage2(angular.element(this));
})

angular.element(".tool-wrap").on(clickEventType, "#chooseNameColor, #chooseNumberColor", function() {

	var scope = angular.element(this).scope();
	scope.openNameColorChooser(angular.element(this));
})
angular.element(".tool-wrap").on('mouseenter', ".nameColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.showColor(this);
})
angular.element(".tool-wrap").on('mouseleave', ".nameColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.showNameColorLabel(this)
})


angular.element(".tool-wrap").on(clickEventType, ".nameColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.changeNameColor(this)
})

angular.element(".tool-wrap").on('click', ".addNameCheck,.addNumberCheck", function() {

	var scope = angular.element(this).scope();
	scope.addNameNumber(this)
})
angular.element(".tool-wrap").on(clickEventType, "#nameSide, #nameFont, #nameHeight  ", function(event) {
	//alert("anadi")
	var scope = angular.element(this).scope();
	scope.changeNameSide(this, event)
})
angular.element(".tool-wrap").on(clickEventType, "#numberSide, #numberFont, #numberHeight", function(event) {
	//alert("anadi")
	var scope = angular.element(this).scope();
	scope.changeNumberSide(this, event)
})
angular.element(".tool-wrap").on('change', "#nameSide,#numberSide", function(event) {

	var scope = angular.element(this).scope();
	scope.changeNameNumberSide(this, event)
})
angular.element(".tool-wrap").on('change', "#nameFont,#numberFont", function(event) {

	var scope = angular.element(this).scope();
	scope.changeNameNumberFont(this, event)
})
angular.element(".tool-wrap").on(clickEventType, "#nameStdPos,#numStdPos", function(event) {

	var scope = angular.element(this).scope();
	scope.setStandardPosition(this);
	//scope.$apply();
	//alert("hsdghf")
})
angular.element(".tool-wrap").on('change', "#nameHeight,#numberHeight", function(event) {

	var scope = angular.element(this).scope();
	scope.changeNameNumberHeight(this, event)
})


angular.element(".tool-wrap").on(clickEventType, "#enterNameAndNumber, #enter_names_num", function(event) {
	//alert("anadi")
	var scope = angular.element("#enterNameAndNumber").scope();
	scope.enterNameAndNumber(this, event)

})

angular.element(".tool-wrap").on(clickEventType, "#nameAndNumOnly, #nameOnly, #numOnly", function(event) {

	var scope = angular.element("#add-name").scope();
	scope.noPersonalization();
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	scope.resetNameNumberTable();
	popUp.open('nameSizeNumber');
	if (angular.element(this).attr("id") == "nameAndNumOnly") {
		nameCheck=true;
		numberCheck=true;
		nameNumPersonalization = "nameAndNumber"
		scope.addNameOnly(nameNumPersonalization);
		scope.$apply();
	} else if (angular.element(this).attr("id") == "nameOnly") {
		nameCheck=true;
		numberCheck=false;
		nameNumPersonalization = "nameOnly"
		scope.addNameOnly(nameNumPersonalization);
		scope.$apply();
	} else if (angular.element(this).attr("id") == "numOnly") {
		nameCheck=false;
		numberCheck=true;
		nameNumPersonalization = "numOnly"
		scope.addNumOnly();
		scope.$apply();
	}
	scope.updateNamePage2();
	scope.$apply();
	(nameCheck==true)?angular.element(".textbox1").removeClass("disabled"):angular.element(".textbox1").addClass("disabled");
	(numberCheck==true)?angular.element(".textbox2").removeClass("disabled"):angular.element(".textbox2").addClass("disabled");
//alert(nameCheck)
//alert(numberCheck)
})
angular.element(".tool-wrap").on('mouseenter', ".number-tb tr", function(event) {
	//alert("anadi")
	var scope = angular.element("#add-name").scope();
	scope.showDeleteIcon(this)

})
angular.element(".tool-wrap").on('mouseleave', ".number-tb tr", function(event) {
	//alert("anadi")
	var scope = angular.element("#add-name").scope();
	scope.hideDeleteIcon(this)

})
angular.element(".tool-wrap").on(clickEventType, ".number-tb tr td", function(event) {
	//alert("anadi")
	var scope = angular.element("#add-name").scope();
	scope.calculateNameAndNumber(this)

})

angular.element(".tool-wrap").on(clickEventType, "#saveNameNumberInArr", function(event) {
	//alert("anadi")
	var parScope = angular.element('.tool-wrap').scope();
	var scope = angular.element("#add-name").scope();
	angular.element('.enterNameNumberSizePopUp').css({"display":"none"})
	angular.element(".save-table-info").css({"display":"block"})
	angular.element(".saveDesignAndNameNumberTitle").text("Names & Numbers List")
	//scope.closeNameNumberSizePopUp(this)
	//var scope = angular.element('.tool-wrap').scope();
	parScope.openSaveDesignPopUp();
	scope.calculateNameAndNumber(this)

})
angular.element(".tool-wrap").on(clickEventType, ".addNameSizePopup", function(event) {
	//alert("anadi")
	var scope = angular.element("#add-name").scope();
	scope.addNameNumberRow(this)

})
angular.element(".tool-wrap").on(clickEventType, ".rowdelete", function(event) {
	//alert("anadi")
	var scope = angular.element("#add-name").scope();
	scope.deleteNameNumberRow(this)

})

angular.element(".tool-wrap").on(clickEventType, ".enterNameNumberSizePopUp img.closeNameSizePopup, .closeNameNumTable", function(event) {
	//alert("anadi")
	var inj=angular.element(".tool-wrap").injector();
	var popup=inj.get("popupManager")
	
	popup.close("addNameNumberSizeClose")

})
angular.element(".tool-wrap").on(clickEventType, ".showAddNoteSection", function(event) {
	//alert("anadi")
	var scope = angular.element(".nav-tabs").scope();
	scope.changeView(5);
	scope.$apply();

})
angular.element(".tool-wrap").on(clickEventType, ".showAddText", function(event) {
	//alert("anadi")
	var scope = angular.element(".nav-tabs").scope();
	scope.changeView(2);
	scope.$apply();

})
angular.element(".tool-wrap").on(clickEventType, ".showSwapSection", function(event) {
	//alert("anadi")
	var scope = angular.element(".nav-tabs").scope();
	var injector=angular.element(".nav-tabs").injector();
	var popUp=injector.get("popupManager")
	popUp.close("addNameNumberSizeClose")
	scope.changeView(1);
	scope.$apply();

})


/*************************End Add name Events****************************************/

/*************************************Right section and Canvas Events*******************************************************/
angular.element(".tool-wrap").on(clickEventType, '#switchProduct', function() {
	var scope = angular.element(this).scope();
	scope.switchViews(angular.element(this));
})
/*************************************END Right section and Canvas Events*******************************************************/
/***************************Add Notes************************************************/
angular.element(".tool-wrap").on(clickEventType, '#updateNote', function() {
	var scope = angular.element(this).scope();
	scope.updateNote();
	
})
angular.element(".tool-wrap").on(clickEventType, '#textNotes', function() {
	var scope = angular.element(this).scope();
	scope.noteChange();
	
})
/**************************End ADD Notes***********************************/
/************************Add Text Event***************************************/
var globalScope;
angular.element('.tool-wrap').on(clickEventType, '#nextBtn', function() {
	globalScope = angular.element("#add-text").scope();
	//console.log(globalScope);
	globalScope.addUpdateText('addText', selectedTtfPath, selectedArcValue, effectName);
});
angular.element('.tool-wrap').on(clickEventType, '.addTextUl a', function() {
	var scope = angular.element(this).scope();
	scope.showHeadingSelection(this);
});
angular.element('.tool-wrap').on(clickEventType, '.newTxtBEP', function() {
	var scope = angular.element(this).scope();
	scope.showHeadingSelection();
});
angular.element('.tool-wrap').on(clickEventType, '#updateText', function() {
	var scope = angular.element(this).scope();
	scope.addUpdateText('updateText', selectedTtfPath, selectedArcValue, effectName);
});
angular.element('.tool-wrap').on(clickEventType, '#deleteText', function() {
	var scope = angular.element(this).scope();
	scope.deleteText();
});
angular.element('.tool-wrap').on(clickEventType, '.changeFont', function() {
	var scope = angular.element(this).scope();
	scope.changeFontView();
	
});
angular.element('.tool-wrap').on(clickEventType, '.fontStyleCancelBtn,.textShapeCancelBtn,#textColorBack', function() {
	var scope = angular.element(this).scope();
	scope.fontStyleCancelBtn();
});angular.element('.tool-wrap').on(clickEventType, '.rotate', function() {
	var scope = angular.element("#add-text").scope();
	scope.rotateText(scope);
});
angular.element('.tool-wrap').on('change', '#fontCategoryDropDown', function() {
	normalSelectedIndx=selectedFontCategoryIndex = document.getElementById('fontCategoryDropDown').selectedIndex;
	var indexValue = document.getElementById('fontCategoryDropDown').selectedIndex;
	var fontCatId = angular.element(this).children()[indexValue].value;

	var scope = angular.element(this).scope();
	scope.getCategoryFontData(fontCatId);
});
angular.element('.tool-wrap').on(clickEventType, '.fontContainer li', function() {

	var scope = angular.element(this).scope();
	selectedTtfPath = angular.element(this).attr('ttfPath');
	changeFontImageUrl = angular.element(this).attr('imagePath');
	scope.$parent.$parent.changeFontImageUrl = changeFontImageUrl;
	scope.addUpdateText('updateText', selectedTtfPath, selectedArcValue, effectName);
	scope.$apply();
});
angular.element('.tool-wrap').on(clickEventType, '.fontBottomDescription ul li a', function() {

	normalSelectedIndx=selectedFontCategoryIndex = angular.element(this).parent().index();
	angular.element('#fontCategoryDropDown').prop('selectedIndex', selectedFontCategoryIndex);

	var fontCatId = angular.element(this).attr('value');
	var scope = angular.element(this).scope();
	scope.getCategoryFontData(fontCatId);
	//document.getElementById('fontCategoryDropDown').selectedIndex=4;

});
angular.element('.tool-wrap').on(clickEventType, '.textShape', function() {

	var scope = angular.element(this).scope();
	scope.showTextShape();

});
angular.element('.tool-wrap').on(clickEventType, '.textShapeContainer ul li', function() {

	var scope = angular.element(this).scope();
	scope.changeTextShape(angular.element(this).index());

});
angular.element('.tool-wrap').on(clickEventType, '#textColor,#outlineColor', function() {
	
	var scope = angular.element(this).scope();
	scope.showTextColor(this);

});
angular.element('.tool-wrap').on(clickEventType, '#textColorOptions .textColorLi', function() {

	var scope = angular.element(this).scope();
	if(scope.textColorChooser=='textColor')
	scope.changeFontColor(angular.element(this).children()[0]);
	else
	scope.changeOutlineColor(angular.element(this).children()[0]);
});
angular.element('.tool-wrap').on(clickEventType, '.stroke-selection', function(event) {

	var scope = angular.element(this).scope();
	scope.noOutlineColor(event);
});
angular.element('.tool-wrap').on(clickEventType, '#textAlignArea a', function() {

	var scope = angular.element(this).scope();
	scope.setAlignment(angular.element(this));
});
angular.element('.tool-wrap').on('change', '#textOutlineDropDown', function() {

	var index = angular.element(this).prop('selectedIndex');
	outlineIndex=index;
	var selectedChild = angular.element(this).children()[index];
	
	var scope = angular.element(this).scope();
	scope.setTextOutline(selectedChild);
});
angular.element('.tool-wrap').on(clickEventType,'#resizeBtn',function(){
	
	var scope = angular.element(this).scope();
	scope.setResize();
	
});
angular.element('.tool-wrap').on('change', '#shapeSettingDropDown', function() {

	var index = angular.element(this).prop('selectedIndex');
	var selectedChild = angular.element(this).children()[index];
	
	var scope = angular.element(this).scope();
	scope.setShapeSetting(selectedChild);
});

angular.element(".tool-wrap").on('mouseleave', "#textColorOptions li.textColorLi div", function() {

//alert("dfjk")
	var scope = angular.element(this).scope();
	scope.showColorLabel(this);
})
angular.element(".tool-wrap").on('mouseenter', "#textColorOptions li.textColorLi div", function() {

	var scope = angular.element(this).scope();
	scope.showTextColorLabel(this)
})
/************************End of Add Text Event***************************************/
/************************Layering************************************************************/

angular.element('.tool-wrap').on(clickEventType, '.product-layer', function() {

	var scope = angular.element(this).scope();
	scope.setLayerIndex(angular.element(this));
});

angular.element('.tool-wrap').on(clickEventType, '.product-layer-color ul li div', function() {

	var scope = angular.element(this).scope();
	scope.changeLayerColor(angular.element(this));
});
/***********************************EndLayering*************************************************/
/*******************************Add Art**************************************************/


angular.element('.tool-wrap').on(clickEventType, '#categoryArt li', function() {

	var scope = angular.element(this).scope();
	scope.loadSubCategory(angular.element(this));
});

angular.element('.tool-wrap').on(clickEventType, '.mainCatTitle', function() {

	var scope = angular.element(this).scope();
	scope.loadSubCategory('');
});

angular.element('.tool-wrap').on(clickEventType, '.searchBtn', function() {

	var scope = angular.element(this).scope();
	scope.searchCliparts(this);
});
angular.element('.tool-wrap').on(clickEventType, '.image-effect-holder div', function() {

	var scope = angular.element(this).scope();
	scope.addEffetsUploadImage(this);
});
angular.element('.tool-wrap').on(clickEventType, '.addArtNav ul li a, .upload-selection', function() {

	var scope = angular.element(this).scope();
	scope.showPageAccordingToTab(this);
});

angular.element('.tool-wrap').on(clickEventType, '#subCategoryArt a', function() {

	var scope = angular.element(this).scope();
	scope.loadClipart(this);
});
angular.element('.tool-wrap').on(clickEventType, '#subCategoryArt a', function() {

	var scope = angular.element(this).scope();
	scope.loadClipart(this);
});
angular.element('.tool-wrap').on(clickEventType, '.edit-color-holder a', function() {

	uploadColorEdit=true;
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.open("uploadOpen2");
});
angular.element('.tool-wrap').on(clickEventType, '.clipart-container div.inner-container a', function() {

	var scope = angular.element(this).scope();
	scope.setClipArtData(this);
});
angular.element('.tool-wrap').on('mouseenter', '.clipart-container div.inner-container a', function() {

	angular.element(this).css({"border":"2px solid black"})
});
angular.element('.tool-wrap').on('mouseleave', '.clipart-container div.inner-container a', function() {
	angular.element('.clipart-container div.inner-container a').css({"border":"2px solid #ffffff"})
	
});

angular.element('.tool-wrap').on('click', '.convert1Color', function() {
	
	var scope = angular.element(this).scope();
	scope.convert1Color(this);
});
angular.element('.tool-wrap').on(clickEventType, '.flip-flop-controls a', function() {

var Get_obj=canvas.getActiveObject();
	if(Get_obj)
	{
		if(angular.element(this).attr("class")=="vertical-flip")
		{
			//alert(Get_obj.get('flipY'))
			if (Get_obj.get('flipY') == false) 
			{
			Get_obj.flipY = true;
			canvas.renderAll();
			} 
			else 
			{
				Get_obj.flipY = false;
				canvas.renderAll();
			}
		}
		else
		{
			if (Get_obj.get('flipX') == false) 
			{
			Get_obj.flipX = true;
			canvas.renderAll();
			}
			 else 
			{
				Get_obj.flipX = false;
				canvas.renderAll();
			}	
		}
	}
});

angular.element('.tool-wrap').on(clickEventType, '.mainArtCategory, .browse-selection', function() {

	var scope = angular.element('.art-wrapper').scope();
	scope.switchValue = '1';
	scope.errorFlag=true;
	artResetValue=1;
	scope.$apply();
	//alert("ana")scaling
	
});

angular.element(".tool-wrap").on('mouseenter', ".artColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.showArtColor(this)
})

angular.element(".tool-wrap").on('mouseleave', ".artColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.showArtColorLabel(this)
})
angular.element(".tool-wrap").on(clickEventType, ".artColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.changeArtColor(this)
})

angular.element(".tool-wrap").on(clickEventType, "#artBackPage", function() {

	var scope = angular.element(this).scope();
	scope.backPrevious(this)
})
angular.element(".tool-wrap").on(clickEventType, "#addUploadedImage", function() {

	var scope = angular.element(this).scope();
	scope.addUploadedImageOnCanvas(this)
})

angular.element(".tool-wrap").on('mouseenter', ".uploadColorUl li div", function() {

	var sc=angular.element('.tool-wrap').scope();
	sc.uploadColorLabel='Color:'+angular.element(this).attr("ctitle");
	sc.$apply();
})

angular.element(".tool-wrap").on('mouseleave', ".uploadColorUl li div", function() {

	var sc=angular.element('.tool-wrap').scope();
	sc.uploadColorLabel='Select Image Color(s):';
	sc.$apply();
})
angular.element(".tool-wrap").on(clickEventType, ".uploadColorUl li div", function() {

	var scope = angular.element(this).scope();
	scope.selectAndDeselectImageColor(this)
})
angular.element('.tool-wrap').on(clickEventType, '.art-choose-color', function() {

	var scope = angular.element('.art-wrapper').scope();
	scope.artEditFlag=false;
	scope.artEditFlag1=false;
	scope.artEditFlag2=true;
	//alert(artColorsArr.length)
	angular.forEach(artColorsArr,function(ob,i)
	{
		if(clipArtColors.colors[i].title==artSelectedColorTitle)
		{
			ob.colorSelected=true
		}
		else
		ob.colorSelected=false
		ob.$apply();
		
	})
	scope.$apply();
	//alert("ana")scaling
	
});

angular.element('.tool-wrap').on('click', '.art-lock', function() {
	global_SelectedItem=canvas.getActiveObject();
	//alert(angular.element(this).attr("checked"))
	if(global_SelectedItem && global_SelectedItem.get("shapeType")=="clipart" ||global_SelectedItem.get("shapeType")=="UploadImage")
	if(global_SelectedItem.lockUniScaling==true)
	{
		global_SelectedItem.lockUniScaling=false;
		canvas.renderAll()
		artLock=false;
	}
	else
	{
		global_SelectedItem.lockUniScaling=true;
		canvas.renderAll()
		artLock=true;
	}
	
});

angular.element('.tool-wrap').on(clickEventType, '#resizeArt', function() {
	global_SelectedItem=canvas.getActiveObject();
	var mainsc=angular.element(".art-wrapper").scope();
	var inj=angular.element(".art-wrapper").injector();
	var popup=inj.get("popupManager")
	var sc=angular.element(".artWidthIn").scope();
	var sc2=angular.element(".artHeightIn").scope();
	var pat=/^\d+(\.{0,1}\d{0,6})$/;
	//alert(pat.test(sc.artWidth));
	//pat.test(sc2.artHeight));
	
	//console.log(sc)
	//alert(sc.artWidth)
	//alert(mainsc.artWidth)	
	if(global_SelectedItem  )
	{
		if(pat.test(sc.artWidth) && pat.test(sc2.artHeight))
		{
			if(artLock)
			{
				
				if(mainsc.artWidth!=sc.artWidth)
				{
					var nw=parseFloat(sc.artWidth);
					var nh=parseFloat(((mainsc.artHeight*nw)/mainsc.artWidth)*25);
					nw=nw*25;
					if(nw>drawAreaGrp.getWidth())
					{
						nw=parseFloat(mainsc.artWidth)*25;
						nh=parseFloat((mainsc.artHeight))*25;
						alert("You reached Maximum width limit");
					}
	
				}
				else if(mainsc.artHeight!=sc2.artHeight)
				{
					var nh=parseFloat(sc.artHeight);
					var nw=parseFloat(((mainsc.artWidth*nh)/mainsc.artHeight)*25);
					nh=nh*25;
					if(nh>drawAreaGrp.getHeight())
					{
						nw=parseFloat(mainsc.artWidth)*25;
						nh=parseFloat((mainsc.artHeight))*25;
						alert("You reached Maximum height limit");
					}
				}
				else
				{
					var nw=parseFloat(sc.artWidth)*25;
					var nh=parseFloat(sc2.artHeight)*25;
					if(nw>drawAreaGrp.getWidth())
					{
						nw=parseFloat(mainsc.artWidth)*25;
						alert("You reached Maximum width limit");
					}
					if(nh>drawAreaGrp.getHeight())
					{
						nh=parseFloat((mainsc.artHeight))*25;
						alert("You reached Maximum height limit");
					}
				}
				
				
			}
			else
			{
				var nw=parseFloat(sc.artWidth)*25;
				var nh=parseFloat(sc2.artHeight)*25;
				if(nw>drawAreaGrp.getWidth())
				{
					nw=parseFloat(mainsc.artWidth)*25;
					alert("You reached Maximum width limit");
				}
				if(nh>drawAreaGrp.getHeight())
				{
					nh=parseFloat((mainsc.artHeight))*25;
					alert("You reached Maximum height limit");
				}
			}
			if(nw<1)
			nw=25;
			if(nh<1)
			nh=25;
			scaleRatioFlag=false;
			//alert(nw)
			//alert(nh)
			scaleRatioWidth=nw;
			scaleRatioHeight=nh;
			
			global_SelectedItem.set({width:scaleRatioWidth,height:scaleRatioHeight});
			global_SelectedItem.setCoords();
			canvas.renderAll()
			maintainBoundry();
			setTimeout(function()
			{
				var mainsc=angular.element(".art-wrapper").scope();
				var sc=angular.element(".artWidthIn").scope();
				var sc2=angular.element(".artHeightIn").scope();
				sc.artWidth=(nw/25).toFixed(2);
				sc2.artHeight=(nh/25).toFixed(2);
				mainsc.artWidth=(nw/25).toFixed(2);
				mainsc.artHeight=(nh/25).toFixed(2);
				sc.$apply();
				sc2.$apply();
				mainsc.$apply();
			},200)
			//alert("ana")
		}
		else
		{
			var rootSc=angular.element(".tool-wrap").scope();
			if(!(pat.test(sc.artWidth)))
			{
				rootSc.errorWidth=true;
				///mainsc.errorHeight=false;
				rootSc.$apply()
				popup.open("artErrorOpen");
				//alert("Please Enter Valid Numeric Width Value")
			}
			else if(!(pat.test(sc2.artHeight)))
			{
				rootSc.errorWidth=false;
				//mainsc.errorHeight=true;
				rootSc.$apply()
				popup.open("artErrorOpen");
				///alert("Please Enter Valid Numeric Height Value")
			}
		}
		
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
	
			
});
angular.element('.tool-wrap').on('keypress', '.artHeightIn, .artWidthIn, .resizeInput', function(e) {
	if (window.event) 
	{
		var charCode = window.event.keyCode;
	} 
	else if (e) 
	{
		var charCode = e.which;
	} 
	else 
	{
		return true;
	}
	//alert(charCode)
	if (charCode == 8) 
	{
		return true
	}
	if(charCode==46)
	{
		return true
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	
	return true;
});
/*******************************End Add Art*********************************************************/
/***************************Root Scope Events***************************************/

angular.element('.tool-wrap').on(clickEventType, '.socialShare span', function() {
	var scope = angular.element(".nav-tabs").scope();
	scope.globalShareInSocialSites(this);
});
angular.element('.tool-wrap').on(clickEventType, '#noPersonalizations', function() {
	var scope = angular.element("#add-name").scope();
	scope.noPersonalization();
});

angular.element('.tool-wrap').on(clickEventType, '.instruct-section a.showText, a.showArt', function() {
	var scope = angular.element(".nav-tabs").scope();
	var injector=angular.element(".nav-tabs").injector();
	var popUp=injector.get("popupManager")
	popUp.close("getPrice2Close");
	if(angular.element(this).attr("class")=="showText")
	{
		scope.changeView(2);
	}
	else
	{
		scope.changeView(3);
	}
	
	scope.$apply();
	
});
angular.element('.tool-wrap').on(clickEventType, '#zoomInOut', function() {
	var scope = angular.element(this).scope();
	scope.zoomInOut();
});

angular.element(".tool-wrap").on(clickEventType, ".artResizeErrorPopUp a.addText", function(event) {
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("artErrorClose");
	//alert("anadi")
	//console.log(injector)

})
angular.element(".tool-wrap").on(clickEventType, ".saveYourDesignPopUp img,.closeSavePopup ", function(event) {
	angular.element(".saveDesignAndNameNumberTitle").text("Save Design/Send it to Friends")
	angular.element(".save-table-info").css({"display":"none"})
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("saveClose");
	//console.log(injector)

})
angular.element(".tool-wrap").on(clickEventType, ".saveYourDesignPopUp2 img", function(event) {
	angular.element(".saveDesignAndNameNumberTitle").text("Save Design/Send it to Friends")
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("save2Close");
	//console.log(injector)

})
angular.element('.tool-wrap').on('keypress', '.saveDesignName', function(e) {
	if (window.event) {
		var charCode = window.event.keyCode;
	} else if (e) {
		var charCode = e.which;
	} else {
		return true;
	}
	if (charCode == 8) {
		return true
	}
	// alert(charCode)
	if (charCode >= 48 && (charCode < 57)) {
		return true;
	}
	if ((charCode >= 65 || charCode <= 90) && (charCode >= 97 || charCode <= 122)) {
		return true;
	}
	return false;
});

angular.element(".tool-wrap").on(clickEventType, ".getPricePopUp2 a.openSizePopup", function(event) {
	angular.element(".getPricePopUp2").css({
		"display" : "none"
	});
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.open("getPriceOpen");
	//console.log(injector)

})

angular.element(".tool-wrap").on(clickEventType, ".buy-now", function(event) {
	var scope = angular.element(this).scope();
	angular.element(".getPricePopUp2").css({
		"display" : "none"
	});
	if (loginType == "user") {
		angular.element(".buyDesignName").removeClass("errorInputBlock");
		angular.element(".buyUserId").removeClass("errorInputBlock");
		angular.element(".buyDesignName").val('');
		angular.element(".buyUserId").val('');
		scope.error1Flag = false;
		scope.error2Flag = false;
		scope.error3Flag = false;
		angular.element(".selectCheck").attr("checked",true);
		document.getElementById("buyreRadio").checked = true;
		if (saveDesignName) 
		{

			scope.saveDesignName = saveDesignName;
			//alert(saveEmailId)
			scope.designcheck = true;
			scope.nonDesigncheck = false;
			angular.element(".buyUserId").val(saveEmailId);
		} 
		else 
		{
			scope.saveDesignName = saveDesignName;
			angular.element(".buyUserId").val('');
			scope.designcheck = false;
			scope.nonDesigncheck = true;
		}
		scope.$apply();
		var injector = angular.element(this).injector()
		var popUp = injector.get("popupManager");
		popUp.open("priceOpen");
		//console.log(injector)
	} else
		scope.sendDataToPhp();

})



angular.element(".tool-wrap").on(clickEventType, ".openSavePopUp, .save-Continue", function(event) {
	var scope = angular.element('.tool-wrap').scope();
	scope.openSaveDesignPopUp();
	
		

})
angular.element(".tool-wrap").on(clickEventType, "#printThis", function(event) {
	var scope = angular.element('.tool-wrap').scope();
	scope.printPopUp()
	
		

})
angular.element(".tool-wrap").on(clickEventType, ".buy-product", function(event) {
	if(loginType!="admin")
	{
		var scope = angular.element(this).scope();
		//alert(productQtyLabel)
		if(productQtyLabel)
		{
			
			scope.openGetPrice2PopUp();
		}
		else
		{
			scope.zipWarning = false;
			scope.qtyWarning = false;
			scope.minQtyWarning=false;
			scope.productName = selectedProductName;
			//scope.$apply();
			scope.resetSizeQty();
			scope.productQtyLabel = '';
			scope.productColor = "Color:" + " " + selectedColorName;
			scope.$apply();
			canvas.discardActiveObject();
			canvas.renderAll();
			previewArr[currentView] = canvas.toDataURL();
			angular.element("#frontPreviewThumb").attr("src", frontCanvas.toDataURL())
			angular.element("#frontCanvasThumb").attr("src", previewArr[0])
			var injector = angular.element(this).injector()
			var popUp = injector.get("popupManager");
			popUp.open("getPriceOpen");
		}
	}
	
});
angular.element(".tool-wrap").on(clickEventType, ".getPriceOpenPopUp", function(event) {
	if(loginType!="admin")
	{
		var scope = angular.element(this).scope();
		//alert(selectedProductName)
		scope.zipWarning = false;
		scope.qtyWarning = false;
		scope.minQtyWarning=false;
		scope.productName = selectedProductName;
		
		scope.resetSizeQty();
		scope.productQtyLabel = '';
		scope.productColor = "Color:" + " " + selectedColorName;
		scope.$apply();
		canvas.discardActiveObject();
		for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
		{
			maintainDrawAreaArr[i].set({opacity:0});
			canvas.renderAll();
		}
		canvas.renderAll();
		previewArr[currentView] = canvas.toDataURL();
		angular.element("#frontPreviewThumb").attr("src", frontCanvas.toDataURL())
		angular.element("#frontCanvasThumb").attr("src", previewArr[0])
		var injector = angular.element(this).injector()
		var popUp = injector.get("popupManager");
		popUp.open("getPriceOpen");
		for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
		{
			maintainDrawAreaArr[i].set({opacity:1});
			canvas.renderAll();
		}
	}
	//console.log(injector)

})
angular.element(".tool-wrap").on(clickEventType, ".getPricePopUp img.closeNameSizePopup,#getPriceCancel", function(event) {
	//alert("fkj")
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("getPriceClose");
	//console.log(injector)

})
angular.element(".tool-wrap").on(clickEventType, ".save-category-popup img.closeNameSizePopup", function(event) {
	//alert("fkj")
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("selectCat");
	//console.log(injector)

})
angular.element(".tool-wrap").on(clickEventType, ".save-category-popup a.addText", function(event) {
	
	
	var scope = angular.element(this).scope();
	scope.adminSaveAndSend();

})

angular.element(".tool-wrap").on('click', ".greekCheck", function(event) {
	
	
	var scope = angular.element(this).scope();
	scope.selectGreekFont();

})
angular.element(".tool-wrap").on(clickEventType, ".getPricePopUp2 img.closeNameSizePopup,#getPriceCancel", function(event) {
	//alert("fkj")
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("getPrice2Close");
	//console.log(injector)

})

angular.element(".tool-wrap").on(clickEventType, ".buyNowPopUp img.closeNameSizePopup, .closeBuyNowPopup", function(event) {
	//alert("fkj")
	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close("priceClose");
	//console.log(injector)

})



angular.element('.tool-wrap').on(clickEventType, '#saveDesignToAccount', function() {

	var scope = angular.element(this).scope();
	scope.formValidation(angular.element("#saveDesignToAccount").text());

});

angular.element('.tool-wrap').on(clickEventType, '#printBtn', function() {

	var scope = angular.element(this).scope();
	scope.takePrintProof();

});

angular.element('.tool-wrap').on(clickEventType, '.print-proof-page img.closePrint', function() {

	var injector = angular.element(this).injector()
	var popUp = injector.get("popupManager");
	popUp.close('printPopUp')

});
angular.element('.tool-wrap').on(clickEventType, '#sendEmailToFriend', function() {

	angular.element(".saveDesignAndNameNumberTitle").text("Save Design/Send it to Friends")
	var scope = angular.element(this).scope();
	scope.shareDesignToFriend();

});
angular.element(".tool-wrap").on(clickEventType, ".continue-shipping", function(event) {
	
	var scope = angular.element(this).scope();
	scope.formValidationPrice();

})

angular.element('.tool-wrap').on(clickEventType, '#reRadio, #newRadio', function() {
	var scope = angular.element(this).scope();
	if (angular.element(this).attr("id") == "reRadio") {
		scope.saveDesignName = saveDesignName;
		//scope.designcheck=true;
		scope.nonDesigncheck = false;
		scope.saveEmailId = saveEmailId;

	} else if (angular.element(this).attr("id") == "newRadio") {

		scope.saveDesignName = saveDesignName;
		//scope.designcheck=false;
		scope.nonDesigncheck = true;

		angular.element(".saveUserId").val(saveEmailId);
	}
	scope.$apply();

});

angular.element('.tool-wrap').on(clickEventType, '#buyreRadio, #buynewRadio', function() {
	var scope = angular.element(this).scope();
	if (angular.element(this).attr("id") == "buyreRadio") {
		scope.saveDesignName = saveDesignName;
		//scope.designcheck=true;
		scope.nonDesigncheck = false;
		scope.saveEmailId = saveEmailId;

	} else if (angular.element(this).attr("id") == "buynewRadio") {

		scope.saveDesignName = saveDesignName;
		//scope.designcheck=false;
		scope.nonDesigncheck = true;

		angular.element(".buyUserId").val(saveEmailId);
	}
	scope.$apply();

});
angular.element('.tool-wrap').on(clickEventType, '#getPriceContinue', function() {
	var scope = angular.element(this).scope();
	scope.qtyAndZipValidation();
});
angular.element('.tool-wrap').on(clickEventType, '#viewPriceSummary', function() {
	var scope = angular.element(this).scope();
	scope.openGetPrice2PopUp();

});

angular.element('.tool-wrap').on('keypress', '.item-size input, #rotationAngle', function(e) {
	if (window.event) {
		var charCode = window.event.keyCode;
	} else if (e) {
		var charCode = e.which;
	} else {
		return true;
	}
	if (charCode == 8) {
		return true
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
});

angular.element('.tool-wrap').on('keypress', '.tableHolder input.textbox2', function(e) {
	if (window.event) {
		var charCode = window.event.keyCode;
	} else if (e) {
		var charCode = e.which;
	} else {
		return true;
	}
	if (charCode == 8) {
		return true
	}
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
});
/***************************End Root Scope Events**************************************/
function getHex(rgb) {
	//alert(rgb);
	rgb = rgb.split(',');
	red = rgb[0].split('(');
	red = red[1];
	green = rgb[1];
	blue = rgb[2].split(')');
	blue = blue[0];
}
function hex2Rgb(value)
{
	//alert(value)
	value = (value > 0xFFFFFF) ? 0xFFFFFF : value;
	value = (value < 0x000000) ? 0x000000 : value;		

	var red = ((value>>16)&0xFF);
	var green = ((value>>8)&0xFF);
	var blue = ((value)&0xFF);
	return [red,green,blue];
}
function maintainBoundry() {
	var getobj = canvas.getActiveObject();
	if (getobj && getobj.get("shapeType")!="drawArea") 
	{

		getobj.setCoords();

		var boundrect = getobj.getBoundingRect()
		var withinleft = drawAreaGrp.getLeft();
		var withinwidth = drawAreaGrp.getWidth();
		var collisionPosleft = boundrect.left;
		var collisionWidth = boundrect.width;
		var newLeft = withinleft - collisionPosleft;
		var newRight = collisionPosleft + collisionWidth - withinleft - withinwidth;

		if (newLeft > 0) 
		{
			//console.log("left")
			var left = getobj.getLeft() + newLeft;
			getobj.set({
				left : left
			});
			//getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();

		} 
		else if (newRight > 0) 
		{
			//console.log("right")
			var left = getobj.getLeft() - newRight;
			getobj.set({
				left : left
			});
			//getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		} 
		else 
		{
			//var left=Math.max(rect2.getLeft()-collisionPosleft,rect2.getLeft());
			//rect2.set({left:left});
			//getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}

		var withintop = drawAreaGrp.getTop();
		var withinheight = drawAreaGrp.getHeight();
		var collisionPostop = boundrect.top;
		var collisionHeight = boundrect.height;
		var newTop = withintop - collisionPostop;
		//console.log("top:"+newTop)
		var newBottom = collisionPostop + collisionHeight - withintop - withinheight;
		//console.log(newBottom);
		if (newTop > 0) {
			console.log("top")
			var top = getobj.getTop() + newTop;
			getobj.set({
				top : top
			});
			//getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		} else if (newBottom > 0) {
			console.log("bottom")
			var top = getobj.getTop() - newBottom;
			getobj.set({
				top : top
			});
			//getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}

		var newWidth = collisionWidth - withinwidth;
		var newHeight = collisionHeight - withinheight;
		console.log(newHeight)
		if (newWidth > 0) {
			console.log("width")
			//console.log("initial"+getobj.getTop())
			var width = getobj.getWidth() - newWidth;
			var height = getobj.getHeight() - newWidth;
			getobj.lockScalingY = true;
			getobj.lockScalingX = true;
			canvas.renderAll();
			var ratioHeight = (width * ORIGINAL_HEIGHT) / ORIGINAL_WIDTH;
			getobj.set({
				width : width,
				height : ratioHeight
			});
			getobj.set({
				scaleX : 1,
				scaleY : 1
			})
			getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();

		}

		if (newHeight > 0) {
			//console.log("height")
			console.log(getobj.getHeight())
			var height = getobj.getHeight() - newHeight;
			getobj.lockScalingY = true;
			getobj.lockScalingX = true;
			canvas.renderAll();
			var ratioWidth = (height * ORIGINAL_WIDTH) / ORIGINAL_HEIGHT;
			//console.log(ratioWidth)
			//console.log(height)
			getobj.set({
				width : ratioWidth,
				height : height
			});
			getobj.set({
				scaleX : 1,
				scaleY : 1
			})
			getobj.setCoords();
			canvas.renderAll();
			canvas.calcOffset();
		}

	}
}

	window.onbeforeunload = function(e) 
	{
	
		//return true ? "Do you really want to close?" : null;
	}
function maintainRatio()
{
	//console.log(window.innerWidth)
	var sc=angular.element('.tool-wrap').scope();
	//alert("resize")
	if(window.innerWidth>767 && window.innerWidth<960)
	{
		//if(resCanRatio==0.81)
		//resCanRatio
		mobileMode=false;
		resCanRatio=0.62;
		//alert(resCanRatio)
		if(resCanRatio==0.62 || resCanRatio==((0.62/0.81)))
		{
			canWidth=546*resCanRatio;
			canHeight=493*resCanRatio;
	
			angular.element(".canvas-holder").css({"width":565*resCanRatio+'px',"height":492*resCanRatio+'px'})
			angular.element(".inner-canvas-holder").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".frontImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".backImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
		}
		if(sc)
		sc.maintainTabLandAndPotrait()
		
	}
	else if(window.innerWidth>1023 && window.innerWidth<1100)
	{
		resCanRatio=0.78;
		mobileMode=false;
		//alert(resCanRatio)
		if(resCanRatio==0.78 || resCanRatio==(0.78/0.62))
		{
			canWidth=546*resCanRatio;
			canHeight=493*resCanRatio;
	
			angular.element(".canvas-holder").css({"width":565*resCanRatio+'px',"height":492*resCanRatio+'px'})
			angular.element(".inner-canvas-holder").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".frontImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".backImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
		}
		if(sc)
		sc.maintainTabLandAndPotrait()
	}
	else if(window.innerWidth<767)
	{
		//if(resCanRatio==0.81)
		//resCanRatio
		mobileMode=true;
		//alert(mobileMode)
		resCanRatio=0.53;
		///alert(resCanRatio)
		if(resCanRatio==0.53 || resCanRatio==((0.62/0.81)))
		{
			canWidth=546*resCanRatio;
			canHeight=493*resCanRatio;
	
			angular.element(".canvas-holder").css({"width":565*resCanRatio+'px',"height":492*resCanRatio+'px'})
			angular.element(".inner-canvas-holder").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".frontImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
			angular.element(".backImage").css({"width":546*resCanRatio+'px',"height":493*resCanRatio+'px'})
		}
		if(sc)
		sc.maintainTabLandAndPotrait()
	}
	else
	{
		//(resCanRatio)
		mobileMode=false;
		resCanRatio=1;
		canWidth=546;
		canHeight=493;
		angular.element(".canvas-holder").css({"width":"565px","height":"492px"})
		angular.element(".inner-canvas-holder").css({"width":"546px","height":"493px"})
		angular.element(".frontImage").css({"width":"546px","height":"493px"})
		angular.element(".backImage").css({"width":"546px","height":"493px"})
		if(sc)
		sc.maintainTabLandAndPotrait()
	}
}	
function setClipDrawAreaByName(clipTitle)
{
	angular.forEach(maintainDrawAreaArr,function(obj){
		if(obj.get("clipTitle")==clipTitle)
		{
		if(drawAreaGrp)
		drawAreaGrp.set({shadow: 'red 0px 0px 0px'})
		drawAreaGrp=obj;
		drawAreaGrp.set({shadow: 'red 0px 0px 2px'})
		}
	})
}
function canvas_BackgroundColor(event)
{
	
}
