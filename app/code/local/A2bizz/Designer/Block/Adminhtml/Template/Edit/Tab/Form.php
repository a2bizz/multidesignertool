<?php

class Sparx_Designersoftware_Block_Adminhtml_Template_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('template_form', array('legend'=>Mage::helper('designersoftware')->__('Template information')));
     
      /*$fieldset->addField('design_name', 'text', array(
          'label'     => Mage::helper('designersoftware')->__('Design Name'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'design_name',
      ));
	*/
      $fieldset->addField('filename', 'file', array(
          'label'     => Mage::helper('designersoftware')->__('File'),
          'required'  => false,
          'name'      => 'filename',
	  ));
		
      $fieldset->addField('status', 'select', array(
          'label'     => Mage::helper('designersoftware')->__('Status'),
          'name'      => 'status',
          'values'    => array(
              array(
                  'value'     => 1,
                  'label'     => Mage::helper('designersoftware')->__('Enabled'),
              ),

              array(
                  'value'     => 2,
                  'label'     => Mage::helper('designersoftware')->__('Disabled'),
              ),
          ),
      ));
     
      /*
       $fieldset->addField('content', 'editor', array(
          'name'      => 'content',
          'label'     => Mage::helper('designersoftware')->__('Content'),
          'title'     => Mage::helper('designersoftware')->__('Content'),
          'style'     => 'width:700px; height:500px;',
          'wysiwyg'   => false,
          'required'  => true,
      ));
      */
     
      if ( Mage::getSingleton('adminhtml/session')->getDesignersoftwareData() )
      {
          $form->setValues(Mage::getSingleton('adminhtml/session')->getDesignersoftwareData());
          Mage::getSingleton('adminhtml/session')->setDesignersoftwareData(null);
      } elseif ( Mage::registry('template_data') ) {
          $form->setValues(Mage::registry('template_data')->getData());
      }
      return parent::_prepareForm();
  }
}
