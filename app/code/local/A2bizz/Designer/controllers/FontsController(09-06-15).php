<?php
class Sparx_Designersoftware_FontsController extends Mage_Core_Controller_Front_Action
{
    public function categoryAction(){		
		$JSON = Mage::helper('designersoftware/fonts_category_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($JSON));
	}
	
    public function indexAction(){		
		$JSON = Mage::helper('designersoftware/fonts_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody($JSON);
	}	
}
