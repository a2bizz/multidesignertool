<?php
class Sparx_Designersoftware_Block_Adminhtml_Template extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {		
    $this->_controller = 'adminhtml_template';
    $this->_blockGroup = 'designersoftware';
    $this->_headerText = Mage::helper('designersoftware')->__('Template Manager');
    $this->_addButtonLabel = Mage::helper('designersoftware')->__('Add Template');
    parent::__construct();
    
     // Remove Button Delete from Form 
    $this->_removeButton('add');
  }
}
