<?php

class Sparx_Designersoftware_Helper_Products_Configurable_Test extends Mage_Core_Helper_Abstract
{	
	public function getDetails($data, $params){
		
		// When Product is Selected from List		
		if(empty($data['productId']) && empty($params['pid'])){			
			//Get Configurable Product Id			
			$configurableId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultProductId();
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getDefaultAssociatedProductCollection($configurableId);
		} else if(!empty($params['pid'])){
			$productId = $params['pid'];
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);			
		} else {
			//echo 'third';exit;		
			$productId = $data['productId'];	
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);					
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);	
		}
				
		// Get All Color Details of A Configurable Product
		if($configurableId){
			$productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($configurableId);			
			//echo '<pre>';print_r($productCollection->getData());exit;
			$dataArray = array();
			
			$listDesc['line1'] = "6.1 oz. 100% pre-shrunk cotton; Heather, Antique, and Safety colors are poly/cotton blends";
			$listDesc['line2'] = "Sturdy heavyweight cotton";
			$listDesc['line3'] = "Double-needle stitched for durability";
			$listDesc['line4'] = "Huge color selection";
							
			$dataArray['item'] 				= $productCollection->getName();
			$dataArray['sizeRange'] 		= Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId())." Generous fit";
			$dataArray['defaultColorTitle'] = $this->getAttributeOptionLabelByOptionId($associatedProductCollection->getColor());
			$dataArray['defaultSizeRange'] 	= Mage::getModel('designersoftware/products_product')->getSizeRange($associatedProductCollection->getId());
			$dataArray['defaultMinQuantity']= Mage::getModel('designersoftware/products_product')->getMinQty($associatedProductCollection->getId());
			$dataArray['decoration'] 		= "Screen printing or high-quality digital printing";
			$dataArray['deliveryTime']	 	= "Free 2-week / Rush 1-week";
			$dataArray['minimumOrder']	 	= "1 piece";
			$dataArray['title1'] 			= "Our best selling t-shirt! This style fits your group - and your budget.";
			$dataArray['title2'] 			= "A great look. Priced right. And this t-shirt feels softer with every wash - it\'s no wonder our customers love this ultra popular style!";
			$dataArray['listTitle'] 		= $listDesc;
			
			return $dataArray;	 
		}
	}
	
	public function getAttributeOptionLabelByOptionId($optionId){
			$colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');
			
			$attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
			$color_label = $attr->getSource()->getOptionText($optionId);
			
			return $color_label;
	}
	
	public function getToolData($data, $params){
		
		// When Product is Selected from List
		if(empty($data['productId']) && empty($params['pid'])){			
			//Get Configurable Product Id		
			//echo 'first';exit;	
			$configurableId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultProductId();
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getDefaultAssociatedProductCollection($configurableId);
		} else if(!empty($params['pid'])){
			//echo 'second';exit;
			$productId = $params['pid'];
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);			
		} else {
			//echo 'third';exit;
			$productId = $data['productId'];
			$configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
			$associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);			
		}
				
		// Get All Color Details of A Configurable Product
		if($configurableId){
			$productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($configurableId);
			$dataArray = array();
			$dataArray['productId'] = $associatedProductCollection->getId();
			$dataArray['color'] 	= $this->getAttributeOptionLabelByOptionId($associatedProductCollection->getColor());
			$dataArray['views'] 	= $this->getViewDataArray($configurableId, $associatedProductCollection);
			
			return $dataArray;			
		}
	}
		
	public function getViewDataArray($configurableId, $associatedProductCollection){
			$product = Mage::getModel('catalog/product')->load($associatedProductCollection->getId());
			$mediaGallery = $product->getMediaGallery();
			$views = Mage::helper('designersoftware/attributes_automation')->getAttributeOptions('rawproduct_views');			
			
			$i=0;					
			foreach($views as $view){
				$dataArray['viewName'] 	= $view['label'];
				$dataArray['viewId'] 	= $view['value'];			
				$dataArray['src'] = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/catalog/product'.$mediaGallery['images'][$i][file];
				$dataArray['drawAreas'] = $this->getViewDrawAreas($configurableId, trim(strtolower($view['label'])));
				$i++;
				
				$viewArray[] = $dataArray;
			}
						
			return $viewArray;
	}
	
	public function getViewDrawAreas($configurableId, $view){
			
			$product = Mage::getModel('catalog/product')->load($configurableId);
			$viewObj = 'rawproduct_'.$view.'_view_drawarea';
			$drawareaString = $product->getData($viewObj);			
			
			$drawareaArray = unserialize($drawareaString);
			foreach($drawareaArray as $drawarea){
				$dataArray['drawAreaTitle'] = $drawarea['drawL'];
				$dataArray['drawX'] = $drawarea['drawX'];
				$dataArray['drawY'] = $drawarea['drawY'];
				$dataArray['drawW'] = $drawarea['drawW'];
				$dataArray['drawH'] = $drawarea['drawH'];
				
				$viewDrawAreaArray[] = $dataArray;
			}		
			
			return $viewDrawAreaArray;
			
	}
	
	
}	
