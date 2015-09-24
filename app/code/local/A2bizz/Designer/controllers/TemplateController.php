<?php
class Sparx_Designersoftware_TemplateController extends Mage_Core_Controller_Front_Action
{
	// design Ideas Category JSON While Saved by Administrator
	public function categoryAction(){		
		$JSON = Mage::helper('designersoftware/template_category_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody($JSON);
	}
	
	public function savepopupAction(){
		$data = $this->getRequest()->getPost();	
		
		//echo '<pre>';print_r($userData);exit;	
		$userData = $this->getModelData($data);				
		
		$userModel = Mage::getModel('designersoftware/user_design');				
		$userModel->setData($userData);	
		
		if(isset($data['userDesignId']) && !empty($data['userDesignId'])):
			$userModel->setId($data['userDesignId']);		
			//$userModel->save();
			$userDesignData['url'] = Mage::getUrl('form_popup_another').'?did='.$userModel->getId();
		else:
			//$userModel->save();
			$userDesignData['url'] = Mage::getUrl('form_pop').'?did='.$userModel->getId();
		endif;						
		
		
		$data['mailDesignId'] =  $userModel->getId();
		if($data['sendEmailInfo']=='true'):
			// Mail templates can be add here after saving design info
			$templateId = '1';
			$templateData=Mage::helper('designersoftware/mail')->getMailTemplateData($data);				
			Mage::helper('designersoftware/mail')->sendCustomTransactionalEmail($templateId, $templateData);
		endif;
		
		$userDesignData['userDesignId']	= $userModel->getId(); // its an designersoftware_id, saved all user data in it
		$userDesignData['designName'] 	= $userModel->getDesignName();
		//$userDesignData['url']		 	= 'did='.$userModel->getId() .'&type=edit&hf='. $userModel->getHoodieFlag();				
		
		
		$JSON = Mage::helper('core')->jsonEncode($userDesignData);
		$this->getResponse()->setBody($JSON);
	}
	
    public function saveAction(){		
		$data = $this->getRequest()->getPost();	
			
		//echo '<pre>';print_r($data);exit;		
		
		if($data['loginType']=='admin'){
			//echo 'Admin';exit;		
			$tempData = $this->getModelData($data);
			//echo '<pre>';print_r($tempData);exit;
			
			$tempModel = Mage::getModel('designersoftware/template');		
			$tempModel->setData($tempData);		
			$tempModel->save();
			
			$templateData['templateId'] = $tempModel->getId();
			$templateData['designName'] = $tempModel->getDesignName();
			
			$JSON = Mage::helper('core')->jsonEncode($templateData);
			$this->getResponse()->setBody($JSON);
			
		} else {
				
			$userData = $this->getModelData($data);				
			//echo '<pre>';print_r($userData);exit;
			$userModel = Mage::getModel('designersoftware/user_design');								
			if(isset($data['userDesignId']) && !empty($data['userDesignId'])):
				//echo 'not';exit;
				$code = $this->getDesignCode($data['userDesignId']);
				if(empty($code)):
					$userData['design_code'] = $this->designCode();
				else:
					$collection = $userModel->load($data['userDesignId']);					
					$userData['design_code'] = $collection->getDesignCode();
				endif;
				$userModel->setData($userData);
				$userModel->setId($data['userDesignId']);	
				//echo '<pre>';print_r($userModel);exit;	
			else:
				//echo 'dsd not';exit;
				$userData['design_code'] = $this->designCode();
				$userModel->setData($userData);
			endif;						
			$userModel->save();
			$data['mailDesignId'] =  $userModel->getId();
			
			
			if($data['sendEmailInfo']=='true'):
				// Mail templates can be add here after saving design info
				$templateId = '1';
				$templateData=Mage::helper('designersoftware/mail')->getMailTemplateData($data);				
				Mage::helper('designersoftware/mail')->sendCustomTransactionalEmail($templateId, $templateData);
			endif;
			
			//echo '<pre>';print_r($data);exit;
			$userDesignData['userDesignId']	= $userModel->getId(); // its an designersoftware_id, saved all user data in it
			$userDesignData['designName'] 	= $userModel->getDesignName();	
			$userDesignData['design_code']	= $userModel->getDesignCode();
			$userDesignData['url']			= 'designersoftware/index/index/?did='.$userModel->getId() .'&type=edit&hf='. $userModel->getHoodieFlag();
					
			if($data['saveType']=='buynow'):
				$userDesignData['cartUrl'] 	= $this->getCartUrl($userDesignData['userDesignId'], $data);	
				//echo $userDesignData['cartUrl'];exit;
			endif;
			
			$JSON = Mage::helper('core')->jsonEncode($userDesignData);
			$this->getResponse()->setBody($JSON);
			
		}				
	}	
	
    
    public function getModelData($data){
		//admin Data 
		$tempData['category_ids'] 			= $data['assignCategory'];
				
		// Common Data
		$tempData['product_id'] 			= $data['productId'];
		$tempData['color_id']				= $data['colorId'];		 
		$tempData['item_id']				= '';
		$tempData['email']					= $data['userEmailId'];
		$tempData['color_value'] 			= $data['colorValue'];
		$tempData['size_wise_qty']			= $data['sizeWiseQty'];
		$tempData['total_qty']				= $data['totalQty'];
		$tempData['hoodie_flag']			= $data['hoodieFlag'];
		$tempData['shipping_zipcode']		= $data['shippingZipCode'];
		
		$tempData['back_ink_color_price']	= $data['backInkColorPrice'];	
		$tempData['front_ink_color_price']	= $data['frontInkColorPrice'];
		$tempData['total_price']			= $data['totalPrice'];
		
		$tempData['canvasArr'] 				= serialize($data['canvasArr']);
		$tempData['view_wise_scale']		= serialize($data['viewWiseScale']);
		$tempData['front_index_obj']		= serialize($data['frontIndexObj']);
		$tempData['back_index_obj']			= serialize($data['backIndexObj']);	
		$tempData['previewArr'] 			= serialize($data['previewArr']);
		//$tempData['front_preview_arr']		= serialize($data['frontPreviewArr']);
		//$tempData['back_preview_arr']		= serialize($data['backPreviewArr']);
		$tempData['drawArea']				= serialize($data['clippingDrawArea']);	
		$tempData['pdf_data_arr']			= serialize($data['dataArr']);
		$tempData['name_num_arr']			= serialize($data['nameNumberSendInfoArr']);
			
		$images								= Mage::helper('designersoftware/template_images')->getImages($data);	// Names of Images of Different views
		$tempData['design_file'] 			= serialize($images);
		
		$tempData['design_name']			= $data['loginType']=='admin' ? $data['adminDesignName'] : $data['designName'];
		
		$tempData['status'] 				= 1; 
		$tempData['created_time']			= now();
		$tempData['update_time']			= now();			
		
		return $tempData;
	}
	
	public function getCartUrl($designId, $data){
		
		$productId = $data['productId'];
		//$productId = 558; // simple Hoodie Product
		//$productId = 526; // config Product
		
		$sizeWiseQtyString = $data['sizeWiseQty'];
		
		$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
		$totalQty=0;
		foreach($sizeWiseQtyArray as $sizeQtyString):
			$sizeQtyString = trim($sizeQtyString);
			$sizeQtyArray = explode(' ',$sizeQtyString);			
			$size	= trim($sizeQtyArray[0]);
			$qty	= trim($sizeQtyArray[1]);				
			$totalQty = $totalQty + $qty; 				
		endforeach;
		
		$code = $this->getDesignCode($designId);
		$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
		if(!empty($configurableId) && $configurableId!='false'):		
			$ConfigProduct=Mage::getModel('catalog/product')->load($configurableId);
			// Set Custome option Design Id For Designed Product
			$customOptionsUrl = Mage::helper('designersoftware/products_customoption')->sendCustomOptionUrl($configurableId, $code);		
		else: 
			$ConfigProduct=Mage::getModel('catalog/product')->load($productId);
			// Set Custome option Design Id For Designed Product
			$customOptionsUrl = Mage::helper('designersoftware/products_customoption')->sendCustomOptionUrl($productId, $code);
		endif;		
		
		//echo '<pre>';print_r($ConfigProduct->getData());exit;
		if($ConfigProduct->getTypeId()=='configurable'){			
			$GetAllowAttributes=$ConfigProduct->getTypeInstance(true)
						->getConfigurableAttributes($ConfigProduct);

			foreach ($GetAllowAttributes as $attribute) {
				$productAttribute   = $attribute->getProductAttribute();
				$attribute_code		= $productAttribute->getAttributeCode();
				if($attribute_code=='color'):					
					$attributeid=$productAttribute->getId();
					break;
				endif;
			}
						
			$colorOptionValue = $data['colorId'];
			$cartUrl=Mage::helper('checkout/cart')->getAddUrl($ConfigProduct).'?super_attribute['.$attributeid.']='.$colorOptionValue.'&qty='.$totalQty.'&designId='.$designId . $customOptionsUrl;			
			//echo $cartUrl;exit;
			return $cartUrl;					 
			
		} else if($ConfigProduct->getTypeId()=='simple'){
			$cartUrl=Mage::helper('checkout/cart')->getAddUrl($ConfigProduct).'?qty='.$totalQty.'&designId='.$designId . $customOptionsUrl;			
			//echo $cartUrl;exit;
			return $cartUrl;
		} else {
			return;
		}		
	}
    
    public function shareAction(){
		$data = $this->getRequest()->getPost();	
		
		// Mail templates can be add here about saving design info		
		$templateDataArray=Mage::helper('designersoftware/mail')->getShareDesignTemplateData($data);
		foreach($templateDataArray as $templateData):
			$templateId = '2';			
			Mage::helper('designersoftware/mail')->sendCustomTransactionalEmail($templateId, $templateData);
		endforeach;		
	} 
	
	public function designCode(){
		$designCodeValue=substr(uniqid(''),0,4).'-'.substr(uniqid(''),3,4).'-'.substr(uniqid(''),7,4);
		return $designCodeValue;
	}
	
	public function getDesignCode($designId){
		$collection = Mage::getModel('designersoftware/user_design')->getCollection()->addFieldToFilter('design_id',$designId)->getFirstItem();
		//echo '<pre>';print_r($collection);exit;
		return $collection->getDesignCode();		
	}	
	
    public function createAction(){
				
		$templateCollection = Mage::getModel('designersoftware/template')->getCollection()->addFieldToSelect('drawArea')->addFieldToSelect('design_file')->addFieldToFilter('template_id',1)->getFirstItem();			
		
		echo '<pre>';print_r(unserialize($templateCollection['drawArea']));exit;
		$drawArea = unserialize($templateCollection['drawArea']);		
		$filename = unserialize($templateCollection['design_file']);
		$compositeImageName = $filename[0]['composite'];
		
		//echo '<pre>'; print_r($filename[0]['composite']);exit;	
		foreach($drawArea as $draw){
			$distanceTopStart 		= $draw['drawY'];
			$distanceTopStartToEnd 	= $draw['drawH'];
			break;
		}
		//$templateImages = Mage::helper('designersoftware/template_images')->getImages($previewArr, $templateCollection->getProductId());
		
		$finalImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . $compositeImageName;		
		$finalCropImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . 'crop' . DS . $compositeImageName;
		
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');						
		
		exec($imageMagickPath . ' ' . $finalImgPath . ' -crop "546x' . $distanceTopStartToEnd . '+0+' . $distanceTopStart . '"  ' . $finalCropImgPath);
        
		echo '<pre>';print_r($templateImages);			
		exit;		
	}		
}
