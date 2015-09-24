<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Details extends Mage_Core_Helper_Abstract
{
	public function getDetails($data){
		$productId = $data['productId'];
		//$productId = 558;	
		
		if($productId){		
			// Get All Color Details of A Configurable Product
			$productCollection = Mage::getModel('catalog/product')->load($productId);			
			$dataArray = array();
			
			$listDesc['line1'] = "6.1 oz. 100% pre-shrunk cotton; Heather, Antique, and Safety colors are poly/cotton blends";
			$listDesc['line2'] = "Sturdy heavyweight cotton";
			$listDesc['line3'] = "Double-needle stitched for durability";
			$listDesc['line4'] = "Huge color selection";
							
			$dataArray['item'] 				= $productCollection->getName();
			$dataArray['sizeRange'] 		= Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId())." Generous fit";
			$dataArray['defaultColorId'] 	= $productCollection->getColor(); // Color Option Id
			$dataArray['defaultColorTitle'] = $this->getAttributeOptionLabelByOptionId($productCollection->getColor());
			$dataArray['defaultColorValue'] = $this->getAttributeOptionValueByOptionId($productCollection->getColor());			
			$dataArray['defaultSizeRange'] 	= Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId());
			$dataArray['defaultMinQuantity']= Mage::getModel('designersoftware/products_product')->getMinQty($productCollection->getId());
			$dataArray['decoration'] 		= "Screen printing or high-quality digital printing";
			$dataArray['deliveryTime']	 	= "Free 2-week / Rush 1-week";
			$dataArray['minimumOrder']	 	= "1 piece";
			$dataArray['title1'] 			= "Our best selling t-shirt! This style fits your group - and your budget.";
			$dataArray['title2'] 			= "A great look. Priced right. And this t-shirt feels softer with every wash - it\'s no wonder our customers love this ultra popular style!";
			$dataArray['listTitle'] 		= $listDesc;
			
					return $dataArray;	 		
		}
	}
	
	public function getAttributeOptionLabelByOptionId($optionId){
			$colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');
			
			$attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
			$color_label = $attr->getSource()->getOptionText($optionId);
			
			return $color_label;
	}
	
	public function getAttributeOptionValueByOptionId($optionId){
			$colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');
			
			$attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
			//echo '<pre>';print_r($attr->getSource()->getOption($optionId));exit;
			$colorArray = $attr->getSource()->getAllOptions(false);
			foreach($colorArray as $color){
				if($color['value']==$optionId){
					$color_value = $color['details'];
					return $color_value;
				}
			}			
	}	
}
