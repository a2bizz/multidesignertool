<?php
class Sparx_Designersoftware_Model_Clipart_Category extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/clipart_category');
    }  
    
    // Function to Get Collection of Fonts 
    public function getCollection($parentId){
		$clipartCollection = Mage::getSingleton('clipart/category')->getCollection()
								->addFieldToFilter('parent_id',$parentId)
								->addFieldToFilter('status',1);								
								
		return $clipartCollection;
	} 
	
	// Function to Get Collection of Fonts 
    public function getFontsCategoryId($fontsId){		
		$fontsCollection = Mage::getModel('clipart/clipart')->getCollection()
								->addFieldToFilter('clipart_id',$fontsId)
								->addFieldToFilter('status',1)
								->getFirstItem();															
							
		return $fontsCollection->getCategoryId();
	} 
}
