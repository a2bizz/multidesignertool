<?php
class Sparx_Designersoftware_Model_Clipart extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/clipart');
    }  
    
    // Function to Get Collection of Fonts 
    public function getCollectionByCategoryId($categoryId){
		$clipartCollection = Mage::getSingleton('clipart/clipart')->getCollection()
								->addFieldToFilter('category_id',$categoryId)
								->addFieldToFilter('status',1);								
								
		return $clipartCollection;
	}
	
	public function getCollectionBySearchText($text){
		if(!empty($text)){
			$clipartCollection = Mage::getSingleton('clipart/clipart')->getCollection()
									->addFieldToFilter('title', array('like'=> '%'.$text.'%'))								
									->addFieldToFilter('status',1);								
									
			return $clipartCollection;
		}
	} 
}
