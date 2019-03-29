package com.pinyougou.manager.controller;

import com.pinyougou.pojo.Brand;
import com.pinyougou.service.BrandService;


import com.alibaba.dubbo.config.annotation.Reference;
import org.springframework.web.bind.annotation.*;


import java.util.List;

/*品牌控制器
 */
@RestController
@RequestMapping("/brand")
public class BrandController {
    /**
     * 引用服务
     */
    @Reference(timeout=1000)
    private BrandService brandService;
    /*查询全部品牌*/
    @GetMapping("/findAll")
    public List<Brand> findAll(){
        System.out.println("brandService"+brandService);
        return brandService.findAll();
    }
    /*添加品牌*/
    @PostMapping("/save")
    public Boolean save(@RequestBody Brand brand){
        try{
            brandService.save(brand);
            return true;

        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }
    /*修改品牌*/
    @PostMapping("/update")
    public Boolean update(@RequestBody Brand brand){
        try{
            brandService.update(brand);
            return true;

        }catch(Exception e){
            e.printStackTrace();
        }
        return false;
    }

}
