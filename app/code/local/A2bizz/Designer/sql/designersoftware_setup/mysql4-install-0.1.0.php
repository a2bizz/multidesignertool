<?php

$installer = $this;

$installer->startSetup();

$installer->run("

-- DROP TABLE IF EXISTS {$this->getTable('sparx_designersoftware')};
CREATE TABLE {$this->getTable('sparx_designersoftware')} (  
  `designersoftware_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `color_value` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `design_name` varchar(255) NOT NULL,
  `design_file` text NOT NULL,
  `canvasArr` text NOT NULL,
  `previewArr` text NOT NULL,
  `drawArea` text NOT NULL,
  `content` text NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `created_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`designersoftware_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

-- DROP TABLE IF EXISTS {$this->getTable('sparx_hoodies_layertype')};
CREATE TABLE {$this->getTable('sparx_hoodies_layertype')} ( 
  `layertype_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `filename` varchar(255) NOT NULL DEFAULT '',
  `value` int(11) NOT NULL,
  `content` text NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `created_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`layertype_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

-- DROP TABLE IF EXISTS {$this->getTable('sparx_template')};
CREATE TABLE {$this->getTable('sparx_template')} ( 
  `template_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `category_ids` varchar(255) NOT NULL,
  `color_value` varchar(10) NOT NULL,
  `design_name` varchar(255) NOT NULL DEFAULT '',
  `design_file` text NOT NULL,
  `hoodie_flag` varchar(10) NOT NULL,
  `canvasArr` text NOT NULL,
  `view_wise_scale` text NOT NULL,
  `front_index_obj` text NOT NULL,
  `back_index_obj` text NOT NULL,
  `previewArr` text NOT NULL,
  `front_preview_arr` text NOT NULL,
  `back_preview_arr` text NOT NULL,
  `drawArea` text NOT NULL,
  `content` text NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `created_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;


-- DROP TABLE IF EXISTS {$this->getTable('sparx_user_design')};
CREATE TABLE {$this->getTable('sparx_user_design')} ( 
  `design_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `color_id` int(11) NOT NULL,
  `design_code` varchar(20) NOT NULL,
  `color_value` varchar(10) CHARACTER SET utf8 NOT NULL,
  `size_wise_qty` text NOT NULL,
  `total_qty` int(11) NOT NULL,
  `back_ink_color_price` int(11) NOT NULL,
  `front_ink_color_price` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `hoodie_flag` varchar(10) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `design_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `shipping_zipcode` varchar(10) NOT NULL,
  `design_file` text CHARACTER SET utf8 NOT NULL,
  `canvasArr` text CHARACTER SET utf8 NOT NULL,
  `view_wise_scale` text NOT NULL,
  `front_index_obj` text NOT NULL,
  `back_index_obj` text NOT NULL,
  `previewArr` text CHARACTER SET utf8 NOT NULL,
  `front_preview_arr` text NOT NULL,
  `back_preview_arr` text NOT NULL,
  `drawArea` text CHARACTER SET utf8 NOT NULL,
  `pdf_data_arr` text NOT NULL,
  `name_num_arr` text NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '0',
  `created_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`design_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

    ");

$installer->endSetup(); 
