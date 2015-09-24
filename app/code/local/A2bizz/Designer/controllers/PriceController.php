<?php
class Sparx_Designersoftware_PriceController extends Mage_Core_Controller_Front_Action
{
    public function indexAction(){		
		$JSON = Mage::helper('designersoftware/products_price_json')->load($this->getRequest()->getPost());		
		$this->getResponse()->setBody($JSON);
	}
	
	public function cartAction(){
		$data = $this->getRequest()->getPost();
		$productId = $data['productId'];		
		$ConfigProduct=Mage::getModel('catalog/product')->load($productId);
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
						
			$youlabel = 'Magneta';
			$attribute_details = Mage::getSingleton("eav/config")->getAttribute("catalog_product", $attribute_code);
			$options = $attribute_details->getSource()->getAllOptions(false);
			foreach($options as $option){
				// print_r($option) and find all the elements
				//echo $option["value"];
				//echo $option["label"];
				if($option["label"]==$youlabel){
					$opid=$option["value"];
					 echo $cartUrl=Mage::helper('checkout/cart')->getAddUrl($ConfigProduct).'?super_attribute['.$attributeid.']='.$option["value"].'&qty=1&designId='.$designId;	
					 break;
				}
			}
		} else if($ConfigProduct->getTypeId()=='simple'){			
			echo $cartUrl=Mage::helper('checkout/cart')->getAddUrl($ConfigProduct).'?qty=1&designId='.$designId;	
		} else {
			return;
		}		
	}	
	
	public function getBasePriceAction($data){
		
		$productId 			= $data['productId'];
		$quantity			= $data['totalQty'];
		$sizeWiseQtyString              = $data['sizeWiseQty'];
		
		$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
		foreach($sizeWiseQtyArray as $sizeQtyString):
			$sizeQtyArray = explode(' ',$sizeQtyString);
			
			$size	= trim($sizeQtyArray[0]);
			$qty	= trim($sizeQtyArray[1]);			
		endforeach;
						
						
		$_product = Mage::getModel('catalog/product')->load($productId);
		
		$price = $_product->getPrice();		
		$FINAL_PRICE = $price;
		
		$special_price = $_product->getSpecialPrice();
		$group_price = $_product->getGroupPrice();
		
		if(count($special_price)>0 && !empty($special_price)){
			if($special_price > $group_price)
				$FINAL_PRICE = $group_price;
			else 
				$FINAL_PRICE = $special_price;
		}
		
		$msrp_display_actual_price_type = $_product->getMsrpDisplayActualPriceType();
				
		$tier_price = $_product->getTierPrice();
		foreach($tier_price as $tprice):
			if($FINAL_PRICE > $tprice['price'] && $tprice['price_qty'] >= $quantity){
				$FINAL_PRICE = $tprice['price'];
				break;				
			}			
		endforeach;
		
		
		
		$finalPrice['price']	  = $_product->getPrice();
		$finalPrice['finalPrice'] = $FINAL_PRICE;		
		
		return $finalPrice;
	}		
}
