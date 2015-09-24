<?php

class Sparx_Designersoftware_Helper_Fonts_Category_Json extends Mage_Core_Helper_Abstract
{
	public function load($data){		

		$fontsCategoryArray = array();			
		$fontsCategoryCollection = Mage::getModel('designersoftware/fonts_category')->getCollection();
		
		foreach($fontsCategoryCollection as $fontsCategory){
			$array['fontsCategoryId'] 	= $fontsCategory->getFontsCategoryId();
			$array['title']				= $fontsCategory->getTitle();
			$array['count'] 			= Mage::helper('designersoftware/fonts_category_data')->getFontsCountInCategory($fontsCategory->getFontsCategoryId()); // True/ False
			$array['isDefault'] 		= Mage::helper('designersoftware')->isDefaultFontsCategory($fontsCategory->getFontsCategoryId()); // True/ False
			$array['isGreek'] 			= $fontsCategory->getIsGreek(); // True/ False
			$array['isGreekDefault'] 	= Mage::helper('designersoftware')->isGreekDefaultFontsCategory($fontsCategory->getFontsCategoryId()); // True/ False
			
			$categoryArray[] = $array;
		}
		$fontsCategoryArray['category'] = $categoryArray;
		$fontsCategoriesArray['categories'] = $fontsCategoryArray;
		
		return $fontsCategoriesArray;			
		
	}	
}
