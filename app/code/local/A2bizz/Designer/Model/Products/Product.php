<?php
class Sparx_Designersoftware_Model_Products_Product extends Sparx_Designersoftware_Model_Products_Configurable_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/products_product');
    }
    
    public function getProductModel($productId){
		
		$product = Mage::getModel('catalog/product')->load($productId);
		return $product;
	}
	
	public function getConfigurableProductId($simpleProductId){
			
		$parentIds = Mage::getResourceSingleton('catalog/product_type_configurable')
                  ->getParentIdsByChild($simpleProductId);       
		$product = Mage::getModel('catalog/product')->load($parentIds[0]);
		
		if($product->getId() > 0){
			return $product->getId();
		} else {			
			return 'false';
		}
		
	}
	
	// Will find the products Selected Size in Range According to the Set Sorting Order
	public function getSizeRange($productId){
		$selectedValuesString = Mage::getResourceModel('catalog/product')->getAttributeRawValue($productId, 'size', $storeId);
		$selectedValuesArray = explode(',',$selectedValuesString);
				
		$attribute = Mage::getModel('eav/config')->getAttribute('catalog_product', 'size'); 
		foreach ($attribute->getSource()->getAllOptions(true) as $option) {
			if(in_array($option['value'],$selectedValuesArray)){
				$selectedValuesArrayWithLabels[] = $option['label'];
			}
		}
		
		$sizeRange = $selectedValuesArrayWithLabels[0].'-'.$selectedValuesArrayWithLabels[count($selectedValuesArrayWithLabels) - 1];
		return $sizeRange;
		
	}
	
	//Get minimum Sales Qantity to Purchase a Product
	public function getMinQty($productId){
		$_minSalQty = Mage::getModel('catalog/product')->load($productId)->getStockItem()->getMinSaleQty();
		if($_minSalQty < 6){
			return 1;
		} else {
			return 6;
		}
	}
}
