<?php

class Sparx_Designersoftware_Helper_User_Design extends Mage_Core_Helper_Abstract
{
	public function getUserDesignByEmail($email){
		
		$collection = Mage::getModel('designersoftware/user_design')->getCollectionByEmail($email);		
		return $collection;
	}
}
