<?php
class Sparx_Designersoftware_ClipartController extends Mage_Core_Controller_Front_Action
{
    public function categoryAction(){		
		$data = $this->getRequest()->getPost();
		$JSON = Mage::helper('designersoftware/clipart_category_json')->load($this->getRequest()->getPost());	
		// Add to Cache
		$cacheId = 'clip_category_'.$data['categoryId'];
		$JSON = Mage::getModel('designersoftware/config')->cache($cacheId, $JSON);
			
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($JSON));
	}	
	
	public function indexAction(){		
		$data = $this->getRequest()->getPost();
		$JSON = Mage::helper('designersoftware/clipart_json')->load($this->getRequest()->getPost());		
		
		// Add to Cache
		$cacheId = 'cliparts_'.$data['categoryId'];
		$JSON = Mage::getModel('designersoftware/config')->cache($cacheId, $JSON);
		
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($JSON));
	}
	
	public function searchAction(){		
		$data = $this->getRequest()->getPost();
		$JSON = Mage::helper('designersoftware/clipart_search_json')->load($this->getRequest()->getPost());		
		
		// Add to Cache
		$cacheId = 'clip_search_'.$data['searchText'];
		$JSON = Mage::getModel('designersoftware/config')->cache($cacheId, $JSON);
		
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($JSON));
	}	
    	
}
