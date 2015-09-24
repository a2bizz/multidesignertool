<?php

class Sparx_Designersoftware_Helper_Hoodies_Redirect extends Mage_Core_Helper_Abstract
{
	const DESIGNERTOOL_CATEGORY_ID 			= 420;
	const HOODIE_DESIGNERTOOL_CATEGORY_ID 	= 476;
	const HOODIE_CATEGORY_ID 				= 432;
	
	
	public function getUrl(){
		$domain 			= Mage::getUrl();
		$designerToolKey 	= $this->getDesignerToolUrlPath();
		$parameters 		= $this->getParameters();		
		
		$redirectUrl 		= $domain.$designerToolKey.$parameters;
		return $redirectUrl;
	}
	
	public function getDesignerToolUrlPath(){
		$_categoryCollection = Mage::getModel('catalog/category')->load(self::DESIGNERTOOL_CATEGORY_ID);		
		$urlPath = $_categoryCollection->getUrlPath();
		
		return $urlPath;
	}
	
	public function getParameters(){
		$defualtProductId = Mage::getModel('catalog/category')->load(self::HOODIE_CATEGORY_ID)
			 ->getProductCollection()
			 ->addAttributeToSelect('*') // add all attributes - optional
			 ->addAttributeToFilter('status', 1) // enabled
			 ->addAttributeToFilter('visibility', 4) //visibility in catalog,search			 
			 ->getFirstItem()->getId();
		
		//echo '<pre>';print_r($products);exit;
		if(!empty($defualtProductId)):
			$parameters = '?pid='. $defualtProductId .'&hf=true';	
		else:
			$parameters = '';	
		endif;
				
		return $parameters;
	}		
}
