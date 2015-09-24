rootApp.service('webServices', ['popupManager','$location',
function(popupManager,$location) {
	this.customServerCall = function(http, url, obj, type, scope, nameNumPer,saveType) {
		http({
			method : 'POST',
			data : obj,
			url : url,
		}).success(function(data, status, headers, config) {
			
			if (type == "initArt") {
				initArtData=data;				
				scope.initArtData = data;
				scope.loadClipColors();
				popupManager.preloaderClose();
				//scope.artCatArr = scope.initArtData.clipArtCategories.category;
			}
			if(type=="initArtSubCat")
			{
				subCategoryArt=data;
				scope.subCategoryArt=data;
				popupManager.preloaderClose();
				
			}
			if(type=="catselect")
			{
				selectCat=data;
				
				scope.selectCat=selectCat;
				scope.openSelectCatPopUp();
			}
			if(type=="testpdf")
			{
				
			}
			if(type=="clipColors")
			{
				clipArtColors=data;
				if(clipArtColors.colors[0])
				{
				artSelectedColorPrice=clipArtColors.colors[0].price;
				artSelectedColorTitle=clipArtColors.colors[0].title;
				
				
				artSelectedColorCode=clipArtColors.colors[0].code;
				scope.artSelectedColorTitle=artSelectedColorTitle;
				scope.artSelectedColorCode=artSelectedColorCode;
				scope.clipArtColors=clipArtColors;
					setTimeout(function(){
				scope.setSwitchValue();
				},100)
				}
			}
			if(type=="clipart")
			{
				scope.clipartFlag=false;
				clipartData=data;
				scope.clipartData=data;
				popupManager.preloaderClose();
			}
			if(type=="clipartSearch")
			{
				clipartData=data;
				scope.clipartData=data;
				scope.clipartFlag=false;
				scope.artSubCatFlag=false;
				
				if(data.cliparts.clipart.length)
				{
					scope.errorFlag=true;
					
				}
				else
				{
					//alert("jsd")
					scope.errorFlag=false;
				}
				scope.switchValue = '2';
				artResetValue=2;
				popupManager.preloaderClose();
				
			}
			if (type == "initFont") {

				scope.initFontData = data;
				initFontData=data;
				scope.textshapeArr = scope.initFontData.root.textShapes.textShape;
				//alert(JSON.stringify(scope.textshapeArr));
				scope.currentShapeSettingArr = scope.textshapeArr[0].shapeSetting;
				scope.textColorArr = scope.initFontData.root.colors.color;
				for(var i=0;i<scope.textColorArr.length;i++)
				{
					if(scope.textColorArr[i].isDefault == '1')
					{
						textColorTitle=scope.textColorTitle=scope.textColorArr[i].name; 
						textColor=scope.color = scope.textColorArr[i].code; 
						textColorPrice=scope.textColorPrice = scope.textColorArr[i].price;
					}
				}
				scope.textOutlineArr = scope.initFontData.root.textOutline;
				textOutlineArr=scope.initFontData.root.textOutline;
				scope.effectName = scope.initFontData.root.textShapes.textShape[0].name;
				
				scope.fontCategoryArr = scope.initFontData.root.categories.category;
				for (var i = 0; i < scope.fontCategoryArr.length; i++) 
				{
					if (scope.fontCategoryArr[i].isDefault == '1') 
					{
						selectedFontCategoryId = scope.fontCategoryArr[i].fontsCategoryId;
						selectedFontCategoryIndex = i;
						normalSelectedIndx=i;
						
					}
					if(scope.fontCategoryArr[i].isGreek==1)
					{
						greekSelectedIndx=i;
					}
				}
				
				scope.getFontData(selectedFontCategoryId);
				
				
				
			}
			if (type == "fontCategoryData") 
			{

			}
			if (type == "fontData") {
				fontDataArr = data.fonts.font;
				scope.fontDataArr = data.fonts.font;
				for (var j = 0; j < scope.fontDataArr.length; j++) {
					if (scope.fontDataArr[j].isDefault == '1') {
						changeFontImageUrl = scope.fontDataArr[j].imagePath;
						selectedTtfPath = scope.fontDataArr[j].ttf;
						scope.changeFontImageUrl = changeFontImageUrl;
						
						normalFontTTF=selectedTtfPath;
						normalFontUrl=changeFontImageUrl;
						
					}
				}
				scope.showNextBtn = true;
				setTimeout(function(){
			scope.showHeadingSelection();
			},100)
				popupManager.preloaderClose()
			}
			if(type=="fontCategoryData")
			{
				popupManager.preloaderClose();
				fontDataArr = data.fonts.font;
				scope.fontDataArr = data.fonts.font;
				for (var j = 0; j < scope.fontDataArr.length; j++) {
					if (scope.fontDataArr[j].isDefault == '1') {
						changeFontImageUrl = scope.fontDataArr[j].imagePath;
						selectedTtfPath = scope.fontDataArr[j].ttf;
						scope.changeFontImageUrl = changeFontImageUrl;
						normalFontTTF=selectedTtfPath;
						normalFontUrl=changeFontImageUrl;
					}
				}
			}
			
			if(type=="greekFontCategoryData")
			{
				fontDataArr = data.fonts.font;
				scope.fontDataArr = data.fonts.font;
				for (var j = 0; j < scope.fontDataArr.length; j++) 
				{
					
						changeFontImageUrl = scope.fontDataArr[j].imagePath;
						selectedTtfPath = scope.fontDataArr[j].ttf;
						scope.changeFontImageUrl = changeFontImageUrl;
						break;
					
					
				}
				popupManager.preloaderClose();
			}
			if (type == "swap") {
				//alert(type)
				allCategory = data;
				scope.items = data;
				//alert(data.length);
				scope.showMe = false;
				popupManager.open();
				pCatTitle = data[0].name;
				selectedCatOrSubTitle = data[0].name;
				scope.selectedCatOrSubTitle = selectedCatOrSubTitle;
				scope.pCatTitle = pCatTitle;
				//var scop=angular.element(".swap-text")
				scope.loadProduct(http, url, obj, type, scope)
				//console.log(webServices)
				//webServices.customServerCall(http,obj,siteUrl+'php/xml/product.json','product',scope)
			}
			if (type == "product") {
				productsData = data;
				scope.products = productsData;
				popupManager.preloaderClose();
			}
			if(type=="hoodiesproduct")
			{
				if(hoodiesOrBlanket=="Hoodies")
				hoodisDesignData=data;
				else
				blanketDesignData=data;
				
				scope.hoodiesOrBlanketData=data;
				popupManager.open("hoodiesOpen")
			}
			if(type=="blanketBorder")
			{
				blanketsBorderData=data.blanketBorders;
				var sc=angular.element("#swap-text").scope();
				if(sc)
				{
					sc.setBlanketBorderData();
				}
				else
				{
					angular.forEach(blanketsBorderData,function(obj,i){
			
						if(selectedBlanketLayerId==obj.layerId)
						{
							selectedBlanketThumb=obj.thumb;
							
							
						}
					})
				}
				
			}
			if (type == "colors") {

				colors = data;
				sleevePrint=data.sleeveprint;
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
				//nameColor=data.colors;
				productDetailData = data.productDetails

				selectedProductName = productDetailData.item;

				selectedColorName = productDetailData.defaultColorTitle;
				selectedQuantity = productDetailData.defaultMinQuantity;
				selectedSizes = productDetailData.defaultSizeRange;
				productColorId = productDetailData.defaultColorId;
				productColorValue = productDetailData.defaultColorValue;
				
				popupManager.preloaderClose();

				//scope.sizes();
				
			}
			if (type == "namecolors") 
			{
				nameColor = data.colors;
				angular.forEach(nameColor,function(obj,i){
					if(nameBackColorHex==obj.code)
					{
						nameColorPrice=obj.price;
						numberColorPrice=obj.price;
					}
				})
				//nameFontTTF=data.font;
				//nameSizes=data.sizes;
				var sc=angular.element('.tool-wrap').scope();
				sc.nameSizes = nameSizes;
				scope.nameColor = nameColor;
				scope.loadNameNumberFont();
			}
			if(type=="nameNumberFont")
			{
				nameNumberFontsData=data.fonts.font;
				scope.nameNumberFontsData=nameNumberFontsData;
				angular.forEach(nameNumberFontsData,function(obj,i){
					if(obj.isDefault==1)
					{
						if(nameFontTTF=='')
						{
							nameFontTTF=nameNumberFontsData[i].ttf;
							numberFontTTF=nameNumberFontsData[i].ttf;
							nameFontSelectIndx=i;
							numberFontSelectIndx=i;
							nameFontTitle=nameNumberFontsData[i].title;
							numberFontTitle=nameNumberFontsData[i].title;
						}
						
					}
				})
				
			}
			if (type == "sizes") {

				//console.log(nameSizes)
			}
			if (type == "swapcolors") {
				swapPrint=data.sleeveprint;
				scope.singleColor=true;
				scope.scolors = data.colors;
				scope.smorecolors = data.moreColors
				//if(data.moreColors)

				scope.sProductDetailData = data.productDetails
				swapcolors = data;
				scope.moreThanColor = (colors.swapcolors) ? true : false;
				popupManager.preloaderClose()
				//sProductDetailData=data.productDetails

			}
			if (type == "priceData") {
				priceData = data.priceData;
				scope.calculatePriceAndDissCount(0,nameNumPer);
			}
			if (type == "test") {
				alert("ana")
			}
			if (type == "toolproduct") 
			{
				//alert("anadi")
				//console.log(data)
				toolProductData = data;
				scope.frontSelected = true;
				scope.backSelected = false;
				selectedProductId = toolProductData.productId;
				productType=toolProductData.productType;
				//alert(toolProductData.views[currentView].src)
				//angular.element('.frontImage').attr('src', toolProductData.views[currentView].src);
				//angular.element('.backImage').attr('src', toolProductData.views[1].src)
				mainSizesData = data.sizesData;
				scope.productSizeData = mainSizesData;
				nameSizes = new Array();
				nameSizes.push("");
				angular.forEach(data.sizesData, function(sizes, j) {
					angular.forEach(sizes.sizes, function(size, i) {
						//console.log(size)
						nameSizes.push(size);
					});
				})
				//console.log(nameSizes)
				scope.loadInitialColors();
				scope.drawCanvas();
				hoodieFlag="false";
				if(productType=="multilayer")
				{
					//alert("sj")
					//alert(toolProductData.views[0].images[0].layerType)
					hoodieFlag="true";
					defaultLayerType=toolProductData.views[0].images[0].layerType;
					selectedLayerColorData=toolProductData.views[0].colors;
					selectedLayerEnabled=true;
					productDetailData = data.productDetails
					colors=toolProductData.views[0].colors
					selectedProductName = productDetailData.item;
					//alert(selectedProductName)
					selectedColorName = productDetailData.defaultColorTitle;
					selectedQuantity = productDetailData.defaultMinQuantity;
					selectedSizes = productDetailData.defaultSizeRange;
					productColorId = productDetailData.defaultColorId;
					productColorValue = productDetailData.defaultColorValue;
					  
				}
				
					var scop=angular.element("#swap-text").scope();
					if(scop)
					scop.selectedLayerEnabled=selectedLayerEnabled; 
				
				scope.loadLayers();

			}
			if (type == "addNameNumber") {
				scope.addNameNumberOnCanvas(data, nameNumPer);
			}
			if(type=="updateNameNumber")
			{
				scope.updateNameNumber(data);
			}
			if(type=="convert1color")
			{
				scope.editUploadedImage(true,data,'');
			}
			if(type=="effectImage")
			{
				//alert("ana")
				scope.editUploadedImage(true,'',data);
				
			}
			if(type=="shairing")
			{
				//alert(sharelink)
				window.open(sharelink,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400")
			}
			if(type=="toolEdit")
			{
				///console.log(data)
				if(editFlag=="template")
				{
					designId=0;
				}
				var result=angular.fromJson(data);
				editCanvasArr=result;//result.canvasArr;
				scope.loadTool();
				//alert("ana")
				//loadTool
			}
			if(type=="layersColors")
			{
				selectedLayerColorData=data.colors;
				scope.selectedLayerColorData=selectedLayerColorData;
				popupManager.preloaderClose();
			}
			if (type == "changetoolproduct") {
				//scope.switchViews();
				detectArr=new Array();
				currentView = 0;
				toolProductData = data;
				scope.frontSelected = true;
				scope.backSelected = false;
				selectedProductId = toolProductData.productId;
				productType=toolProductData.productType;
				selectedLayerEnabled=false;
				hoodieFlag='false';
				if(productType=="multilayer")
				{
					//alert("sj")
					//alert(toolProductData.views[0].images[0].layerType)
					hoodieFlag='true';
					defaultLayerType=toolProductData.views[0].images[0].layerType;
					selectedLayerColorData=toolProductData.views[0].colors;
					selectedLayerEnabled=true;
					
					productDetailData = data.productDetails
					colors=toolProductData.views[0].colors
					selectedProductName = productDetailData.item;
					selectedColorName = productDetailData.defaultColorTitle;
					selectedQuantity = productDetailData.defaultMinQuantity;
					selectedSizes = productDetailData.defaultSizeRange;
					productColorId = productDetailData.defaultColorId;
					productColorValue = productDetailData.defaultColorValue;
					  
				}
				if(scope)
				{
					var scop=angular.element("#swap-text").scope();
					scop.productDetailData=productDetailData;
					scop.selectedLayerEnabled=selectedLayerEnabled; 
				}
				
				//alert(toolProductData.views[currentView].src)
				//angular.element('.frontImage').attr('src', toolProductData.views[currentView].src);
				//angular.element('.backImage').attr('src', toolProductData.views[1].src);
				scope.drawCanvas();
				scope.loadLayers(scop);
				if (canvasArr[currentView] != '') {
					canvas.loadFromJSON(canvasArr[currentView], function() {

						canvas.calcOffset();
						canvas.renderAll();
						canvas.forEachObject(function(obj) {
							if (viewWiseScale[currentView] == 1.4) {
								obj.scaleX = obj.scaleX * (1 / SCALE_FACTOR);
								obj.scaleY = obj.scaleY * (1 / SCALE_FACTOR)
								obj.left = parseInt(obj.get("left") * (1 / SCALE_FACTOR))
								obj.top = parseInt(obj.get("top") * (1 / SCALE_FACTOR));
								obj.setCoords();
								canvas.calcOffset();
								canvas.renderAll();
							}
							if(obj.get("shapeType")=="drawArea" || obj.get("shapeType")=="drawText")
								{
									canvas.remove(obj);
				  					canvas.renderAll();	
								}
							if (obj.get("shapeType") == "Name") {
								global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
								nameObj = obj;
								if (nameCheck == false) {
									canvas.remove(nameObj);
									canvas.renderAll();
								}

							}

							if (obj.get("shapeType") == "Number") {
								global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
								numberObj = obj;
								if (numberCheck == false) {
									canvas.remove(numberObj);
									canvas.renderAll();
								}

							}
							if(obj.get("shapeType")=="clipart")
							{
								global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
							}

						});
						viewWiseScale[currentView] = 1;
						scope.drawCanvas();
						updateUndoRedo();
						maintainRatio()
					});
				}
				//scope.loadInitialColors();
			}
			
			if (type == "addText" || type == "updateText") 
			{
				var textObject = obj;
				var objWidth;
				var objHeight;
				var ObjLeft;
				var ObjTop;
				var objAngle=parseInt(textObject.angle);
				var originalW=0
				var originalH=0
				var originalL=0
				var originalT=0
				scope.rotationAngle = (objAngle > 360) ? (objAngle - 360) : objAngle;;
				if(type == "addText")
				{				
					angular.element('.addTextUl a').removeClass('selected');
					angular.element('.editTxt').addClass('selected');
					scope.switchValue = 3;
					scope.showTextArea = true;
					var flipX=false;
					var flipY=false;
				}
				else
				{
					var ob = canvas.getActiveObject();
					var rotationObj=ob.get("oCoords").tl;
	   				var originalObjectWidth=ob.get('originalImageWidth');
					var originalObjectHeight=ob.get('originalImageHeight');
					var maxResizeValue=ob.get('maxResizeValue');
					var resizeValue=ob.get('resizeValue');
					var flipX=ob.get("flipX");
					var flipY=ob.get("flipY");
					ObjLeft = rotationObj.x;
					ObjTop = rotationObj.y;
					objWidth=ob.getWidth();
					objHeight=ob.getHeight();
					objAngle=ob.getAngle();
					originalW=objWidth
					originalH=objHeight
					originalL=ObjLeft
					originalT=ObjTop;
					scope.rotationAngle = (objAngle > 360) ? (objAngle - 360) : objAngle;;
					canvas.remove(ob);
				}
				scope.$parent.$parent.addObjectLoaderVariable = false;
				//alert(dataAccessUrl + 'designertool/' + data)
				fabric.Image.fromURL(siteUrl+ data, function(obj1) 
				{
										
					/*
					 Calculation for setting large Object inside the Draw Area
					 */
						if(nameNumPer=="imagemagic" || type == "updateText")
						{
							 
							//console.log(resizeValue)
							
							scope.resizeValue = resizeValue
							scope.resizeValue = resizeValue
							//console.log(scope.resizeValue);
							//console.log(maxResizeValue)
							scope.maxResizeValue = maxResizeValue;
							
						}
						else
						{
							 originalObjectWidth=obj1.width;
							 originalObjectHeight=obj1.height
							if(obj1.width>drawAreaGrp.width && obj1.height<drawAreaGrp.height)
							{
									var cW=drawAreaGrp.width;
									var cH=drawAreaGrp.height;
									var oW=obj1.width;
									var oH=obj1.height;
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
								objWidth = nW;
								objHeight = nH;
								scope.resizeValue=(nW/25).toFixed(2);
								var initalValue=scope.resizeValue;
								scope.maxResizeValue = (scope.resizeValue);
							}
							else if(obj1.width<drawAreaGrp.width && obj1.height>drawAreaGrp.height)
							{
								var cW=drawAreaGrp.width;
									var cH=drawAreaGrp.height;
									var oW=obj1.width;
									var oH=obj1.height;
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
								objWidth = nW;
								objHeight = nH;
								scope.resizeValue=(nW/25).toFixed(2);
								var initalValue=scope.resizeValue;
								scope.maxResizeValue = (scope.resizeValue);
							}
							else if(obj1.width>drawAreaGrp.width && obj1.height>drawAreaGrp.height)
							{
								
								
									var cW=drawAreaGrp.width;
									var cH=drawAreaGrp.height;
									var oW=obj1.width;
									var oH=obj1.height;
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
								objWidth = nW;
								objHeight = nH;
								scope.resizeValue=(nW/25).toFixed(2);
								var initalValue=scope.resizeValue;
								scope.maxResizeValue = (scope.resizeValue);
								//$scope.artWidth=(nW/25).toFixed(2);
								//$scope.artHeight=(nH/25).toFixed(2);
							}
							else
							{
								//alert(2)
								objWidth = obj1.width;
								objHeight = obj1.height;
								scope.resizeValue=(objWidth/25).toFixed(2);
								var initalValue=scope.resizeValue;
								scope.maxResizeValue = (scope.resizeValue); 
							}
						
							if(type == "addText")
							{
								ObjLeft=(drawAreaGrp.left*1/resCanRatio+(drawAreaGrp.width*1/resCanRatio-objWidth)/2)*resCanRatio;
								ObjTop=(drawAreaGrp.top*1/resCanRatio+(drawAreaGrp.height*1/resCanRatio-objHeight)/2)*resCanRatio;
								originalW=objWidth
								originalH=objHeight
								originalL=ObjLeft
								originalT=ObjTop;
								objWidth=objWidth*resCanRatio;
								objHeight=objHeight*resCanRatio;
								
							}
						}
					
					//console.log(ObjLeft)
					//console.log(ObjTop)
					obj1.set({
						name:"Text",
						shapeType : 'Text',
						text : textObject.data,
						colorTitle:textObject.colorTitle,
						outlineColorTitle:textObject.outlineColorTitle,
						outlineType:textObject.outlineType,
						outlineIndex:textObject.outlineIndex,
						text_color : textObject.txtcolor,
						outlineColor : textObject.outlineColor,
						outlineWidth : textObject.outlineWidth,
						angle:textObject.angle,
						fill : "rbg(0,0,0)",
						left : ObjLeft,
						top : ObjTop,
						flipX:flipX,
						flipY:flipY,
						width:objWidth,
						height:objHeight,
						originalRatLeft:originalL,
						originalRatTop:originalT,
						originalRatWidth:originalW,
						originalRatHeight:originalH,
						arcRotate:arcRotate,
						roofGravity:roofGravity,
						align : textObject.Text_Align,
						fontTTF: textObject.Font_name,
						fontSizeValue: textObject.Font_Size,
						arc_Value: textObject.Arc_Value,
						changeFontImageUrl:changeFontImageUrl,
						customEffectName: textObject.effectName,
						selectedFontCategoryIndex:selectedFontCategoryIndex,
						shapeSettingIndex:shapeSettingIndex,
						shapeSettingType:shapeSettingType,
						shapeSelectIndx:shapeSelectIndx,
						textColorPrice: textObject.textColorPrice,
						textOutlineColorPrice: textObject.textOutlineColorPrice,
						resizeValue : scope.resizeValue,
						maxResizeValue : scope.maxResizeValue,
						originalImageWidth: originalObjectWidth,
						originalImageHeight: originalObjectHeight
					});
					//obj1.lockUniScaling=false;
					if(drawAreaGrp)
					obj1.set({clipTitle:drawAreaGrp.get("clipTitle")})
					canvas.add(obj1);
					canvas.setActiveObject(obj1);
					canvas.renderAll();
					canvas.calcOffset();
					//(function(){
						updateUndoRedo();
					//},1000)
					maintainBoundry();
					if(type == "updateText")
					scope.fontStyleCancelBtn();
				});
				
			}
			if (type == "saveDesign") 
			{
				editDesignFlag=false;
				if (loginType != "admin") 
				{
					if(saveType=="buynow")
					{
						//alert(data.cartUrl)
						window.open(data.cartUrl,"_self");
					}
					else
					{
						//alert("ana")
						scope.currectInfoF=false;
	    				scope.wrongInfoF=false;
						angular.element(".bunchOfEmils").val('');
	    				angular.element(".enterYourName").val('');
	    				angular.element(".saveTextArea").val('I just created this design. Take a look!');
						popupManager.close('saveClose');
						popupManager.preloaderClose();
						//angular.element(".saveDesignAndNameNumberTitle").text("Save Design/Send it to Friends")
						angular.element(".save-table-info").css({"display":"none"})
						if(saveType=="Save And Print")
						{
							scope.setSizeOnPrint()
						}
						else
						popupManager.open('save2Open')
						//console.log($location.url())
						if(data.url)
						$location.url(locationUrl+data.url)
					}
				}
				else
				{
					popupManager.preloaderClose();
				}
				//alert(data.userDesignId)
				userDesignId=data.userDesignId;

			}
			if(type=="shareDesign")
			{
				angular.element(".bunchOfEmils").val('');
	    		angular.element(".enterYourName").val('');
	    		angular.element(".saveTextArea").val('I just created this design. Take a look!');
	    		scope.currectInfoF=true;
	    		scope.wrongInfoF=false;
			}
			if(type=="userDesignCheck")
			{
				//console.log(data)
				//alert(data.error)
				if(data.error=="false")
				{
					if((saveType=="buynow"))
					{
						angular.element(".buyNowPopUp").css({"display":"none"})
						popupManager.preloaderOpen("preloaderOpen",'Loading Cart');
						//alert("p")
						
						
					}
					else
					{
						angular.element('.nav-tabs li').removeClass('active');
	    				scope.template = scope.templates[6];
					}
					scope.sendDataToPhp(saveType);
					
				}
				else
				{
					popupManager.preloaderClose();
					if(saveType=="buynow")
					{
						
						document.getElementById("buyreRadio").checked=true;
						angular.element(".buyUserId").val(saveEmailId);
					}
					else
					{
					document.getElementById("reRadio").checked=true;
					angular.element(".saveUserId").val(saveEmailId);
					}
					//angular.element("#reRadio").attr("checked",true);
					userDesignId=data.userDesignId;
					
					
					scope.saveDesignName=saveDesignName;
					scope.designcheck=true;
					scope.nonDesigncheck=false;
					
				}
				
			}
			//return data;
			//scope.$apply();
		}).error(function(data, status, headers, config) {
			// return null;
		});
	};

}]); 