package com.pinyougou.mapper;

import com.pinyougou.pojo.Brand;


import tk.mybatis.mapper.common.Mapper;

import java.io.Serializable;
import java.util.List;


public interface BrandMapper extends Mapper<Brand> {

/*多条件查询品牌*/
    List<Brand> findAll(Brand brand);

    /*批量删除*/
    void deleteAll(Serializable[] ids);
}

