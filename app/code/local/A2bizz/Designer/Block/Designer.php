<?php
class A2bizz_Designer_Block_Designer extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
    // Check Store name is exist in URL or not
    public function checkStoreInUrl(){
		$storeInUrlCheck = Mage::getStoreConfig('web/url/use_store');
		if($storeInUrlCheck):
			return true;
		else:
			return false;
		endif;
	}
	
	// Check SEO rewrites is exist in URL or not
    public function indexDotPhpInUrlCheck(){
		$indexDotPhpInUrlCheck = Mage::getStoreConfig('web/seo/use_rewrites');
		if($indexDotPhpInUrlCheck):
			return false;
		else:
			return true;
		endif;
	}
    
    // Get Url to access file Web path
    public function getWebPath(){
		$storeInUrlAdd = '';
				
		if($this->checkStoreInUrl()):
			$storeInUrlAdd .= '../';	
		endif;
		if($this->indexDotPhpInUrlCheck()):
			$storeInUrlAdd .= '../';	
		endif;
		
		return Mage::getBaseUrl() . $storeInUrlAdd;
	}
	
	// Get base64encoded params and convert it to params Array
	public function getParams($REQUEST){
		return Mage::helper('designer/product')->getParams($REQUEST);		
	}
    
    public function getDesigner()     
    { 
        if (!$this->hasData('designer')) {
            $this->setData('designer', Mage::registry('designer'));
        }
        return $this->getData('designer');        
    }
    
    public function getStyles(){
		$collection = Mage::getModel('designer/style')->getCollection()->setOrder('sort_order','ASC')->addFieldToFilter('status',1);
		
		return $collection;
	}     
	
	public function getStyleDesignImage($styleId){		
		$collection = Mage::getModel('designer/style_design')->getCollection()
							->addFieldToFilter('style_id',$styleId)							
							->addFieldToFilter('status',1)
							->getFirstItem();

		//echo '<pre>';print_r($collection->getData());exit;
		$imageUrl = Mage::helper('designer/image')->createCompositeStyleDesignDirPath($collection->getCode(), unserialize($collection->getPartsLayersIds()));
		//echo $imageUrl['web'];exit;
		return $imageUrl['web'];
	}
	
	public function getStyleDesignCode($styleId){		
		$collection = Mage::getModel('designer/style_design')->getCollection()
							->addFieldToFilter('style_id',$styleId)							
							->addFieldToFilter('status',1)
							->getFirstItem();
		
		$code = $collection->getCode();
		//echo $imageUrl['web'];exit;
		return $code;
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
	// Function to Get Configuarable Color Image (Simple Product Image) 
	public function getProductImageUrl($productId){
		if(!empty($productId)){
			$_product = Mage::getModel('catalog/product')->load($productId);		 
			return $_product->getImage();
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
