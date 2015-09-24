<?php

class Sparx_Designersoftware_Helper_Products_Price_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		//$data['shippingZipCode'] = '10001';
		//$data['productId'] = 527;
		//$data['totalQty'] = 4;
		//$data['sizeWiseQty'] = 'YXS 2, YS 2, YM 3, S 3, L 3, 2XL 3';
		
		$productPrice 	= $this->getBasePrice($data);	
		$unitPrice 		= $productPrice['price'];
		$discountPrice 	= $productPrice['finalPrice']; 	
		
		$priceDataArray['unitPrice'] 		= $unitPrice;
		$priceDataArray['discountPrice'] 	= $discountPrice;
		$priceDataArray['shippingAddress'] 	= 'Shipping to New York, NY - '.$data['shippingZipCode'];
		
		$priceData['priceData'] = $priceDataArray;
		
		return Mage::helper('core')->jsonEncode($priceData);			
	}	
	
	public function getSizeWiseCustomPrices($data, $productId){
		$product = Mage::getModel('catalog/product')->load($productId);
		//echo '<pre>';print_r();exit;
		if($product->getTypeId()=='simple' && $data['hoodieFlag']=='false'):			
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
			if(!empty($configurableId))
				$product = Mage::getModel('catalog/product')->load($configurableId);	
		endif;
		
		
				
		foreach ($product->getOptions() as $option) {
			if ($option->getTitle() === 'Size') {				
				foreach ($option->getValues() as $value){
					$sizePriceArray[$value->getTitle()] = $value->getPrice();
				}					
			}
		}
		
		return $sizePriceArray;
	}
	
	public function getBasePrice($data){
		//echo '<pre>';print_r($data);exit;
		$productId 	= $data['productId'];
		$_product = Mage::getModel('catalog/product')->load($productId);
		
		if($_product->getTypeId()=='simple' && !empty($data['hoodieFlag']) && $data['hoodieFlag']=='false'):	
		//echo '<pre>dsd';print_r($_product->getData());exit;	
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
			if(!empty($configurableId))
				$_product = Mage::getModel('catalog/product')->load($configurableId);	
		endif;		
		//echo '<pre>';print_r($_product->getData());exit;
		$productId 			= $_product->getId();
		$quantity			= $data['totalQty'];
		$sizeWiseQtyString	= $data['sizeWiseQty'];
		//echo '<pre>';print_r($_product->getData());exit;					
		//$_product = Mage::getModel('catalog/product')->load($productId);
		
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
		//echo '<pre>';print_r($tier_price);exit;
		foreach($tier_price as $tprice):
			if($FINAL_PRICE > $tprice['price'] && $tprice['price_qty'] <=$quantity){
				$FINAL_PRICE = $tprice['price'];				
			}			
		endforeach;		
		
		// Add Size Wise Prices 
		$sizePriceArray = $this->getSizeWiseCustomPrices($data,$productId);		
		$avgSizePrice = 0;
				
		if(!empty($sizeWiseQtyString)):
			$sizesTotalPrice = 0;
			
			$sizeWiseQtyArray = explode(',',$sizeWiseQtyString);
			foreach($sizeWiseQtyArray as $sizeQtyString):
				$sizeQtyArray = explode('',$sizeQtyString);
				$size	= trim($sizeQtyArray[0]);
				$qty	= trim($sizeQtyArray[1]);				
				
				$sizesTotalPrice += $sizePriceArray[$size] * $qty; 				
			endforeach;	
			//Average Price for selected Sizes
			$avgSizePrice = $sizesTotalPrice / $quantity;				
		endif;
								
		$finalPrice['price']	  = $_product->getPrice() + $avgSizePrice;
		$finalPrice['finalPrice'] = $FINAL_PRICE + $avgSizePrice;		
		
		return $finalPrice;
	}
}
