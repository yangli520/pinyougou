/** 定义控制器层 */
app.controller('goodsController', function($scope, $controller, baseService){

    /** 指定继承baseController */
    $controller('baseController',{$scope:$scope});

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
    $scope.goods={goodsDesc : {itemImages : []}};
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
    });

});