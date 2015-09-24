<?php
/**
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * @category   BL
 * @package    BL_FileAttributes
 * @copyright  Copyright (c) 2011 Benoît Leulliette <benoit.leulliette@gmail.com>
 * @license    http://opensource.org/licenses/osl-3.0.php  Open Software License (OSL 3.0)
 */

class Sparx_Designersoftware_Model_Observer
{
	public function hookIntoCatalogProductDuplicate($observer)
	{	
		$product = Mage::getModel('catalog/product');
		$product_entity_table = $product->getResource()->getEntityTable();    
		$resource = Mage::getSingleton('core/resource');
		$connection = $resource->getConnection('core_read');
		$result = $connection->showTableStatus($product_entity_table);
		$next_product_id = $result['Auto_increment'];
				
		$productId = Mage::app()->getRequest()->getParam('id');
		$customtabsLayersModel = Mage::getModel('customtabs/layers');
        
        $collection = $customtabsLayersModel->getCollection()->addFieldToFilter('product_id',$productId)->addFieldToFilter('status',1);
        foreach($collection as $row):
			$row->setProductId($next_product_id);
			$row->setCreatedTime(now());
			$row->setUpdateTime(now());
			$data = $row->getData();
			unset($data['layers_id']);			
			$customtabsLayersModel->setData($data);
			$customtabsLayersModel->save();			
        endforeach;		      		
	} 
	
	public function hookToControllerActionPreDispatch($observer){
		$event = $observer->getEvent();
		$params = Mage::app()->getRequest()->getParams();
		$categoryId = $params['id'];		
		if($categoryId==476){
			$designerLabCategoryId = 420;
			$categoryCollection = Mage::getModel('catalog/category')->load($designerLabCategoryId);
			$urlPath = $categoryCollection->getUrlPath();			
			
			$defaultProductId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultHoodieProductId();			
			
			$url = Mage::getUrl($urlPath).'?pid='.$defaultProductId.'&hf=true';//eg to redirect to cart page
			$response = Mage::app()->getFrontController()->getResponse();
			$response->setRedirect($url);
			$response->sendResponse();
			exit;
		}
		
		if($categoryId==481){
			$designerLabCategoryId = 420;
			$categoryCollection = Mage::getModel('catalog/category')->load($designerLabCategoryId);
			$urlPath = $categoryCollection->getUrlPath();			
			
			$defaultProductId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultBlanketProductId();			
			
			$url = Mage::getUrl($urlPath).'?pid='.$defaultProductId.'&hf=true';//eg to redirect to cart page
			$response = Mage::app()->getFrontController()->getResponse();
			$response->setRedirect($url);
			$response->sendResponse();
			exit;
		}
	}
}
