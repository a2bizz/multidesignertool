<?php

class Sparx_Designersoftware_Helper_Clipart_Category_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){		
		$parentId = $data['categoryId'];		
		if(empty($parentId) && $parentId<=0)
			$parentId = 0;
					
		if($parentId==0){
			return $this->getMainCategories();
		} else {
			return $this->getSubCategories($parentId);
		}			
	}
	
        public function getMainCategories($parentId){
     
		$clipartCategoryArray = array();			
		$clipartCategoryCollection = Mage::getModel('clipartcategory/clipartcategory')->getCollection()->setOrder('created_time', 'desc');
		
		//echo '<pre>';print_r($clipartCategoryCollection->getData());exit;
		 
		foreach($clipartCategoryCollection as $clipartCategory){
			$array['id'] 	= $clipartCategory->getId();
			$array['title']	= $clipartCategory->getTitle();			
			$array['url']	= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media'. DS .'files'. DS .'clipartcategory'. DS .'thumb'. DS .$clipartCategory->getFilename();
					
			$categoryArray[] = $array;
		}
		
		$clipartCategoryArray['category'] = $categoryArray;
		$clipartCategoriesArray['clipArtCategories'] = $clipartCategoryArray;
				
		return $clipartCategoriesArray;
	}
        
        public function getSubCategories($parentId){
		$clipartCategoryArray = array();			
		$clipartCategoryCollection = Mage::getModel('clipartsubcategory/clipartsubcategory')->getCollection()->addFieldToFilter('category_id',$parentId);
		foreach($clipartCategoryCollection as $clipartCategory){
			$array['id'] 	= $clipartCategory->getId();
			$array['title']	= $clipartCategory->getTitle();				
					
			$categoryArray[] = $array;
		}
		
		$clipartCategoryArray['subCategory'] = $categoryArray;
		$clipartCategoriesArray['clipArtSubCategories'] = $clipartCategoryArray;
				
		return $clipartCategoriesArray;
		
	}	
}
