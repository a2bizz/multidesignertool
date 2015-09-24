<?php
class Sparx_Designersoftware_User_DesignController extends Mage_Core_Controller_Front_Action
{
    public function checkAction(){
		$data = $this->getRequest()->getPost();	
		//echo print_r($data);exit;
		
		if (isset($data['designName']) && !empty($data['designName']) && isset($data['userEmailId']) && !empty($data['userEmailId'])) {
			$collection = Mage::getModel('designersoftware/user_design')->getCollection()
						->addFieldToFilter('design_name',$data['designName'])
						->addFieldToFilter('email', $data['userEmailId'])
						->getFirstItem();						
			//echo '<pre>';print_r($collection->getData());exit;			
			
			if( count($collection->getData()) > 0 ):
				$check['error']			= 'true';
				$check['userDesignId']	= $collection->getId();
				$check['designName']	= $collection->getDesignName();
				$check['email']			= $collection->getEmail(); 
				$check['url']			= Mage::getUrl('form_popup_another');
				
				$JSON = Mage::helper('core')->jsonEncode($check);  
				$this->getResponse()->setBody($JSON);
		   else:
				$check['error'] = 'false';   
				
				$JSON = Mage::helper('core')->jsonEncode($check);
				$this->getResponse()->setBody($JSON);		
		   endif;	
		} else {
				$check['error'] = 'false'; 
				$check['url']	= Mage::getUrl('form_pop');
				
 				$JSON = Mage::helper('core')->jsonEncode($check);
				$this->getResponse()->setBody($JSON);
		}												   
	}	
}
