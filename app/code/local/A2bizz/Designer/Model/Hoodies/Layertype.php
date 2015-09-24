<?php

class Sparx_Designersoftware_Model_Hoodies_Layertype extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/hoodies_layertype');
    }    
    
    public function getLayertypeTitle($layertypeId){
		$layertypeModel = Mage::getModel('designersoftware/hoodies_layertype')->getCollection()
										->addFieldToFilter('layertype_id',$layertypeId)
										->addFieldToFilter('status',1)
										->getFirstItem();
										
		return $layertypeModel->getTitle();
	}
}
