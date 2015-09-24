<?php
class Sparx_Designersoftware_UserController extends Mage_Core_Controller_Front_Action
{
    public function designAction(){
		
		$this->loadLayout();     
		$this->renderLayout();
		
	}	
	
	public function designlistAction(){		
		//echo '<pre>';print_r($data);exit;
		$this->loadLayout();     
		$this->renderLayout();
		
	}
}
