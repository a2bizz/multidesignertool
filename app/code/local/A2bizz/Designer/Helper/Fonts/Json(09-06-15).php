<?php

class Sparx_Designersoftware_Helper_Fonts_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){		
		//echo 'VARIABLE Names To Pass From JSTool END:<br><br>';
		//echo '&nbsp;&nbsp;&nbsp;1.fontsCategoryId<br>';
		//echo '<br>JSON<br><br>';
						
						
		$fontsCategoryId = $data['fontsCategoryId'];
		//$fontsCategoryId = 2;
				
		$fontsArray = array();			
		$fontsCollection = Mage::getModel('designersoftware/fonts')->getFontsCollectionByCategoryId($fontsCategoryId);
		
		foreach($fontsCollection as $fonts){
			$array['fontsId'] 			= $fonts->getFontsId();
			$array['fontsCategoryId'] 	= $fonts->getFontsCategoryId();
			$array['title']				= $fonts->getTitle();
			$array['imagePath']			= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/files/font/original/'.$fonts->getFilename();
			$array['ttf'] 				= Mage::getBaseDir().'/media/files/font/ttf/'.$fonts->getTtfName();
			$array['isDefault'] 		= Mage::helper('designersoftware')->isDefaultFont($fonts->getFontsId()); // True/ False
			
			$fontArray[] = $array;
		}
		
		$fontsFontArray['font'] = $fontArray;
		$fontsArray['fonts'] = $fontsFontArray;
		
		return Mage::helper('core')->jsonEncode($fontsArray);			
		
	}	
}
