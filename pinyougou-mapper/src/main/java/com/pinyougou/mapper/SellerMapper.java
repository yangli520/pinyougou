package com.pinyougou.mapper;

import org.apache.ibatis.annotations.Select;
import tk.mybatis.mapper.common.Mapper;

import com.pinyougou.pojo.Seller;

import java.util.List;

/**
 * SellerMapper 数据访问接口
 * @date 2019-03-29 15:42:44
 * @version 1.0
 */
public interface SellerMapper extends Mapper<Seller>{

    /**多条件分页查询*/
    List<Seller> findAll(Seller seller);
}