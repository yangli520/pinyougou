package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.Goods;
import com.pinyougou.service.GoodsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pojo.PageResult;


/**运营商商品审核*/
@RestController
@RequestMapping("/goods")
public class GoodsController {
    @Reference(timeout = 10000)
    private GoodsService goodsService;

    /**多条件分页查询*/
    @GetMapping("/findByPage")
    public PageResult findByPage(Goods goods,Integer page,Integer rows){
        try {
        //添加查询条件
            goods.setAuditStatus("0");
            //get请求转码
            if ( StringUtils.isNoneBlank(goods.getGoodsName())){
                goods.setGoodsName(new String( goods.getGoodsName().getBytes("ISO8859-1"),"UTF-8"));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return goodsService.findByPage(goods,page,rows);
    }

    /**修改商品的审核状态*/
    @GetMapping("/updateStatus")
    public boolean updateStatus(String columnName,Long[] ids,String status){
        try {
            goodsService.updateStatus("is_delete",ids,status);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /**批量删除商品*/
    @GetMapping("/delete")
    public boolean delete(Long[] ids){
        try {
            goodsService.deleteAll(ids);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
