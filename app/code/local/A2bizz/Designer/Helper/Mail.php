<?php

class Sparx_Designersoftware_Helper_Mail extends Mage_Core_Helper_Abstract {

    public function sendCustomTransactionalEmail($templateId, $templateData) {
        $receiveEmail = $templateData['emailId'];
        $receiveName = strstr($receiveEmail, '@', true);

        $storeId = Mage::app()->getStore()->getId();
        $emailTemplate = Mage::getModel('core/email_template')->load($templateId);
        $adminMail = Mage::getStoreConfig('trans_email/ident_general/email', $storeId);
        $emailTemplate->setSenderEmail(Mage::getStoreConfig('trans_email/ident_general/email', $storeId));
        $emailTemplate->setSenderName(Mage::getStoreConfig('trans_email/ident_general/name', $storeId));
        $emailTemplate->send($receiveEmail, $receiveName, $templateData);
        $emailTemplate->send($adminMail, 'admin', $templateData);
    }

    public function getMailTemplateData($data) {
        $userModel = Mage::getModel('designersoftware/user_design');
        $collectionDesignFile = $userModel->getCollection()
                ->addFieldToSelect('design_file')
                ->addFieldToFilter('design_id', $data['mailDesignId'])
                ->getFirstItem();

        $DesignFile = unserialize($collectionDesignFile->getDesignFile());
        $templateData = array(
            'emailId' => $data['userEmailId'],
            'productUrl' => Mage::getUrl() . 'products.html',
            'designLabUrl' => Mage::getUrl() . 'designersoftware/index/index',
            'aboutUsUrl' => Mage::getUrl() . 'about-us',
            'designName' => $data['designName'],
            'designFrontUrl' => Mage::getBaseUrl('media') . 'files/user/final/thumb/' . $DesignFile[0]['composite'],
            'designBackUrl' => Mage::getBaseUrl('media') . 'files/user/final/thumb/' . $DesignFile[1]['composite'],
            'designUrl' => Mage::getUrl() . 'designersoftware/index/index?did=' . $data['mailDesignId'] . '&type=edit&hf=' . $data['hoodieFlag']
        );

        return $templateData;
    }

    public function getShareDesignTemplateData($data) {
        $userModel = Mage::getModel('designersoftware/user_design');
        $collectionDesignFile = $userModel->getCollection()
                ->setOrder('design_id', 'DESC')
                ->addFieldToSelect('design_file')
                ->addFieldToFilter('design_id', $data['userDesignId'])
                ->getFirstItem();

        $DesignFile = unserialize($collectionDesignFile->getDesignFile());
        $emailsArray = explode(',', $data['friendsEmail']);
        $data['message'];

        $i = 0;
        foreach ($emailsArray as $email):
            $templateData[$i] = array(
                'emailId' => trim($email),
                'productUrl' => Mage::getUrl() . 'products.html',
                'designLabUrl' => Mage::getUrl() . 'lab.html',
                'aboutUsUrl' => Mage::getUrl() . 'about-us',
                'designName' => $data['saveDesignName'],
                'message' => $data['message'],
                'designFrontUrl' => Mage::getBaseUrl('media') . 'files/user/final/thumb/' . $DesignFile[0]['composite'],
                'designBackUrl' => Mage::getBaseUrl('media') . 'files/user/final/thumb/' . $DesignFile[1]['composite'],
                'designUrl' => Mage::getUrl() . 'lab.html?did=' . $data['userDesignId'] . '&type=edit&hf=' . $data['hoodieFlag']
            );
            $i++;
        endforeach;

        return $templateData;
    }

}
