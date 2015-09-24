<?php
class Sparx_Designersoftware_DrawareaController extends Mage_Core_Controller_Front_Action
{
    public function indexAction(){
		
		$data = $this->getRequest()->getParams();
				
		$itemCode=$data['itemCode'];
		$productId=$data['productId'];
		
		$product = Mage::getModel('catalog/product')->load($productId);
			
		$dataCollection=$product->getData();		
			
		$viewArr=array();			
		$objView=(object)$objView;
		$objView->filename		= Mage::getBaseUrl('media').'blfa_files/'.$dataCollection[$itemCode];
		$objView->itemCode		= $itemCode;
		$objView->rawproductId	= $productId;
		$objView->saveDrawArea	= unserialize($dataCollection[$itemCode.'_drawarea']);		
		
		$viewArr[]=$objView;
		unset($objView);
		
		echo json_encode($viewArr);		
	}	
	
	public function saveAction(){
				
		$data = $this->getRequest()->getPost();
		Mage::app()->setCurrentStore(Mage_Core_Model_App::ADMIN_STORE_ID);
	
		$itemCode=$data['itemCode'];
		$rawproductId=$data['rawproductId']; // rawproductId is actually a Configural Product ID
		
		if(!empty($itemCode)){
			$product = Mage::getModel('catalog/product')->load($rawproductId);
			
			$viewArr=array();			
			$objView=(object)$objView;
			
			$drawareaString = serialize($data['saveDrawArea']);
			$product->setData($itemCode.'_drawarea',$drawareaString);
			$objFront = $itemCode.'_drawarea';
			$objView->$objFront = $drawareaString;
			
			$product->save();
			$objView->message 	= 'Draw Area has been saved';
			
			//$viewArr[]=$objView;
			//unset($objView);
			
			echo json_encode($objView);
		}else{
			echo 'Draw Area has not been saved';
		}
	}
}
