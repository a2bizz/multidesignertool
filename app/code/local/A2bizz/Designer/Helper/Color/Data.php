<?php

class Sparx_Designersoftware_Helper_Color_Data extends Mage_Core_Helper_Abstract
{
	public function getAttributeOptionLabelByOptionId($optionId){
			$colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');
			
			$attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
			$color_label = $attr->getSource()->getOptionText($optionId);
			
			return $color_label;
	}
	
	public function getAttributeOptionValueByOptionId($optionId){
			$colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');
			
			$attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
			//echo '<pre>';print_r($attr->getSource()->getOption($optionId));exit;
			$colorArray = $attr->getSource()->getAllOptions(false);
			foreach($colorArray as $color){
				if($color['value']==$optionId){
					$color_value = $color['details'];
					return $color_value;
				}
			}			
	}
}
