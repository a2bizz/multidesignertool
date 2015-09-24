<?php
class Sparx_Designersoftware_Model_Text_Outline extends Mage_Core_Model_Abstract
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/text_outline');
    }    
    
    public function getCollection(){
		$collection = Mage::getModel('text/outline')->getCollection()
							->addFieldToFilter('status',1)
							->getData();
		
		return $collection;
	}
}
