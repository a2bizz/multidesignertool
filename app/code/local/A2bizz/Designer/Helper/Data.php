<?php

class A2bizz_Designer_Helper_Data extends Mage_Core_Helper_Abstract {

    // Get Default Font set in Admin Configuration
    public function getFontsId() {
        return Mage::getStoreConfig('designergeneral/general/general_font');
    }

    public function getGreekFontsId() {
        return Mage::getStoreConfig('designergeneral/general/general_greekfont');
    }

    public function getAddNameFontsId() {
        return Mage::getStoreConfig('designergeneral/addname/addname_font');
    }

    public function isDefaultFontsCategory($categoryId) {
        $defaultCategoryId = Mage::getModel('designersoftware/fonts_category')->getFontsCategoryId($this->getFontsId());
        if ($defaultCategoryId == $categoryId)
            return 1;
        else
            return 0;
    }

    public function isGreekDefaultFontsCategory($categoryId) {
        $defaultCategoryId = Mage::getModel('designersoftware/fonts_category')->getFontsCategoryId($this->getGreekFontsId());
        if ($defaultCategoryId == $categoryId)
            return 1;
        else
            return 0;
    }

    public function isDefaultFont($fontsId) {
        $defaultFontsId = $this->getFontsId();
        if ($defaultFontsId == $fontsId)
            return 1;
        else
            return 0;
    }

    // Get Default Font set in Admin Configuration
    public function getYouthSizes() {
        return Mage::getStoreConfig('designer_sizes/youth/sizes');
    }

    // Get Default Font set in Admin Configuration
    public function getAdultSizes() {
        return Mage::getStoreConfig('designer_sizes/adult/sizes');
    }

    // Get Default Font set in Admin Configuration
    public function getPlusSizes() {
        return Mage::getStoreConfig('designer_sizes/plus/sizes');
    }

    function unlinkImage($model, $folder) {
        if ($model->getfilename() != "") {
            $imagenameArr = array($model->getfilename(), $model->getImageBleed(), $model->getImageOuterBleed(), $model->getImageMask(), $model->getImageBack(), $model->getImageBleedBack(), $model->getImageOuterBleedBack(), $model->getImageMaskBack(), $model->getImageMiddleBleed());

            foreach ($imagenameArr as $imageName) {
                $imageOrg = Mage::getBaseDir('media') . DS . 'files/' . $folder . '/original/' . $imageName;
                $imageThumb = Mage::getBaseDir('media') . DS . 'files/' . $folder . '/thumb/' . $imageName;
                $imageLarge = Mage::getBaseDir('media') . DS . 'files/' . $folder . '/large/' . $imageName;

                if (file_exists($imageOrg)) {
                    unlink($imageOrg);
                    unlink($imageThumb);
                    unlink($imageLarge);
                }
            }
        }
    }

    function unlinkFontImage($model, $folder) {
        if ($model->getfilename() != "") {

            $imageUrl = Mage::getBaseDir('media') . DS . 'files/' . $folder . '/original/' . $model->getTtfImageName(); //actual path
            $imageResized = Mage::getBaseDir('media') . DS . 'files/' . $folder . '/ttf/' . $model->getfilename(); //thumb path

            if (file_exists($imageUrl)) {
                unlink($imageUrl);
                unlink($imageResized);
            }
        }
    }

    function thumbImage($imageResized, $imageUrl) {
        if (!file_exists($imageResized) && file_exists($imageUrl)) {
            $imageObj = new Varien_Image($imageUrl);
            $imageObj->constrainOnly(TRUE);
            $imageObj->keepAspectRatio(TRUE);
            $imageObj->keepAspectRatio(false);
            $imageObj->keepFrame(TRUE);
            $imageObj->keepTransparency(true);
            list($width, $height, $type, $attr) = getimagesize($imageUrl);
            if ($width > 50 && $height > 50)
                $imageObj->resize(50, 50);
            $imageObj->save($imageResized);
        }
    }

    function largeImage($imageResized, $imageUrl, $width = '', $height = '') {
        if (!file_exists($imageResized) && file_exists($imageUrl)) {
            $imageObj = new Varien_Image($imageUrl);
            $imageObj->constrainOnly(TRUE);
            $imageObj->keepAspectRatio(TRUE);
            $imageObj->keepAspectRatio(false);
            $imageObj->keepFrame(TRUE);
            $imageObj->keepTransparency(true);
            if ($width == '' && $height == '') {
                $imageObj->resize(500, 500);
            } else {
                $imageObj->resize($width, $height);
            }
            $imageObj->save($imageResized);
        }
    }

    function getImageName($id, $model) {
        $collection = Mage::getModel($model)->load($id);
        $orgImgArr = array();
        $orgImgArr[] = $collection->getFilename();
        $orgImgArr[] = $collection->getImageBleed();
        $orgImgArr[] = $collection->getImageOuterBleed();
        $orgImgArr[] = $collection->getImageMask();
        $orgImgArr[] = $collection->getImageBack();
        $orgImgArr[] = $collection->getImageBleedBack();
        $orgImgArr[] = $collection->getImageOuterBleedBack();
        $orgImgArr[] = $collection->getImageMaskBack();
        $orgImgArr[] = $collection->getImageMiddleBleed();
        return $orgImgArr;
    }

    function getGroupId() {
        if (Mage::getSingleton('customer/session')->isLoggedIn()) {
            $email = Mage::getSingleton('customer/session')->getCustomer()->getEmail();
            $domain = explode('@', $email);
            $groupName = explode('.', $domain[1]);
            $groupName = $groupName[0];
            $grpColl = Mage::getModel('customer/group')->getCollection()->getData();
            $grpId = array();
            foreach ($grpColl as $gp) {
                if (strcasecmp($gp['customer_group_code'], $groupName) == 0) {
                    return $gp['customer_group_id'];
                }
            }
        }
    }

    public function getAdditionalColorCode($name,$additionalColorId='',$colorCode='',$isMultiColored) {
        if($additionalColorId=='' || $isMultiColored==0){
            return $colorCode;
        }
        $additionalColorArr=array();
        $attributeInfo = Mage::getResourceModel('eav/entity_attribute_collection')->setCodeFilter($name)->getFirstItem();
        $attributeId = $attributeInfo->getAttributeId();
        $attribute = Mage::getModel('catalog/resource_eav_attribute')->load($attributeId);
        $attributeOptions = $attribute->getSource()->getAllOptions(false);
        //echo '<pre>';        print_r($attribute); die;
        foreach ($attributeOptions as $option) {
            if ($option['value'] == $additionalColorId) {
                $additinalcolorCode = $option['label'];
                break;
            }
        }
        return str_replace('#', '', $additinalcolorCode);
    }
    
    public function getSecondColorId($prodId){
        return Mage::getModel('catalog/product')->load($prodId)->getAdditionalColor();       
    }
    
    public function isMultiColoredProduct($prodId){
        return Mage::getModel('catalog/product')->load($prodId)->getIsMulticolored();       
    }
}
