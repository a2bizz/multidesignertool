<?php

class Sparx_Designersoftware_Helper_Adminhtml_Sales_Order_View_Items_Renderer_Default extends Mage_Core_Helper_Abstract
{
	public function getColumnHtml($item, $columnName){
		$itemId = $item->getQuoteItemId();
		$collection = Mage::getModel('designersoftware/user_design')->getCollection()->addFieldToFilter('item_id',$itemId)->getFirstItem();
		
		switch($columnName){
			case 'sizes':
				$sizeWiseQtyString = $collection->getSizeWiseQty(); 					
				$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
				$sizeString=' ';
				foreach($sizeWiseQtyArray as $sizeQtyString):					
					$sizeQtyString = trim($sizeQtyString);
					$sizeQtyArray = explode(' ',$sizeQtyString);			
					$size	= trim($sizeQtyArray[0]);
					$qty	= trim($sizeQtyArray[1]);				
					
					$sizeString .= '<b>'.$size.'</b>&nbsp;=>&nbsp;'.$qty.'<br>';		
				endforeach;
				return $sizeString;
			break;
			default:
		}
	}
}
