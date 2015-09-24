<?php

class Sparx_Designersoftware_Helper_Popup_Category_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){
		// getting 
		$categoryArray = $this->getCategoryArray();	
			
		return Mage::helper('core')->jsonEncode($categoryArray);			
	}
	
	public function getCategoryArray(){
		
		//Category Id of "Products"
		$mainCategoryId = 3;
		
		$categoryCollection = Mage::getModel('designersoftware/products_configurable_product')->getSubCategoriesCollection($mainCategoryId);
		foreach($categoryCollection as $category){
				
				$array['catId']			= $category->getId();
				$array['name'] 			= $category->getName();
				
				if($this->getSubCategoryArray($category->getId())){
					$array['subCategory'] 	= $this->getSubCategoryArray($category->getId());
				}
				
				$categoryArray[] = $array;				
				unset($array);
		}
		
		return $categoryArray;
	}	
	
	public function getSubCategoryArray($categoryId){
				
		$subCategoryCollection = Mage::getModel('designersoftware/products_configurable_product')->getSubCategoriesCollection($categoryId);
		if(count($subCategoryCollection) > 0){
			foreach($subCategoryCollection as $subCategory){			
					$array['subCatId']		= $subCategory->getId();
					$array['name']	 		= $subCategory->getName();	
					
					$subCategoryArray[] = $array;				
					unset($array);				
			}
			return $subCategoryArray;
		} else {
			return false;
		}
	}
	
	public function formatOfJSON(){
		/*
		 
		 [	
			{
				"name":"TSHIRT",
				"catId":"1",
				"subcategory":
				[
					{
						"title":"Short Sleave",
						"subcatid":"1"
					},
					{
						"title":"Long Sleave",
						"subcatid":"2"
					}
				]
			},
			{
				"name":"LADIES & JUNIORS",
				"catId":"1",
				"subcategory":
				[
					{
						"title":"Short Sleave",
						"subcatid":"1"
					},
					{
						"title":"Long Sleave",
						"subcatid":"2"
					}
				]	
			}
		]
		 
	   */
	}	
}
