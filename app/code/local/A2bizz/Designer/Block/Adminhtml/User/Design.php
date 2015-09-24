<?php
class Sparx_Designersoftware_Block_Adminhtml_User_Design extends Mage_Adminhtml_Block_Widget_Grid_Container
{
  public function __construct()
  {
    $this->_controller = 'adminhtml_user_design';
    $this->_blockGroup = 'designersoftware';
    $this->_headerText = Mage::helper('designersoftware')->__('User Design Manager');
    $this->_addButtonLabel = Mage::helper('designersoftware')->__('Add User Design');
    
    parent::__construct();
     // Remove Button Delete from Form 
    $this->_removeButton('add');
  }
}
