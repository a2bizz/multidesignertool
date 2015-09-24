<?php
class Sparx_Designersoftware_Block_Adminhtml_Blankets_Border extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {		
    $this->_controller = 'adminhtml_blankets_border';
    $this->_blockGroup = 'designersoftware';
    $this->_headerText = Mage::helper('designersoftware')->__('Border Manager');
    $this->_addButtonLabel = Mage::helper('designersoftware')->__('Add Border');
    parent::__construct();
    
     // Remove Button Delete from Form 
    //$this->_removeButton('add');
  }
}
