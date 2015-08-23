//call updateUndoRedo() method on each change of canvas

		//undoredoVar[currentView][0] -------------jsonCount
		//undoredoVar[currentView][1] -------------undo
		//undoredoVar[currentView][2] -------------redo
		
		//var dataLessJson = new Array();
		
		var jsonCount = 0;
        var jsonIndex = 1;
		var undo = 0;
		var redo =0;
		var preUndo=0;
		var flag = true;

		
function updateUndoRedo()
		{
			//alert("update")
			//console.log('hit');
			//if(GetObj.hasStateChanged())
										//{//
												// console.log('json'+undoredoVar[currentView][0]);
												// console.log('undo'+undoredoVar[currentView][1]);
												// console.log('redo'+undoredoVar[currentView][2]);
												// console.log('hit');
												
												
											  if(undoredoVar[currentView][1]<undoredoVar[currentView][0])
											  {
											  	//alert("1")
												  for(i=undoredoVar[currentView][1];i<parseInt(undoredoVar[currentView][0]);i++)
													dataLessJson[currentView].pop();
													//dataLessJson[currentView][undoredoVar[currentView][0]] = JSON.stringify(canvas);
													//undoredoVar[currentView][1]++;
													undoredoVar[currentView][0] = undoredoVar[currentView][1];
													undoredoVar[currentView][2] = undoredoVar[currentView][1];
													dataLessJson[currentView][undoredoVar[currentView][0]] = JSON.stringify(canvas);
											  		//console.log(dataLessJson[currentView][undoredoVar[currentView][0]]);
													//console.log('diff');
											  }
											  else
											  {
											  	//alert(2)
											  	dataLessJson[currentView][undoredoVar[currentView][0]] = JSON.stringify(canvas);
											 	//console.log(dataLessJson[currentView][undoredoVar[currentView][0]]);
												undoredoVar[currentView][0]++;
												// console.log(undoredoVar[currentView][1])
												  undoredoVar[currentView][1]++
												 // console.log(undoredoVar[currentView][1])
												  undoredoVar[currentView][2]++;
												 // console.log('same');
												 
											  }
											  if(undoredoVar[currentView][0]>11)
											  {
											  	//alert(3)
												  updateArray();
											  }
											  /*console.log('json'+undoredoVar[currentView][0]);
												console.log('undo'+undoredoVar[currentView][1]);
												console.log('redo'+undoredoVar[currentView][2]);
												console.log('first');*/
												
											  //dataLessJson[currentView][undoredoVar[currentView][0]] = JSON.stringify(canvas);
											
											  /*undoredoVar[currentView][0]++;
											  undoredoVar[currentView][1]++
											  undoredoVar[currentView][2]++;*/
										//}
		}
		function updateArray()
		{
			for(i=0;i<11;i++)
			{
			  dataLessJson[currentView][i] = dataLessJson[currentView][i+1];
			  undoredoVar[currentView][0] = 11;
			  undoredoVar[currentView][1] =11;
			  undoredoVar[currentView][2] = 11;
			  undoredoVar[currentView][3] = true
			}
		}
		
		
		function unDo()
		{
			//alert("undo"+dataLessJson.length)
			if(dataLessJson.length)
			{
				
			//	console.log(undoredoVar[currentView][1]);
				//alert(undoredoVar[currentView][1] > 1);
					if(undoredoVar[currentView][1] > 1)
					{
						
						//console.log(1234);
						angular.element("#redo_disable").css({display:"none"});
						canvas.clear();
						undoredoVar[currentView][1]--;
						//console.log(undoredoVar[currentView][1]);
						try
						{
							
							var json = JSON.parse(dataLessJson[currentView][parseInt(undoredoVar[currentView][1])-1]);
							canvas.loadFromJSON(dataLessJson[currentView][parseInt(undoredoVar[currentView][1])-1],function()
							{
								//alert("sad")
								canvas.renderAll();
								testColor = 0;
								setTimeout(function(){
									if(!(canvas.getObjects().length))
									{
										
										var scope=angular.element(".tool-wrap").scope();
										if(scope)
										scope.drawCanvas();
									}
								if(canvas.getObjects().length>0)
								{
									var scope=angular.element(".tool-wrap").scope();
										if(scope)
										scope.drawCanvas();
									colorUpdate();
									//takeSnap();
								}},50);
								
							});
						
							 
						}
						catch(e)
						{
							
						}
						undoredoVar[currentView][2] = undoredoVar[currentView][1];
						if(flag == true)
							flag = false;
							/*console.log('json'+undoredoVar[currentView][0]);
				console.log('undo'+undoredoVar[currentView][1]);
				console.log('redo'+undoredoVar[currentView][2]);*/
						
					}
					else
					{
						//alert("now")
						angular.element("#redo_disable").css({left:'-78px'});
						angular.element("#redo_disable").css({display:'block'});
						
					}
				
			}
			//alert(undoredoVar[currentView][1]);
			
			//}
		}
		function reDo()
		{
			
			if(dataLessJson.length)
			{
				
				//console.log(undoredoVar[currentView][2]-1);
				if(flag == false)
				{
					flag = true;
						
					
					///console.log(undoredoVar[currentView][1]);
				canvas.clear();
					try
					{
						
					   var json = JSON.parse(dataLessJson[currentView][parseInt(undoredoVar[currentView][2])]);
					   canvas.loadFromJSON(dataLessJson[currentView][parseInt(undoredoVar[currentView][2])],function()
					   {
						   canvas.renderAll();
							testColor = 0;
							setTimeout(function(){
							if(!(canvas.getObjects().length))
									{
										
										var scope=angular.element(".tool-wrap").scope();
										if(scope)
										scope.drawCanvas();
									}	
							if(canvas.getObjects().length>0)
							{
								var scope=angular.element(".tool-wrap").scope();
										if(scope)
										scope.drawCanvas();
								colorUpdate();
								
							}},50);
							
						   });
					   //canvas.renderAll();
						// setTimeout(function(){
						// if(canvas.getObjects().length>0)
						// colorUpdate();
// 						
						// },200);
						
					}
					catch(e)
					{}
					//if(undoredoVar[currentView][1]<undoredoVar[currentView][0])
					undoredoVar[currentView][1]++;
					undoredoVar[currentView][2] = undoredoVar[currentView][1];
					/*console.log('json'+undoredoVar[currentView][0]);
					console.log('undo'+undoredoVar[currentView][1]);
					console.log('redo'+undoredoVar[currentView][2]);*/
				
				}
				else if(undoredoVar[currentView][1]<undoredoVar[currentView][0])
				{
					//$("#redo_disable").css({display:'none'});
				//console.log(undoredoVar[currentView][1]);
				undoredoVar[currentView][2]++;
			canvas.clear();
				try
				{
					
				   var json = JSON.parse(dataLessJson[currentView][parseInt(undoredoVar[currentView][2])-1]);
				   canvas.loadFromJSON(dataLessJson[currentView][parseInt(undoredoVar[currentView][2])-1],function(){
																													 //canvas.renderAll();
																													testColor = 0;
																													setTimeout(function(){
																													if(canvas.getObjects().length>0)
																													{
																														colorUpdate(testColor);
																														//livePreviews();
																													}},50);
																													
																													 });
				   //canvas.renderAll();
					setTimeout(function(){
					if(canvas.getObjects().length>0)
					var scope=angular.element(".tool-wrap").scope();
										if(scope)
										scope.drawCanvas();
								colorUpdate();
					
					},200);
					//livePreviews();
				}
				catch(e)
				{}
				//if(undoredoVar[currentView][1]<undoredoVar[currentView][0])
				undoredoVar[currentView][1]++;
				undoredoVar[currentView][2] = undoredoVar[currentView][1];
				/*console.log('json'+undoredoVar[currentView][0]);
				console.log('undo'+undoredoVar[currentView][1]);
				console.log('redo'+undoredoVar[currentView][2]);*/
				}
				else
				{
					//$("#redo_disable").css({left:'0px'});
					//$("#redo_disable").css({display:'block'});
				}
			}
		}
		
		
		function undoredoVarUpdate()
		{
			undoredoVar[currentView][0] = undoredoVar[currentView][0];
			undoredoVar[currentView][1] = undoredoVar[currentView][1];
			undoredoVar[currentView][2] = undoredoVar[currentView][2];
		}
		
		function newUpdateudoredo()
		{
			undoredoVar[currentView][0] = undoredoVar[currentView][0];
			undoredoVar[currentView][1] = undoredoVar[currentView][1];
			undoredoVar[currentView][2] = undoredoVar[currentView][2];
		}
		
		function colorUpdate()
		{
			
			var objects=canvas.getObjects();
			var filter=new fabric.Image.filters.Invert();
			canvas.forEachObject(function(obj)
			{
				
				if(obj.shapeType=="drawAreaGrp")
				{
					canvas.remove(obj);
					canvas.renderAll();
				}
				 if(obj.get("shapeType")=="Name")
  				{
  					
  					global_SelectedItem=obj;
					colorPickerValue= global_SelectedItem.getFill();
					console.log(global_SelectedItem.getFill())
					console.log(global_SelectedItem.get("text_color"))
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
					console.log(colorPickerValue)
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
			})
			var scope=angular.element(".tool-wrap").scope();
			if(scope)
			{
				scope.setOverlayImage();
				scope.drawCanvas();
				
			}
			
			
			
		}
