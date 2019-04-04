package com.pinyougou.mapper;

import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import com.pinyougou.pojo.ItemCat;

import java.util.List;

/**
 * ItemCatMapper 数据访问接口
 * @date 2019-03-29 15:42:44
 * @version 1.0
 */
public interface ItemCatMapper extends Mapper<ItemCat>{

    /*根据父级id查询商品数据*/
    @Select("SELECT * from tb_item_cat WHERE parent_id=#{parentId}")
    List<ItemCat> findItemCatByParentId(Long parentId);
}