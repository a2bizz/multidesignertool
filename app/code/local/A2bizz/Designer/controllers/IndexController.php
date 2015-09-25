<?php
class A2bizz_Designer_IndexController extends Mage_Core_Controller_Front_Action
{    
    public function indexAction(){			
		$this->loadLayout();     
		$this->renderLayout();
	}
		
	// First Tab of Designer Tool, We are accessing Data for First Tab
	public function swapItemAction(){		
		$data = $this->getRequest()->getPost();
		$return = Mage::helper('designer/products_configurable_json')->load($this->getRequest()->getPost());
		
		// Add to Cache
		if(isset($data['configProductId'])):
			$cacheId = 'swapitem_'.$data['configProductId'];
		else:
			$cacheId = 'swapitem_'.$data['productId'];
		endif;		
		$return = Mage::getModel('designer/config')->cache($cacheId, $return);
		
		$this->getResponse()->setBody($return);
	}
	
	// Change Product Image and Description on Changing Color
	public function colordataAction(){
		$data = $this->getRequest()->getPost();
             
		//$allColorArray = Mage::helper('designer/products_configurable_associated_color')->getColors($data);
		//$return = Mage::helper('designer/products_configurable_product')->getToolData($this->getRequest()->getPost(),'',$allColorArray['defaultColorId']);		
		// Add to Cache
		//$cacheId = 'colorData_'.$data['productId'];
		//$return = Mage::getModel('designer/config')->cache($cacheId, $return);
		
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($return));
	}
		
	public function testAction(){	
	
		$return = Mage::helper('designer/products_configurable_associated_testcolor')->getColors();		
		$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($return));
	}
	
	//Not in Use yet
	public function colorsAction() {
        $attributeInfo = Mage::getResourceModel('eav/entity_attribute_collection')
                ->setCodeFilter('color')
                ->getFirstItem();
                
        $attributeInfo['source_model'] = 'eav/entity_attribute_source_table';
         
        $default_value = $attributeInfo->getDefaultValue(); 
        $attributeOptions = $attributeInfo->getSource()->getAllOptions(false);
        
        $colorarray = array();
        foreach ($attributeOptions as $key => $color) {
            $tempcolor = array();

            if ($key == 0)
                $tempcolor['isDefault'] = $default_value;

            $tempcolor['id'] 	= $color['value'];
            $tempcolor['title'] = $color['label'];
            $tempcolor['value'] = $color['details'];
            $colorarray[] = $tempcolor;
            
            unset($tempcolor);
        }

        $this->getResponse()->setBody(Mage::helper('core')->jsonEncode($colorarray));
    }
}
