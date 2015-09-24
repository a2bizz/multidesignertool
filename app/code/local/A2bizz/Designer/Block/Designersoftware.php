<?php
class Sparx_Designersoftware_Block_Designersoftware extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
		
    }
    
	 public function getDesignersoftware()     
	 { 
		if (!$this->hasData('designersoftware')) {
			$this->setData('designersoftware', Mage::registry('designersoftware'));
		}
		return $this->getData('designersoftware');                
	 }
	
	// Function to Get Configuarable Color Image (Simple Product Image) 
	public function getProductImageUrl($productId){
		if(!empty($productId)){
			$_product = Mage::getModel('catalog/product')->load($productId);		 
			return $_product->getImage();
		}
	}
	
	// Function to check weather Admin is Login or Not
	public function isAdminLogin(){
		$sessionFilePath	= Mage::getBaseDir('session').DS.'sess_'.$_COOKIE['adminhtml'];		
		$sessionFile		= file_get_contents($sessionFilePath); 		
		$exp_cookie			= explode(';',$sessionFile);
		//echo '<pre>';print_r($exp_cookie);exit;
		
		if(count($exp_cookie) > 100){ 
			return true; 
		} else { 
			return false; 
		}		
	}
	
	public function getProductIdOfTemplate($templateId){
		$templateCollection = Mage::getModel('designersoftware/template')->getCollection()
					->addFieldToSelect('product_id')
					->addFieldToFilter('template_id',$templateId)
					->getFirstItem();					
				
		return 	$templateCollection->getProductId();		
	}
	
	public function getProductIdOfDesign($designId){
		$designCollection = Mage::getModel('designersoftware/user_design')->getCollection()
					->addFieldToSelect('product_id')
					->addFieldToFilter('design_id',$designId)
					->getFirstItem();					
				
		return 	$designCollection->getProductId();		
	}
	
	public function getProductType($productId){
		$collection = Mage::getModel('catalog/product')->load($productId);
		if($collection->getBlanketDesigner()):
			return true;
		else:
			return false;
		endif;
	}
}
