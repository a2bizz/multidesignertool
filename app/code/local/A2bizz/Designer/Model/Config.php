<?php

class Sparx_Designersoftware_Model_Config extends Varien_Object
{
	const CACHE_TAG_NAMESPACE_MODULE = 'DESIGNER_SOFTWARE_CACHE';
	
	
    public function cache($cacheId, $html){
		
		$cacheGroup = 'sparx_designersoftware';
		$useCache = Mage::app()->useCache($cacheGroup);
		
		if (true === $useCache) {
			// Cache is active
			//$cacheId = "unique_name";
			if ($cacheContent = Mage::app()->loadCache($cacheId)) {
				$html = $cacheContent;
				return unserialize($html);
			} else {

				try {
						$cacheContent = serialize($html);
						$tags = array(self::CACHE_TAG_NAMESPACE_MODULE);
						$lifetime = Mage::getStoreConfig('core/cache/lifetime');
						Mage::app()->saveCache($cacheContent, $cacheId, $tags, $lifetime);
					} catch (Exception $e) {
					// Exception = no caching
					Mage::logException($e);
				}
				return $html;
			}
		} else {
			// Cache is not active
			return $html;
		}
	}
}
