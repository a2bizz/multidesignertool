<?php

class Sparx_Designersoftware_Block_Adminhtml_Hoodies_Layertype_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('layertype_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('designersoftware')->__('Layer Type Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('designersoftware')->__('Layer Type Information'),
          'title'     => Mage::helper('designersoftware')->__('Layer Type Information'),
          'content'   => $this->getLayout()->createBlock('designersoftware/adminhtml_hoodies_layertype_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}
