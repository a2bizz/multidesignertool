<?php

class Sparx_Designersoftware_Helper_Products_Edit_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		
		$designId 	= $data['designId'];
		$hoodieFlag = $data['hoodieFlag'];
		$loginType 	= $data['loginType'];
		$flag 		= $data['editFlag'];
				
		if($loginType!='admin' && $flag!='template'):
			//echo 'user';exit;
			$_designModel = Mage::getModel('designersoftware/user_design')->getCollection()
										->addFieldToFilter('design_id',$designId)
										->addFieldToFilter('status',1)
										->setOrder('design_id','DESC')
										->getFirstItem()
										->getData();
			$designedData['sizeWiseQty']			= $_designModel['size_wise_qty'];
			$designedData['totalQty']				= $_designModel['total_qty'];
			$designedData['designName']				= $_designModel['design_name'];
			$designedData['userEmailId']			= $_designModel['email'];
			$designedData['shippingZipCode']		= $_designModel['shipping_zipcode'];			
			
		else:
			//echo 'admin';exit;
			$_designModel = Mage::getModel('designersoftware/template')->getCollection()
										->addFieldToFilter('template_id',$designId)
										->addFieldToFilter('status',1)
										->setOrder('template_id','DESC')
										->getFirstItem()
										->getData();
		endif;		
		
		$designedData['canvasArr'] 				= unserialize($_designModel['canvasArr']);
		$designedData['frontIndexObj'] 			= unserialize($_designModel['front_index_obj']);
		$designedData['backIndexObj'] 			= unserialize($_designModel['back_index_obj']);
		$designedData['viewWiseScale'] 			= unserialize($_designModel['view_wise_scale']);
		$designedData['previewArr']				= unserialize($_designModel['previewArr']);		
		$designedData['nameNumberSendInfoArr']	= unserialize($_designModel['name_num_arr']);
		
		return Mage::helper('core')->jsonEncode($designedData);			
	}	
}
