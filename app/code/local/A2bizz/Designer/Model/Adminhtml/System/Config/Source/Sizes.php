<?php

class Sparx_Designersoftware_Model_Adminhtml_System_Config_Source_Sizes extends Varien_Object
{
    static public function toOptionArray()
    {
        $collection = Mage::getModel('designersoftware/sizes')->getSizesCollection();        
        return $collection;
    }
}
