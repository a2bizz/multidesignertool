<?php

class Sparx_Designersoftware_Helper_Products_Configurable_Json extends Mage_Core_Helper_Abstract {

    public function load($data) {
        $productId = isset($data['configProductId'])?$data['configProductId']:$data['productId'];
        $sleevePrint = $this->getSleevePrintStatus($productId);
        // All the Helper here will return Array, After merging they will be converted to JSON Format
        //Product Details for Configurable product
        $allColorArray = Mage::helper('designersoftware/products_configurable_associated_color')->getColors($data);

        $defaultColorId = $allColorArray['defaultColorId'];
        $colorArray['sleeveprint'] = $sleevePrint;
        $colorArray['colors'] = $allColorArray['colors'];
        $colorArray['moreColors'] = $allColorArray['moreColors'];
        $colorArray['productDetails'] = Mage::helper('designersoftware/products_configurable_product')->getDetails($data, '', $defaultColorId);
        //$colorArray['productToolData'] 	= Mage::helper('designersoftware/products_configurable_product')->getToolData($data,'',$defaultColorId);
        //echo '<pre>';print_r($colorArray);exit;
        return Mage::helper('core')->jsonEncode($colorArray);
    }

    public function getProductDetails($data) {
        $allColorArray = Mage::helper('designersoftware/products_configurable_associated_color')->getColors($data);

        $defaultColorId = $allColorArray['defaultColorId'];
        $colorArray['colors'] = $allColorArray['colors'];
        $colorArray['moreColors'] = $allColorArray['moreColors'];
        $colorArray['productDetails'] = Mage::helper('designersoftware/products_configurable_product')->getDetails($data, '', $defaultColorId);

        return $colorArray;
    }

    public function getSleevePrintStatus($prodId) {
        $sleeveArr=array(4);
        if($prodId){
        $product = Mage::getModel('catalog/product')->load($prodId);
        $catArr = $product->getCategoryIds();
        $containsSearch = count(array_intersect($sleeveArr, $catArr));
        if($containsSearch>0){
            return 1;
        }else {
            return 0;
        }
        }else if($prodId==''){
            return 1;
        }
    }

}
