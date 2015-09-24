<?php
class Sparx_Designersoftware_Model_Products extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/products');
    }    
}
