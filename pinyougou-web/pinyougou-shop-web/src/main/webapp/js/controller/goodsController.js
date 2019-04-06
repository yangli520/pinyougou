/** 定义控制器层 */
app.controller('goodsController', function($scope, $controller, baseService){

    /** 指定继承baseController */
    $controller('baseController',{$scope:$scope});


    /**定义商品状态数组*/
    $scope.status = ['未审核','已审核','审核未通过','关闭'];
    /** 查询条件对象 */
    $scope.searchEntity = {};
    /** 分页查询(查询条件) */
    $scope.search = function(page, rows){
        baseService.findByPage("/goods/findByPage", page,
			rows, $scope.searchEntity)
            .then(function(response){
                /** 获取分页查询结果 */
                $scope.dataList = response.data.rows;
                /** 更新分页总记录数 */
                $scope.paginationConf.totalItems = response.data.total;
            });
    };

    /** 添加或修改 */
    $scope.saveOrUpdate=function () {
            //获取富文本编辑器的内容
        $scope.goods.goodsDesc.introduction=editor.html();
        baseService.sendPost("/goods/save",$scope.goods).then(function (response) {
            if(response.data){
                alert("保存成功");
                //清空表单
                $scope.goods={};
                //清空富文本编辑器
                editor.html('');
            }else{
                alert("操作失败");
            }
        });
    };

    /** 显示修改 */
    $scope.show = function(entity){
       /** 把json对象转化成一个新的json对象 */
       $scope.entity = JSON.parse(JSON.stringify(entity));
    };

    /** 批量删除 */
    $scope.delete = function(){
        if ($scope.ids.length > 0){
            baseService.deleteById("/goods/delete", $scope.ids)
                .then(function(response){
                    if (response.data){
                        /** 重新加载数据 */
                        $scope.reload();
                    }else{
                        alert("删除失败！");
                    }
                });
        }else{
            alert("请选择要删除的记录！");
        }
    };

    /**上传图片*/
    $scope.uploadFile=function () {
        baseService.uploadFile().then(function (response) {
            //如果上传成功,取出url
            if(response.data.status == 200){
                $scope.picEntity.url=response.data.url;
            }else{
                alert("上传失败");
            }
        });
    };
    /**定义数据存储结构*/
    $scope.goods = {goodsDesc : {itemImages : [], specificationItems : []}};
    /**添加图片到数组*/
    $scope.addPic=function () {
        $scope.goods.goodsDesc.itemImages.push($scope.picEntity);
    };

    /**数组中移出图片*/
    $scope.removePic=function (index) {
        $scope.goods.goodsDesc.itemImages.splice(index,1);
    };
    
    /**根据父级Id查询分类*/
    $scope.findItemByParentId=function (parentId,name) {
        baseService.sendGet("/itemCat/findItemByParentId","parentId="+parentId).then(function (response) {
            $scope[name]=response.data;
        });
    };

    /**监控goods.category1Id边浪,查询二级分类*/
    $scope.$watch("goods.category1Id",function (newValue,oldValue) {
       if(newValue){
           //根据选择的值查询二级分类
           $scope.findItemByParentId(newValue,"itemCatList2");
       }else{
           $scope.itemCatList2=[];
       }
    });

    /**监控goods.category2Id变量,查询三级分类*/
    $scope.$watch("goods.category2Id",function (newValue,oldValue) {
        if(newValue){
            $scope.findItemByParentId(newValue,"itemCatList3");
        }else{
            $scope.itemCatList3=[];
        }
    });

    //$watch():用于监听goods.category3Id是否发生改变
    $scope.$watch("goods.category3Id",function (newValue,oldValue) {
       if(newValue){
           //循环三级分类数组List<ItemCat>: [{},{}]
           for(var i=0; i<$scope.itemCatList3.length;i++){
               var itemCat = $scope.itemCatList3[i];
               if(itemCat.id==newValue){
                   $scope.goods.typeTemplateId=itemCat.typeId;
                   break;
               }
           }
       }else{
           $scope.goods.typeTemplateId=null;
       }
    });

    /**监控goods.typeTemplateId模板Id,查询该模板对应的品牌*/
    $scope.$watch("goods.typeTemplateId",function (newValue,oldValue) {
        if(!newValue){
            return;
        }
        baseService.findOne("/typeTemplate/findOne",newValue).then(function (response) {
           //获取模板中的品牌列表
            $scope.brandIds=JSON.parse(response.data.brandIds);
            //设置扩展属性
            $scope.goods.goodsDesc.customAttributeItems=JSON.parse(response.data.customAttributeItems);
        });
        /**查询该模板对应的规格和规格选项*/
        baseService.findOne("/typeTemplate/findSpecByTemplateId",newValue).then(function (response) {
           $scope.specList=response.data;
        });
    });

    /** 定义修改规格选项方法 */
    $scope.updateSpecAttr = function($event, name, value){
        /** 根据json对象的key到json数组中搜索该key值对应的对象 */
        var obj = $scope.searchJsonByKey($scope.goods.goodsDesc
            .specificationItems,'attributeName', name);
        /** 判断对象是否为空 */
        if(obj){
            /** 判断checkbox是否选中 */
            if($event.target.checked){
                /** 添加该规格选项到数组中 */
                obj.attributeValue.push(value);
            }else{
                /** 取消勾选，从数组中删除该规格选项 */
                obj.attributeValue.splice(obj.attributeValue
                    .indexOf(value), 1);
                /** 如果选项都取消了，将此条记录删除 */
                if(obj.attributeValue.length == 0){
                    $scope.goods.goodsDesc.specificationItems.splice(
                        $scope.goods.goodsDesc
                            .specificationItems.indexOf(obj),1);
                }
            }
        }else{
            /** 如果为空，则新增数组元素 */
            $scope.goods.goodsDesc.specificationItems.push(
                {"attributeName":name,"attributeValue":[value]});
        }
    };




    /** 创建SKU商品方法 */
    $scope.createItems = function(){
        /** 定义SKU数组，并初始化 */
        $scope.goods.items = [{spec:{}, price:0, num:9999,
            status:'0', isDefault:'0' }];
        /** 定义选中的规格选项数组 */
        var specItems = $scope.goods.goodsDesc.specificationItems;
        /** 循环选中的规格选项数组 */
        for(var i = 0; i < specItems.length; i++){
            /** 扩充原SKU数组方法 */
            $scope.goods.items = swapItems($scope.goods.items,
                specItems[i].attributeName,
                specItems[i].attributeValue);
        }
    };
    /** 扩充SKU数组方法 */
    var swapItems = function(items, attributeName, attributeValue){
        /** 创建新的SKU数组 */
        var newItems = new Array();
        /** 迭代旧的SKU数组，循环扩充 */
        for(var i = 0; i < items.length; i++){
            /** 获取一个SKU商品 */
            var item = items[i];
            /** 迭代规格选项值数组 */
            for(var j = 0; j < attributeValue.length; j++){
                /** 克隆旧的SKU商品，产生新的SKU商品 */
                var newItem = JSON.parse(JSON.stringify(item));
                /** 增加新的key与value */
                newItem.spec[attributeName] = attributeValue[j];
                /** 添加到新的SKU数组 */
                newItems.push(newItem);
            }
        }
        return newItems;
    };


});