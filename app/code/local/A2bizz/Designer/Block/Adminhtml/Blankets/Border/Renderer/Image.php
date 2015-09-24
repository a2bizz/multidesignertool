<?php
class Sparx_Designersoftware_Block_Adminhtml_Blankets_Border_Renderer_Image extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    public function render(Varien_Object $row) {
        $data = $row->getData();        
         
        $filename = $data['drop_image'];		
				    
		$imagePath=Mage::getBaseUrl('media').'files/blankets/border/thumb/'.$filename;
		$imageHtml=file_exists(Mage::getBaseDir('media').'/files/blankets/border/thumb/'.$filename)?'<img src="'.$imagePath.'" width="100">':'';
       
        return $imageHtml;
    }
}
?>
