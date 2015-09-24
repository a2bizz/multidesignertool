<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Views_Drawareas extends Mage_Core_Helper_Abstract
{
	public function getDrawAreas($data, $viewLabel){
		$productId = $data['productId'];
		$drawArray = Mage::helper('designersoftware/products_configurable_product')->getViewDrawAreas($productId, trim(strtolower($viewLabel)));
		return $drawArray;			
	}	
}
