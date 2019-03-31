package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.pojo.Specification;
import com.pinyougou.service.SpecificationService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import pojo.PageResult;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/specification")
public class SpecificationController {

    @Reference(timeout = 10000)
    private SpecificationService specificationService;

    /*多条件分页查询规格*/
    @GetMapping("/findByPage")
    public PageResult findByPage(Specification specification,Integer page,Integer rows){
        try{
            // GET请求中文乱码
            if (StringUtils.isNoneBlank(specification.getSpecName())){
                specification.setSpecName(new String(specification
                        .getSpecName().getBytes("ISO8859-1"), "UTF-8"));
            }
        }catch (Exception ex){
            ex.printStackTrace();
        }
        return specificationService.findByPage(specification,page,rows);
    }

    /*添加规格*/
    @PostMapping("/save")
    public boolean save(@RequestBody Specification specification){
        try{
            specificationService.save(specification);
        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
}
