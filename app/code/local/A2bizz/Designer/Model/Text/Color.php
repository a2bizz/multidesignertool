<?php
class Sparx_Designersoftware_Model_Text_Color extends Mage_Core_Model_Abstract
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/text_color');
    }    
    
    public function getCollection(){
		$collection = Mage::getModel('color/color')->getCollection()
							->addFieldToFilter('name_status',1)
							->addFieldToFilter('status',1)
							->setOrder('sort_order','ASC')
							->getData();
		
		return $collection;
	}
}
