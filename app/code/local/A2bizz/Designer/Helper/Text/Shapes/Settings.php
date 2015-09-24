<?php

class Sparx_Designersoftware_Helper_Text_Shapes_Settings extends Mage_Core_Helper_Abstract
{	 
	public function getSettings($shapeSettings){	
		if($shapeSettings=='N;' || empty($shapeSettings)){
			return '';
		} else {
			$shapeSettings = unserialize($shapeSettings);	
			foreach($shapeSettings as $settingsId):
				$settingsCollection = Mage::getModel('designersoftware/text_shapes_settings')->getCollectionById($settingsId);
				$settingArray['id']				= $settingsCollection['settings_id'];
				$settingArray['settingName']	= $settingsCollection['title'];
				$settingArray['value']			= '90';
				
				$settings[] = $settingArray;				
			endforeach;
			
			return $settings;
		}		
	}	
}
