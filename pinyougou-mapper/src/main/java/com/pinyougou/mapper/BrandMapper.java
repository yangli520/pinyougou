package com.pinyougou.mapper;

import com.pinyougou.pojo.Brand;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BrandMapper {
    /** 查询全部品牌*/
    @Select("SELECT * FROM tb_brand order by id ASC ")
    List<Brand> findAll();
}
