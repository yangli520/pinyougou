package com.pinyougou.manager.controller;

import com.github.pagehelper.Page;
import com.pinyougou.pojo.Brand;
import com.pinyougou.service.BrandService;


import com.alibaba.dubbo.config.annotation.Reference;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import pojo.PageResult;


import java.util.List;
import java.util.Map;

/*品牌控制器
 */
@RestController
@RequestMapping("/brand")
public class BrandController {
    /**
     * 引用服务
     */
    @Reference(timeout = 1000)
    private BrandService brandService;

    /*查询全部品牌*/
    @GetMapping("/findAll")
    public List<Brand> findAll() {
        System.out.println("brandService" + brandService);
        return brandService.findAll();
    }

    /*添加品牌*/
    @PostMapping("/save")
    public Boolean save(@RequestBody Brand brand) {
        try {
            brandService.save(brand);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /*修改品牌*/
    @PostMapping("/update")
    public Boolean update(@RequestBody Brand brand) {
        try {
            brandService.update(brand);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    /*分页查询品牌*/
    @GetMapping("/findByPage")
    public PageResult findByPage(Brand brand ,Integer page, Integer rows) {
        //get请求域中文乱码
        try{
            if (StringUtils.isNoneBlank(brand.getName())){
                brand.setName(new String(brand.getName().getBytes("ISO8859-1"),"UTF-8"));
            }
        }catch(Exception e){
            e.printStackTrace();
        }
        return  brandService.findByPage(brand,page,rows);
    }

    /*删除品牌*/
    @GetMapping("/delete")
    public boolean delete(Long[] ids){
        try{
            brandService.deleteAll(ids);
            return true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }

    /*查询所有的品牌*/
    @GetMapping("/findBrandList")
    public List<Map<String,Object>> findBrandList(){
        return brandService.findAllByIdAndName();
    }
}

