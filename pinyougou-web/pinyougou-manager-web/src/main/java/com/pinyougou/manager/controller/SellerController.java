package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.Seller;
import com.pinyougou.service.SellerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pojo.PageResult;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/seller")
public class SellerController {
    @Reference(timeout = 10000)
    private SellerService sellerService;

    @GetMapping("/findByPage")
    public PageResult findByPage(Seller seller,Integer page,Integer rows){
        /**get 请求中文转码*/
        try {
            if (seller !=null && StringUtils.isNoneBlank(seller.getName())){
                seller.setName(new String(seller.getName().getBytes("ISO8859-1"),"UTF-8"));
            }
            if (seller !=null && StringUtils.isNoneBlank(seller.getNickName())){
                seller.setNickName(new String(seller.getNickName().getBytes("ISO8859-1"),"UTF-8"));
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return sellerService.findByPage(seller,page,rows);
    }

    /**审核商家.修改商家状态*/
    @GetMapping("/updateStatus")
    public boolean updateStatus(String sellerId,String status){
        try {
            sellerService.updateStatus(sellerId,status);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
