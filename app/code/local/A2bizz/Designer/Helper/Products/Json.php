<?php

class Sparx_Designersoftware_Helper_Products_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		$productId 		= $data['product'];
		$colorOptionId 	= $data['super_attribute'][272];
		
		$_product = Mage::getModel('designersoftware/product')->load($productId);
				
		if($_product->getTypeId() == "configurable"):
			$conf = Mage::getModel('catalog/product_type_configurable')->setProduct($_product);
			$simple_collection = $conf->getUsedProductCollection()->addAttributeToSelect('*')->addFilterByRequiredOptions();
			foreach($simple_collection as $simple_product){
				echo $simple_product->getSku() . " - " . $simple_product->getName() . " - " . Mage::helper('core')->currency($simple_product->getPrice()) . "<br>";
			}
		endif;
		
		return Mage::helper('core')->jsonEncode(Mage::getModel('designersoftware/product')->load($productId));			
	}	
}
