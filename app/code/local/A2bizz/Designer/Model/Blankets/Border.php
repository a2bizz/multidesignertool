<?php

class Sparx_Designersoftware_Model_Blankets_Border extends Mage_Core_Model_Abstract
{
    public function _construct()
    {
        parent::_construct();
        $this->_init('designersoftware/blankets_border');
    }    
    
     public function getFileExt($fileName) {
      $fileArr = explode('.', $fileName);
      if (count($fileArr) == 2) {
         $fileExt = '.' . $fileArr[1];
         return $fileExt;
      } else {
         die('Invalid Image Name');
         exit;
      }
   }
   
   public function DELETE_RECURSIVE_DIRS($dirname) {
		if (is_dir($dirname)) {
			$dir_handle = opendir($dirname);
			while ($file = readdir($dir_handle)) {
				if ($file != "." && $file != "..") {
					if (!is_dir($dirname . "/" . $file)) {
						unlink($dirname . "/" . $file);
					} else {
						$this -> DELETE_RECURSIVE_DIRS($dirname . "/" . $file);
						@rmdir($dirname . "/" . $file);
					}
				}
			}
			closedir($dir_handle);
			@rmdir($dirname);
			return true;
		} else
			return false;
	}
   
   public function createDirectory($dirName) {
	   	if (!is_dir($dirName)) {
			@mkdir($dirName);
			@chmod($dirName, 0777);
		}
   }
   
   // to upload images type in a specified directories
   public function uploadThumbLarge($imageName = "", $dest = "", $basedest = "") {
	   
      // get Image Magic Path which is useful in cropping images in different scenarios, 
      // we have saved the path for image magic in Custom Variable in System
      $image_magick_path = Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
      //$imageMagickPath=Mage::getModel('core/variable')->loadByCode('IMAGE_MAGICK_PATH')->getValue('plain');
      
      $this->createDirectory($basedest . DS . 'large');
      $this->createDirectory($basedest . DS . 'thumb');
      
      $largePath = $basedest . DS . 'large' . DS . $imageName;
      $thumbPath = $basedest . DS . 'thumb' . DS . $imageName;
      
      //$thumbRatio = $this->getImageRatio($dest, '100', '100');
      $thumbRatio = $this->getImageRatio($dest, '120', '120');
      $largeRatio = $this->getImageRatio($dest, '625', '450');
      
      exec($image_magick_path . " -resize $largeRatio $dest $largePath"); //	Make Large Image
      exec($image_magick_path . " -resize $thumbRatio  $dest $thumbPath"); //	Make Thumbnail Of Image
      
      return $imageName;
   }
   
   public function getImageRatio($image, $widthR = '', $heightR = '') {
      $imageRatio = '';
      list($width, $height) = getimagesize($image);
      $ratio = $width / $height;
      if ($width > $widthR && $height > $heightR) {
         $imageRatio = $widthR . 'x' . $heightR;
         ;
      } elseif ($width < $widthR && $height > $heightR) {
         $imageRatio = 'x' . $heightR;
      } elseif ($width > $widthR && $height < $heightR) {
         $imageRatio = $widthR . 'x';
      } else {
         $imageRatio = $width . 'x' . $height;
      }

      return $imageRatio;
   }
    
    public function getBorderTitle($borderId){
		$borderModel = Mage::getModel('designersoftware/blankets_border')->getCollection()
										->addFieldToFilter('border_id',$borderId)
										->addFieldToFilter('status',1)
										->getFirstItem();
										
		return $borderModel->getTitle();
	}
}
