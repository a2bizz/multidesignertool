<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Views extends Mage_Core_Helper_Abstract
{
	public function getViews($data){
			
		$views = Mage::helper('designersoftware/attributes_automation')->getAttributeOptions('rawproduct_views');
		
		foreach($views as $view):
		
			$viewDetails['viewName'] 	= $view['label'];	
			$viewDetails['viewId']		= $view['value'];
			$viewDetails['printWidth'] 	= $this->getPrintWidth($data['productId'], trim(ucfirst($view['label'])));
			$viewDetails['printHeight']	= $this->getPrintHeight($data['productId'], trim(ucfirst($view['label'])));				
			$viewDetails['src']			= "http://magento.thesparxitsolutions.com/magento/NR317/media/catalog/product/i/m/img1.jpg";
			$viewDetails['thumb']		= "http://magento.thesparxitsolutions.com/magento/NR317/media/catalog/product/thumb/i/m/img1.jpg";
			$viewDetails['colors']		= Mage::helper('designersoftware/hoodies_product_views_color')->getDefaultLayerColors($data, $view['value']);
			$viewDetails['images']		= Mage::helper('designersoftware/hoodies_product_views_images')->getLayerImages($data, $view['value']);
			$viewDetails['drawAreas']	= Mage::helper('designersoftware/hoodies_product_views_drawareas')->getDrawAreas($data, $view['label']);
			
			$viewsArray[] = $viewDetails;
		endforeach;
		
		return $viewsArray;			
	}
	
	public function getPrintWidth($hoodieSimpleProductId, $view){
		
		$product = Mage::getModel('catalog/product')->load($hoodieSimpleProductId);
		$printWidthFunction 	= 'getRawproduct'. $view .'PrintWidth';
		return $product->$printWidthFunction();
		
	}
	
	public function getPrintHeight($hoodieSimpleProductId, $view){
		
		$product = Mage::getModel('catalog/product')->load($hoodieSimpleProductId);
		$printHeightFunction 	= 'getRawproduct'. $view .'PrintHeight';
		return $product->$printHeightFunction();
		
	}	
}
