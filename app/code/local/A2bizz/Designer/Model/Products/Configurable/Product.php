<?php
class Sparx_Designersoftware_Model_Products_Configurable_Product extends Mage_Catalog_Model_Product
{	    
	public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/products_configurable_product');
    }
    
    // Get Load Product Model by enter product Id
    public function getProductModel($productId)
    {		
		$product = Mage::getModel('catalog/product')->load($productId);
		return $product;
	}
	
	// Enter Category Id, and will return All products and their data collection
	public function getConfigProductsCollection($categoryId){
			/*$_configProductsCollection = Mage::getResourceModel('catalog/product_collection')
					->addAttributeToFilter('type_id', array('eq' => 'configurable'))*/
					
			$_configProductsCollection = Mage::getModel('catalog/category')->load($categoryId)
					 ->getProductCollection()
					 ->addAttributeToSelect('*') // add all attributes - optional
					 ->addAttributeToFilter('status', 1) // enabled
					 ->addAttributeToFilter('visibility', 4) //visibility in catalog,search
					 ->addAttributeToFilter('type_id', array('eq' => 'configurable'));	 
								
			//echo '<pre>';print_r($_configProductsCollection->getData());exit;
			return $_configProductsCollection;		
	}
	
	// Just for Check not in Use in Project
	public function getDefaultCategory($categoryId)
	{
		$_categoryCollection = Mage::getModel('catalog/category')->load($categoryId)->getChildrenCategories();
		if(count($_categoryCollection) > 0){
			foreach($_categoryCollection as $_category){
				$categoryId = $_category->getId();
				$this->getDefaultCategory($_category->getId());
				break;
			}			
		} else {
			return $categoryId;
		}
	}
	
	// 
	public function getInnerLastCategory($categoryId)
	{
		$_categoryCollection = Mage::getModel('catalog/category')->load($categoryId)->getChildrenCategories();
		if(count($_categoryCollection) > 0){
			foreach($_categoryCollection as $_category){
				$categoryId = $_category->getId();
				$this->getInnerLastCategory($_category->getId());
				break;
			}			
		} else {
			return $categoryId;
		}
	}
	
	// Enter Category Id, and will return subcategories data collection seprately
	public function getSubCategoriesCollection($categoryId){
		$_categoryCollection = Mage::getModel('catalog/category')->load($categoryId)->getChildrenCategories();
		if(count($_categoryCollection) > 0){
			return 	$_categoryCollection;		
		}
		return false;
	}
	
	public function getDefaultProductId()
	{		
		$_productCollection = Mage::getResourceModel('catalog/product_collection')
            ->addAttributeToSelect('*')
            ->addAttributeToFilter('type_id','configurable')
            ->getFirstItem(); 
		
		return $_productCollection->getId();
	}
	
	public function getDefaultHoodieProductId()
	{			
		$_productCollection = Mage::getResourceModel('catalog/product_collection')
			->addAttributeToSelect('*')
			->addAttributeToFilter('type_id','simple')
			->addAttributeToFilter('designer_product',1)
            ->getFirstItem();
            
		//echo '<pre>';print_r($_productCollection->getData());exit;
		return $_productCollection->getId();
	}
	
	
	public function getDefaultBlanketProductId()
	{			
		$_productCollection = Mage::getResourceModel('catalog/product_collection')
			->addAttributeToSelect('*')
			->addAttributeToFilter('type_id','simple')
			->addAttributeToFilter('designer_product',1)
			->addAttributeToFilter('blanket_designer',1)
            ->getFirstItem();
            
		//echo '<pre>';print_r($_productCollection->getData());exit;
		return $_productCollection->getId();
	}
	
	public function isConfigurableProduct($productId){
		$_productCollection = Mage::getResourceModel('catalog/product_collection')
            ->addAttributeToSelect('*')
            ->addAttributeToFilter('entity_id',$productId)
            ->addAttributeToFilter('type_id','configurable');
            
		//echo count($_productCollection);exit;
		if(count($_productCollection)>0)
			return true;
		else 
			return false;
	}
	
	// To Count Number of Colors in Configurable Product
	public function getAssociatedProductCount($configProductId)
	{			
		$childIds = Mage::getModel('catalog/product_type_configurable')->getChildrenIds($configProductId);
		return count($childIds[0]);
	}
		
	public function getAssociatedProductData($configProductId){
		
		$product = Mage::getModel('catalog/product')->load($configProductId);
		$childProducts = Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null,$product);
		
		return $childProducts;
	}
	
	public function getDefaultAssociatedProductCollection($configProductId,$defaultColorId=''){
		//echo 'ASD'.$defaultColorId;exit;
		$products = $this->getAssociatedProductData($configProductId);
		$defaultProduct = $products[0];
		foreach($products as $product){
			if($defaultColorId==$product->getColor()){			
				return $product;
				break;			
			}
		}
		
		return $defaultProduct;
	}
	
	function getAttributeIdByCode($code){
		// Get Attribute Id for Code-"color" 
		$eavAttribute = new Mage_Eav_Model_Mysql4_Entity_Attribute();
		$attributeId = $eavAttribute->getIdByCode('catalog_product',$code);
		
		return $attributeId;
	}
}
