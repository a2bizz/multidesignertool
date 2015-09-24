<?php

class Sparx_Designersoftware_Block_Adminhtml_Template_Renderer_Action extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    public function render(Varien_Object $row) {
        $data = $row->getData();
        $imageHtml = '<a href="' . Mage::getBaseUrl() . 'designersoftware/index/index/?tid=' . $data['template_id'] . '&type=edit" target="_blank">Edit in Tool</a>';

        return $imageHtml;
    }

}

?>
