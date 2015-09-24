<?php

class Sparx_Designersoftware_Model_Hoodies_Product extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/hoodies_product');
    }    
    
   // Enter Category Id, and will return All products and their data collection
	public function getHoodiesDesignerProducts($categoryId){
			$_productsCollection = Mage::getModel('catalog/category')->load($categoryId)
					 ->getProductCollection()
					 ->addAttributeToSelect('*') // add all attributes - optional
					 ->addAttributeToFilter('designer_product', 1) // enabled
					 ->addAttributeToFilter('status', 1) // enabled
					 ->addAttributeToFilter('visibility', 4) //visibility in catalog,search
					 ->addAttributeToFilter('type_id', array('eq' => 'simple'));	 
								
			//echo '<pre>';print_r($_productsCollection->getData());exit;
			return $_productsCollection;		
	}
}
