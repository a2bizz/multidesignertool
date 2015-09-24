<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Layer_Colors extends Mage_Core_Helper_Abstract
{
	public function load($data){
		$colorDetails['colors']		= Mage::helper('designersoftware/hoodies_product_views_color')->getLayerColors($data);
						
		return Mage::helper('core')->jsonEncode($colorDetails);	
	}	
}
