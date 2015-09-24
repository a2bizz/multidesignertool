<?php

class Sparx_Designersoftware_Helper_Text_Color extends Mage_Core_Helper_Abstract
{	 
	public function getColors(){
		
		$colorCollection = Mage::getModel('designersoftware/text_color')->getCollection();		
		
		$i=0;	
		foreach($colorCollection as $color){
			$colorData['id']			= $color['color_id'];
			$colorData['optionId']		= $color['option_id'];
			$colorData['name']			= $color['title'];
			$colorData['code']			= $color['code'];
			$colorData['price']			= '1';
			if($i==0){
				$i++;
				$colorData['isDefault']		= '1';
			}
			else 
				$colorData['isDefault']		= '0';
				
			$colorData['denoteColor']	= false;
			$colorData['selectedColor']	= false;
			
			$colorArray['color'][]	= $colorData; 
		}
				
		return $colorArray;
	}	
}
