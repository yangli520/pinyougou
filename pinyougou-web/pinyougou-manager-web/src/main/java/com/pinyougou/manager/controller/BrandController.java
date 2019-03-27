package com.pinyougou.manager.controller;

import com.pinyougou.pojo.Brand;
import com.pinyougou.service.BrandService;


import com.alibaba.dubbo.config.annotation.Reference;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

/*品牌控制器
 */
@RestController
public class BrandController {
    /**
     * 引用服务
     */
    @Reference(timeout=1000)
    private BrandService brandService;
    /*查询全部品牌*/
    @GetMapping("/brand/findAll")
    public List<Brand> findAll(){
        System.out.println("brandService"+brandService);
        return brandService.findAll();
    }

}
