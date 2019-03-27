package com.pinyougou.pojo;

import java.io.Serializable;

/**
 * 品牌实体类
 */
public class Brand implements Serializable{
    //品牌id
    private Long id;
    ///品牌名字
    private String name;
    //品牌首字母
    private String firstChar;

    public long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstChar() {
        return firstChar;
    }

    public void setFirstChar(String firstChar) {
        this.firstChar = firstChar;
    }
}
