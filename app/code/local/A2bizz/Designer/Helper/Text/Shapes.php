<?php

class Sparx_Designersoftware_Helper_Text_Shapes extends Mage_Core_Helper_Abstract
{	 
	public function getTextShapes(){
		
		$textShapesCollection = Mage::getModel('designersoftware/text_shapes')->getCollection();
				
		foreach($textShapesCollection as $shapes){
			$shapeArray['id']			= $shapes['shapes_id'];
			$shapeArray['name']			= $shapes['title'];
			$shapeArray['imagePath']	= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB). 'media/files/shapes/'. $shapes['filename'];
			$shapeArray['shapeSetting'] = Mage::helper('designersoftware/text_shapes_settings')->getSettings($shapes['settings']);
			
			$textShape['textShape'][]	= $shapeArray; 
		}
				
		return $textShape;
	}	
}
