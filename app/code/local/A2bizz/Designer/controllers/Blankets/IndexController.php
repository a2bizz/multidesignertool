<?php
class Sparx_Designersoftware_Blankets_IndexController extends Mage_Core_Controller_Front_Action
{
    // It will call details of a Product (Configurable) for opening in Designer Tool
    public function indexAction(){			
		$this->loadLayout();     
		$this->renderLayout();
	}
		
	// First Tab of Designer Tool for Hoodies, We are accessing Data for First Tab
	public function swapItemAction(){		
		$return = Mage::helper('designersoftware/blankets_product_json')->load($this->getRequest()->getPost());	
		$this->getResponse()->setBody($return);
	}
	
	// First Tab of Designer Tool for Hoodies, We are accessing Data for First Tab
	public function layerColorsAction(){		
		$return = Mage::helper('designersoftware/hoodies_product_layer_colors')->load($this->getRequest()->getPost());	
		$this->getResponse()->setBody($return);
	}		
}
