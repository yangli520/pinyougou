/*模板规格控制器*/
app.controller("typeTemplateController",function ($scope,$controller,baseService) {

        $controller("baseController",{$scope:$scope});

        /*定义搜索对象*/
        $scope.searchEntity={};
        /*分页查询类型模板信息*/
        $scope.search=function (page,rows) {
            baseService.findByPage("/typeTemplate/findByPage",page,rows,$scope.searchEntity).then(function (response) {
                $scope.dataList=response.data.rows;
                /*更新总记录数*/
                $scope.paginationConf.totalItems=response.data.total;
            });
        };

    /** 品牌列表 */
    $scope.findBrandList=function () {
        baseService.sendGet("/brand/findBrandList").then(function (response) {
            $scope.brandList={data:response.data};

        });
    };

    /*规格列表*/
    $scope.findSpecificationList=function () {
      baseService.sendGet("/specification/findSpecList").then(function (response) {
          $scope.specList={data:response.data};
      });
    };

    /*新增行*/
    $scope.addTableRow=function () {
        $scope.entity.customAttributeItems.push({});
    };
    /*删除行*/
    $scope.deleteTableRow=function (index) {
        $scope.entity.customAttributeItems.splice(index,1);
    };

    /*添加或者修改*/
    $scope.saveOrUpdate=function () {
        var url="save";
        if($scope.entity.id){
            url="update";
        }
        /*发送post请求*/
        baseService.sendPost("/typeTemplate/"+url,$scope.entity)
            .then(function (response) {
                if(response.data){
                    $scope.reaload();
                }else{
                    alert("操作失败")
                }
            });
    };
    /*显示修改*/
    $scope.show=function (entity) {
        $scope.entity=JSON.parse(JSON.stringify(entity));
        /*转化品牌列表*/
        $scope.entity.brandIds=JSON.parse(entity.brandIds);
        /*转换规格列表*/
        $scope.entity.specIds=JSON.parse(entity.specIds);
        /*转换扩展属性*/
        $scope.entity.customAttributeItems=JSON.parse(entity.customAttributeItems);
    };

    /*批量删除*/
    $scope.delete=function () {
        if($scope.ids.length>0){
            baseService.deleteById("/typeTemplate/delete",$scope.ids).then(function (response) {
                if (response.data) {
                    $scope.reload();
                    $scope.ids=[];
                }else{
                    alert("删除失败");
                }
            });
        }else{
            alert("请选择你要删除的记录");
        }
    };

});