<?php

class Sparx_Designersoftware_Block_Adminhtml_Blankets_Border_Edit_Tabs extends Mage_Adminhtml_Block_Widget_Tabs
{

  public function __construct()
  {
      parent::__construct();
      $this->setId('border_tabs');
      $this->setDestElementId('edit_form');
      $this->setTitle(Mage::helper('designersoftware')->__('Border Information'));
  }

  protected function _beforeToHtml()
  {
      $this->addTab('form_section', array(
          'label'     => Mage::helper('designersoftware')->__('Border Information'),
          'title'     => Mage::helper('designersoftware')->__('Border Information'),
          'content'   => $this->getLayout()->createBlock('designersoftware/adminhtml_blankets_border_edit_tab_form')->toHtml(),
      ));
     
      return parent::_beforeToHtml();
  }
}
