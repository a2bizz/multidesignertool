<?php
class A2bizz_Designer_Block_Adminhtml_Designer extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_designer';
    $this->_blockGroup = 'designer';
    $this->_headerText = Mage::helper('designer')->__('Design Manager');
    $this->_addButtonLabel = Mage::helper('designer')->__('Add Design');
    parent::__construct();
  }
}
