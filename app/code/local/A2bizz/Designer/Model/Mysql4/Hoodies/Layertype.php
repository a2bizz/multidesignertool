<?php

class Sparx_Designersoftware_Model_Mysql4_Hoodies_Layertype extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {    
        // Note that the designersoftware_id refers to the key field in your database table.
        $this->_init('designersoftware/hoodies_layertype', 'layertype_id');
    }
}
