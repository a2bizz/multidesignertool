<?php

class Sparx_Designersoftware_Helper_Template_Images extends Mage_Core_Helper_Abstract
{
	// Get Default Font set in Admin Configuration
	public function getImages($data){	
		//Get Image Magic Path
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');	
		
		$previewArr = $data['previewArr'];			
		if(count($previewArr)>1){
			
		} else {
			$previewArr[1]='data:image/png;base64,iVB';
		}
			
		//echo '<pre>';print_r($previewArr);exit;		
		//Set Images 
		foreach($previewArr as $key=>$preview): //Considered as first cycle for Front and Second for Back Image
			$basArr = ($key==0)? $data['frontPreviewArr'] : $data['backPreviewArr'];
			
			// Generate Dynamic Image Name 
			$previewImageName = $this->getPreviewImageName($key);
			// Generate Dynamic Base Image on Which Design Happens
			$baseImageArray = $this->getBaseImage($data, $previewImageName, $basArr);
			// Generate Dynamic Design Image
			$previewImageArray = $this->getPreviewImage($data, $previewImageName, $preview);
						
			$imageArr[$key]['preview']	= $previewImageArray['name'];
			$compositeImageName = $this->getCompositeImageName($previewImageName, $key);	
			
			// final Image Composite Base + Preview Images 
			$compositeArray = $this->getCompositeImage($key, $data, $previewImageName, $compositeImageName);
			
			$imageArr[$key]['composite'] = $compositeArray['name'];	
										
		endforeach;		
		
		//echo '<pre>';print_r($imageArr);exit;
		return $imageArr;
	}		
	
	public function getPreviewImage($data, $imageName, $preview){		
		$previewData = base64_decode(substr($preview, 22));
		
		$previewImgPath = '';
		if(!empty($previewData)):
			if($data['loginType']=='admin'):
				$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'preview' . DS . $imageName;
				$previewThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'preview' . DS . 'thumb' . DS . $imageName;
			else:
				$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'preview' . DS . $imageName;
				$previewThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'preview' . DS . 'thumb' . DS . $imageName;
		    endif;
			@unlink($previewImgPath);
			if (!file_exists($previewImgPath)):
				$fp = fopen($previewImgPath, 'w');
				fwrite($fp, $previewData);
				fclose($fp);
				
				$this->getThumbImage($previewImgPath, $previewThumbImgPath, 182, 164);	
				if (file_exists($previewImgPath)):		
					 $previewImageArray['previewImgPath'] = $previewImgPath;
					 $previewImageArray['previewThumbImgPath'] = $previewThumbImgPath;
					 $previewImageArray['name'] = $imageName;	
					return $previewImageArray;
				endif;
			endif;
		endif;			
	}
	
	
	public function getBaseImage($data, $imageName, $imageBase64Data){		
		$previewData = base64_decode(substr($imageBase64Data, 22));
		
		$previewImgPath = '';
		if(!empty($previewData)):
			if($data['loginType']=='admin'):
				$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'base' . DS . $imageName;
				$previewThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'base' . DS . 'thumb' . DS . $imageName;
			else:
				$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'base' . DS . $imageName;
				$previewThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'base' . DS . 'thumb' . DS . $imageName;
		    endif;
			@unlink($previewImgPath);
			if (!file_exists($previewImgPath)):
				$fp = fopen($previewImgPath, 'w');
				fwrite($fp, $previewData);
				fclose($fp);
				
				$this->getThumbImage($previewImgPath, $previewThumbImgPath, 182, 164);	
				if (file_exists($previewImgPath)):		
					 $previewImageArray['previewImgPath'] = $previewImgPath;
					 $previewImageArray['previewThumbImgPath'] = $previewThumbImgPath;
					 $previewImageArray['name'] = $imageName;	
					return $previewImageArray;
				endif;
			endif;
		endif;			
	}
	
	
	public function getCompositeImage($key, $data, $previewImageName, $compositeImageName){
		//Get Image Magic Path
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
		$productId = $data['productId'];
				
		if($data['loginType']=='admin'):
			$productImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'base' . DS . $previewImageName;
			$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'preview' . DS . $previewImageName;
			$finalImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . $compositeImageName;
			$finalThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . 'thumb' . DS . $compositeImageName;
			$finalCropImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . 'crop' . DS . $compositeImageName;
			$finalTempImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'template' . DS . 'final' . DS . 'temp' . DS . $compositeImageName;
		else:
			$productImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'base' . DS . $previewImageName;
			$previewImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'preview' . DS . $previewImageName;
			$finalImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'final' . DS . $compositeImageName;
			$finalThumbImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'final' . DS . 'thumb' . DS . $compositeImageName;
			$finalCropImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'final' . DS . 'crop' . DS . $compositeImageName;
			$finalTempImgPath = Mage::getBaseDir('media') . DS . 'files' . DS . 'user' . DS . 'final' . DS . 'temp' . DS . $compositeImageName;
		endif;
		
		exec($imageMagickPath . ' ' . $productImgPath . ' ' . $previewImgPath . ' -gravity center  -composite ' . $finalImgPath);
		
	   if(!file_exists($finalImgPath)):
		  $finalImgPath = $productImgPath;
	   endif;		
		
	   $this->getThumbImage($finalImgPath, $finalThumbImgPath, 182, 164);				
	   $this->getFinalCropImage($key, $finalImgPath, $finalCropImgPath, $data);
	   $this->getDesignTemplate($key, $finalImgPath, $finalTempImgPath, $data);
		
	   $cmpositeArray['finalImagePath'] 	 = $finalImgPath;
	   $cmpositeArray['finalThumbImagePath'] = $finalThumbImgPath;
	   $cmpositeArray['finalCropImgPath'] 	 = $finalCropImgPath;
	   $cmpositeArray['name'] 			  	 = $compositeImageName;				
	   
	   return $cmpositeArray;
	}
	
	public function getPreviewImageName($key){
		if($key==0){				
			return $imageName = uniqid('front_pre_') . rand(1, 1000) . strtotime(now()) . '.png';				
		} else {
			return $imageName = uniqid('back_pre_') . rand(1, 1000) . strtotime(now()) . '.png';
		}
	}
	
	public function getCompositeImageName($imageName, $key){
		if($key==0){				
			return $imageName = str_replace('front_pre_', 'front_comp_', $imageName);				
		} else {
			return $imageName = str_replace('back_pre_', 'back_comp_', $imageName);
		}
	}
	
	public function getThumbImage($path, $thumbPath, $width, $height){
		//Get Image Magic Path
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
		
		$thumbSize = $this->getImageRatio($width, $height, $path);		
        exec($imageMagickPath . ' ' . $path . ' -resize "' . $thumbSize . '" ' . $thumbPath);
        
	}
	
	public function getFinalCropImage($key, $path, $cropedImagePath, $data){
		//Get Image Magic Path
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
		$drawArea = $data['clippingDrawArea'];
		list($width, $height) = @(getimagesize($path));	
		
		foreach($drawArea as $drawKey=>$draw){
			if($key==$drawKey){
				$distanceTopStart 		= $draw['drawY'];
				$distanceTopStartToEnd 	= $draw['drawH'];
				break;
			}
		}		
							  
        exec($imageMagickPath . ' ' . $path . ' -crop "'. $width . 'x' . $distanceTopStartToEnd . '+0+' . $distanceTopStart . '"  ' . $cropedImagePath);
        
	}
	
	public function getDesignTemplate($key, $path, $cropedImagePath, $data){
		//Get Image Magic Path
		$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
		$drawArea = $data['clippingDrawArea'];
		//list($width, $height) = @(getimagesize($path));	
		
		//echo '<pre>';print_r($drawArea);exit;
		foreach($drawArea as $drawKey=>$draw){
			if($key==$drawKey){
				$distanceLeftStart 		= $draw['drawX'];
				$distanceTopStart 		= $draw['drawY'];
				$distanceLeftStartToEnd	= $draw['drawW'];
				$distanceTopStartToEnd 	= $draw['drawH'];
				break;
			}
		}
		
							  
        exec($imageMagickPath . ' ' . $path . ' -crop "'. $distanceLeftStartToEnd . 'x' . $distanceTopStartToEnd . '+' . $distanceLeftStart . '+' . $distanceTopStart . '"  ' . $cropedImagePath);
        
	}
	
	function getImageRatio($ratioW, $ratioH, $imgPath) {
        $imageRatio = '';

        list($width, $height) = @(getimagesize($imgPath));

        if ($width > $ratioW && $height > $ratioH) {
            $imageRatio = $ratioW . 'x' . $ratioH;
        } else if ($width < $ratioW && $height > $ratioH) {
            $imageRatio = 'x' . $ratioH;
        } else if ($width > $ratioW && $height < $ratioH) {
            $imageRatio = $ratioW . 'x';
        } else {
            $imageRatio = $width . 'x' . $height;
        }

        return $imageRatio;
    }
}
