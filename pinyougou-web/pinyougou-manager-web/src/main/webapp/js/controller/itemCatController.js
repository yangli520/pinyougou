/*商品分类管理*/
app.controller("itemCatController",function ($scope,$controller,baseService) {
    $controller("baseController",{$scope:$scope});


    /*根据上级ID显示下级列表*/
    $scope.findItemCatByParentId=function (parentId) {
        baseService.sendGet("/itemCat/findItemCatByParentId?parentId="+parentId)
            .then(function (response) {
                $scope.dataList=response.data;
            });
    };

    /*默认一级*/
    $scope.grade=1;
    /*查询下级*/
    $scope.selectList=function (entity,grade) {
        $scope.grade=grade;
        if($scope.grade==1){
            //如果为1级
            $scope.itemCat_1=null;
            $scope.itemCat_2=null;
        }
        if($scope.grade==2){
            $scope.itemCat_1=entity;
            $scope.itemCat_2=null;
        }
        if($scope.grade==3){
            $scope.itemCat_2=entity;
        }
        /*查询此级下拉列表*/
        $scope.findItemCatByParentId(entity.id);
    };
});