<?php
class Sparx_Designersoftware_Block_Adminhtml_User_Design_Renderer_Image extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract {

    public function render(Varien_Object $row) {
        $data = $row->getData();        
         
        foreach(unserialize($data['design_file']) as $value){
			$filename = $value['composite']; 
			break;
		}
				    
		$imagePath=Mage::getBaseUrl('media').'files/user/final/thumb/'.$filename;
		$imageHtml=file_exists(Mage::getBaseDir('media').'/files/user/final/thumb/'.$filename)?'<img src="'.$imagePath.'" width="100">':'';
       
        return $imageHtml;
    }
}
?>
