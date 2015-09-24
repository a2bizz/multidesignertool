<?php
class Sparx_Designersoftware_Model_Cart extends Sparx_Designersoftware_Model_Products_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/cart');
    }  
    
    // Function to Get Collection of Fonts 
    public function getDesignFilesString($itemId){
		
		$collection = Mage::getModel('designersoftware/user_design')
						->getCollection()
						->setOrder('design_id','DESC')
						->addFieldToSelect('design_file')
						->addFieldToFilter('item_id',$itemId)						
						->getFirstItem()
						->getData();
		//if($itemId==1371){
			//echo '<pre>';print_r($collection);exit;
		//}
		return $collection['design_file'];		
	} 	 
}
