<?php

class Sparx_Designersoftware_Helper_Cart extends Mage_Core_Helper_Abstract
{
	public function getDesignFrontImage($itemId){
		$files = unserialize(Mage::getModel('designersoftware/cart')->getDesignFilesString($itemId));
		//if($itemId==1371){
		//	echo 'sdfsdf';print_r($files);exit;
		//}
		return $files[0]['composite'];				
	}
	
	public function getDesignBackImage($itemId){
		$files = unserialize(Mage::getModel('designersoftware/cart')->getDesignFilesString($itemId));
		return $files[1]['composite'];				
	}
	
	public function getSizeWiseQty($sizeWiseQtyString){
		 
		$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
		foreach($sizeWiseQtyArray as $sizeQtyString):
			$sizeQtyString = trim($sizeQtyString);
			$sizeQtyArray = explode(' ',$sizeQtyString);			
			$size	= trim($sizeQtyArray[0]);
			$qty	= trim($sizeQtyArray[1]);				
			$stringArray[] = $size.': '.$qty; 				
		endforeach;
		
		$string = implode(', ',$stringArray);
		return $string;
	 }
	 
	 public function getSizeQty($sizeWiseQtyString, $sizeTitle){
		
		$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
		foreach($sizeWiseQtyArray as $sizeQtyString):
			$sizeQtyString = trim($sizeQtyString);
			$sizeQtyArray = explode(' ',$sizeQtyString);			
			$size	= trim($sizeQtyArray[0]);
			$qty	= trim($sizeQtyArray[1]);				
			
			if($size==trim($sizeTitle)):
				return $qty;
			endif;			
		endforeach;				 
	 }	 
}
