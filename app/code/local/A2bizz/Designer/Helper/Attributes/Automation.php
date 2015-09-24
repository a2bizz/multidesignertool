<?php
class Sparx_Designersoftware_Helper_Attributes_Automation extends Mage_Core_Helper_Abstract
{
	public function __construct()
	{
		
	}
	
	public function removeAttributeFromGroupAndSet($optionView){
		//get all attribute sets
		$sets = $this->getAttibuteSets();
		
		//loop through all the sets
		foreach ($sets as $set){
			$attribute_set_id = $set->getId();
			
			$name = 'Rawproduct '.ucfirst($optionView);
			$attribute_code = strtolower(str_replace(" ", "_", $name));
			$this->removeAttribute($attribute_code, $attribute_set_id);
			
			$options = $this->getAttributeOptions('rawproduct_designertool_option'); // insert Attribute Code
			foreach($options as $option){ 
				
				$optionViewVal = $this->trimOptionValues($option['label']);
				
				// Create Attribute and assign to above group
				$newName = $name.' '.ucfirst($optionViewVal);
				$attribute_code = strtolower(str_replace(" ", "_", $newName));
				$this->removeAttribute($attribute_code, $attribute_set_id); 
			}
		}
	}
		
	// Function to Remove Attribute from Attribute Group and Will move it to outside lobby and will 
	// remain Unassign
	
	public function removeAttribute($attribute_code, $attribute_set_id){
	
		// To unassign a Attribute from Attribute Set
		$setup = new Mage_Eav_Model_Entity_Setup('core_setup'); 
		$attribute_id = $setup->getAttributeId('catalog_product', $attribute_code);
		  
		Mage::getModel('catalog/product_attribute_set_api')->attributeRemove($attribute_id, $attribute_set_id);
		
	}
	
	// Create Attributes in Multiple Attribute Sets
	public function createAttributeGroupInMultipleSets(){
		$sets = $this->getAttibuteSets();
		//loop through all the sets
		foreach ($sets as $set){
			$attribute_set_id = $set->getId();  // Attribute set ID
			
			// Create attribute Group 
			$this->createAttributeGroup("Raw Product Tab", $attribute_set_id);
			$this->createAttributeGroup("Print Area Tab", $attribute_set_id);
		}
	}
	
	public function getAttibuteSets(){
		//get the type ID of the product - you will need it later
		$entityTypeId = Mage::getModel('catalog/product')->getResource()->getTypeId();

		//get all attribute sets
		$sets = Mage::getModel('eav/entity_attribute_set')
			->getResourceCollection()
			//filter only sets for products - that's why you needed the product type ID
			->addFilter('entity_type_id', $entityTypeId);
			
		return $sets;
	} 
	
	public function trimOptionValues($value){
		
		$arr = explode(' ', trim($value));
		$sentence = '';
		
		foreach($arr as $key){
			$sentence .= ucfirst(trim($key)).' ';
		}
		
		return trim($sentence);
	}
	
	// Get Attribute Options on the basis of Attribute Code
	public function getAttributeOptions($attribute_code){
		//$attribute_code = "rawproduct_designertool_option"; 
		$attribute_details = Mage::getSingleton("eav/config")->getAttribute("catalog_product", $attribute_code); 
		$options = $attribute_details->getSource()->getAllOptions(false); 
		
		return $options;
	}
	
	// Add Attribute To Attribute Set and Group
	public function addAttributeToGroupAndSet($optionView){
		
		$sets = $this->getAttibuteSets();
			
		//loop through all the sets
		foreach ($sets as $set){
			
			$attribute_set_id = $set->getId();  // Attribute set ID
			$groupName="Raw Product Tab";  	// Inside attribue set you will get groups  ex:- General, prices etc
					
			// Create Attribute and assign to above group
			$name = 'Rawproduct '.ucfirst($optionView); 
			if($this->isAtrributeExist($name))
				$this->createAttribute(strtolower(str_replace(" ", "_", $name)), substr($name, 11), "blfa_file", "customproduct", $attribute_set_id, $groupName);
			else
				$this->assignAttributeToGroupAndSet($groupName, $attribute_set_id, $name);
					
			$options = $this->getAttributeOptions('rawproduct_designertool_option'); // insert Attribute Code
			
			foreach($options as $option){ 
				
				// print_r($option) and find all the elements echo $option["value"];
				if($option['label']=='Print Height' || $option['label']=='Print Width'){
					$groupName="Raw Product Tab";
				} else {
					$groupName="Print Area Tab";
				}
				$optionViewVal = $this->trimOptionValues($option['label']);
				
				// Create Attribute and assign to above group
				$newName = $name.' '.ucfirst($optionViewVal);
				if($this->isAtrributeExist($newName)) 
					$this->createAttribute(strtolower(str_replace(" ", "_", $newName)), substr($newName, 11), "text", "customproduct", $attribute_set_id, $groupName);
				else 
					$this->assignAttributeToGroupAndSet($groupName, $attribute_set_id, $newName);
			}
		}
	}
		
	// To create New attribute 
	public function createAttribute($code, $label, $attribute_type, $product_type, $attribute_set_id, $group_name )
	{
		$_attribute_data = array(
			'attribute_code' => $code,
			'is_global' => '1',
			'frontend_input' => $attribute_type, //'boolean',
			'default_value_text' => '',
			'default_value_yesno' => '0',
			'default_value_date' => '',
			'default_value_textarea' => '',
			'is_unique' => '0',
			'is_required' => '0',
			'apply_to' => array($product_type), //array('grouped')
			'is_configurable' => '0',
			'is_searchable' => '0',
			'is_visible_in_advanced_search' => '0',
			'is_comparable' => '0',
			'is_used_for_price_rules' => '0',
			'is_wysiwyg_enabled' => '0',
			'is_html_allowed_on_front' => '1',
			'is_visible_on_front' => '0',
			'used_in_product_listing' => '0',
			'used_for_sort_by' => '0',
			'frontend_label' => array($label)
		);
	 
		$model = Mage::getModel('catalog/resource_eav_attribute');
	 
		if (!isset($_attribute_data['is_configurable'])) {
			$_attribute_data['is_configurable'] = 0;
		}
		if (!isset($_attribute_data['is_filterable'])) {
			$_attribute_data['is_filterable'] = 0;
		}
		if (!isset($_attribute_data['is_filterable_in_search'])) {
			$_attribute_data['is_filterable_in_search'] = 0;
		}
	 
		if (is_null($model->getIsUserDefined()) || $model->getIsUserDefined() != 0) {
			$_attribute_data['backend_type'] = $model->getBackendTypeByInput($_attribute_data['frontend_input']);
		}
	 
		$defaultValueField = $model->getDefaultValueByInput($_attribute_data['frontend_input']);
		if ($defaultValueField) {
		  //  $_attribute_data['default_value'] = $this->getRequest()->getParam($defaultValueField);
		}
	 
		$model->addData($_attribute_data);
	 
		$model->setEntityTypeId(Mage::getModel('eav/entity')->setType('catalog_product')->getTypeId());
		$model->setIsUserDefined(1);
		try {
			$model->save();
			$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
				//-------------- add attribute to set and group
				$attribute_code = $code;

				//$attribute_set_id=$setup->getAttributeSetId('catalog_product', $attribute_set_name);
				$attribute_group_id=$setup->getAttributeGroupId('catalog_product', $attribute_set_id, $group_name);
				$attribute_id=$setup->getAttributeId('catalog_product', $attribute_code);

				$setup->addAttributeToSet($entityTypeId='catalog_product',$attribute_set_id, $attribute_group_id, $attribute_id);
			
		} catch (Exception $e) { 
			echo '<br><p># Sorry, error occured. Error: '.$e->getMessage().'</p>'; 
		}
	} 
	
	public function createAttributeGroup($groupName, $attribute_set_id){
	
		//create an attribute group instance
		$modelGroup = Mage::getModel('eav/entity_attribute_group');
		//set the group name
		
		$modelGroup->setAttributeGroupName($groupName) //change group name
			//link to the current set
			->setAttributeSetId($attribute_set_id)
			//set the order in the set
			->setSortOrder(100);
		try {        
			//save the new group
			$modelGroup->save();
			
		} catch (Exception $e) { 
			echo '<br><p># Sorry Error Exists.<br> Error: '.$e->getMessage().'</p>'; 
		}
		
	}
	
	// code to Assign Attribute to Attribute group and attribute set
	public function assignAttributeToGroupAndSet($groupName, $attribute_set_id, $attribute_name){
		//$group_name = 'Customizable Images';
		//$attribute_set_name = 'default';
		//$attribute_code = 'rawproduct_back_print_height';
		$attribute_code = strtolower(str_replace(" ", "_", $attribute_name));
		
		$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
		//$attribute_set_id=$setup->getAttributeSetId('catalog_product', $attribute_set_name);
		$attribute_group_id=$setup->getAttributeGroupId('catalog_product', $attribute_set_id, $groupName);
		$attribute_id=$setup->getAttributeId('catalog_product', $attribute_code);

		$setup->addAttributeToSet($entityTypeId='catalog_product',$attribute_set_id, $attribute_group_id, $attribute_id);
	}
	
	// To check Weather Attribute is already Exists
	public function isAtrributeExist($attribute_name){
		
		$attribute_code = strtolower(str_replace(" ", "_", $attribute_name));
		
		$setup = new Mage_Eav_Model_Entity_Setup('core_setup'); 
		$attribute_id = $setup->getAttributeId('catalog_product', $attribute_code);
		if(empty($attribute_id))
			return true;
		else 
			return false;
	}
	
	// Get All attributes of a Group 
	public function getAttributesAssignedToGroup($groupId) {
		$attributesCollection = Mage::getResourceModel('catalog/product_attribute_collection');
        $attributesCollection->setAttributeGroupFilter($groupId);
        foreach ($attributesCollection as $attribute) {
           $attributeAssigned[] = $attribute->getAttributeCode();
        }
    	return $attributeAssigned;
    }
    
    // remove attributes from Attribute Groups
    public function removeAttributesFromGroups(){
		$attributeGroupsName = Mage::registry('attribute_groups');			
				
		
		$sets = $this->getAttibuteSets();
		
		
		foreach($attributeGroupsName as $groupName){	
			foreach($sets as $set){
				$attribute_set_id = $set->getId();  // Attribute set ID
				$attributeGroupId = $this->getAttributesGroupId($attribute_set_id, $groupName);
				$groupAttributeArray = $this->getAttributesAssignedToGroup($attributeGroupId);
				//echo '<pre>';print_r($groupAttributeArray);exit;
				foreach($groupAttributeArray as $attribute_code){
					if($attribute_code!='rawproduct_views')			
						$this->removeAttribute($attribute_code, $attribute_set_id);		
				}
			}
		}
	}
	
	public function getAttributesGroupId($attribute_set_id, $groupName){
		// get group Id
		$setup = new Mage_Eav_Model_Entity_Setup('core_setup');
		$attributeGroupId=$setup->getAttributeGroupId('catalog_product', $attribute_set_id, $groupName);
		//print_r($setup->getAttributeGroupId('catalog_product', $attribute_set_id));exit;
		return $attributeGroupId;		
	}
}
