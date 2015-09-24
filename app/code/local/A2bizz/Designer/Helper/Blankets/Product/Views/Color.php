<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Views_Color extends Mage_Core_Helper_Abstract
{
	public function getDefaultLayerColors($data, $viewId){
		$productId = $data['productId'];
		
		$layersCollection = Mage::getModel('customtabs/layers')->getCollection()
										->addFieldToFilter('product_id',$productId)
										->addFieldToFilter('view_id',$viewId)
										->addFieldToFilter('status',1)																				
										->setOrder('sort_order', 'asc')
										->getFirstItem();
										
		
		$colorsString = unserialize($layersCollection->getColors());
		foreach($colorsString as $color):
			$colorModel = Mage::getModel('color/color')->getCollection()
										->addFieldToFilter('color_id',$color)
										->addFieldToFilter('status',1)
										->getFirstItem();
										
			$colors['title'] 		=  $colorModel->getTitle();
			$colors['colorCode'] 	=  $colorModel->getCode();
			$colors['colorId'] 		=  $colorModel->getId();
			$colors['optionId'] 	=  $colorModel->getOptionId();
			
			$colorArray[] = $colors;				
		endforeach;						
		//echo '<pre>';print_r($_product->getData());exit;				
		return $colorArray;			
	}
	
	public function getLayerColors($data){
		$layersId   = $data['layerId'];
		
		$layersCollection = Mage::getModel('customtabs/layers')->getCollection()										
										->addFieldToFilter('layers_id',$layersId)
										->addFieldToFilter('status',1)																				
										->setOrder('sort_order', 'asc')
										->getFirstItem();
										
		
		$colorsString = unserialize($layersCollection->getColors());
		foreach($colorsString as $color):
			$colorModel = Mage::getModel('color/color')->getCollection()
										->addFieldToFilter('color_id',$color)
										->addFieldToFilter('status',1)
										->getFirstItem();
										
			$colors['title'] 		=  $colorModel->getTitle();
			$colors['colorCode'] 	=  $colorModel->getCode();
			$colors['colorId'] 		=  $colorModel->getId();
			$colors['optionId'] 	=  $colorModel->getOptionId();
			
			$colorArray[] = $colors;				
		endforeach;						
		//echo '<pre>';print_r($_product->getData());exit;				
		return $colorArray;		
	}
	
	public function getColorCode($colorId){
		$colorModel = Mage::getModel('color/color')->getCollection()
						->addFieldToFilter('color_id',$colorId)
						->addFieldToFilter('status',1)
						->getFirstItem();
						
		return $colorModel->getCode();
	}		
}
