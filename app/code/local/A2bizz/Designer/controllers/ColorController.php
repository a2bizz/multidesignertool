<?php
class Sparx_Designersoftware_ColorController extends Mage_Core_Controller_Front_Action
{
    public function nameAction(){		
		$JSON = Mage::helper('designersoftware/color_name_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody($JSON);
	}	
	
	public function clipAction(){
		$JSON = Mage::helper('designersoftware/color_clip_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody($JSON);
	}
}
