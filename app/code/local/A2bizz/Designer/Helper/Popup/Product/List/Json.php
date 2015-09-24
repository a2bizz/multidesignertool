<?php

class Sparx_Designersoftware_Helper_Popup_Product_List_Json extends Mage_Core_Helper_Abstract {

    public function load($data) {
//        $categoryId = $data['categoryId'];
//        /**
//         * sleeve category check
//         */       
//        $category = Mage::getModel('catalog/category')->load($categoryId)->getPath();
//        $pathArr = explode('/', $category);
//        $sleeveArr=array(4);
//        $containsSearch = count(array_intersect($sleeveArr, $pathArr));
//        if($containsSearch>0){
//            $sleevePrint=1;
//        }else{
//            $sleevePrint=0;
//        }
        
        /*****************end************************/
        $designerLabel = $this->getDesignerLabel($categoryId);

        $productsArray = array();

        $_configProductsCollection = Mage::getModel('designersoftware/products_configurable_product')->getConfigProductsCollection($categoryId);

        foreach ($_configProductsCollection as $_configProduct) {
            //echo '<pre>';print_r($_configProduct->getData());exit;
            $productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($_configProduct->getId());
            $array['productId'] = $productCollection->getId();
            $array['name'] = $productCollection->getName();
            $array['designerLabel'] = $designerLabel;
            $array['imageSrc'] = Mage::getBaseUrl('media') . 'catalog/product' . $productCollection->getImage();
            $array['sizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId());
            $array['colorsAvailable'] = Mage::getModel('designersoftware/products_configurable_product')->getAssociatedProductCount($productCollection->getId());
            $array['minQty'] = Mage::getModel('designersoftware/products_product')->getMinQty($productCollection->getId());
            //$array['priceGuide']		= "$ (out of $$$)";			

            $productsArray[] = $array;
        }

        // For Multilayer Products Category To be designed in Designer Software
        if ($categoryId == '412' || $categoryId == '432' || $categoryId == '479' || $categoryId == '480'): // For Product->sweat->Hoodies

            $productCollection = Mage::getModel('designersoftware/hoodies_product')->getHoodiesDesignerProducts($categoryId);
            foreach ($productCollection as $_product):
                //$collection = Mage::getModel('catalog/product')->load($_product->getId());		
                //$mediaGallery = $collection->getMediaGallery();

                $array['productId'] = $_product->getId();
                $array['name'] = $_product->getName();
                $array['designerLabel'] = $designerLabel;
                $array['imageSrc'] = Mage::helper('designersoftware/hoodies_product_images')->getThumbImage($_product->getImage()); //Mage::getBaseUrl('media').'catalog/product'.$_product->getImage();
                $array['sizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($_product->getId());
                //$array['colorsAvailable']	= Mage::getModel('designersoftware/products_configurable_product')->getAssociatedProductCount($productCollection->getId());
                $array['minQty'] = Mage::getModel('designersoftware/products_product')->getMinQty($_product->getId());
                //$array['priceGuide']		= "$ (out of $$$)";			

                $productsArray[] = $array;
            endforeach;
        endif;

        return Mage::helper('core')->jsonEncode($productsArray);
    }

    public function getDesignerLabel($categoryId) {
        switch ($categoryId) {
            case '412':
            case '432':
                return 'hoodies';
                break;
            case '479':
            case '480':
                return 'blanket';
                break;
            default:
                return 'tshirts';
        }
    }

}
