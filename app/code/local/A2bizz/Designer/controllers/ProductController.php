<?php
class A2bizz_Designer_ProductController extends Mage_Core_Controller_Front_Action
{
    // It will call details of a Product (Configurable) for opening in Designer Tool
    public function indexAction(){
		// Extract item and product to configure
		//$params = (int) $this->getRequest()->getParam();
		//echo '<pre>s';print_r($params);exit;
        /*$id = (int) $this->getRequest()->getParam('id');
        $quoteItem = null;
        $cart = $this->_getCart();
        if ($id) {
            $quoteItem = $cart->getQuote()->getItemById($id);
        }

        if (!$quoteItem) {
            $this->_getSession()->addError($this->__('Quote item is not found.'));
            $this->_redirect('checkout/cart');
            return;
        }*/

        try {
            $params = new Varien_Object();
            $params->setCategoryId(false);
            $params->setDesignerMode(true);
            //$params->setBuyRequest($quoteItem->getBuyRequest());
			
			//echo '<pre>';print_r($params);exit;
            Mage::helper('catalog/product_view')->prepareAndRender('1', $this, $params);
        } catch (Exception $e) {
            $this->_getSession()->addError($this->__('Cannot Design product.'));
            Mage::logException($e);
            $this->_goBack();
            return;
        }
	}
}
