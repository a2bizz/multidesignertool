rootApp.service('popupManager', function() 
{
	this.open=function(str,preloaderTitle)
	{
		angular.element('.overlay-wrapper').fadeIn(500)
		if(str=="nameNumber")
		angular.element('.enterNameNumberPopUp').fadeIn(500)
		else if(str=="nameSizeNumber")
		angular.element('.enterNameNumberSizePopUp').fadeIn(500)
		else if(str=="saveOpen")
		angular.element('.saveYourDesignPopUp').fadeIn(500)
		else if(str=="save2Open")
		angular.element('.saveYourDesignPopUp2').fadeIn(500)
		else if(str=="getPriceOpen")
		angular.element('.getPricePopUp').fadeIn(500)
		else if(str=="getPrice2Open")
		angular.element('.getPricePopUp2').fadeIn(500)
		else if(str=="priceOpen")
		angular.element('.buyNowPopUp').fadeIn(500)
		else if(str=="uploadOpen1")
		angular.element('.upload1PopUp').fadeIn(500)
		else if(str=="uploadOpen2")
		angular.element('.upload2PopUp').fadeIn(500)
		else if(str=="artErrorOpen")
		angular.element('.artResizeErrorPopUp').fadeIn(500)
		else if(str=="selectCat")
		angular.element('.save-category-popup').fadeIn(500)
		else if(str=="printPopUp")
		angular.element('.print-proof-popup').fadeIn(500)
		else if(str=="hoodiesOpen")
		angular.element('.swapItemHoodiesPopup').fadeIn(500)
		else
		angular.element('.swapItemPopup').fadeIn(500)
		
	}
	this.close=function(str)
	{
		//alert(str)
		angular.element('.overlay-wrapper').fadeOut(500);
		if(str=="addNameNumberClose")
		{
			angular.element('.enterNameNumberPopUp').fadeOut(500)
		}
		else if(str=="addNameNumberSizeClose")
		angular.element('.enterNameNumberSizePopUp').fadeOut(500)
		else if(str=="saveClose")
		angular.element('.saveYourDesignPopUp').fadeOut(500)
		else if(str=="save2Close")
		angular.element('.saveYourDesignPopUp2').fadeOut(500)
		else if(str=="getPriceClose")
		angular.element('.getPricePopUp').fadeOut(500)
		else if(str=="getPrice2Close")
		angular.element('.getPricePopUp2').fadeOut(500)
		else if(str=="preloaderClose")
		{
			angular.element('.preloaderHolder').fadeOut(500)
		}
		else if(str=="priceClose")
		angular.element('.buyNowPopUp').fadeOut(500)
		else if(str=="uploadClose1")
		angular.element('.upload1PopUp').fadeOut(500)
		else if(str=="uploadClose2")
		angular.element('.upload2PopUp').fadeOut(500)
		
		else if(str=="artErrorClose")
		angular.element('.artResizeErrorPopUp').fadeOut(500)
		else if(str=="selectCat")
		angular.element('.save-category-popup').fadeOut(500)
		else if(str=="printPopUp")
		angular.element('.print-proof-popup').fadeOut(500)
		else if(str=="hoodiesClose")
		angular.element('.swapItemHoodiesPopup').fadeOut(500)
		else
    	angular.element('.swapItemPopup').fadeOut(500)
	}
	this.preloaderOpen=function(str,preloaderTitle)
	{
		angular.element('.preloader-overlay-wrapper').fadeIn(500)
		angular.element(".preloaderHeading").text(preloaderTitle)
		angular.element('.preloaderHolder').fadeIn(500)
	}
	this.preloaderClose=function()
	{
		angular.element('.preloader-overlay-wrapper').fadeOut(500);
		angular.element('.preloaderHolder').fadeOut(500)
	}	
})