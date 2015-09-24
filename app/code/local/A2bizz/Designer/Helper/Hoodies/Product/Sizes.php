<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Sizes extends Mage_Core_Helper_Abstract
{	
	public function getSizes($data){
		$productId = $data['productId'];
		
		$_product = Mage::getModel('catalog/product')->load($productId);
		
		$sizesArray[] = $this->getSizeJson($_product->getSize(), 'Youth');
		$sizesArray[] = $this->getSizeJson($_product->getSize(), 'Adult');
		$sizesArray[] = $this->getSizeJson($_product->getSize(), 'Plus');
		
		return $sizesArray;
	}
	
	public function getSizeJson($sizeString, $groupType){
		
		$sizeAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('size');
		$attr = Mage::getModel('catalog/resource_eav_attribute')->load($sizeAttributeId);
		
		$productSizeIdArray = explode(',',$sizeString);
		$groupTypefunction = 'get'.ucfirst($groupType).'Sizes';
				
		$sizeType = Mage::helper('designersoftware')->$groupTypefunction();
		
		$sizeIdArray = explode(',',$sizeType);
		$result = array_intersect($sizeIdArray, $productSizeIdArray);
		
				
		$sizeGroupArray['sizeGroupTitle'] = ucfirst($groupType);
		foreach($result as $sizeId){			
			$size_label = $attr->getSource()->getOptionText($sizeId);
			$size['id'] 	= $sizeId;
			$size['title'] 	= $size_label;
			
			$sizeArray[] = $size;
		}		
		$sizeGroupArray['sizes'] = $sizeArray;	
			
		return $sizeGroupArray;
	}
}
