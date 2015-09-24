<?php
class Sparx_Designersoftware_Block_Adminhtml_Template_Renderer_Action extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    public function render(Varien_Object $row) {
        $data = $row->getData(); 
        
        // Design Lab category Id is 420
        $_categoryCollection = Mage::getModel('catalog/category')->load(420);
        //$_categoryCollection->getRequestPath();
        //echo '<pre>';print_r($_categoryCollection->getRequestPath());exit;              
        
		$imageHtml='<a href="'. Mage::getUrl().$_categoryCollection->getRequestPath().'?tid='.$data['template_id'] .'" target="_blank">Edit in Tool</a>';
       
        return $imageHtml;
    }
}
?>
