<?php

class Sparx_Designersoftware_Helper_Color_Clip_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		
		$clipColorArray['colors'] = $this->getClipColors($data);		
		return Mage::helper('core')->jsonEncode($clipColorArray);					
	}
	
	public function getClipColors($data){
		$clipColorsCollection = Mage::getModel('color/color')->getCollection()
										->addFieldToFilter('clip_status',1)
										->addFieldToFilter('status',1)
										->setOrder('sort_order','ASC')
										->getData();
										
		foreach($clipColorsCollection as $color){
			$colorArray['colorId'] 	= $color['color_id'];
			$colorArray['optionId'] = $color['option_id'];
			$colorArray['title'] 	= $color['title'];
			$colorArray['code'] 	= $color['code'];
			$colorArray['price'] 	= $color['text_price'];
			
			$data[] = $colorArray;
			unset($colorArray);
		}
		return $data;
	}	
}
