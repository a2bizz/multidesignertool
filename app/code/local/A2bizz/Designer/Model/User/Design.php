<?php

class Sparx_Designersoftware_Model_User_Design extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/user_design');
    } 
    
    public function getCollectionByEmail($email){
		$collection = Mage::getModel('designersoftware/user_design')
							->getCollection()
							->addFieldToSelect('design_id')
							->addFieldToSelect('design_name')	
							->addFieldToSelect('update_time')							
							->addFieldToFilter('email',$email)
							->addFieldToFilter('status',1);
		
		return $collection;
							
	}  
}
