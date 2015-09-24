<?php
class Sparx_Designersoftware_TextController extends Mage_Core_Controller_Front_Action
{
    public function indexAction(){		
		
		$JSON = Mage::helper('designersoftware/text_json')->load($this->getRequest()->getPost());
		
		$cacheId = 'text_index';
		$JSON = Mage::getModel('designersoftware/config')->cache($cacheId, $JSON);
				
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($JSON));
		
	}    	
}
