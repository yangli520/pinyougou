package com.pinyougou.mapper;

import tk.mybatis.mapper.common.Mapper;

import com.pinyougou.pojo.TypeTemplate;

import java.util.List;

/**
 * TypeTemplateMapper 数据访问接口
 * @date 2019-03-29 15:42:44
 * @version 1.0
 */
public interface TypeTemplateMapper extends Mapper<TypeTemplate>{

    /*分页多条件查询*/
    List<TypeTemplate> findAll(TypeTemplate typeTemplate);

}