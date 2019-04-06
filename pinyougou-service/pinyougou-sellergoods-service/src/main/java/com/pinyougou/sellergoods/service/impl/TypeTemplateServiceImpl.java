package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.alibaba.fastjson.JSON;
import com.pinyougou.mapper.SpecificationOptionMapper;
import com.pinyougou.pojo.SpecificationOption;
import com.pinyougou.pojo.TypeTemplate;
import com.pinyougou.mapper.TypeTemplateMapper;
import com.pinyougou.service.TypeTemplateService;
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

import static jdk.nashorn.internal.objects.NativeDebug.map;

/**
 * TypeTemplateServiceImpl 服务接口实现类
 * @date 2019-03-29 15:43:02
 * @version 1.0
 */
@Service(interfaceName = "com.pinyougou.service.TypeTemplateService")
@Transactional
public class TypeTemplateServiceImpl implements TypeTemplateService {

	@Autowired
	private TypeTemplateMapper typeTemplateMapper;
	@Autowired
	private SpecificationOptionMapper specificationOptionMapper;

	/** 添加方法 */
	@Override
	public void save(TypeTemplate typeTemplate){
		try {
			typeTemplateMapper.insertSelective(typeTemplate);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 修改方法 */
	public void update(TypeTemplate typeTemplate){
		try {
			typeTemplateMapper.updateByPrimaryKeySelective(typeTemplate);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 根据主键id删除 */
	public void delete(Serializable id){
		try {
			typeTemplateMapper.deleteByPrimaryKey(id);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 批量删除 */
	public void deleteAll(Serializable[] ids){
		try {
			// 创建示范对象
			Example example = new Example(TypeTemplate.class);
			// 创建条件对象
			Example.Criteria criteria = example.createCriteria();
			// 创建In条件
			criteria.andIn("id", Arrays.asList(ids));
			// 根据示范对象删除
			typeTemplateMapper.deleteByExample(example);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 根据主键id查询 */
	@Override
	public TypeTemplate findOne(Serializable id){
		try {
			return typeTemplateMapper.selectByPrimaryKey(id);
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 查询全部 */
	public List<TypeTemplate> findAll(){
		try {
			return typeTemplateMapper.selectAll();
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 多条件分页查询 */
	public PageResult findByPage(TypeTemplate typeTemplate, int page, int rows){
		try {
			PageInfo<TypeTemplate> pageInfo = PageHelper.startPage(page, rows)
				.doSelectPageInfo(new ISelect() {
					@Override
					public void doSelect() {
						typeTemplateMapper.findAll(typeTemplate);
					}
				});
			return new PageResult(pageInfo.getTotal(),pageInfo.getList());
		}catch (Exception ex){
			throw new RuntimeException(ex);
		}
	}

	/** 根据模版id查询所有的规格与规格选项 */
	@Override
	public List<Map> findSpecByTemplateId(Long id) {
		try {
			//根据主键id查询模板
			TypeTemplate typeTemplate=findOne(id);
			//选中模板中的所有规格转换成List<Map>格式
			List<Map> specLists= JSON.parseArray(typeTemplate.getSpecIds(),Map.class);
			//迭代模板中所有的规格
			for (Map map : specLists) {
                //常见查询条件对象
                SpecificationOption so=new SpecificationOption();
                so.setSpecId(Long.valueOf(map.get("id").toString()));
                //通过规格id,查询规格选项数据
                List<SpecificationOption> specOptions = specificationOptionMapper.select(so);
                map.put("options",specOptions);
            }
			return specLists;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}