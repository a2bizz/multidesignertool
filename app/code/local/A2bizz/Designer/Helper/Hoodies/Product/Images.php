<?php

class Sparx_Designersoftware_Helper_Hoodies_Product_Images extends Mage_Core_Helper_Abstract
{
	public function getThumbImage($image){			
			$originalImageUrl 		= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/catalog/product'.$image;				
			$originalImageDirPath	= Mage::getBaseDir().'/media/catalog/product'.$image;			
				
			$thumbImageUrl 			= Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB).'media/catalog/product/thumb'.$image;					
			$thumbImageDirPath		= Mage::getBaseDir().'/media/catalog/product/thumb'.$image;				
				
			// This will create thumb image if not exists their
			if(!file_exists($thumbImageDirPath)):
				$this->resizeImage($originalImageDirPath, $thumbImageDirPath,120,'');				
			endif;
			
			return $thumbImageUrl;
	}
	
	public function getBasename($filename){
		return preg_replace('/^.+[\\\\\\/]/', '', $filename);
	}
	
	public function resizeImage($_imageUrl, $newImageUrl, $width, $height){
		
		// This will create Directory tree to the given path		
		$dir = dirname($newImageUrl).'/';		
		
		if ( !file_exists( $dir ) ) {
			mkdir( $dir, 0777, true );
		}
		
		$imageName = $this->getBasename($newImageUrl);
		$imageResized = $dir . $imageName;
		//echo $newImageUrl;exit;
		
		if ( !file_exists($imageResized) && file_exists($_imageUrl) ):	
				
			$imageObj = new Varien_Image($_imageUrl);			
			$imageObj->constrainOnly(TRUE);
			$imageObj->keepAspectRatio(TRUE);
			$imageObj->keepFrame(FALSE);
			$imageObj->keepTransparency(TRUE);
			//$imageObj->backgroundColor('#dcd9d4');
			$imageObj->resize($width,$height);
			$imageObj->save($imageResized);	
						
		endif;
	}
	
	//this function will use all layers with there colors and then returns a complete image 
	public function compositeLayers($productId){ 
		$_product = Mage::getModel('catalog/product')->load($productId);
		//echo '<pre>';print_r($POST['product']['rawproduct_'. trim(strtolower($view['label'])) .'_view']['value']);exit;
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
		$views = Mage::helper('designersoftware/attributes_automation')->getAttributeOptions('rawproduct_views');
				
		foreach($views as $view):
			
			$functionName 		= 'getRawproduct'. trim(strtolower($view['label'])) .'View';
			$setFunctionName 	= 'setRawproduct'. trim(strtolower($view['label'])) .'View';
			
			$imageViewName = $_product->$functionName();
			$compositePath=Mage::getBaseDir('media'). DS .'blfa_files'. DS . $imageViewName;						
			$imageName = 'drawarea_image_'.$view['label'].'_'.$productId.'.png';
			
			if(file_exists($compositePath)){  
				unlink($compositePath);
				$compositePath=Mage::getBaseDir('media'). DS .'blfa_files'. DS .$imageName;				
				$compositeImages['rawproduct_'. trim(strtolower($view['label'])) .'_view'] = $imageName;
			} else { 
				$compositePath=Mage::getBaseDir('media'). DS .'blfa_files'. DS .$imageName; 				
				$compositeImages['rawproduct_'. trim(strtolower($view['label'])) .'_view'] = $imageName;
			}
			//echo '<pre>';print_r($_product->getData());exit;
		
			$collection = $this->getProductViewLayers($productId, $view['value']);
			$i=0;
			foreach($collection as $layer):
				$layertypeTitle = Mage::getModel('designersoftware/hoodies_layertype')->getLayertypeTitle($layer->getType());
				$code = (trim(strtolower($layertypeTitle))!='shadow') ? Mage::helper('designersoftware/hoodies_product_views_color')->getColorCode($layer['default_color_id']) : '';
				$imageToConvert =Mage::getBaseDir('media') . DS . 'files' . DS . 'customtabslayer'. DS .'original' . DS . $layer['filename'];
				
				$colorLayerStr = 'convert '. $imageToConvert .' -fill "#'. $code .'" -colorize 100% ';
				$colorLayerPath = Mage::getBaseDir('media'). DS . 'tempImage.png';
				
				if($code!=''){ exec($imageMagickPath.' '.$colorLayerStr.' '.$colorLayerPath);}
				
				if($i++==0) 	
					$compositeStr=$colorLayerPath;
				else {
					if($code!=''){
						$compositeStr=$compositePath.' '.$colorLayerPath.' -geometry +0+0 -composite ';
					} else {
						$compositeStr=$compositePath.' '.$imageToConvert.' -geometry +0+0 -composite ';
					}
				}
										
				exec($imageMagickPath.' '.$compositeStr.' '.$compositePath);				
				
			endforeach;
			if(file_exists($colorLayerPath)){  unlink($colorLayerPath); }								
		endforeach;
		
		return $compositeImages;
	}
	
	public function getProductViewLayers($productId, $viewId){
		$layersCollection = Mage::getModel('customtabs/layers')->getCollection()
										->addFieldToFilter('product_id',$productId)
										->addFieldToFilter('view_id',$viewId)
										->addFieldToFilter('status',1)																				
										->setOrder('sort_order', 'asc');
		return $layersCollection;
	}
}
