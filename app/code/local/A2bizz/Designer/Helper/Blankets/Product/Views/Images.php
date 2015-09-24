<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Views_Images extends Mage_Core_Helper_Abstract
{
	public function getLayerImages($data, $viewId){
		$productId = $data['productId'];
		
		$layersCollection = Mage::getModel('customtabs/layers')->getCollection()
										->addFieldToFilter('product_id',$productId)
										->addFieldToFilter('view_id',$viewId)
										->addFieldToFilter('status',1)																				
										->setOrder('sort_order', 'asc');
										
		foreach($layersCollection as $layer):			
			
			$layertypeTitle = Mage::getModel('designersoftware/hoodies_layertype')->getLayertypeTitle($layer->getType());
			
			$images['src']		= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/files/customtabslayer/original/'.$layer->getFilename();
			$images['color']	= (trim(strtolower($layertypeTitle))!='shadow') ? Mage::helper('designersoftware/hoodies_product_views_color')->getColorCode($layer->getDefaultColorId()) : '';
			$images['layerType']= $layertypeTitle;
			$images['layerId']	= $layer->getId();
			
			$imagesArray[] = $images;				
			
		endforeach;
			
		return $imagesArray;			
	}	
}
