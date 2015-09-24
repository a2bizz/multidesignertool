<?php
class Sparx_Designersoftware_PopupController extends Mage_Core_Controller_Front_Action
{
    // Popup Category and SubCategory Section Json is Provided here
	public function categoryAction(){		
		$JSON = Mage::helper('designersoftware/popup_category_json')->load($this->getRequest()->getPost());	
		$this->getResponse()->setBody($JSON);
	}
	
	// Popup Product List Section Json is Provided here
	public function productlistAction(){
		$data = $this->getRequest()->getPost();
		$JSON = Mage::helper('designersoftware/popup_product_list_json')->load($this->getRequest()->getPost());	
		
		$cacheId = 'popup_productlist_'.$data['categoryId'];
		$JSON = Mage::getModel('designersoftware/config')->cache($cacheId, $JSON);
		
		$this->getResponse()->setBody($JSON);
	}	
	
	// Popup Product Price Section Json is Provided here
	public function getPriceAction(){
		$JSON = Mage::helper('designersoftware/popup_product_price_json')->load($this->getRequest()->getPost());	
		$this->getResponse()->setBody($JSON);
	}
        
}
