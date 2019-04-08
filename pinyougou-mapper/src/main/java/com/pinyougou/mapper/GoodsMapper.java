package com.pinyougou.mapper;

import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

import com.pinyougou.pojo.Goods;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * GoodsMapper 数据访问接口
 * @date 2019-03-29 15:42:44
 * @version 1.0
 */
public interface GoodsMapper extends Mapper<Goods>{


    /** 多条件查询商品 */
    List<Map<String,Object>> findAll(Goods goods);

    /**批量修改状态*/
    void updateStatus(@Param("columnName") String columnName, @Param("ids") Long[] ids, @Param("status") String status);

/*    *//**运营商批量修改删除状态*//*
    void updateDeleteStatus(@Param("ids") Serializable[] ids,@Param("isDelete") String isDelete);*/

/*    *//**商家修改商品状态*//*
    void updateMarketable(@Param("ids") Long[] ids,@Param("status") String status);*/
}