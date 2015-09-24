<?php
class Sparx_Designersoftware_Model_Fonts_Category extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/fonts_category');
    }  
    
    // Function to Get Collection of Fonts 
    public function getCollection(){
		$fontCollection = Mage::getSingleton('fonts/category')->getCollection()
								->addFieldToFilter('status',1);								
								
		return $fontCollection;
	} 
	
	// Function to Get Collection of Fonts 
    public function getFontsCategoryId($fontsId){		
		$fontsCollection = Mage::getModel('fonts/fonts')->getCollection()
								->addFieldToFilter('fonts_id',$fontsId)
								->addFieldToFilter('status',1)
								->getFirstItem();															
							
		return $fontsCollection->getCategoryId();
	} 
}
