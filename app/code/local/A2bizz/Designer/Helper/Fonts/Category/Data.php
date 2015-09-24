<?php

class Sparx_Designersoftware_Helper_Fonts_Category_Data extends Mage_Core_Helper_Abstract
{
	public function getFontsCountInCategory($fontsCategoryId){		
		$fontsCollection = Mage::getModel('designersoftware/fonts')->getFontsCollectionByCategoryId($fontsCategoryId);	
		return count($fontsCollection);		
	}	
}
