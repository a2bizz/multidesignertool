<?php

class Sparx_Designersoftware_Helper_Popup_Product_Price_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){		
		$categoryId	= $data['categoryId'];
			
		$productsArray = array();
				
		/*$_configProductsCollection = Mage::getModel('designersoftware/products_configurable_product')->getConfigProductsCollection($categoryId);
		
			foreach($_configProductsCollection as $_configProduct){
				//echo '<pre>';print_r($_configProduct->getData());exit;
				$productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($_configProduct->getId());
				
				$array['productId'] 		= $productCollection->getId();
				$array['name'] 				= $productCollection->getName();
				$array['imageSrc'] 			= Mage::getBaseUrl('media').'catalog/product'.$productCollection->getImage();
				$array['sizeRange']			= Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId());
				$array['colorsAvailable']	= Mage::getModel('designersoftware/products_configurable_product')->getAssociatedProductCount($productCollection->getId());
				$array['minQty']			= Mage::getModel('designersoftware/products_product')->getMinQty($productCollection->getId());
				$array['priceGuide']		= "$ (out of $$$)";			
				
				$productsArray[] = $array;
			}	*/
			return Mage::helper('core')->jsonEncode($productsArray);			
		
	}	
}
