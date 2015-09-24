<?php

class Sparx_Designersoftware_Helper_Clipart_Search_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){		
		
		$text = $data['searchText'];
		//$text = 'Butterfly';
				
		$clipartArray = array();			
		//$clipartCollection = Mage::getResourceModel('designersoftware/clipart');
		//echo '<pre>Re:';print_r($clipartCollection);exit;
		if(!empty($text))
			$clipartCollection = Mage::getModel('designersoftware/clipart')->getCollectionBySearchText($text);
		else 
			$clipartCollection = '';
		//echo '<pre>';print_r($clipartCollection);exit;
		
		foreach($clipartCollection as $clipart){
			$array['clipartId'] 			= $clipart->getId();
			$array['clipartCategoryId'] 	= $clipart->getCategoryId();
			$array['title']					= $clipart->getTitle();
			$array['thumb']					= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/files/clipart/thumb/'.$clipart->getFilename();
			//$array['original'] 				= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/files/clipart/original/'.$clipart->getFilename();
			//$array['thumb']					= 'media/files/clipart/thumb/'.$clipart->getFilename();
			$array['original'] 				= 'media/files/clipart/original/'.$clipart->getFilename();
			//$array['isDefault'] 			= Mage::helper('designersoftware')->isDefaultFont($fonts->getFontsId()); // True/ False
			
			$clipartArray[] = $array;
		}
		
		$clipartsArray['clipart'] = $clipartArray;		
		$cliparts['cliparts'] = $clipartsArray;	
		
		return $cliparts;			
		
	}	
}
