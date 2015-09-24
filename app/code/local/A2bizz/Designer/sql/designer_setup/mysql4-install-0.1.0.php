<?php

$installer = $this;

$installer->startSetup();

$installer->run("

-- DROP TABLE IF EXISTS {$this->getTable('a2bizz_designer')};
CREATE TABLE {$this->getTable('a2bizz_designer')} (  
  `designer_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`designer_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

    ");

$installer->endSetup(); 
