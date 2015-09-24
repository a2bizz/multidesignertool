<?php
class Sparx_Designersoftware_Model_Fonts extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/fonts');
    }  
    
    // Function to Get Collection of Fonts 
    public function getFontsCollection(){
		$fontCollection = Mage::getSingleton('fonts/fonts')->getCollection()
								->addFieldToFilter('status',1)
								->getData();
								
		return $fontCollection;
	} 
	
	// Function to Get Collection of Fonts 
    public function getFontsCollectionByCategoryId($fontCategoryId){
		$fontCollection = Mage::getSingleton('fonts/fonts')->getCollection()
								->addFieldToFilter('category_id',$fontCategoryId)
								->addFieldToFilter('status',1);								
								
		return $fontCollection;
	} 
}
