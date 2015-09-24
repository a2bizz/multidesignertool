<?php

class Sparx_Designersoftware_Helper_Clipart_Json extends Mage_Core_Helper_Abstract {

    public function load($data) {
        $clipartCategoryId = $data['categoryId']; 
        $groupId = Mage::helper('designersoftware/data')->getGroupId();
        $clipartArray = array();
          $clipartCollection = Mage::getModel('clipart/clipart')->getCollection()->addFieldToFilter('clipartsubcategory_id', $clipartCategoryId)->addFieldToFilter('group_id',array($groupId,1))->setOrder('group_id', 'desc');;
        //echo '<pre>';                print_r($clipartCollection->getData()); die;
        foreach ($clipartCollection as $clipart) {
            $array['clipartId'] = $clipart->getId();
            $array['clipartCategoryId'] = $clipart->getClipartcategoryId();
            $array['clipartSubcategoryId'] = $clipart->getClipartsubcategoryId();
            $array['title'] = $clipart->getTitle();
            $array['colorable'] = $clipart->getColorable();
            $array['thumb'] = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB) . 'media/files/clipart/thumb/' . $clipart->getFilename();
            $array['original'] = 'media/files/clipart/original/' . $clipart->getFilename();

            $clipartArray[] = $array;
        }

        $clipartsArray['clipart'] = $clipartArray;
        $cliparts['cliparts'] = $clipartsArray;

        return $cliparts;
    }
    

}
