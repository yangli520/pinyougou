package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.pojo.Brand;
import com.pinyougou.mapper.BrandMapper;
import com.pinyougou.service.BrandService;
import java.util.List;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import pojo.PageResult;
import tk.mybatis.mapper.entity.Example;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Map;

/**
 * BrandServiceImpl 服务接口实现类
 * @date 2019-03-29 15:43:02
 * @version 1.0
 */
@Service(interfaceName = "com.pinyougou.service.BrandService")
@Transactional
public class BrandServiceImpl implements BrandService {

	@Autowired
	private BrandMapper brandMapper;

	/** 添加方法 */
	@Override
	public void save(Brand brand){
		try {
			brandMapper.insertSelective(brand);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 修改方法 */
	@Override
	public void update(Brand brand){
		try {
			brandMapper.updateByPrimaryKeySelective(brand);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 根据主键id删除 */
	public void delete(Serializable id){
		try {
			brandMapper.deleteByPrimaryKey(id);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 批量删除 */
	@Override
	public void deleteAll(Serializable[] ids){
		try {
			// 创建示范对象
			Example example=new Example(Brand.class);
			// 创建条件对象
			Example.Criteria criteria=example.createCriteria();
			// 创建In条件
			criteria.andIn("id",Arrays.asList(ids));
			// 根据条件删除
			brandMapper.deleteByExample(example);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 根据主键id查询 */
	public Brand findOne(Serializable id){
		try {
			return brandMapper.selectByPrimaryKey(id);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	@Override
	/** 查询全部 */
	public List<Brand> findAll(){
		try {
			return brandMapper.selectAll();
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}


	/** 多条件分页查询 */
	@Override
	public PageResult findByPage(Brand brand, int page, int rows){
		try {
			PageInfo<Brand> pageInfo=PageHelper.startPage(page,rows).doSelectPageInfo(new ISelect() {
				@Override
				public void doSelect() {
					brandMapper.findAll(brand);
				}
			});
			return new PageResult(pageInfo.getTotal(),pageInfo.getList());
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	@Override
	public List<Map<String, Object>> findAllByIdAndName() {
		try{
		return brandMapper.findAllByIdAndName();

		}catch(Exception e){
			throw new RuntimeException();
		}
	}

}