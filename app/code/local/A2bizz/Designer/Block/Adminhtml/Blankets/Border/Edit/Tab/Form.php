<?php

class Sparx_Designersoftware_Block_Adminhtml_Blankets_Border_Edit_Tab_Form extends Mage_Adminhtml_Block_Widget_Form
{
  protected function _prepareForm()
  {
      $form = new Varien_Data_Form();
      $this->setForm($form);
      $fieldset = $form->addFieldset('border_form', array('legend'=>Mage::helper('designersoftware')->__('Border Information')));
     
      $fieldset->addField('title', 'text', array(
          'label'     => Mage::helper('designersoftware')->__('Border Title'),
          'class'     => 'required-entry',
          'required'  => true,
          'name'      => 'title',
      ));
	
      $fieldset->addField('drop_image', 'file', array(
          'label'     => Mage::helper('designersoftware')->__('Border DropDown Image'),
          'required'  => false,
          'name'      => 'drop_image',
          'after_element_html' => $fromData['drop_image']!=''?'<p><img src="' . Mage::getBaseUrl('media') . 'files/blankets/border/dropdown/thumb/' . $fromData['drop_image']. '"/></p>':'',         
	  ));
	  
	  $fieldset->addField('filename', 'file', array(
          'label'     => Mage::helper('designersoftware')->__('Border Image'),
          'required'  => false,
          'name'      => 'filename',
          'after_element_html' => $fromData['filename']!=''?'<p><img src="' . Mage::getBaseUrl('media') . 'files/blankets/border/thumb/' . $fromData['filename']. '"/></p>':'',          
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
     
      if ( Mage::getSingleton('adminhtml/session')->getBorderData() )
      {
          $form->setValues(Mage::getSingleton('adminhtml/session')->getBorderData());
          Mage::getSingleton('adminhtml/session')->setBorderData(null);
      } elseif ( Mage::registry('border_data') ) {
          $form->setValues(Mage::registry('border_data')->getData());
      }
      return parent::_prepareForm();
  }
}
