<?php

class Sparx_Designersoftware_Helper_Color_Name_Font extends Mage_Core_Helper_Abstract
{
	public function getFontPath($data){
		$fontId = Mage::helper('designersoftware')->getAddNameFontsId();
		
		$collection = Mage::getModel('fonts/fonts')->getCollection()
							->addFieldToFilter('fonts_id',$fontId)
							->addFieldToFilter('status',1)
							->getFirstItem();	
							
				
		$ttfPath = Mage::getBaseDir(). DS . 'media' . DS . 'files' . DS . 'font'.  DS . 'ttf' . DS .$collection->getTtfName();
		return $ttfPath;
	}			
}
