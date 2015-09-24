<?php
class Sparx_Designersoftware_Block_Template extends Mage_Core_Block_Template
{
	public function _prepareLayout()
    {
		return parent::_prepareLayout();
    }
    
	public function getTemplate()     
	{ 
		if (!$this->hasData('template')) {
			$this->setData('template', Mage::registry('template'));
		}
		return $this->getData('template');                
	}	
}
