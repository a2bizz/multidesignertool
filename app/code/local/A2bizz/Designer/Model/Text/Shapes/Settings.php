<?php
class Sparx_Designersoftware_Model_Text_Shapes_Settings extends Mage_Core_Model_Abstract
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/text_shapes_settings');
    }    
    
    public function getCollection(){
		$collection = Mage::getModel('text/shapes_settings')->getCollection()
							->addFieldToFilter('status',1)
							->getData();
		
		return $collection;
	}
	
	public function getCollectionById($settingsId){
		$collection = Mage::getModel('text/shapes_settings')->getCollection()
							->addFieldToFilter('settings_id',$settingsId)
							->addFieldToFilter('status',1)
							->getFirstItem()
							->getData();
		
		return $collection;
	}
}
