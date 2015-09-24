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
		
		$colorsCollection = Mage::getModel('color/color')->getAllColorsCollection();
		foreach($colorsCollection as $color):
			if(in_array($color->getId(), $colorsString)):
				$colors['title'] 		=  $color->getTitle();
				$colors['colorCode'] 	=  $color->getCode();
				$colors['colorId'] 		=  $color->getId();
				$colors['optionId'] 	=  $color->getOptionId();
				
				$colorArray[] = $colors;	
			endif;
		endforeach;
		/*echo '<pre>';print_r($colorsString);exit;
		foreach($colorsString as $colorId):
			$colorModel = Mage::getModel('color/color')->getColorCollection($colorId);
										
			$colors['title'] 		=  $colorModel->getTitle();
			$colors['colorCode'] 	=  $colorModel->getCode();
			$colors['colorId'] 		=  $colorModel->getId();
			$colors['optionId'] 	=  $colorModel->getOptionId();			
			
			
			$colorArray[] = $colors;				
		endforeach;*/						
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
		$colorsCollection = Mage::getModel('color/color')->getAllColorsCollection();
		foreach($colorsCollection as $color):
			if(in_array($color->getId(), $colorsString)):
				$colors['title'] 		=  $color->getTitle();
				$colors['colorCode'] 	=  $color->getCode();
				$colors['colorId'] 		=  $color->getId();
				$colors['optionId'] 	=  $color->getOptionId();
				
				$colorArray[] = $colors;	
			endif;
		endforeach;
		/*foreach($colorsString as $colorId):
			$colorModel = Mage::getModel('color/color')->getColorCollection($colorId);										
										
			$colors['title'] 		=  $colorModel->getTitle();
			$colors['colorCode'] 	=  $colorModel->getCode();
			$colors['colorId'] 		=  $colorModel->getId();
			$colors['optionId'] 	=  $colorModel->getOptionId();
			
			$colorArray[] = $colors;				
		endforeach;*/
		//echo '<pre>';print_r($_product->getData());exit;				
		return $colorArray;		
	}
	
	public function getColorCode($colorId){
		$colorModel = Mage::getModel('color/color')->getColorCollection($colorId);										
						
		return $colorModel->getCode();
	}		
}
