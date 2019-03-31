package com.pinyougou.mapper;

import tk.mybatis.mapper.common.Mapper;

import com.pinyougou.pojo.Specification;

import java.util.List;

/**
 * SpecificationMapper 数据访问接口
 * @date 2019-03-29 15:42:44
 * @version 1.0
 */
public interface SpecificationMapper extends Mapper<Specification>{

    /*多条件查询规格*/
    List<Specification> findAll(Specification specification);
}