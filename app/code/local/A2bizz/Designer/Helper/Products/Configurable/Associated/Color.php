<?php

class Sparx_Designersoftware_Helper_Products_Configurable_Associated_Color extends Mage_Core_Helper_Abstract {

    public function getColors($data) {
        // When Product is Selected from List

        $colorAttributeId = $this->getAttributeIdByCode('color');
        if (empty($data['productId']) && empty($data['configProductId'])) {
            //Get Configurable Product Id	
            //echo 'first';exit;		
            $configurableId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultProductId();
        } else if (!empty($data['configProductId'])) {
            //echo 'second';exit;
            $productId = $data['configProductId'];
            $configurableId = $data['configProductId'];
            ;
        } else {
            //echo 'third';exit;
            $productId = $data['productId'];
            $configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
        }

        // Get All Color Details of A Configurable Product

        if ($configurableId) {

            $isMultiColored = Mage::helper('designersoftware/data')->isMultiColoredProduct($configurableId);

            $colorIdObject = $this->getJsonConfigColorObject($configurableId);
            $checkFirstColor = 0;
            foreach ($colorIdObject->options as $obj):
                $attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
                $allAttributeOptions = $attr->getSource()->getAllOptions();

                $colorCode = '';
                foreach ($allAttributeOptions as $option) {
                    if ($option['value'] == $obj->id) {
                        $colorCode = $option['details'];
                        $colorId = $option['value'];
                        break;
                    }
                }

                $_minSalQty = Mage::getModel('catalog/product')->load($obj->products[0])->getStockItem()->getMinSaleQty();
                if ($_minSalQty < 6) {
                    $result['title'] = $obj->label;
                    $result['colorCode'] = $colorCode;
                    $result['colorId'] = $colorId;
                    
                    $additionalColorId = Mage::helper('designersoftware/data')->getSecondColorId($obj->products[0]);

                    $result['additionalColorCode'] = Mage::helper('designersoftware/data')->getAdditionalColorCode('additional_color', $additionalColorId, $colorCode, $isMultiColored);
                    $result['productId'] = $obj->products[0];
                    $result['sizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($obj->products[0]);
                    $result['minQty'] = Mage::getModel('designersoftware/products_product')->getMinQty($obj->products[0]);

                    //Getting default color 
                    if ($checkFirstColor == 0) {
                        $allColorArray['defaultColorId'] = $colorId;
                        $checkFirstColor++;
                    }

                    $colorArray[] = $result;
                    unset($result);
                } else {
                    $result['title'] = $obj->label;
                    $result['colorCode'] = $colorCode;
                    $result['colorId'] = $colorId;
                    $result['productId'] = $obj->products[0];
                    $result['sizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($obj->products[0]);
                    $result['minQty'] = Mage::getModel('designersoftware/products_product')->getMinQty($obj->products[0]);

                    $moreColorArray[] = $result;
                    unset($result);
                }
            endforeach;

            $allColorArray['colors'] = $colorArray;
            $allColorArray['moreColors'] = $moreColorArray;
            //echo '<pre>';print_r($colorArray);exit;
            return $allColorArray;
        }
    }

    public static function defaultAssociatedColor($colorId) {
        Mage::register('defaultAssociatedColor', $colorId);
        return Mage::registry('defaultAssociatedColor');
    }

    public function getJsonConfigColorObject($configurableId) {
        $product = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($configurableId);

        $block1 = Mage::app()->getLayout()->createBlock('catalog/product_view_type_configurable');
        $block1->setProduct($product);
        $colorAttributeDataObject = json_decode($block1->getJsonConfig());
        $colorAttributeId = $this->getAttributeIdByCode('color');
        $colorIdObject = $colorAttributeDataObject->attributes->$colorAttributeId;
        return $colorIdObject;
    }

    function getAttributeIdByCode($code) {
        // Get Attribute Id for Code-"color" 
        $eavAttribute = new Mage_Eav_Model_Mysql4_Entity_Attribute();
        $attributeId = $eavAttribute->getIdByCode('catalog_product', $code);

        return $attributeId;
    }

}
