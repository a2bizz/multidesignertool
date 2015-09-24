<?php
class Sparx_Designersoftware_Block_Adminhtml_Hoodies_Layertype extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {		
    $this->_controller = 'adminhtml_hoodies_layertype';
    $this->_blockGroup = 'designersoftware';
    $this->_headerText = Mage::helper('designersoftware')->__('Layer Type Manager');
    $this->_addButtonLabel = Mage::helper('designersoftware')->__('Add Layer Type');
    parent::__construct();
  }
}
