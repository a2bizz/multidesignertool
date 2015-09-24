<?php

class Sparx_Designersoftware_Model_Adminhtml_System_Config_Source_Fonts extends Varien_Object
{
    static public function toOptionArray()
    {
        $collection = Mage::getModel('designersoftware/fonts')->getFontsCollection();
        if(count($collection)>0){
            foreach($collection as $font){
                $fontArray[$font['fonts_id']] = $font['title'];
            }
        }
        
        return $fontArray;
    }
}
