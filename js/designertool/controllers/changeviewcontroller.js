 customInkControllers = angular.module('CustomInkControllers', []);

customInkControllers.controller('ManageViewController', ['$scope','$http','webServices','popupManager','$sce', function($scope,$http,webServices,popupManager,$sce) {
	//console.log($scope)
	var patt=/NR339/gi;
	if(patt.test(siteUrl))
	locationUrl="NR339/"
	else
	locationUrl='';
	
	var windowW=angular.element(window).width();
    var windowH=angular.element(window).height();
	var preloaderX=Math.abs((windowW-angular.element('.preloaderHolder').width())/2);
   	var preloaderY=Math.abs((windowH-angular.element('.preloaderHolder').height())/2);
   	 angular.element('.preloaderHolder').css({"left":preloaderX+"px","top":preloaderY+"px"})
	//alert("adi")
	// $scope.selectCat={};
		$scope.uploadColorFlag=false;
				
		popupManager.preloaderOpen("preloaderOpen",'Prepare To Create!');
	   $scope.addObjectLoaderVariable= false;
	   $scope.templates =
	      [ { name: 'template1.html', url: siteUrl+'views/home.html'},
	        { name: 'template2.html', url: siteUrl+'views/swap-item.html'},
	        { name: 'template2.html', url: siteUrl+'views/add-text.html'} ,
	        { name: 'template2.html', url: siteUrl+'views/add-art.html'},
	        { name: 'template2.html', url: siteUrl+'views/add-name.html'},
	        { name: 'template2.html', url: siteUrl+'views/add-note.html'},  
	        { name: 'template1.html', url: siteUrl+'views/save.html'}
	        ];
	    $scope.template = $scope.templates[0];
	    $scope.totalQty=0;
	   	$scope.swaptempalates =
	      [ { name: 'template1.html', url: siteUrl+'views/swapright-product.html'},
	        { name: 'template2.html', url: siteUrl+'views/swapproduct-detail.html'}
	       ];
		$scope.swaptempalate = $scope.swaptempalates[0];
	    $scope.error1Flag=false;
	    $scope.error2Flag=false;
	    $scope.currectInfoF=false;
	    $scope.wrongInfoF=false;
	    /**********************************Delivery date***************************************/
	   	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	   	var date=new Date();
	   	var currentTime=date.getTime();
	   	var previousTime=currentTime+15*24*60*60*1000;
	   	var deliveryDate=new Date(previousTime);
	   	var previousTime2=currentTime+11*24*60*60*1000;
	   	var FastDeliveryDate=new Date(previousTime2);
	   	//console.log(date.toDateString())
	   	var monthArr=deliveryDate.toDateString().split(' ');
	   	var month=monthArr[1];
	   	$scope.deliveryDate=days[deliveryDate.getDay()]+", "+month+'. '+deliveryDate.getDate()+"th*";
	  	var fmonthArr=FastDeliveryDate.toDateString().split(' ');
	   	var fmonth=fmonthArr[1];
	   	$scope.fastDeliveryTime=days[FastDeliveryDate.getDay()]+", "+fmonth+'. '+FastDeliveryDate.getDate()+"th";
	   	$scope.fastDevDate=FastDeliveryDate.getDate()+"th";
	  // console.log(fastDeliveryTime)
	   //alert("ana")
	    $scope.$on('$locationChangeSuccess', function (next, current) 
	    {
	    	designChangeFlag=false;
	    	//console.log("change")
	    	//this will be work when print this is click
	    	//console.log(next);
	    	//console.log(current)
               // alert("jhdsfjfhsd")
        });
        
	    $scope.changeView=function(index)
	    {
	    	//alert("anadi")
	    	if(mobileMode==true)
	    	{
	    		angular.element(".tab-content").removeClass("tab-content2")
	    		angular.element(".tab-content").css({"display":"block"});
	    	}
	    	
	    	var obj=canvas.getActiveObject();
	    	if(obj)
	    	{
	    		if(obj.get("name")=="Text")
	    		{
	    			//canvas.discardActiveObject();
	    			canvas.renderAll();
	    		}
	    	}
	    	angular.element('.nav-tabs li').removeClass('active');
	    	angular.element('.nav-tabs li').eq(index-1).addClass('active');
	    	var indx=parseInt(index)
	    	$scope.template = $scope.templates[indx];
	    	if(!$scope.$$phase)
	    	{
	    		$scope.$apply();
	    	}
	    	
	    	currentSelectedTab=index-1;
	    }
	    $scope.globalShareInSocialSites=function(obj)
	    {
	    	
	    	shareLink='';
			canvas.discardActiveObject();
			var frontBackImg =(currentView==0)?frontCanvas.toDataURL():backCanvas.toDataURL(); 
			var canvasFrontBack = siteUrl+"php/shairing/" + 'frontBack.png';
			//alert(frontBackImg)
			//alert(jquery(obj).attr("class"))
			//var patt = /\"|\'|\)|\(|url/g;
			//frontBackImg = frontBackImg.replace(patt, '');
			//alert("anadi2"+frontBackImg)
			//alert("ana"+angular.element(obj).text())
			if(angular.element(obj).text()=="Facebook")
			{
				//var str ="aman'"+sdjhj+"'";
				 sharelink='https://www.facebook.com/sharer/sharer.php?u='+canvasFrontBack;
				//sharelink='http://www.facebook.com/sharer/sharer.php?u='+'&p[url]='+'http://magento.thesparxitsolutions.com/magento/NR317/index.php/lab.html'+'&p[images][0]='+canvasFrontBack;
				//sharelink='https://www.facebook.com/sharer/sharer.php?s=100&amp%3Bp[title]=firstshare&amp%3Bp[summary]=second&amp%3Bp[url]=http%3A%2F%2Fmagento.thesparxitsolutions.com%2Fmagento%2FNR317%2F&amp%3Bp[images][0]=http%3A%2F%2Fmagento.thesparxitsolutions.com%2Fmagento%2FNR317%2Fdesignertool%2Fphp%2Fshairing%2FfrontBack.png&u=https%3A%2F%2Fwww.facebook.com%2F';
				//sharelink='http://www.facebook.com/sharer/sharer.php?s=100&amp;p[title]=firstshare&amp;p[summary]=second&amp;p[url]=http://magento.thesparxitsolutions.com/magento/NR317/index.php/lab.html&amp;&p[images][0]="'+canvasFrontBack+'"&u=http://magento.thesparxitsolutions.com/magento/NR317/index.php/lab.html';
				// sharelink='http://www.facebook.com/sharer.php?s=100&amp;p[title]=sparxt is solution&amp;p[summary]=mytest image&amp;p[url]=http://www.magento.thesparxitsolution.com/&amp;p[images][0]='+canvasFrontBack;
			//alert(sharelink)
			}
			else if(angular.element(obj).text()=="Twitter")
			{
				 sharelink='https://twitter.com/home?status='+canvasFrontBack;
			}
			else if(angular.element(obj).text()=="Printrest")
			{
				//pinterest
				 sharelink='https://pinterest.com/pin/create/button/?url='+canvasFrontBack+"&media="+canvasFrontBack+"&description="+"shareimage";
			}
			var obj=new Object();
			obj.img1 = canvas.toDataURL();
			obj.frontBackImg = frontBackImg;
			webServices.customServerCall($http,siteUrl+'php/upload-image.php',obj,'shairing',$scope);
	    }
	    $scope.switchViews=function(obj,scope,str)
	    {
	    	var artScope=angular.element(".art-wrapper").scope();
			if(artScope)
			{
				artScope.resetPage();
				
			}
			var textScope=angular.element("#add-text").scope();
			if(textScope)
			{
				textScope.resetTextPage();
				
			}
				
	    	angular.element('.preloader-overlay-wrapper').css({"display":"block"})
			angular.element(".preloaderHeading").text('Loading View...')
			angular.element('.preloaderHolder').css({"display":"block"})
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
	    	
	    	canvas.clear();
	    	canvas.renderAll();
	    	
	    	currentView=(currentView==0)?1:0;
	    	//alert(currentView)
	    	if(currentView==1)
	    	{
	    		//alert()
	    		if(hoodiesOrBlanket=="Blankets")
	    		{
	    			
	    			selectedBorderFlag=true;
	    			var scope=angular.element("#swap-text").scope();
	    			if(scope)
	    			{
	    				scope.setBorderFlag();
	    			}
	    			
	    		}
	    	}
	    	
	    	if(currentView==0)
	    	{
	    		selectedBorderFlag=false;
	    		var scope=angular.element("#swap-text").scope();
	    			if(scope)
	    			{
	    				scope.setBorderFlag();
	    			}
	    		$scope.frontSelected=true;
	    		$scope.backSelected=false;
	    	}
	    	else
	    	{
	    		$scope.frontSelected=false;
	    		$scope.backSelected=true;
	    	}
	    	//alert(currentView)
	    	//console.log(canvasArr[currentView])
	    	$scope.drawCanvas();
	    			if(canvasArr[currentView]!='')
	    			{
	    				
						canvas.loadFromJSON(canvasArr[currentView],function()
						{
							
							canvas.calcOffset();
							canvas.renderAll();
							canvas.forEachObject(function(obj)
							{
								//console.log(obj)
								obj.setCoords();
								canvas.calcOffset();
								canvas.renderAll();
								if(viewWiseScale[currentView]==1.4)
								{
									 obj.scaleX= obj.scaleX*(1/SCALE_FACTOR);
									 obj.scaleY= obj.scaleY*(1/SCALE_FACTOR)
									 obj.left=parseInt(obj.get("left")*(1/SCALE_FACTOR))
									 obj.top=parseInt(obj.get("top")*(1/SCALE_FACTOR));	
									 obj.setCoords();
									 canvas.calcOffset();
									 canvas.renderAll();
								}
								if(obj.get("shapeType")=="drawArea" || obj.get("shapeType")=="drawText")
								{
									canvas.remove(obj);
				  					canvas.renderAll();	
								}
								 if(obj.get("shapeType")=="Name")
				  				{
				  					
				  					nameObj=obj;
				  					//console.log(nameObj)
				  					global_SelectedItem=nameObj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  					if(nameCheck==false)
				  					{
				  						canvas.remove(nameObj);
				  						canvas.renderAll();
				  					}
									
							  	}
							  	
						  		 if(obj.get("shapeType")=="Number")
				  				{
				  					//.log(numberObj)
				  					numberObj=obj;
				  					global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  					if(numberCheck==false)
				  					{
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
							
							$scope.drawCanvas();
							viewWiseScale[currentView]=1;
						});
					}
				setTimeout(function(){
					//alert("djsah")
					//console.log("timeout")
					canvas.renderAll();
					$scope.$apply();
					popupManager.preloaderClose();
					//alert("ana")
					updateUndoRedo();
					maintainRatio()
				},500)	
	    	
	    	
	    	
	    }
	    
	    
	    
	    $scope.switchNameNumberViews=function(obj,scope,str,nameNumPers)
	    {
	    	
	    	angular.element('.preloader-overlay-wrapper').css({"display":"block"})
			angular.element(".preloaderHeading").text('Loading View...')
			angular.element('.preloaderHolder').css({"display":"block"})
	    	///canvasArr[currentView]=JSON.stringify(canvas);
	    	//alert("view"+nameNumPers)
	    	
	    	canvas.clear();
	    	canvas.renderAll();

	    	
	    	currentView=(currentView==0)?1:0;
	    	//alert(currentView)
	    	if(currentView==0)
	    	{
	    		$scope.frontSelected=true;
	    		$scope.backSelected=false;
	    	}
	    	else
	    	{
	    		$scope.frontSelected=false;
	    		$scope.backSelected=true;
	    	}
	    	//alert(currentView)
	    	//console.log(canvasArr[currentView])
	    	$scope.drawCanvas("namedraw");
	    			if(canvasArr[currentView]!='')
	    			{
	    				//popupManager.preloaderOpen("preloaderOpen",'Loading View...');
						canvas.loadFromJSON(canvasArr[currentView],function()
						{
							//alert("ana")
							
							canvas.calcOffset();
							canvas.renderAll();
							canvas.forEachObject(function(obj)
							{
								//alert(obj.get("shapeType"))
								if(viewWiseScale[currentView]==1.4)
								{
									 obj.scaleX= obj.scaleX*(1/SCALE_FACTOR);
									 obj.scaleY= obj.scaleY*(1/SCALE_FACTOR)
									 obj.left=parseInt(obj.get("left")*(1/SCALE_FACTOR))
									 obj.top=parseInt(obj.get("top")*(1/SCALE_FACTOR));	
									 obj.setCoords();
									 canvas.calcOffset();
									 canvas.renderAll();
								}
								if(obj.get("shapeType")=="drawArea" || obj.get("shapeType")=="drawText")
								{
									canvas.remove(obj);
				  					canvas.renderAll();	
								}
								 if(obj.get("shapeType")=="Name")
				  				{
				  					global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  					nameObj=obj;
				  					if(nameCheck==false)
				  					{
				  						canvas.remove(nameObj);
				  						canvas.renderAll();
				  					}

									
							  	}
							  	
							  	
						  		 if(obj.get("shapeType")=="Number")
				  				{
				  					global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  					numberObj=obj;
				  					if(numberCheck==false)
				  					{
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
							viewWiseScale[currentView]=1;
							$scope.drawCanvas("namedraw");
							if(nameNumRemoveFlag==true)
							{
								//alert("kfdk")
								//canvas.remove(nameObj)
								//canvas.remove(numberObj)
								//canvas.renderAll();
								//nameNumRemoveFlag=false;
							}
						});
					}
				
				
				setTimeout(function(){
					nameNumRemoveFlag=false;
					canvas.renderAll();
					if(str)
			    	{
			    		
			    		if(str=="nameselect")
			    		{
			    			//alert("anadi")
			    			setClipDrawAreaByName(nameObj.get("clipTitle"));
			    			nameObj.hasControls=false;
			    			canvas.discardActiveObject();
							canvas.setActiveObject(nameObj);
							canvas.renderAll();
			    		}
			    		else if(str=="numberselect")
			    		{
			    			setClipDrawAreaByName(numberObj.get("clipTitle"));
			    			numberObj.hasControls=false;
							canvas.discardActiveObject();
							canvas.setActiveObject(numberObj);
							canvas.renderAll();
			    		}
			    		else if(str=="namedelete")
			    		{
			    			canvas.remove(nameObj);
							//canvas.remove(numberObj);
							canvas.renderAll();
							nameObj=null;
							///numberObj=null;
							canvasArr[currentView]=JSON.stringify(canvas);
			    		}
			    		else if(str=="numberdelete")
			    		{
			    			//canvas.remove(nameObj);
							canvas.remove(numberObj);
							canvas.renderAll();
							//nameObj=null;
							numberObj=null;
							canvasArr[currentView]=JSON.stringify(canvas);
			    		}
			    		else if(scope)
			    		scope.checkNameNum(nameNumPers);
			    		updateUndoRedo();
			    	}
			    	else if(scope)
			    	{
			    		//alert("anadi")
			    		updateUndoRedo();
			    		scope.setNameNumData(nameNumPers);
			    	}
	    			$scope.$apply();
	    			popupManager.preloaderClose();
	    	
				},500);
	    	
	    }
	    $scope.frontSelected=false;
	    $scope.backSelected=false;
	    /******************************Licence And Tool Load*******************************************/
	    $scope.checkLicence=function()
	    {
	    	
	    	if(editFlag=="edit" || editFlag=="template")
	    	{
	    		var obj=new Object();
				obj.designId=designId;
				obj.loginType=loginType;
				obj.editFlag=editFlag;
				obj.hoodieFlag=hoodieFlag;
	    		webServices.customServerCall($http,dataAccessUrl+'designersoftware/product/edit',obj,'toolEdit',$scope);
	    	}
	    	else
	    	$scope.loadTool();
	    }
	   $scope.loadTool=function()
	   {
	   	var obj=new Object();
		obj.productId=productId;
		//alert("colordata")
		//console.log(sleevePrint)
		
		if(canPrint==0)
		{
			angular.element("#printThis").parent().addClass("disabled")
		}
		if(hoodieFlag=='true')
		{
			hoodiesOrBlanket="Hoodies";
			if(blanketDesigner)
			{
				hoodiesOrBlanket="Blankets";
				angular.element(".banket-disabled").parent().addClass("disabled")
			}
			$scope.addObjectLoaderVariable=true;
	    	
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/hoodies_index/swapitem',obj,'toolproduct',$scope);
	    	//popupManager.close();
		}
		else
		webServices.customServerCall($http,dataAccessUrl+'designersoftware/index/colordata',obj,'toolproduct',$scope);
	   }
	   $scope.checkLicence();
	   /********************************End licence****************************************/
	    //webServices.customServerCall($http,siteUrl+'php/xml/toolProductData.json',obj,'toolproduct',$scope);
	    $scope.loadInitialColors=function()
	    {
	    	//alert("fdsf")
	    	//switchViewsalert("anadi")
	    	//console.log(editCanvasArr)
	    	//alert("adj")
	    	viewWiseScale[0]=1;
	    	viewWiseScale[1]=1;
	    	if(editCanvasArr)
	    	{
		    	resetNameNumberTableArr=editCanvasArr.nameNumberSendInfoArr;
		    	nameNumberSendInfoArr=editCanvasArr.nameNumberSendInfoArr;
		    	//console.log(resetNameNumberTableArr)
		    	if(resetNameNumberTableArr)
		    	{
		    		
		    			
		    		if(resetNameNumberTableArr[0].nameCheck=='true')
		    		{
		    			nameCheck=true;
		    			selectedNamePage="namePage2"
		    			nameColorPrice=(resetNameNumberTableArr[0].nameColorPrice)?resetNameNumberTableArr[0].nameColorPrice:0;
		    			nameBackColorHex=resetNameNumberTableArr[0].nameBackColorHex;
		    			nameColorLabel=resetNameNumberTableArr[0].nameColorLabel;
		    			nameView=parseInt(resetNameNumberTableArr[0].nameSide)
		    			nameHeightSelectIndx=parseInt(resetNameNumberTableArr[0].nameHeightIndx)
		    			nameFontTitle=resetNameNumberTableArr[0].nameFontTitle;
		    			nameFontSelectIndx=parseInt(resetNameNumberTableArr[0].nameFontSelectIndx)
		    			nameFontTTF=nameFontTitle=resetNameNumberTableArr[0].nameFontTTF;
		    		}
		    		
		    	
		    		if(resetNameNumberTableArr[0].numberCheck=='true')
		    		{
		    			numberColorPrice=(resetNameNumberTableArr[0].numberColorPrice)?resetNameNumberTableArr[0].numberColorPrice:0;
		    			numberCheck=true;
		    			selectedNamePage="namePage2"
		    			numberBackColorHex=resetNameNumberTableArr[0].numberBackColorHex;
		    			numberColorLabel=resetNameNumberTableArr[0].numberColorLabel;
		    			numberView=parseInt(resetNameNumberTableArr[0].numSide)
		    			numberHeightSelectIndx=parseInt(resetNameNumberTableArr[0].numberHeightIndx)
		    			numberFontTitle=resetNameNumberTableArr[0].numberFontTitle;
		    			numberFontSelectIndx=parseInt(resetNameNumberTableArr[0].numberFontSelectIndx);
		    			numberFontTTF=nameFontTitle=resetNameNumberTableArr[0].numberFontTTF;
		    		}
		    		
		    	}
		    }
	    	//console.log(resetNameNumberTableArr)
	    	for(var i=0;i<toolProductData.views.length;i++)
	    	{
	    		
			  	canvasArr[i] = [];
			  	dataArray[i] = new Array();
			  	previewArr[i]=[];
			  	pdfDrawAreaArr[i]=new Array();
			  	if(editFlag=="edit" || editFlag=="template")
			  	{
			  		canvasArr[i] = editCanvasArr.canvasArr[i]
			  		viewWiseScale[i]=editCanvasArr.viewWiseScale[i];
			  		//previewArr[i]=editCanvasArr.previewArr[i];
			  	}
			  
			  	viewWiseColorArr[i]=new Array();
			  	//clippingDrawArea=new Array();
	    	}
	    	for(var i=0; i<4; i++)
		    {
		      	
			  
			  dataLessJson[i] = new Array();
			  undoredoVar[i] = new Array();
			  for(var j=0; j<4; j++)
		        {
			        if(j == 3)
			            undoredoVar[i][j] = false;
			        else
			            undoredoVar[i][j] = 0;
		        }
			  
		    }
	    	
	    	if(canvasArr[currentView]!='')
	    			{
						canvas.loadFromJSON(canvasArr[currentView],function()
						{
							
							canvas.calcOffset();
							canvas.renderAll();
							canvas.forEachObject(function(obj)
							{
								obj.setCoords();
								canvas.calcOffset();
								canvas.renderAll();
								if(viewWiseScale[currentView]==1.4)
								{
									 obj.scaleX= obj.scaleX*(1/SCALE_FACTOR);
									 obj.scaleY= obj.scaleY*(1/SCALE_FACTOR)
									 obj.left=parseInt(obj.get("left")*(1/SCALE_FACTOR))
									 obj.top=parseInt(obj.get("top")*(1/SCALE_FACTOR));	
									 obj.setCoords();
									 canvas.calcOffset();
									 canvas.renderAll();
								}
								if(obj.get("shapeType")=="drawAreaGrp")
								{
									canvas.remove(obj);
				  					canvas.renderAll();	
								}
								 if(obj.get("shapeType")=="Name")
				  				{
				  					
				  					global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  						//canvas.remove(obj);
				  						canvas.renderAll();
				  					
									
							  	}
							  	if(obj.get("shapeType")=="clipart")
							  	{
							  		global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
							  	}
						  		 if(obj.get("shapeType")=="Number")
				  				{
				  					global_SelectedItem=obj;
        							colorPickerValue= global_SelectedItem.getFill();
        							var filter=new fabric.Image.filters.Invert();
        							global_SelectedItem.filters[1] = filter;
		 							global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
				  					//	canvas.remove(obj);
				  						canvas.renderAll();
				  					
									
							  	}
							
							});
							
							$scope.drawCanvas();
							viewWiseScale[currentView]=1;
							setTimeout(function(){
								canvas.renderAll();
								maintainRatio();
							},200)
						});
					}
	    	
	    	var obj=new Object();
	    	
			obj.productId=productId;
			//alert(hoodieFlag)
			updateUndoRedo();
			if(!(hoodieFlag=="true"))
			{
				
				webServices.customServerCall($http,dataAccessUrl+'designersoftware/index/swapitem',obj,'colors',$scope);
			}
			
	    }
	    $scope.loadProduct=function()
		{
			//var childScope = angular.element('#swap-text').scope();
			//console.log(childScope)
			var obj=new Object();
	    	obj.categoryId=selectedCatId;
	    	popupManager.preloaderOpen("preloaderOpen",'Loading Products..');
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/popup/productlist',obj,'product',$scope)
			
		}
	    $scope.setOverlayImage=function(color)
	    {
	    	fabric.Image.fromURL(distressUrl,function(img)
	    	{
	    		color="ff0000"
	    		var context=frontCanvas.getContext();
	    		var imageData = context.getImageData(canWidth/2, canHeight/2,1,1)
        		var data= imageData.data;
        		//console.log(data)
	    		
	    		global_SelectedItem=img;
	    		var hexColor="0x"+color;
			  	var arr=hex2Rgb((hexColor));
			  	//var rgbcolor='rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
				var rgbcolor='rgb('+data[0]+','+data[1]+','+data[2]+')';
			//	alert(rgbcolor)
				colorPickerValue=rgbcolor;
				img.set({shapeType:"distress",
					opacity:distressOpacity,
					fill:rgbcolor,
					height:parseInt(toolProductData.views[currentView].drawAreas[0].drawH)*resCanRatio,
					width:parseInt(toolProductData.views[currentView].drawAreas[0].drawW)*resCanRatio,
					left:parseInt(toolProductData.views[currentView].drawAreas[0].drawX)*resCanRatio,
					top:parseInt(toolProductData.views[currentView].drawAreas[0].drawY)*resCanRatio})
				global_SelectedItem.fill = colorPickerValue;
		 		global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
		 		global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
	    		canvas.setOverlayImage(img,canvas.renderAll.bind(canvas),{height:parseInt(toolProductData.views[currentView].drawAreas[0].drawH)*resCanRatio,fill:rgbcolor,width:parseInt(toolProductData.views[currentView].drawAreas[0].drawW)*resCanRatio,left:parseInt(toolProductData.views[currentView].drawAreas[0].drawX)*resCanRatio,top:parseInt(toolProductData.views[currentView].drawAreas[0].drawY)*resCanRatio,opacity:distressOpacity});
	    	})
	    	
	    }
	    $scope.sizes=function()
	    {
	    	
	    	var obj=new Object();
	    	
			obj.productId=productId;
			//webServices.customServerCall($http,dataAccessUrl+'designersoftware/index/swapitem',obj,'sizes',$scope);
			webServices.customServerCall($http,siteUrl+'php/xml/sizes.json',obj,'sizes',$scope);
	    
	    }
	    $scope.drawCanvas=function()
	    {
	    	if(toolProductData)
	    	{
	    	drawAreaGrpArr[0]=new Array();
	    	drawAreaCounter=0;
	    	canvas.setWidth(canWidth);
	    	canvas.setHeight(canHeight);
	    	angular.element('.frontImage').css({'width':(canWidth+"px"),'height':(canHeight+"px")})
    		angular.element('.backImage').css({'width':(canWidth+"px"),'height':(canHeight+"px")})
    		angular.element('.tool-links, .but-links').css({'width':(canWidth+"px")})
    		//console.log(toolProductData)
    		
    		for(var i=0;i<toolProductData.views.length;i++)
	    	{
	    		//console.log(i)
	    		selectedViewCanvas=(i==0)?frontCanvas:backCanvas;
	    		//console.log(selectedViewCanvas)
	    		selectedViewCanvas.setWidth(canWidth)
	    		selectedViewCanvas.setHeight(canHeight)
	    		//console.log(selectedViewCanvas)
	    		var grp=selectedViewCanvas.item(0)
	    		if(grp)
	    		{
	    			//console.log(i)
	    		
	    		for(var j=0;j<grp.getObjects().length;j++)
	    		{
	    			var item=grp.item(j);
	    			item.set({width:layerWidth*resCanRatio,height:layerHeight*resCanRatio});
	    			item.setCoords();
	    			selectedViewCanvas.renderAll();
	    		}
	    		grp.set({left:layerX})
	    		grp.setCoords();
	    	}
	    		selectedViewCanvas.renderAll();
	    		
	    		
    		}	
    		zoomInOutStr="zoomin";
    		var thumb='<i class="zoom-icon"></i> zoom in'
			angular.element("#zoomInOut").html(thumb)
    		//alert(marLeft)
    		//alert(marTop)
    		angular.element('.inner-canvas-holder-zoom').css({'marginLeft':("0px"),'marginTop':("0px")})
	    	if(drawAreaGrp)
	    	{
	    		canvas.remove(drawAreaGrp);
	    		canvas.renderAll();
	    		canvas.forEachObject(function(obj){
	    			if((obj.get("shapeType")=="drawArea")||(obj.get("shapeType")=="drawText"))
	    			canvas.remove(obj);
	    			canvas.renderAll();
	    		})
	    	}
	    	if(productType=="multilayer")
			{
				var scope=angular.element(".product-layer-color-holder").scope();
				if(scope)
				{
					scope.frontBackIndxObj=(currentView==0)?frontIndexObj:backIndexObj;
					scope.selectedLayerColorData=selectedLayerColorData;
				}
				
			}
	    	
	    	maintainDrawAreaArr=new Array();
	    	pdfDrawAreaArr[currentView]=new Array();
	    	if(toolProductData)
			angular.forEach(toolProductData.views[currentView].drawAreas,function(drawArea,index)
			{
				
				if(currentView==0)
				{
					
					
					var drawAreaRect = new fabric.Rect({
						name:"rectArea",
						layerIndx:index,
						left:parseInt(drawArea.drawX)*resCanRatio,
						originalRatLeft:parseInt(drawArea.drawX),
						originalRatTop:parseInt(drawArea.drawY),
						originalRatWidth:parseInt(drawArea.drawW),
						originalRatHeight:parseInt(drawArea.drawH),
						top:parseInt(drawArea.drawY)*resCanRatio, 
						width:parseInt(drawArea.drawW)*resCanRatio,
						height:parseInt(drawArea.drawH)*resCanRatio,angle:0,
						stroke: '#000000',
						strokeWidth: 1,fill: '',
						
						hasControls:false,
						lockMovementX:true,
						lockMovementY:true,
						hasBorders:false,
						opacity:1,
						clipTitle:drawArea.drawAreaTitle,
						shapeType:"drawArea"});
						maintainDrawAreaArr.push(drawAreaRect);
						
						pdfDrawAreaArr[0].push({"drawX":drawArea.drawX,
						"drawY":drawArea.drawY,"drawW":drawArea.drawW,
						"drawH":drawArea.drawH,"drawT":drawArea.drawAreaTitle})
						//console.log(drawArea)
					//{
						//var drawAreaRect = new fabric.Rect({left:130,top:75, width:261,height:333,angle:0,stroke: '#000000',strokeWidth: 1,fill: '',selectable: false,shapeType:"drawArea"});
					
					
					//drawAreaGrpArr[0][drawAreaCounter]=drawAreaRect;
					//drawAreaCounter++;
					//drawAreaGrpArr[0][drawAreaCounter]=text;
					//drawAreaCounter++;
					if(index==0)
					{
						drawAreaGrp=drawAreaRect;
						drawAreaGrp.set({shadow: 'red 0px 0px 2px'})
					}
					
					
					drawAreaRect.setCoords();
					canvas.add(drawAreaRect);
					//canvas.sendToBack(drawAreaRect);
					
					canvas.renderAll();
					canvas.calcOffset();
					var text=new fabric.Text(drawArea.drawAreaTitle,{fontFamily:'Open Sans',
					layerIndx:index,fontWeight:'normal',
					fill:"#000000",fontSize:11,
					left:(parseInt(drawArea.drawX)+5)*resCanRatio,
					top:(parseInt(drawArea.drawY)+2)*resCanRatio,
					padding:0,selectable:false,shapeType:"drawText"});
					//maintainDrawAreaArr.push(text);
					//canvas.add(text);
					canvas.renderAll();
				}
				if(currentView==1)
				{
					//if(drawArea.drawAreaTitle!="Left Chest")
					//{
					
						var drawAreaRect = new fabric.Rect({
							name:"rectArea",
							layerIndx:index,
							left:parseInt(drawArea.drawX)*resCanRatio,
							originalRatLeft:parseInt(drawArea.drawX),
							originalRatTop:parseInt(drawArea.drawY),
							originalRatWidth:parseInt(drawArea.drawW),
							originalRatHeight:parseInt(drawArea.drawH),
							top:parseInt(drawArea.drawY)*resCanRatio, 
							width:parseInt(drawArea.drawW)*resCanRatio,
							height:parseInt(drawArea.drawH)*resCanRatio,
						
							angle:0,
							stroke: '#000000',
							strokeWidth: 1,fill: '',
							hasControls:false,
							lockMovementX:true,
							lockMovementY:true,
							hasBorders:false,
							opacity:1,
							clipTitle:drawArea.drawAreaTitle,
							shapeType:"drawArea"});
							maintainDrawAreaArr.push(drawAreaRect);
							
							
						pdfDrawAreaArr[1].push({"drawX":drawArea.drawX,
						"drawY":drawArea.drawY,"drawW":drawArea.drawW,
						"drawH":drawArea.drawH,"drawT":drawArea.drawAreaTitle})
						//console.log(drawArea)
					//{
						//var drawAreaRect = new fabric.Rect({left:130,top:75, width:261,height:333,angle:0,stroke: '#000000',strokeWidth: 1,fill: '',selectable: false,shapeType:"drawArea"});
					
					if(index==0)
					{
						drawAreaGrp=drawAreaRect;
						drawAreaGrp.set({shadow: 'red 0px 0px 2px'})
					}
					
					canvas.add(drawAreaRect);
					//canvas.sendToBack(drawAreaRect);
					
					canvas.renderAll();
					var text=new fabric.Text(drawArea.drawAreaTitle,{layerIndx:index,fontFamily:'Open Sans',
					fontWeight:'normal',fill:"#000000",fontSize:11,
					left:(parseInt(drawArea.drawX)+5)*resCanRatio,
					top:(parseInt(drawArea.drawY)+2)*resCanRatio,
					padding:0,selectable:false});
					//canvas.add(text);
					canvas.renderAll();
					//maintainDrawAreaArr.push(text);
					//}
				}
				

				
				
				if(index==toolProductData.views[currentView].drawAreas.length-1)
				{
					//console.log(maintainDrawAreaArr.length);
					for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].sendToBack();
						canvas.renderAll();
					}
					//angular.forEach(maintainDrawAreaArr,funct)
					//alert("kfsdkf")
					// drawAreaGrp=new fabric.Group(drawAreaGrpArr[0], 
						// {name:"drawArea",
						// left:parseInt(toolProductData.views[currentView].drawAreas[0].drawX)*resCanRatio,
						// stroke: '#000000',strokeWidth: 1,
						// top:parseInt(toolProductData.views[currentView].drawAreas[0].drawY)*resCanRatio,
						// lockUniScaling:false,opacity:1,
						// selectable:true,
						// shapeType:"drawAreaGrp"});
						// drawAreaGrp.hasControls=false;
						// drawAreaGrp.lockMovementX=true;
						// drawAreaGrp.lockMovementY=true;
					// drawAreaGrp.set({opacity:1})
					// canvas.add(drawAreaGrp);
					// canvas.sendToBack(drawAreaGrp);
					// canvas.renderAll();
				}
				//var text
			});
			}

	    }
	    $scope.changeProductByColorId=function()
	    {
	    	$scope.addObjectLoaderVariable=true;
	    	var obj=new Object();
			obj.productId=productId;
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/index/colordata',obj,'changetoolproduct',$scope);	
	    }
	    $scope.loadHoodies=function(){
	    	$scope.addObjectLoaderVariable=true;
	    	var obj=new Object();
	    	obj.productId=subProductId;
			webServices.customServerCall($http,dataAccessUrl+'designersoftware/hoodies_index/swapitem',obj,'changetoolproduct',$scope);
	    	popupManager.close("hoodiesClose");
	    	popupManager.close();
	    }
	    $scope.getHex=function (rgb)
		{
			
			rgb = rgb.split(',');
			red = rgb[0].split('(');
			red = red[1];
			green = rgb[1];
			blue = rgb[2].split(')');
			blue = blue[0];
		}
		$scope.maintainTabLandAndPotrait=function()
		{
			//console.log(resCanRatio)
			canvas.setWidth(canWidth);
			canvas.setHeight(canHeight);
			canvas.renderAll();
			frontCanvas.setWidth(canWidth);
			frontCanvas.setHeight(canHeight);
			frontCanvas.renderAll();
			backCanvas.setWidth(canWidth);
			backCanvas.setHeight(canHeight);
			backCanvas.renderAll();
			var grp=frontCanvas.item(0)
    		
    		if(grp)
	    		for(var j=0;j<grp.getObjects().length;j++)
	    		{
	    			var item=grp.item(j);
	    			item.set({width:layerWidth*resCanRatio,height:layerHeight*resCanRatio});
	    			item.setCoords();
	    			frontCanvas.renderAll();
	    		}
    		frontCanvas.renderAll();
    		var grp2=backCanvas.item(0)
    		
    		if(grp2)
	    		for(var j=0;j<grp.getObjects().length;j++)
	    		{
	    			var item=grp.item(j);
	    			item.set({width:layerWidth*resCanRatio,height:layerHeight*resCanRatio});
	    			item.setCoords();
	    			backCanvas.renderAll();
	    		}
    		backCanvas.renderAll();
    		//alert(resCanRatio)
    		$scope.drawCanvas();
    		canvas.forEachObject(function(obj) 
			  {
			  	
				if(obj.get("shapeType")=="drawAreaGrp")
				{
					//alert(obj.get("shapeType"));
					
					
				}
				else
				{
					if(obj.get("originalRatWidth"))
					{
						obj.originX="left";
						obj.originY="top";
						canvas.renderAll()
						scaleRatioFlag=false;
						scaleRatioWidth=obj.get("originalRatWidth")*resCanRatio;
						scaleRatioHeight=obj.get("originalRatHeight")*resCanRatio;
						var left=obj.get("originalRatLeft")*resCanRatio;
						var top=obj.get("originalRatTop")*resCanRatio;
						//console.log(left+"\n"+resCanRatio)
						obj.set({left:left,top:top,
							width:scaleRatioWidth,
							height:scaleRatioHeight});
						obj.setCoords();
						canvas.renderAll()
					}
				}
				
				
						
			  });
		}
		$scope.zoomIn=function()
		{
			//alert("in")
			canvasScale=SCALE_FACTOR;
			viewWiseScale[currentView]=canvasScale;
			var marTop=-((canHeight * canvasScale)-canHeight)/2;
			var marLeft=-((canWidth * canvasScale)-canWidth)/2;
			var incrWidth=canWidth * canvasScale;
			var incrHeight=canHeight * canvasScale
			canvas.setHeight(incrHeight);
    		canvas.setWidth(incrWidth);
    		
    		if(currentView==0)
    		{
    			angular.element('.frontImage').css({'width':(incrWidth+"px"),'height':(incrHeight+"px")})
    		}
    		else
    		{
    			angular.element('.backImage').css({'width':(incrWidth+"px"),'height':(incrHeight+"px")})	
    		}
    		
    		selectedViewCanvas=(currentView==0)?frontCanvas:backCanvas;
    		selectedViewCanvas.setWidth(incrWidth)
    		selectedViewCanvas.setHeight(incrHeight)
    		var grp=selectedViewCanvas.item(0)
    		//console.log(grp)
    		//alert(grp.length)
    		
    		//alert(grp.getObjects().length)
    		if(grp)
    		{
	    		for(var j=0;j<grp.getObjects().length;j++)
	    		{
	    			var item=grp.item(j);
	    			item.set({width:layerWidth*resCanRatio*canvasScale,height:layerHeight*resCanRatio*canvasScale});
	    			item.setCoords();
	    			selectedViewCanvas.renderAll();
	    		}
	    		//console.log(canvasScale)
	    		//console.log(grp.getLeft())
	    		grp.set({left:grp.getLeft()*canvasScale})
	    		grp.setCoords();
	    	}
    		selectedViewCanvas.renderAll();
    		canvas.overlayImage.set({height:parseInt(toolProductData.views[currentView].drawAreas[0].drawH)*resCanRatio*canvasScale,
    			width:parseInt(toolProductData.views[currentView].drawAreas[0].drawW)*resCanRatio*canvasScale,
    			left:parseInt(toolProductData.views[currentView].drawAreas[0].drawX)*resCanRatio*canvasScale,
    			top:parseInt(toolProductData.views[currentView].drawAreas[0].drawY)*resCanRatio*canvasScale,
    			opacity:distressOpacity});
    		angular.element('.inner-canvas-holder-zoom').css({'marginLeft':(marLeft+"px"),'marginTop':(marTop+"px")})
			canvas.forEachObject(function(obj) 
			  {
				// alert(obj.get("shapeType"));
				  obj.scaleX= obj.scaleX*(SCALE_FACTOR);
				  obj.scaleY= obj.scaleY*(SCALE_FACTOR)
				  obj.left=parseInt(obj.get("left")*(SCALE_FACTOR))
				  obj.top=parseInt(obj.get("top")*(SCALE_FACTOR));	
				  obj.setCoords();
				  canvas.calcOffset();
				  canvas.renderAll();
				
				 // i++;
						
			  });		
		}
		$scope.zoomOut=function()
		{
			
			canvasScale=1;
			viewWiseScale[currentView]=canvasScale;
			var marTop=((canHeight * canvasScale)-canHeight)/2;
			var marLeft=((canWidth * canvasScale)-canWidth)/2;
			var incrWidth=canWidth * canvasScale;
			var incrHeight=canHeight * canvasScale
			canvas.setHeight(incrHeight);
    		canvas.setWidth(incrWidth);
    		if(currentView==0)
    		{
    			angular.element('.frontImage').css({'width':(incrWidth+"px"),'height':(incrHeight+"px")})
    		}
    		else
    		{
    			angular.element('.backImage').css({'width':(incrWidth+"px"),'height':(incrHeight+"px")})	
    		}
    		//alert(marLeft)
    		//alert(marTop)
    		selectedViewCanvas=(currentView==0)?frontCanvas:backCanvas;
    		selectedViewCanvas.setWidth(incrWidth)
    		selectedViewCanvas.setHeight(incrHeight)
    		var grp=selectedViewCanvas.item(0)
    		
    		if(grp)
    		{
	    		for(var j=0;j<grp.getObjects().length;j++)
	    		{
	    			//alert("js")
	    			var item=grp.item(j);
	    			item.set({width:layerWidth*resCanRatio,height:layerHeight*resCanRatio});
	    			item.setCoords();
	    			selectedViewCanvas.renderAll();
	    		}
	    		grp.set({left:layerX})
	    		grp.setCoords();
	    	}
    		selectedViewCanvas.renderAll();
    		angular.element('.inner-canvas-holder-zoom').css({'marginLeft':(marLeft+"px"),'marginTop':(marTop+"px")})
    		
    		var i = 0;
    		//alert(SCALE_FACTOR)
    		canvas.overlayImage.set({height:parseInt(toolProductData.views[currentView].drawAreas[0].drawH)*resCanRatio,
    			width:parseInt(toolProductData.views[currentView].drawAreas[0].drawW)*resCanRatio,
    			left:parseInt(toolProductData.views[currentView].drawAreas[0].drawX)*resCanRatio,
    			top:parseInt(toolProductData.views[currentView].drawAreas[0].drawY)*resCanRatio,
    			opacity:distressOpacity});
		  canvas.forEachObject(function(obj) 
		  {
			 
			  obj.scaleX= obj.scaleX*(1/SCALE_FACTOR);
			  obj.scaleY= obj.scaleY*(1/SCALE_FACTOR)
			  obj.left=parseInt(obj.get("left")*(1/SCALE_FACTOR))
			  obj.top=parseInt(obj.get("top")*(1/SCALE_FACTOR));	
			  obj.setCoords();
			  canvas.calcOffset();
			  canvas.renderAll();
			
			  i++;
					
		  });
		}
		
		
		$scope.zoomInOut=function()
		{
			if(zoomInOutStr=="zoomin")
			{
				zoomInOutStr="zoomout"
				angular.element("#zoomInOut i").attr("class",'zoom-minus-icon')
				var thumb='<i class="zoom-minus-icon"></i> zoom out'
				angular.element("#zoomInOut").html(thumb)
				$scope.zoomIn();
			}
			else
			{
				angular.element("#zoomInOut i").attr("class",'zoom-icon');
				var thumb='<i class="zoom-icon"></i> zoom in'
				angular.element("#zoomInOut").html(thumb)
				zoomInOutStr="zoomin"
				$scope.zoomOut()
			}
			
		}
	    
	    $scope.formValidationPrice=function()
	    {
	    	
	    	if($scope.nonDesigncheck==true)
	    	{
		    	$scope.designcheck=false;
				$scope.nonDesigncheck=true;
		    	var flag=true;
		    	if(angular.element(".buyDesignName").val())
		    	{
		    		angular.element(".buyDesignName").removeClass("errorInputBlock");
		    		flag=true;
		    		$scope.error1Flag=false;
		    	}
		    	else
		    	{
		    		angular.element(".buyDesignName").addClass("errorInputBlock");
		    		flag=false;
		    		$scope.error1Flag=true;
		    	}
		    	if(angular.element(".buyUserId").val())
		    	{
		    		var x=angular.element(".buyUserId").val();
		    		var atpos = x.indexOf("@");
				    var dotpos = x.lastIndexOf(".");
				    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) 
				    {
				    	angular.element(".buyUserId").addClass("errorInputBlock");
				    	flag=false;
				    	$scope.error2Flag=true;
				    	
				       // alert("Not a valid e-mail address");
				       //jquery(".email").siblings('span').css({"display":"block"});
				       
				    }
				    else
				    {
				    	angular.element(".buyUserId").removeClass("errorInputBlock");
				    	flag=true;
				    	$scope.error2Flag=false;
				    }
				    
		    	}
		    	else
		    	{
		    		angular.element(".buyUserId").addClass("errorInputBlock");
		    		$scope.error2Flag=true;
		    		flag=false;
		    	}
		    	if(angular.element(".buyUserIdConfirm").val())
		    	{
		    		if(angular.element(".buyUserId").val()==angular.element(".buyUserIdConfirm").val())
		    		{
		    			angular.element(".buyUserIdConfirm").removeClass("errorInputBlock");
		    			$scope.error3Flag=false;
		    			flag=true;
		    		}
		    		else
		    		{
		    			angular.element(".buyUserIdConfirm").addClass("errorInputBlock");
		    			$scope.error3Flag=true;
		    			flag=false;
		    		}
		    	}
		    	else
		    	{
		    		angular.element(".buyUserIdConfirm").addClass("errorInputBlock");
		    		$scope.error3Flag=true;
		    		flag=false;
		    	}
		    	if(flag)
		    	{
		    		popupManager.preloaderOpen("preloaderOpen",'Loading Cart...');
		    		$scope.designNameValidation("buynow");
		    	}
		    	else
		    	$scope.$apply();
		    }
		    else
		    {
		    	popupManager.preloaderOpen("preloaderOpen",'Loading Cart...');
		    	$scope.sendDataToPhp("buynow");
		    }
	    }
	    $scope.formValidation=function(str)
	    {
	    	if($scope.nonDesigncheck==true)
	    	{
		    	$scope.designcheck=false;
				$scope.nonDesigncheck=true;
		    	var flag=true;
		    	if(angular.element(".saveDesignName").val())
		    	{
		    		
		    	}
		    	else
		    	{
		    		angular.element(".saveDesignName").addClass("errorInputBlock");
		    		flag=false;
		    		$scope.error1Flag=true;
		    	}
		    	if(angular.element(".saveUserId").val())
		    	{
		    		var x=angular.element(".saveUserId").val();
		    		var atpos = x.indexOf("@");
				    var dotpos = x.lastIndexOf(".");
				    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) 
				    {
				    	angular.element(".saveUserId").addClass("errorInputBlock");
				    	flag=false;
				    	$scope.error2Flag=true;
				    	
				       // alert("Not a valid e-mail address");
				       //jquery(".email").siblings('span').css({"display":"block"});
				       
				    }
				    
		    	}
		    	else
		    	{
		    		angular.element(".saveUserId").addClass("errorInputBlock");
		    		$scope.error2Flag=true;
		    		flag=false;
		    	}
		    	if(flag)
		    	{
		    		popupManager.preloaderOpen("preloaderOpen",'Saving Design...');
	    	
		    		$scope.designNameValidation(str);
		    	}
		    	else
		    	$scope.$apply();
		    }
		    else
		    {
		    	popupManager.preloaderOpen("preloaderOpen",'Saving Design...');
	    	
		    	$scope.sendDataToPhp(str);
		    }
	    }
	    $scope.adminSaveAndSend=function()
	    {
	    	//console.log(selectCatArr)
	    	assignCategory='';
	    	adminDesignName='';
	    	var fg=false;
	    	angular.forEach(selectCatArr,function(obj,i)
	    	{
	    		if(obj.scope.trueFalseFlag)
	    		{
	    			assignCategory+=obj.subcatid+",";
	    		}
	    	})
	    	adminDesignName=angular.element(".design-name-txt").val();
	    	if(adminDesignName=='')
	    	{
	    		alert("Design Name Can't be blank");
	    		fg=false;
	    	}
	    	else if(assignCategory=='')
	    	{
	    		alert("please select assign Category")
	    		fg=false;
	    	}
	    	else
	    	fg=true;
	    	if(fg==true)
	    	{
	    		popupManager.close("selectCat");
	    		popupManager.preloaderOpen("preloaderOpen",'Saving Design...');
	    		$scope.sendDataToPhp();
	    	}
	    }
	    $scope.openSelectCatPopUp=function()
	    {
	    	//console.log(selectCatArr)
	    	angular.forEach(selectCatArr,function(obj,i)
	    	{
	    		obj.scope.trueFalseFlag=false;
	    		obj.scope.$apply();
	    		
	    	})
	    	popupManager.preloaderClose("");
	    	
	    	popupManager.open("selectCat")
	    	 //scope.sendDataToPhp();
	    }
	   
	    $scope.loadSelectProductCategory=function()
	    {
	    	//popupManager.preloaderOpen("preloaderOpen",'Loding...');
	    	var obj=new Object();
	    	obj.productId=productId;
	    	webServices.customServerCall($http,dataAccessUrl+'designersoftware/template/category',obj,'catselect',$scope);
	    	
	    	//webServices.customServerCall($http,siteUrl+'php/xml/catSelect.json',obj,'catselect',$scope);
	    }
	    $scope.designNameValidation=function(str)
	    {
	    	if(str=="buynow")
	    	{
	    		saveDesignName=angular.element(".buyDesignName").val();
	    		saveEmailId=angular.element(".buyUserId").val();
	    	}
	    	else 
	    	{
	    		saveDesignName=angular.element(".saveDesignName").val();
	    		$scope.saveDesignName=saveDesignName;
	    		saveEmailId=angular.element(".saveUserId").val();
	    	}
	    	
	    	var obj=new Object();
	    		obj.designName=saveDesignName
	    		obj.userEmailId=saveEmailId;
	    		webServices.customServerCall($http,dataAccessUrl+'designersoftware/user_design/check',obj,'userDesignCheck',$scope,'',str);
	    	//$scope.sendDataToPhp()
	    }
	    
	    $scope.resetSizeQty=function()
	    {
	    	var sizeLabel=sizeWiseQty;
	    	
	    	
	    	
	    	if(sizeLabel)
	    	{
		    	var splitArr=sizeLabel.split(",")
		    	var childs=angular.element(".item-sizes-container div.item-size input");
		    	angular.element(".zipCode").val(shippingZipCode);
		    	
		    	angular.forEach(childs,function(child,j)
		    	{
		    		var size='';
		    		var qty='';
		    		for(var i=0;i<splitArr.length;i++)
			    	{
			    		//console.log(sizeLabel2)
			    		var sizeLabel2=splitArr[i]
			    		//console.log(sizeLabel2)
			    		var splitArr2=sizeLabel2.split(" ");
			    		if(splitArr2.length==2)
			    		{
			    			 size=splitArr2[0];
			    			 qty=splitArr2[1]
			    		}
			    		else if(splitArr2.length==3)
			    		{
			    			 size=splitArr2[1];
			    			 qty=splitArr2[2];
			    		}
			    		if(parseInt(qty)>0)
				    	{
				    		//console.log(angular.element(child).attr("sizeValue")==size);
				    		if(angular.element(child).attr("sizeValue")==size)
				    		{
				    			angular.element(child).val(qty);
				    			break;
				    		}
				    	}
			    		
			    	}
			    	
			    	});
	    	
	    	
	    	}
	    	else
	    	{
	    		angular.element(".item-sizes-container div.item-size input").val('')
	    		angular.element(".zipCode").val('')
	    	}
	    }
	    $scope.addSizeInEditCase=function()
	    {
	    	var sizeLabel=editCanvasArr.sizeWiseQty;
	    	sizeWiseQty=editCanvasArr.sizeWiseQty;
	    	shippingZipCode=editCanvasArr.shippingZipCode;
	    	saveDesignName=editCanvasArr.designName;
	    	saveEmailId=editCanvasArr.userEmailId;
	    	if(sizeLabel)
	    	{
		    	var splitArr=sizeLabel.split(",")
		    	var childs=angular.element(".item-sizes-container div.item-size input");
		    	angular.element(".zipCode").val(editCanvasArr.shippingZipCode);
		    	
		    	angular.forEach(childs,function(child,j)
		    	{
		    		var size='';
		    		var qty='';
		    		for(var i=0;i<splitArr.length;i++)
			    	{
			    		//console.log(sizeLabel2)
			    		var sizeLabel2=splitArr[i]
			    		//console.log(sizeLabel2)
			    		var splitArr2=sizeLabel2.split(" ");
			    		if(splitArr2.length==2)
			    		{
			    			 size=splitArr2[0];
			    			 qty=splitArr2[1]
			    		}
			    		else if(splitArr2.length==3)
			    		{
			    			 size=splitArr2[1];
			    			 qty=splitArr2[2];
			    		}
			    		if(parseInt(qty)>0)
				    	{
				    		//console.log(angular.element(child).attr("sizeValue")==size);
				    		if(angular.element(child).attr("sizeValue")==size)
				    		{
				    			angular.element(child).val(qty);
				    			break;
				    		}
				    	}
			    		
			    	}
			    	//console.log(qty)
			    	//console.log(size)
			    	
			    	
		    	});
	    	
	    	//console.log(sizeLabel)
	    	//console.log(splitArr)
	    	
	    	//alert(childs.length)
	    	$scope.qtyAndZipValidation("editSize");
	    	}
	    }
	    $scope.qtyAndZipValidation=function(str)
	    {
	    	//alert(selectedQuantity)
	    	var childs=angular.element(".item-sizes-container div.item-size input");
	    	var qtyLabel='';
	    	totalQty=0;
	    	productQtyLabel=''
	    	angular.forEach(childs,function(child,i)
	    	{
	    		if(angular.element(child).val() && angular.element(child).val()!=0)
	    		{
	    			
	    			qtyLabel+=angular.element(child).parent().prev().text()+" "+angular.element(child).val()+","+" ";
	    			totalQty+=parseInt(angular.element(child).val());
	    		}
	    	});
	    	if(angular.element('.zipCode').val())
		    	if(totalQty>0)
		    	{
		    		var indx=qtyLabel.lastIndexOf(",")
		    		$scope.productQtyLabel="Qty:"+" "+totalQty+" "+"("+qtyLabel.slice(0,indx)+")";
		    		$scope.totalQty=totalQty;
		    		angular.element(".tab-content").addClass("tab-content2")
		    		angular.element(".viewWiseColorHolder").css({"display":"block"})
		    		$scope.qtyWarning=false;
		    		$scope.zipWarning=false;
		    		//$scope.discountPrice=discountPrice+" "+"ea";
		    		$scope.$apply();
		    		/***************************Call Server For Price********************************/
		    		productQtyLabel=qtyLabel.slice(0,indx);
		    		if(totalQty>=selectedQuantity)
		    		{
		    			//alert(hoodieFlag)
		    			var obj=new Object();
		    			obj.totalQty=totalQty;
		    			obj.hoodieFlag=hoodieFlag;
		    			obj.sizeWiseQty=productQtyLabel;
		    			sizeWiseQty=productQtyLabel;
		    			obj.productId=selectedProductId;
		    			obj.shippingZipCode=angular.element('.zipCode').val()
		    			shippingZipCode=angular.element('.zipCode').val();
		    			//webServices.customServerCall($http,siteUrl+'php/xml/price.json',obj,'priceData',$scope);
		    			webServices.customServerCall($http,dataAccessUrl+'designersoftware/price',obj,'priceData',$scope,str);
		    			//$scope.openGetPrice2PopUp()
		    		}
		    		else
		    		{
		    			$scope.minQtyWarning=true;
		    		}
		    		
		    	}
		    	else
		    	{
		    		angular.element(".viewWiseColorHolder").css({"display":"none"})
		    		angular.element(".tab-content").removeClass("tab-content2")
		    		$scope.qtyWarning=true;
		    		$scope.zipWarning=false;
		    		//alert("Quantity Can't be blank")
		    	}
		    	
		    else
		    {
		    	$scope.qtyWarning=false;
		    	$scope.zipWarning=true;
		    }
		   
		    //alert("please insert valid ZipCode")	
		    $scope.$apply();
	    	
	    	
	    }
	    
	    $scope.calculatePriceAndDissCount=function(str,edit)
	    {
	    	if(priceData)
	    	{
	    		var nameNumTotalPrice=0;
	    		if(nameCheck==true)
	    		nameNumTotalPrice+=nameColorPrice;
	    		if(numberCheck==true)
	    		nameNumTotalPrice+=numberColorPrice
	    		if(babyBlanketTitle=="blanket")
	    		var blanketBackPrice=(viewWiseColorArr[1].length)?10:0;
	    		else
	    		var blanketBackPrice=0;
		    	discountPrice=parseFloat(priceData.discountPrice)+frontInkColorPrice+backInkColorPrice+parseFloat(nameNumTotalPrice)+blanketBackPrice;
		    	discountPrice=discountPrice.toFixed(2);
		    	$scope.discountPriceOnly="$"+discountPrice;
		    	$scope.discountPrice=discountPrice;
		    	singlePrice=parseFloat(priceData.unitPrice)+frontInkColorPrice+backInkColorPrice+parseFloat(nameNumTotalPrice)+blanketBackPrice;
		    	singlePrice=singlePrice.toFixed(2);
		    	shippingAddress=priceData.shippingAddress;
		    	$scope.shippingAddress=shippingAddress;
		    	(singlePrice==discountPrice)?($scope.discountPrice="$"+discountPrice+" "+"ea"):($scope.discountPrice="$"+discountPrice+" "+"ea");
		    	(singlePrice==discountPrice)?($scope.disscountEnable=false):($scope.disscountEnable=true);
		    	totalPrice=0;
		    	discountPercentage=0;
		    	totalPriceWithOutDisscount=0
		    	totalPrice=discountPrice*totalQty;
		    	$scope.totalPrice="$"+totalPrice.toFixed(2);
		    	totalPriceWithOutDisscount=singlePrice*totalQty;
		    	$scope.totalPriceWithOutDisscount="$"+totalPriceWithOutDisscount.toFixed(2);
		    	//discountPercentage=((totalPriceWithOutDisscount-totalPrice)/totalPriceWithOutDisscount)*100;
		    	discountPercentage=((totalPriceWithOutDisscount-totalPrice)/totalPriceWithOutDisscount)*100;
		    	$scope.discountPercentage=parseInt(discountPercentage)+"%";
	    	}
	    	//$scope.$apply();
	    	if(!str)
	    	{
	    		if(!edit)
	    		$scope.openGetPrice2PopUp();
	    	}
	    	
	    	
	    }
	    $scope.addUploadedImageOnCanvas=function(obj)
	    {
	    	//alert(uploadedImageColorArr.length)
	    	$scope.uploadColorFlag=false;
				
	    	if(uploadedImageColorArr.length>0)
	    	{
	    		$scope.uploadSelectColorFlag=false;
		    	var src=siteUrl+"php/"+uploadThumb.replace('/thumb','/large');
		    	//alert(src)
		    	var originSrc=uploadThumb.replace('/thumb','/large');
		    	var sc=angular.element(".art-wrapper").scope();
		    	artSwitchValue=3;
				shapeType="UploadImage"
				if(uploadColorEdit==true)
				{
					var getObj=canvas.getActiveObject();
					if(getObj && getObj.get("clipUpload")=="upload")
					{
						getObj.set({uploadColorArr:uploadedImageColorArr})
						canvas.renderAll();
					}
				}
				else
				sc.addClipartOnCan(src,shapeType,originSrc)
				conert1Flag=false;
				clipUpload="upload";
				sc.artEditFlag=false;
				sc.artEditFlag1=true;
				sc.artEditFlag2=false;
				sc.chooseColorFlag=false;
				sc.convert1Flag=true;
				sc.uploadColorFlag=true;
				
				sc.switchValue = '3';
				angular.element(".convert1Color").attr("checked",conert1Flag)
				sc.$apply();
				angular.element(".addArtNav ul li a").removeClass("disabled");
				angular.element(".editPage").addClass("disabled");
				popupManager.close("uploadClose2");
			}
			else
			{
				$scope.uploadSelectColorFlag=true;
				$scope.$apply();
			}
	    }
	    $scope.selectAndDeselectImageColor=function(obj)
	    {
	    	//console.log(uploadedImageColorArr)
	    	var indx=angular.element(obj).parent().index();
	    	var deleteColor=angular.element(obj).attr("pcolor");
	    	//alert(deleteColor)
	    	if(uploadColorArr[indx].colorSelected==true)
	    	{
	    		uploadColorArr[indx].colorSelected=false
	    		angular.forEach(uploadedImageColorArr,function(ob,i)
	    		{
	    			//alert(ob.color)
	    			
	    			if(ob.color==deleteColor)
	    			{
	    				uploadedImageColorArr.splice(i,1);
	    				//console.log(uploadedImageColorArr)
	    				//alert("p")
	    				//break;	
	    			}
	    		});
	    	}
	    	else
	    	{
	    		var obj={'color':angular.element(obj).attr('pcolor'),'price':angular.element(obj).attr('cprice'),'indx':indx}
	    		uploadedImageColorArr.push(obj);
	    		uploadColorArr[indx].colorSelected=true
	    	}
	    	uploadColorArr[indx].$apply();
	    	//console.log(uploadedImageColorArr)
	    }
	    $scope.openGetPrice2PopUp=function()
	    {
	    	$scope.emptySection=false;
	    	$scope.nonEmptySection=true;
	    	canvas.discardActiveObject();
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
			{
				maintainDrawAreaArr[i].set({opacity:0});
				canvas.renderAll();
			}
			canvas.renderAll();
			previewArr[currentView]=canvas.toDataURL();
	    	
	    	//angular.element("#frontPreviewImg").attr("src",toolProductData.views[0].thumb)	
	    	//angular.element("#backPreviewImg").attr("src",toolProductData.views[1].thumb)
	    	angular.element("#frontPreviewImg").attr("src",frontCanvas.toDataURL())	
	    	angular.element("#backPreviewImg").attr("src",backCanvas.toDataURL())
	    	{
	    		angular.element("#frontCanImage").attr("src",previewArr[0])	
	    	}
	    	if(previewArr[1]!='')
	    	{
	    		angular.element("#backCanImage").attr("src",previewArr[1])	
	    	}
	    	//console.log(frontCanObjects)
	    	//console.log(backCanObjects)
	    	if(!frontCanObjects && !backCanObjects)
	    	{
	    		
	    		$scope.emptySection=true;
	    		$scope.nonEmptySection=false;
	    		
	    	}
	    	popupManager.close("getPriceClose");
	    	popupManager.open("getPrice2Open");
	    	if(!$scope.$$phase)
	    	{
	    		$scope.$apply();
	    	}
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
			{
				maintainDrawAreaArr[i].set({opacity:1});
				canvas.renderAll();
			}
	    }
	    $scope.calculateViewWiseColor=function()
	    {
	    	//alert("cal color")
	    	frontInkColorPrice=0;
	    	backInkColorPrice=0;
	    	(currentView==0)?(frontCanObjects=false):(backCanObjects=false);
	    	var objects=canvas.getObjects();
	    	var currentViewColorObject=new Object();
	    	viewWiseColorArr[currentView]=new Array();
	    	//alert(objects.length);
	    	angular.forEach(objects,function(object,i)
	    	{
	    		if(object.get("shapeType")!="drawArea")
	    		{
	    			
	    			(currentView==0)?(frontCanObjects=true):(backCanObjects=true);
	    			
	    			//if(object.get)
	    			if(object.get("shapeType")=="Text")
	    			{
		    			var patt=new RegExp(object.get("text_color"),'i')
		    			if(patt.test(object.get("outlineColor")))
		    			{
		    				currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
		    			}
		    			else
		    			{
		    				currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
		    				if(object.get("outlineColor"))
		    				currentViewColorObject[object.get("outlineColor")]={"color":object.get("outlineColor"),"price":object.get("textOutlineColorPrice")};
		    			}
	    			}
	    			if(object.get("shapeType")=="clipart")
	    			{
	    				currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
	    			}
	    			//if(object.get("shapeType")=="clipart")
	    			//{
	    				//currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
	    			//}
	    			if(object.get("shapeType")=="UploadImage")
	    			{
	    				if(object.get("convert1Flag")==false)
	    				{
	    					if(object.get("clipUpload")=="upload")
	    					{
		    					var arr=object.get("uploadColorArr");
		    					angular.forEach(arr,function(obj,i){
		    					currentViewColorObject[(obj.color)]={"color":obj.color,"price":obj.price};
		    					})
		    				}
		    				else
		    				{
		    					currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
		    				}
	    				}
	    				else
	    				{
	    					currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
	    				}
	    				
	    				//currentViewColorObject[object.get("text_color")]={"color":object.get("text_color"),"price":object.get("textColorPrice")};
	    			}
	    			
	    			//console.log(currentViewColorObject)
	    		}
	    	})
	    	angular.forEach(currentViewColorObject,function(value,key)
	    	{
	    		//console.log(value)
	    		//alert(value)
	    		//alert(key)
	    		//console.log(key)
	    		var obj={"color":value};
	    		viewWiseColorArr[currentView].push(obj)
	    	});
	    	//console.log(viewWiseColorArr)
	    	angular.forEach(viewWiseColorArr[0],function(value,i)
	    	{
	    		//console.log(value['color'].price)
	    		frontInkColorPrice+=parseFloat(value['color'].price)
	    	})
	    	angular.forEach(viewWiseColorArr[1],function(value,i){
	    		backInkColorPrice+=parseFloat(value['color'].price)
	    	})
	    	$scope.frontColorLenght=0;//(viewWiseColorArr[0].length);
	    	$scope.backColorLenght=0;//(viewWiseColorArr[1].length);
	    	
	    	$scope.calculatePriceAndDissCount(1)
	    	//console.log(frontInkColorPrice)
	    	//console.log(backInkColorPrice)
	    	if(!$scope.$$phase)
	    	{
	    		$scope.$apply();
	    	}
	    	
	    }
	    $scope.shareDesignToFriend=function()
	    {
	    	var obj=new Object();
	    	obj.userDesignId=userDesignId;
	    	obj.saveDesignName=saveDesignName;
	    	obj.friendsEmail=angular.element(".bunchOfEmils").val();
	    	obj.yourName=angular.element(".enterYourName").val();
	    	obj.message=angular.element(".saveTextArea").val();
	    	if(angular.element(".bunchOfEmils").val())
	    	webServices.customServerCall($http,dataAccessUrl+'designersoftware/template/share',obj,'shareDesign',$scope);	
	    	else
	    	{
	    		$scope.currectInfoF=false;
	   			 $scope.wrongInfoF=true;
	   			 $scope.$apply();
	    		//angular.element(".bunchOfEmils").val();
	    		//angular.element(".enterYourName").val();
	    		//angular.element(".saveTextArea").val();
	    	}
	    }
	    
	   
	    $scope.takePrintProof=function()
	    {
	    	
	    	
	    	angular.element(".print-name-value").attr("value",angular.element(".print-name-value").val())
	    	angular.element(".print-email-value").attr("value",angular.element(".print-email-value").val())
	    	angular.element(".print-phone-value").attr("value",angular.element(".print-phone-value").val())
	    	if(printPopup)
	    	printPopup.close();
	    	printPopup = window.open('', '_blank', 'width=850,height=620');
           printPopup.document.open();
           printPopup.document.write('<html><head><title>Flip Shop Printed Proof</title><link rel="stylesheet" type="text/css" href="'+siteUrl+'assets/css/print-proof.css" media="screen"/></head><body onload="window.print()" ><div class="print-proof-popup" style="display:block;"><div class="print-proof-page"><div class="print-content">' + angular.element(".print-proof-popup div.print-content").html() + '</div></div></div><script type="text/javascript" src="'+siteUrl+'libraryjs/jquery-1.10.2.min.js"></script><script type="text/javascript" src="'+siteUrl+'libraryjs/testjs.js"></script></body></html>');
           printPopup.document.close();
	    	
				
	    }
		$scope.printPopUp=function()
		{
			//alert(designChangeFlag)
			//alert(selectedProductName)
			$scope.productName = selectedProductName;
			if(designChangeFlag==true)
			$scope.openSaveDesignPopUp("print")
			else
			{
				$scope.setSizeOnPrint();
			}
		}
		$scope.setSizeOnPrint=function()
		{
			var sizeLabel=productQtyLabel;
	    	
	    	if(sizeLabel)
	    	{
		    	var splitArr=sizeLabel.split(",")
		    	var childs=angular.element(".print-sizes-container div.print-item-size input");
		    	
		    	
		    	angular.forEach(childs,function(child,j)
		    	{
		    		var size='';
		    		var qty='';
		    		for(var i=0;i<splitArr.length;i++)
			    	{
			    		//console.log(sizeLabel2)
			    		var sizeLabel2=splitArr[i]
			    		//console.log(sizeLabel2)
			    		var splitArr2=sizeLabel2.split(" ");
			    		if(splitArr2.length==2)
			    		{
			    			 size=splitArr2[0];
			    			 qty=splitArr2[1]
			    		}
			    		else if(splitArr2.length==3)
			    		{
			    			 size=splitArr2[1];
			    			 qty=splitArr2[2];
			    		}
			    		if(parseInt(qty)>0)
				    	{
				    		
				    		if(angular.element(child).attr("sizeValue")==size)
				    		{
				    			angular.element(child).attr("value",qty);
				    			angular.element(child).val(qty);
				    			break;
				    		}
				    	}
			    		
			    	}
			    	
			    	
			    	
		    	});
	    	
	    	
	    	}
	    	angular.element("#printFrontImg").attr("src",frontCanvas.toDataURL())
	    		for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:0});
						canvas.renderAll();
					}	
		    	angular.element("#printBackImg").attr("src",backCanvas.toDataURL())
		    	previewArr[currentView]=canvas.toDataURL();
		    	angular.element("#frontPrintImage").attr("src",previewArr[0])	
		    	if(previewArr[1]!='')
		    	{
		    		angular.element("#backPrintImage").attr("src",previewArr[1])	
		    	}
				popupManager.open('printPopUp')
				for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
					{
						maintainDrawAreaArr[i].set({opacity:1});
						canvas.renderAll();
					}
		}
	    $scope.openSaveDesignPopUp=function(str)
	    {
	    	if(str=="print")
	    	{
	    		angular.element("#saveDesignToAccount").text("Save And Print")
	    		angular.element("#saveSubHead").text("Please save your design before you print. We'll send you an email with a link to your design so you can use it at any time. ")
	    	}
	    	else
	    	{
	    		angular.element("#saveDesignToAccount").text("Save Design")
	    		angular.element("#saveSubHead").text("Save your design to use later, then share it with friends via email, Facebook, or Twitter.")
	    	}
	    	var scope = angular.element('.tool-wrap').scope();
			angular.element(".getPricePopUp2").css({
				"display" : "none"
			});
			//alert(loginType)
			if (loginType == "user") {
				angular.element(".saveDesignName").removeClass("errorInputBlock");
				angular.element(".saveUserId").removeClass("errorInputBlock");
				angular.element(".saveDesignName").val('');
				angular.element(".saveUserId").val('');
				scope.error1Flag = false;
				scope.error2Flag = false;
				//angular.element(".selectCheck").attr("checked",true);
				document.getElementById("reRadio").checked = true;
				if (saveDesignName) {
		
					scope.saveDesignName = saveDesignName;
					//alert(saveEmailId)
					scope.designcheck = true;
					scope.nonDesigncheck = false;
					angular.element(".saveUserId").val(saveEmailId);
				} else {
					scope.saveDesignName = saveDesignName;
					angular.element(".saveUserId").val('');
					scope.designcheck = false;
					scope.nonDesigncheck = true;
				}
				scope.$apply();
				//var injector = angular.element(this).injector()
				//var popUp = injector.get("popupManager");
				popupManager.open("saveOpen");
				//console.log(injector)
			} else
			{
				if(!selectCat)
				scope.loadSelectProductCategory();
				else
				scope.openSelectCatPopUp();
			}
	    }
	    /*************************PdfTestOnly***********************************/
	    $scope.genPdfTest=function()
	    {
	    	canvas.discardActiveObject();
	    	canvas.renderAll();
	    	$scope.dataArrays(currentView);
	    	//previewArr[currentView]=canvas.toDataURL();
	    	//canvasArr[currentView]=JSON.stringify(canvas);
	    	//console.log(assignCategory)
	    	var obj=new Object();
	    	if(loginType=="admin")
	    	{
	    		obj.assignCategory=assignCategory;
	    	}
	    	obj.hoodieFlag=hoodieFlag;
	    	obj.notes=notes;
	    	obj.loginType=loginType;
	    	obj.productId=selectedProductId;
	    	obj.colorId=productColorId;
	    	obj.sizeWiseQty=productQtyLabel;
	    	obj.totalQty=totalQty;
	    	obj.nameNumberSendInfoArr=nameNumberSendInfoArr;
	    	obj.nameNumberQuantity=nameNumberQuantity;
	    	obj.frontInkColorPrice=frontInkColorPrice;
	    	obj.backInkColorPrice=backInkColorPrice;
	    	obj.totalPrice=totalPrice;
	    	obj.colorValue=productColorValue;
	    	//obj.saveType=saveType;
	    	obj.designName=saveDesignName;//angular.element(".saveDesignName").val();
	    	obj.userEmailId=saveEmailId;//angular.element(".saveUserId").val();
	    	obj.userDesignId=userDesignId;
	    	//if(userDesignId)
	    	/********************************Need In Edit Section***************************************/
	    	obj.frontIndexObj=frontIndexObj;
	    	obj.backIndexObj=backIndexObj;
	    	//obj.canvasArr=canvasArr;
	    	obj.viewWiseScale=viewWiseScale;
	    	/************************End Edit Section*************************/
	    	//obj.previewArr=previewArr;
	    	//obj.frontPreviewArr=frontCanvas.toDataURL();
	    	//obj.backPreviewArr=backCanvas.toDataURL();
	    	//alert("p")
	    	//console.log(obj.frontPreviewArr);
	    	//console.log(obj.backPreviewArr);
	    	//alert("dhjgd")
	    	clippingDrawArea=new Array();
	    	obj.dataArr=new Array();
	    	for(var i=0;i<toolProductData.views.length;i++)
	    	{
	    		var obj2=new Object();
	    		obj2.viewId=toolProductData.views[i].viewId;
	    		obj2.src=toolProductData.views[i].src;
	    		obj2.printWidth =8.4;//toolProductData.views[i].drawAreas[0].drawW;
	    		obj2.printHeight =8;//toolProductData.views[i].drawAreas[0].drawH;
				obj2.viewWidth =toolProductData.views[i].drawAreas[0].drawW;
	    		obj2.viewHeight =toolProductData.views[i].drawAreas[0].drawH;
				obj2.printX=toolProductData.views[i].drawAreas[0].drawX;
	    		obj2.printY=toolProductData.views[i].drawAreas[0].drawY;
	    		obj2.objectScale=viewWiseScale[i];
				
	    		obj2.data=dataArray[i];
	    		obj.dataArr.push(obj2);
	    		//var obj={"drawX":toolProductData.views[i].drawAreas[i].drawX,"drawY":toolProductData.views[i].drawAreas[i].drawY};
	    		clippingDrawArea.push(toolProductData.views[i].drawAreas[0]);
	    		//clippingDrawArea.push(obj);	
	    	}
	    	//console.log(clippingDrawArea)
	    	obj.clippingDrawArea=clippingDrawArea;
	    	
	    	//console.log(obj.clippingDrawArea)
	    	//alert("jhgjdh")
	    	webServices.customServerCall($http,siteUrl+'pdffiles/pdfpassnext.php?action=generatePDF',obj,'testpdf');	
	    }
	    $scope.resetNameNumberTable=function()
	    {
	    	if(resetNameNumberTableArr)
	    	{
		    	if(resetNameNumberTableArr.length)
		    	{
		    		//console.log(resetNameNumberTableArr)
		    		var  len=angular.element(".textbox1");
		    		if(resetNameNumberTableArr.length>len.length)
		    		{
		    			var diff=resetNameNumberTableArr.length-len.length
		    			var scope = angular.element("#add-name").scope();
		    			for(var i=0;i<diff;i++)
		    			scope.addNameNumberRow()
		    			scope.$apply()
		    			
						
		    		}
		    		
		    		var  nameArr=angular.element(".textbox1");
		    		//alert(nameArr.length)
		    		var numArr=angular.element(".textbox2");
		    		var sizeArr=angular.element(".tableSizeHolder");
		    		angular.element(".textbox1").val('');
		    		angular.element(".textbox2").val('');
		    		angular.element(".tableSizeHolder").prop("selectedIndex",0);
		    		for(var i=0;i<resetNameNumberTableArr.length;i++)
		    		{
		    			///alert(resetNameNumberTableArr[i].rowIndx)
		    			var indx=parseInt(resetNameNumberTableArr[i].rowIndx)-1;
		    			//console.log(indx)
		    			angular.element(nameArr[indx]).val(resetNameNumberTableArr[i].name);
		    			angular.element(numArr[indx]).val(resetNameNumberTableArr[i].number);
		    			angular.element(sizeArr[indx]).prop("selectedIndex",resetNameNumberTableArr[i].selectIndx);
		    			
		    		}
		    	}
		    	else
		    	{
		    		angular.element(".textbox1").val('');
		    		angular.element(".textbox2").val('');
		    		angular.element(".tableSizeHolder").prop("selectedIndex",0);
		    	}
		    }
		    else
		    {
		    	angular.element(".textbox1").val('');
		    	angular.element(".textbox2").val('');
		    	angular.element(".tableSizeHolder").prop("selectedIndex",0);
		    }
	    }
	    $scope.sendDataToPhp=function(saveType)
	    {
	    	canvas.discardActiveObject();
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
			{
				maintainDrawAreaArr[i].set({opacity:0});
				canvas.renderAll();
			}
	    	canvas.renderAll();
	    	$scope.dataArrays(currentView);
	    	previewArr[currentView]=canvas.toDataURL();
	    	canvasArr[currentView]=JSON.stringify(canvas);
	    	//console.log(assignCategory)
	    	var obj=new Object();
	    	if(loginType=="admin")
	    	{
	    		obj.assignCategory=assignCategory;
	    		obj.adminDesignName=adminDesignName;
	    		//console.log(obj)
	    	}
	    	obj.hoodieFlag=hoodieFlag;
	    	obj.notes=notes;
	    	obj.canPrint=canPrint
	    	obj.loginType=loginType;
	    	obj.productId=selectedProductId;
	    	obj.colorId=productColorId;
	    	obj.sizeWiseQty=productQtyLabel;
	    	sizeWiseQty=productQtyLabel;
	    	obj.totalQty=totalQty;
	    	// obj.nameCheck=nameCheck;
	    	// obj.numberCheck=numberCheck;			//alert(totalPrice)
	    	obj.nameNumberSendInfoArr=nameNumberSendInfoArr;
	    	resetNameNumberTableArr=nameNumberSendInfoArr;
	    	obj.nameNumberQuantity=nameNumberQuantity;
	    	obj.frontInkColorPrice=frontInkColorPrice;
	    	obj.backInkColorPrice=backInkColorPrice;
	    	obj.totalPrice=totalPrice;
	    	obj.colorValue=productColorValue;
	    	obj.shippingZipCode=angular.element('.zipCode').val()
	    	shippingZipCode=obj.shippingZipCode;
			
	    	obj.saveType=saveType;
	    	
	    	if(saveType=="buynow")
	    	obj.sendEmailInfo=document.getElementById("buyNowSendMail").checked;
	    	else
	    	obj.sendEmailInfo=document.getElementById("saveNowSendMail").checked;
	    	
	    	obj.designName=saveDesignName;//angular.element(".saveDesignName").val();
	    	obj.userEmailId=saveEmailId;//angular.element(".saveUserId").val();
	    	if(editDesignFlag!="template")
	    	{
	    		obj.userDesignId=userDesignId;
	    	}
	    	
	    	
	    	//if(userDesignId)
	    	/********************************Need In Edit Section***************************************/
	    	obj.frontIndexObj=frontIndexObj;
	    	obj.backIndexObj=backIndexObj;
	    	obj.canvasArr=canvasArr;
	    	obj.viewWiseScale=viewWiseScale;
	    	/************************End Edit Section*************************/
	    	obj.previewArr=previewArr;
	    	obj.frontPreviewArr=frontCanvas.toDataURL();
	    	obj.backPreviewArr=backCanvas.toDataURL();
	    	//alert("p")
	    	//console.log(obj.frontPreviewArr);
	    	//console.log(obj.backPreviewArr);
	    	//alert("dhjgd")
	    	clippingDrawArea=new Array();
	    	obj.dataArr=new Array();
	    	for(var i=0;i<toolProductData.views.length;i++)
	    	{
	    		//console.log(pdfDrawAreaArr[i])
	    		var obj2=new Object();
	    		obj2.viewId=toolProductData.views[i].viewId;
	    		obj2.src=toolProductData.views[i].src;
	    		obj2.pdfScaleValue=pdfScaleValue;
	    		obj2.printWidth =toolProductData.views[i].printWidth;//8.4;//toolProductData.views[i].drawAreas[0].drawW;
	    		obj2.printHeight =toolProductData.views[i].printHeight;//toolProductData.views[i].drawAreas[0].drawH;
				obj2.viewWidth =toolProductData.views[i].drawAreas[0].drawW;
	    		obj2.viewHeight =toolProductData.views[i].drawAreas[0].drawH;
				obj2.printX=toolProductData.views[i].drawAreas[0].drawX;
	    		obj2.printY=toolProductData.views[i].drawAreas[0].drawY;
	    		obj2.objectScale=viewWiseScale[i];
				obj2.pdfDrawAreaArr=pdfDrawAreaArr[i];
	    		obj2.data=dataArray[i];
	    		obj.dataArr.push(obj2);
	    		//var obj={"drawX":toolProductData.views[i].drawAreas[i].drawX,"drawY":toolProductData.views[i].drawAreas[i].drawY};
	    		clippingDrawArea.push(toolProductData.views[i].drawAreas[0]);
	    		//clippingDrawArea.push(obj);	
	    	}
	    	//console.log(obj.dataArr)
	    	//alert("pawan")
	    	//console.log(clippingDrawArea)
	    	obj.clippingDrawArea=clippingDrawArea;
	    	
	    	//console.log(obj.clippingDrawArea)
	    //alert("jhgjdh")
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
			{
				maintainDrawAreaArr[i].set({opacity:0});
				canvas.renderAll();
			}
	    	webServices.customServerCall($http,dataAccessUrl+'designersoftware/template/save',obj,'saveDesign',$scope,'',saveType);	
	    	for(var i=(maintainDrawAreaArr.length-1);i>=0;i--)
			{
				maintainDrawAreaArr[i].set({opacity:1});
				canvas.renderAll();
			}
	    }
	    //alert($scope.windowW)
	    $scope.loadLayers=function(sc)
	    {
	    	viewLayerCount=0;
	    	viewLayerObj=new Array();
	    	frontIndexObj=new Array();
	    	backIndexObj=new Array();
	    	frontCanvas.clear();
	    	frontCanvas.renderAll();
	    	backCanvas.clear();
	    	backCanvas.renderAll();
	    	
	    	for(var i=0;i<toolProductData.views.length;i++)
	    	{
	    		
	    		//console.log(toolProductData.views[i].images)
	    		//alert(i)
	    		if(productType=="multilayer")
	    		{
	    			angular.forEach(toolProductData.views[i].images,function(layer,j)
	    			{
	    				if(i==0)
	    				{
	    					if(layer.color)
	    					{
	    						//if(editFlag==)
	    						var obj={'src':layer.src,'color':layer.color,'indx':layer.layerType,'layerId':layer.layerId}
	    						frontIndexObj.push(obj)
	    					}
	    					
	    				}
	    				if(i==1)
	    				{
	    					if(layer.color)
	    					{
	    						if(hoodiesOrBlanket=="Blankets")
	    						if(layer.layerType=="blanketborder")
	    						selectedBlanketLayerId=layer.layerId;
	    						var obj={'src':layer.src,'color':layer.color,'indx':layer.layerType,'layerId':layer.layerId}
	    						backIndexObj.push(obj)
	    					}
	    					
	    				}
	    				var hexColor="0x"+layer.color;
						var arr=hex2Rgb((hexColor));
						var rgbcolor='rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
	    				var obj={'src':layer.src,'color':layer.color,"viewDiff":i,'viewCan':j,'rgbcolor':rgbcolor,'indx':layer.layerType};
	    				viewLayerObj.push(obj)
	    			})
	    			if(sc)
	    			{
	    			sc.frontBackIndxObj=(currentView==0)?frontIndexObj:backIndexObj;
					sc.selectedLayerColorData=selectedLayerColorData;
					}
	    		}
	    		else
	    		{
	    			
	    			var obj={'src':toolProductData.views[i].src,'viewCan':0,"viewDiff":i};
	    			viewLayerObj.push(obj)
	    		}
	    		
		
	
	    	}
	    	img1[0]=new Array();
	    	img2[0]=new Array();
	    	if(editFlag=="edit" || editFlag=="template")
			{
			  	frontIndexObj=editCanvasArr.frontIndexObj;
			  	backIndexObj=editCanvasArr.backIndexObj;
			  	//console.log(backIndexObj)
			  	if(backIndexObj)
			  	if(backIndexObj[1])
			  	if(backIndexObj[1].indx=="blanketborder")
			  	{
			  		//console.log(backIndexObj)
			  		selectedBlanketLayerId=backIndexObj[1].layerId;
			  		viewLayerObj[(viewLayerObj.length-1)].src=backIndexObj[1].src;
			  	}
			  
			  	//console.log(selectedBlanketLayerId)	
			 }
			 //console.log(viewLayerObj)
			$scope.loadOneLayer()
			//console.log(frontIndexObj)
			

	    }
	    $scope.loadOneLayer=function()
	    {
	    	//alert("anas")
	    	//alert(viewLayerObj[viewLayerCount].src)
	    	fabric.Image.fromURL(viewLayerObj[viewLayerCount].src, function(img)
		  	{
		  		layerWidth=img.width;
		  		layerHeight=img.height;
		  		//alert(frontIndexObj[parseInt(viewLayerObj[viewLayerCount].viewCan)])
		  		
		  		if(productType=="multilayer")
		  		{
		  			//alert(viewLayerObj[viewLayerCount].indx)
		  			if(viewLayerObj[viewLayerCount].viewDiff==0)
				  	img1[0][viewLayerObj[viewLayerCount].viewCan] = img.set({name:"rawImage",width:layerWidth*resCanRatio,height:layerHeight*resCanRatio,layerIndx:viewLayerObj[viewLayerCount].indx});
				  	if(viewLayerObj[viewLayerCount].viewDiff==1)
				  	img2[0][viewLayerObj[viewLayerCount].viewCan] = img.set({name:"rawImage",width:layerWidth*resCanRatio,height:layerHeight*resCanRatio,layerIndx:viewLayerObj[viewLayerCount].indx});
		  		}
		  		else
		  		{
		  			if(viewLayerObj[viewLayerCount].viewDiff==0)
				  	img1[0][viewLayerObj[viewLayerCount].viewCan] = img.set({name:"rawImage",width:layerWidth*resCanRatio,height:layerHeight*resCanRatio,opacity:0});
				  	if(viewLayerObj[viewLayerCount].viewDiff==1)
				  	img2[0][viewLayerObj[viewLayerCount].viewCan] = img.set({name:"rawImage",width:layerWidth*resCanRatio,height:layerHeight*resCanRatio});
		  		}
		  		
			 /*************************For Color*********************/
			// alert(rawLayerCount)
			 if(viewLayerObj[viewLayerCount].color)
			  {
			  //	alert(viewLayerObj[viewLayerCount].src)
			  	global_SelectedItem=img;
			  	if(editFlag=="edit" || editFlag=="template")
			  	{
			  		var selSideObj=(viewLayerObj[viewLayerCount].viewDiff==0)?frontIndexObj:backIndexObj;
			  		angular.forEach(selSideObj,function(obj,i)
			  		{
			  			if(viewLayerObj[viewLayerCount].indx==obj.indx)
			  			{
			  				var hexColor="0x"+obj.color;
			  				//console.log(hexColor)
							var arr=hex2Rgb((hexColor));
							var rgbcolor='rgb('+arr[0]+','+arr[1]+','+arr[2]+')';
							colorPickerValue=rgbcolor;
							//break;
			  			}
			  		})
			  	}
			  	else
				colorPickerValue=viewLayerObj[viewLayerCount].rgbcolor;
				//alert(colorPickerValue)
				 global_SelectedItem.fill = colorPickerValue;
		 		 global_SelectedItem.filters[1] = new fabric.Image.filters.Invert();
		 		 global_SelectedItem.applyFilters(canvas.renderAll.bind(canvas));
		 		

			}

			  /******************************End Color****************************/
			  viewLayerCount++;
			 
			  if(viewLayerCount<=(viewLayerObj.length-1))
			  {
			  $scope.loadOneLayer();
			  }
			  else
			  {
			  	///alert("final")
			  	 layerX=((canWidth*1/resCanRatio-layerWidth)/2);
			  	 layerY=((canHeight*1/resCanRatio-layerHeight)/2);
				var grpObj=new fabric.Group(img1[0], {left:layerX,top:layerY,lockUniScaling:true,opacity:0,selectable:true,shapeType:"frontGrp"});
				var grpOb2=new fabric.Group(img2[0], {left:layerX,top:layerY,lockUniScaling:true,selectable:false,shapeType:"backGrp"});
			   		//currentGroup=grpObj;
			   		grpObj.animate('opacity',1,{
// 				
					onChange: frontCanvas.renderAll.bind(frontCanvas),
// 				
  					duration: 500,
 			 		easing: fabric.util.ease.ease,
 			 		onComplete:function(){
 			 			
						$scope.setOverlayImage(productColorValue);
 			 		}
					})
			   		frontCanvas.add(grpObj);
			  		//canvas.setActiveObject(grpObj)
			   		frontCanvas.renderAll();
			   		backCanvas.add(grpOb2);
			   		backCanvas.renderAll();
			   		$scope.addObjectLoaderVariable=false;
			   		if(!$scope.$$phase)
			   		$scope.$apply();
			   		//alert("anadi")
			   		if(editFlag=="edit" || editFlag=="template")
			   		{
			   			$scope.addSizeInEditCase();
			   		}
			   		editFlag=false;
			   		if(hoodiesOrBlanket=="Blankets")
			   		{
			   			$scope.loadBlanketBorders()
			   		}
			   		if(hoodieFlag=='true')
			   		popupManager.preloaderClose();
			   		
			   	}
		  });
	    	
	    }
	    $scope.loadBlanketBorders=function()
	    {
	    	var obj=new Object();
	    	obj.productId=selectedProductId;
	    	webServices.customServerCall($http,siteUrl+'php/xml/blanketBorder.json',obj,'blanketBorder',$scope);
	    }
	   $scope.dataArrays=function(current_view)
		{
			
			canvas.discardActiveObject();
			var objects=canvas.getObjects();
			
			var i = 0;
			dataArray[current_view]=new Array();
			canvas.forEachObject(function(obj) 
			{
				//console.log(obj);
				var rotationObj=canvas.item(i).get("oCoords").tl;
				if (canvas.item(i).get('name') == 'Text') 
				{
					
					//alert("dfjhjh")
					 dataArray[current_view].push({
					 	 'name'        : canvas.item(i).get('name'),
						 'text'	       :canvas.item(i).get('text'),
						 'x'           : canvas.item(i).get("originalRatLeft"),
						 'y'           : canvas.item(i).get("originalRatTop"),
						 'width'       : canvas.item(i).get("originalRatWidth"),
						 'height'      : canvas.item(i).get("originalRatHeight"),
						 'align'	   : canvas.item(i).get('align'),
						 'clipTitle'	   : canvas.item(i).get('clipTitle'),
						 'shapeType'	   : canvas.item(i).get('shapeType'),		
						 'rotation'    : canvas.item(i).getAngle(),
						 'color'    	   : canvas.item(i).get('text_color'),
						 'outlineColor':   canvas.item(i).get('outlineColor'),
						 'outlineWidth':   canvas.item(i).get('outlineWidth'),
						 'arcRotate':canvas.item(i).get('arcRotate'),
						 'roofGravity':canvas.item(i).get('roofGravity'),
						 'flipX':canvas.item(i).get('flipX'),
						 'flipY':canvas.item(i).get('flipY'), 
						 'rot'	   : canvas.item(i).get('rot'),	
						 'arc'    : canvas.item(i).get('arc'),
						 'distortValue'    	   : canvas.item(i).get('arc_Value'),
						 'effectName':          canvas.item(i).get('customEffectName'),
						 'font'		   :canvas.item(i).get('font'),
						 'fontId'	   :canvas.item(i).get('fontID'),
						 'fontTTF'	   :canvas.item(i).get('fontTTF')
						
						});
		
				
				//alert(dataArray[current_view][0].name)
				} 
				else if(canvas.item(i).get('shapeType') == 'Name')
				 {
				 	//alert("name")
				 	dataArray[current_view].push({
				 		'name' :canvas.item(i).get('shapeType'),
				 		'text' :canvas.item(i).get('text'),
				 		'color': canvas.item(i).get("text_color"),
				 		'clipTitle'	   : canvas.item(i).get('clipTitle'),
				 		'x'           : canvas.item(i).get("originalRatLeft"),
						'y'           : canvas.item(i).get("originalRatTop"),
						'width'       : canvas.item(i).get("originalRatWidth"),
						'height'      : canvas.item(i).get("originalRatHeight"),
				 		'fontTTF':(dirPath+"designertool/php/"+canvas.item(i).get('fontTTF')),
				 		'flipX':canvas.item(i).get('flipX'),
				 		'flipY':canvas.item(i).get('flipY'),
				 		'rotation'    : canvas.item(i).getAngle()
				 	});
				 }
				 else if(canvas.item(i).get('shapeType') == 'Number')
				 {
				 	
				 	dataArray[current_view].push({
				 		'name' :canvas.item(i).get('shapeType'),
				 		'text' :canvas.item(i).get('text'),
				 		'clipTitle'	   : canvas.item(i).get('clipTitle'),
				 		'color': canvas.item(i).get("text_color"),
				 		'x'           : canvas.item(i).get("originalRatLeft"),
						'y'           : canvas.item(i).get("originalRatTop"),
						'width'       : canvas.item(i).get("originalRatWidth"),
						'height'      : canvas.item(i).get("originalRatHeight"),
				 		'fontTTF':(dirPath+"designertool/php/"+canvas.item(i).get('fontTTF')),
				 		'flipX':canvas.item(i).get('flipX'),
				 		'flipY':canvas.item(i).get('flipY'),
				 		'rotation'    : canvas.item(i).getAngle()
				 	})
				 }
				 else if(canvas.item(i).get('shapeType') == 'clipart')
				 {
		 			//alert((dirPath+canvas.item(i).get('originalSrc')))
					dataArray[current_view].push({
						'name' : canvas.item(i).get('shapeType'),
						'x'           : canvas.item(i).get("originalRatLeft"),
						'y'           : canvas.item(i).get("originalRatTop"),
						'width'       : canvas.item(i).get("originalRatWidth"),
						'height'      : canvas.item(i).get("originalRatHeight"),
						'src':(dirPath+canvas.item(i).get('originalSrc')),
						'uploadColorArr':canvas.item(i).get('uploadColorArr'),
						'colorable':canvas.item(i).get('colorable'),
						'color':   canvas.item(i).get("text_color"),
						'clipTitle'	   : canvas.item(i).get('clipTitle'),
						'rotation'    : canvas.item(i).getAngle(),
						'flipX'       :canvas.item(i).get('flipX'),
						'flipY'       : canvas.item(i).get('flipY')
						
					 });
				 }
				 else if(canvas.item(i).get('shapeType') == 'UploadImage')
				 {
		 			
		 			if(canvas.item(i).get('clipUpload')=="upload")
		 			var src=dirPath+"designertool/php/"+canvas.item(i).get('originalSrc');
		 			else
		 			var src=dirPath+canvas.item(i).get('originalSrc');
					dataArray[current_view].push({
						 'name' : canvas.item(i).get('shapeType'),
						 'x'           : canvas.item(i).get("originalRatLeft"),
						 'y'           : canvas.item(i).get("originalRatTop"),
						 'width'       : canvas.item(i).get("originalRatWidth"),
						 'height'      : canvas.item(i).get("originalRatHeight"),
						 'src':src,
						 'clipTitle'	   : canvas.item(i).get('clipTitle'),
						 'convertSrc':(dirPath+"designertool/php/"+canvas.item(i).get('convertSrc')),
						  'effectSrc':(dirPath+"designertool/php/"+canvas.item(i).get('effectUrl')),
						 'convert1Flag':canvas.item(i).get('convert1Flag'),
						 'effectStr':canvas.item(i).get('effectUrl'),
						 "color":canvas.item(i).get("text_color"),
						 "clipUpload":canvas.item(i).get('clipUpload'),
						 'uploadColorArr':canvas.item(i).get('uploadColorArr'),
						 'rotation'    : canvas.item(i).getAngle(),
						 'flipX'       :canvas.item(i).get('flipX'),
						 'flipY'       : canvas.item(i).get('flipY')
						
					 });
				 }
		
				
				i++;
			});
			//console.log(dataArray)
		}
    $scope.windowW=angular.element(window).width();
    $scope.windowH=angular.element(window).height();
	$scope.savePopupX=Math.abs(($scope.windowW-angular.element('.saveYourDesignPopUp').width())/2);
   	$scope.savePopupY=Math.abs(($scope.windowH-angular.element('.saveYourDesignPopUp').height())/2);
   	$scope.artErrorX=Math.abs(($scope.windowW-angular.element('.artResizeErrorPopUp').width())/2);
   	$scope.artErrorY=Math.abs(($scope.windowH-angular.element('.artResizeErrorPopUp').height())/2);
   	$scope.adminDesignX=Math.abs(($scope.windowW-angular.element('.save-category-popup').width())/2);
   	$scope.adminDesignY=Math.abs(($scope.windowH-angular.element('.save-category-popup').height())/2);
   	
   	$scope.printX=Math.abs(($scope.windowW-angular.element('.print-proof-popup').width())/2);
   	$scope.printY=Math.abs(($scope.windowH-angular.element('.print-proof-popup').height())/2);
   	angular.element('.print-proof-popup').css({"left":$scope.printX+"px","top":$scope.printY+"px"})
   	angular.element('.save-category-popup').css({"left":$scope.adminDesignX+"px","top":$scope.adminDesignY+"px"})
   	angular.element('.artResizeErrorPopUp').css({"left":$scope.artErrorX+"px","top":$scope.artErrorY+"px"})
   	angular.element('.upload2PopUp').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
   	angular.element('.upload1PopUp').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
   	angular.element('.buyNowPopUp').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
    angular.element('.saveYourDesignPopUp').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
    angular.element('.saveYourDesignPopUp2').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
    angular.element('.getPricePopUp').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
    angular.element('.getPricePopUp2').css({"left":$scope.savePopupX+"px","top":$scope.savePopupY+"px"})
    
	    
}]);

function setOverlay(event)
{
	
}
