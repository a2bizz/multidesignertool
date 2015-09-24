<?php
class A2bizz_Designer_Block_Product extends Mage_Catalog_Block_Product_View_Media //Mage_Core_Block_Template
{
	public function _prepareLayout()
    {        
        if ($headBlock = $this->getLayout()->getBlock('head')) {		
            $headBlock->setTitle(Mage::helper('designer')->__('Your Design on Product') . ' - ' . $headBlock->getDefaultTitle());
        }
        
        //echo '<pre>sasas';print_r($this->getProduct());exit;
        $block = $this->getLayout()->getBlock('product.info.media');        
        if ($block) {
             $block->setSubmitRouteData(array(
                'route' => 'designer/product/index',
                'params' => array('id' => $this->getRequest()->getParam('id'))
             ));
        }

        // Set custom template with 'Update Cart' button
        $block = $this->getLayout()->getBlock('product.info.media');
        if ($block) {
            $block->setTemplate('a2bizz/catalog/product/view/media.phtml');
        }
        //echo '<pre>';print_r($block->getData());exit;
        
		return parent::_prepareLayout();
    }
}
