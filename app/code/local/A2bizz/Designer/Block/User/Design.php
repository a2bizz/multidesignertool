<?php
class Sparx_Designersoftware_Block_User_Design extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
		
    }
    
	public function getDesign()     
	{ 
		if (!$this->hasData('design')) {
			$this->setData('design', Mage::registry('design'));
		}
		return $this->getData('design');                
	}	
	
	public function getUserDesignByEmail($email){
		
		$collection = Mage::getModel('designersoftware/user_design')->getCollectionByEmail($email);
		
		return $collection;
	}
	
	public function getEmail(){
				
		$email = $this->getRequest()->getPost('email');
		
		
	}
}
