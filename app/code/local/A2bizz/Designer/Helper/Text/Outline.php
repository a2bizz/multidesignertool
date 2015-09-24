<?php

class Sparx_Designersoftware_Helper_Text_Outline extends Mage_Core_Helper_Abstract
{	 
	public function getTextOutlines(){
		
		$textOutlineCollection = Mage::getModel('designersoftware/text_outline')->getCollection();
				
		foreach($textOutlineCollection as $outline){
			$outlineArray['id']			= $outline['outline_id'];
			$outlineArray['outlineName']= $outline['title'];
			
			//if($outline['value']>0):
			$outlineArray['value']		= $outline['value'];	
			//endif;
			
			$outlines[] = $outlineArray; 		
			unset($outlineArray);
		}
				
		return $outlines;
	}	
}
