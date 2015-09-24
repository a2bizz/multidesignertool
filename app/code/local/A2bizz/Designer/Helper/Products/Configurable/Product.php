<?php

class Sparx_Designersoftware_Helper_Products_Configurable_Product extends Mage_Core_Helper_Abstract {

    public function getDetails($data, $params, $defaultColorId) {

        if (isset($data['configProductId']) && !empty($data['configProductId'])) {
            $configurableId = $data['configProductId'];
            $associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getDefaultAssociatedProductCollection($configurableId, $defaultColorId);
        } else {
            // When Product is Selected from List		
            if (empty($data['productId']) && empty($params['pid'])) {
                //Get Configurable Product Id			
                $configurableId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultProductId();
                $associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getDefaultAssociatedProductCollection($configurableId, $defaultColorId);
            } else if (!empty($params['pid'])) {
                $productId = $params['pid'];
                $configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
                $associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);
            } else {
                //echo 'third';exit;		
                $productId = $data['productId'];
                $configurableId = Mage::getModel('designersoftware/products_product')->getConfigurableProductId($productId);
                $associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($productId);
            }
        }

        // Get All Color Details of A Configurable Product
        if ($configurableId) {
            $productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($configurableId);
            //echo '<pre>';print_r($productCollection->getData());exit;
            $dataArray = array();

            $listDesc['line1'] = "6.1 oz. 100% pre-shrunk cotton; Heather, Antique, and Safety colors are poly/cotton blends";
            $listDesc['line2'] = "Sturdy heavyweight cotton";
            $listDesc['line3'] = "Double-needle stitched for durability";
            $listDesc['line4'] = "Huge color selection";

            $dataArray['item'] = $productCollection->getName();
            $dataArray['sizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($productCollection->getId()) . " Generous fit";
            $dataArray['defaultColorId'] = $associatedProductCollection->getColor(); // Color Option Id
            $dataArray['defaultColorTitle'] = $this->getAttributeOptionLabelByOptionId($associatedProductCollection->getColor());
            $dataArray['defaultColorValue'] = $this->getAttributeOptionValueByOptionId($associatedProductCollection->getColor());
            $dataArray['defaultSizeRange'] = Mage::getModel('designersoftware/products_product')->getSizeRange($associatedProductCollection->getId());
            $dataArray['defaultMinQuantity'] = Mage::getModel('designersoftware/products_product')->getMinQty($associatedProductCollection->getId());
            $dataArray['decoration'] = "Screen printing or high-quality digital printing";
            $dataArray['deliveryTime'] = "Free 2-week / Rush 1-week";
            $dataArray['minimumOrder'] = "1 piece";
            $dataArray['title1'] = "Our best selling t-shirt! This style fits your group - and your budget.";
            $dataArray['title2'] = "A great look. Priced right. And this t-shirt feels softer with every wash - it\'s no wonder our customers love this ultra popular style!";
            $dataArray['listTitle'] = $listDesc;

            return $dataArray;
        }
    }

    public function getAttributeOptionLabelByOptionId($optionId) {
        $colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');

        $attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
        $color_label = $attr->getSource()->getOptionText($optionId);

        return $color_label;
    }

    public function getAttributeOptionValueByOptionId($optionId) {
        $colorAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('color');

        $attr = Mage::getModel('catalog/resource_eav_attribute')->load($colorAttributeId);
        //echo '<pre>';print_r($attr->getSource()->getOption($optionId));exit;
        $colorArray = $attr->getSource()->getAllOptions(false);
        foreach ($colorArray as $color) {
            if ($color['value'] == $optionId) {
                $color_value = $color['details'];
                return $color_value;
            }
        }
    }

    public function getToolData($data, $params, $defaultColorId) {

        // When Product is Selected from List
        if (empty($data['productId']) && empty($params['pid'])) {
            //Get Configurable Product Id		
            //echo 'first';exit;	
            $configurableId = Mage::getModel('designersoftware/products_configurable_product')->getDefaultProductId();
            $associatedProductCollection = Mage::getModel('designersoftware/products_configurable_product')->getDefaultAssociatedProductCollection($configurableId, $defaultColorId);
        } else if (!empty($params['pid'])) {
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
        if ($configurableId) {
            //echo '<pre>';print_r($associatedProductCollection->getData());exit;
            $productCollection = Mage::getModel('designersoftware/products_configurable_product')->getProductModel($configurableId);
            $dataArray = array();
            $dataArray['productId'] = $associatedProductCollection->getId();
            $dataArray['color'] = $this->getAttributeOptionLabelByOptionId($associatedProductCollection->getColor());
            $dataArray['sizesData'] = $this->getAssociatedProductSizes($associatedProductCollection->getSize());
            $dataArray['views'] = $this->getViewDataArray($configurableId, $associatedProductCollection);

            return $dataArray;
        }
    }

    public function getAssociatedProductSizes($sizeString) {

        $sizesArray[] = $this->getSizeJson($sizeString, 'Youth');
        $sizesArray[] = $this->getSizeJson($sizeString, 'Adult');
        $sizesArray[] = $this->getSizeJson($sizeString, 'Plus');

        return $sizesArray;
    }

    public function getSizeJson($sizeString, $groupType) {

        $sizeAttributeId = Mage::getModel('designersoftware/products_configurable_product')->getAttributeIdByCode('size');
        $attr = Mage::getModel('catalog/resource_eav_attribute')->load($sizeAttributeId);

        $productSizeIdArray = explode(',', $sizeString);
        $groupTypefunction = 'get' . ucfirst($groupType) . 'Sizes';

        $sizeType = Mage::helper('designersoftware')->$groupTypefunction();

        $sizeIdArray = explode(',', $sizeType);
        $result = array_intersect($sizeIdArray, $productSizeIdArray);


        $sizeGroupArray['sizeGroupTitle'] = ucfirst($groupType);
        foreach ($result as $sizeId) {
            $size_label = $attr->getSource()->getOptionText($sizeId);
            $size['id'] = $sizeId;
            $size['title'] = $size_label;

            $sizeArray[] = $size;
        }
        $sizeGroupArray['sizes'] = $sizeArray;

        return $sizeGroupArray;
    }

    public function getViewDataArray($configurableId, $associatedProductCollection) {
        $product = Mage::getModel('catalog/product')->load($associatedProductCollection->getId());
        //echo '<pre>';print_r($product->getData());exit;

        $mediaGallery = $product->getMediaGallery();
        $views = Mage::helper('designersoftware/attributes_automation')->getAttributeOptions('rawproduct_views');

        foreach ($views as $key => $view) {

            $originalImageUrl = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB) . 'media/catalog/product' . $mediaGallery['images'][$key][file];
            $originalImageDirPath = Mage::getBaseDir() . '/media/catalog/product' . $mediaGallery['images'][$key][file];

            $thumbImageUrl = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB) . 'media/catalog/product/thumb' . $mediaGallery['images'][$key][file];
            $thumbImageDirPath = Mage::getBaseDir() . '/media/catalog/product/thumb' . $mediaGallery['images'][$key][file];

            // This will create thumb image if not exists their
            if (!file_exists($thumbImageDirPath)):
//					$this->resizeImage($originalImageDirPath, $thumbImageDirPath,182,164);	
                $this->resizeImage($originalImageDirPath, $thumbImageDirPath, 546, 493);
            endif;

            $dataArray['viewName'] = $view['label'];
            $dataArray['viewId'] = $view['value'];
            $dataArray['printWidth'] = $this->getPrintWidth($configurableId, trim(ucfirst($view['label'])));
            $dataArray['printHeight'] = $this->getPrintHeight($configurableId, trim(ucfirst($view['label'])));
            $dataArray['src'] = $thumbImageUrl;
            $dataArray['thumb'] = $thumbImageUrl;
            $dataArray['drawAreas'] = $this->getViewDrawAreas($configurableId, trim(strtolower($view['label'])));

            $viewArray[] = $dataArray;
        }
        return $viewArray;
    }

    public function getViewDrawAreas($configurableId, $view) {

        $product = Mage::getModel('catalog/product')->load($configurableId);
        $viewObj = 'rawproduct_' . $view . '_view_drawarea';
        $drawareaString = $product->getData($viewObj);

        $drawareaArray = unserialize($drawareaString);
        foreach ($drawareaArray as $drawarea) {
            $dataArray['drawAreaTitle'] = $drawarea['drawL'];
            $dataArray['drawX'] = $drawarea['drawX'];
            $dataArray['drawY'] = $drawarea['drawY'];
            $dataArray['drawW'] = $drawarea['drawW'];
            $dataArray['drawH'] = $drawarea['drawH'];

            $viewDrawAreaArray[] = $dataArray;
        }

        return $viewDrawAreaArray;
    }

    public function getPrintWidth($configurableId, $view) {

        $product = Mage::getModel('catalog/product')->load($configurableId);
        $printWidthFunction = 'getRawproduct' . $view . 'PrintWidth';
        return $product->$printWidthFunction();
    }

    public function getPrintHeight($configurableId, $view) {

        $product = Mage::getModel('catalog/product')->load($configurableId);
        $printHeightFunction = 'getRawproduct' . $view . 'PrintHeight';
        return $product->$printHeightFunction();
    }

    public function getBasename($filename) {
        return preg_replace('/^.+[\\\\\\/]/', '', $filename);
    }

    public function resizeImage($_imageUrl, $newImageUrl, $width, $height) {

        // This will create Directory tree to the given path		
        $dir = dirname($newImageUrl) . '/';

        if (!file_exists($dir)) {
            mkdir($dir, 0777, true);
        }

        $imageName = $this->getBasename($newImageUrl);
        $imageResized = $dir . $imageName;
        //echo $newImageUrl;exit;

        if (!file_exists($imageResized) && file_exists($_imageUrl)):

            $imageObj = new Varien_Image($_imageUrl);
            $imageObj->constrainOnly(TRUE);
            $imageObj->keepAspectRatio(TRUE);
            $imageObj->keepFrame(FALSE);
            $imageObj->resize($width, $height);
            $imageObj->save($imageResized);

        endif;
    }

}
