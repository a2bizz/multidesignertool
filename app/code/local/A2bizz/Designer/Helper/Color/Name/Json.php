<?php

class Sparx_Designersoftware_Helper_Color_Name_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		
		$clipColorArray['font'] = Mage::helper('designersoftware/color_name_font')->getFontPath();
		$clipColorArray['colors'] = $this->getNameColors($data);		
		return Mage::helper('core')->jsonEncode($clipColorArray);					
	}
	
	public function getNameColors($data){
		$clipColorsCollection = Mage::getModel('color/color')->getCollection()
										->addFieldToFilter('name_status',1)
										->addFieldToFilter('status',1)
										->setOrder('sort_order','ASC')
										->getData();
										
		foreach($clipColorsCollection as $color){
			$colorArray['colorId'] 	= $color['color_id'];
			$colorArray['optionId'] = $color['option_id'];
			$colorArray['title'] 	= $color['title'];
			$colorArray['code'] 	= $color['code'];
			$colorArray['price'] 	= $color['name_number_price'];
			
			$data[] = $colorArray;
			unset($colorArray);
		}
		return $data;
	}		
}
