<?php

class Sparx_Designersoftware_Helper_Text_Json extends Mage_Core_Helper_Abstract
{	 
	public function load(){
		
		$text['textShapes'] 	= Mage::helper('designersoftware/text_shapes')->getTextShapes();
		$text['colors'] 	= Mage::helper('designersoftware/text_color')->getColors();
		$text['textOutline'] 	= Mage::helper('designersoftware/text_outline')->getTextOutlines();
		
		// Add fonts Category Array
			$fontCat = Mage::helper('designersoftware/fonts_category_json')->load();
			foreach($fontCat as $key=>$category):
				$text[$key] = $category;
			break;
			endforeach;
		
		// ---------- END ------
		
		$textRoot['root'] = $text;
		return $textRoot;
	}	
}
