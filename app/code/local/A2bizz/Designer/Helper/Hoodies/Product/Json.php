<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		$productId = $data['productId'];
		//$data['product_id'] = '558';
		
		if($productId){
			$_product = Mage::getModel('catalog/product')->load($productId);
			
			$layers['productId'] 		= $productId;
			$layers['color']			= $_product->getColor();
			$layers['productType']		= "multilayer";
			$layers['sizesData']		= Mage::helper('designersoftware/hoodies_product_sizes')->getSizes($data);
			$layers['views']			= Mage::helper('designersoftware/hoodies_product_views')->getViews($data);
			$layers['productDetails'] 	= Mage::helper('designersoftware/hoodies_product_details')->getDetails($data);	
				
			return Mage::helper('core')->jsonEncode($layers);	
		} else {
			return 'product Id not found or is null';
		}
	}	
}
