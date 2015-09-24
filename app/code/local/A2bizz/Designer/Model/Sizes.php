<?php
class Sparx_Designersoftware_Model_Sizes extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/sizes');
    }  
    
    // Function to Get Collection of Fonts 
    public function getSizesCollection(){
		$sizeAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('size');
		$attr = Mage::getModel('catalog/resource_eav_attribute')->load($sizeAttributeId);			
		$colorArray = $attr->getSource()->getAllOptions(false);
												
		return $colorArray;
	} 	
}
