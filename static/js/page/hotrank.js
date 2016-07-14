var leaf_page = 1;
var nums=1;
var data_type=Utility.getQueryStringByName("v");//1,2,3
var hot_type=Utility.getQueryStringByName("h");//1:股票,2:行业，3:概念,4:事件
var rank_name=Utility.getQueryStringByName("rank_name");
function showData(leaf_page,type){
    common.getHotRank({'leaf_num':leaf_page,'datatype':type,"hot_type":hot_type},null,function(resultData) {
        if(resultData&&resultData.status==1){
            if(resultData.result.code_info){
                var html=[];
                var _newdata;
                if(hot_type==1){
                    switch (data_type){
                        case "1":
                            _newdata=resultData.result.code_info.shv_;
                            break;
                        case "2":
                            _newdata=resultData.result.code_info.shs_;
                            break;
                        case "3":
                            _newdata=resultData.result.code_info.shf_;
                            break;
                    }
                }
                if(hot_type==2){
                    switch (data_type){
                        case "1":
                            _newdata=resultData.result.code_info.hhv_;
                            break;
                        case "2":
                            _newdata=resultData.result.code_info.hhs_;
                            break;
                        case "3":
                            _newdata=resultData.result.code_info.hhf_;
                            break;
                    }
                }
                if(hot_type==3){
                    switch (data_type){
                        case "1":
                            _newdata=resultData.result.code_info.ghv_;
                            break;
                        case "2":
                            _newdata=resultData.result.code_info.ghs_;
                            break;
                        case "3":
                            _newdata=resultData.result.code_info.ghf_;
                            break;
                    }
                }
                if(hot_type==4){
                    switch (data_type){
                        case "1":
                            _newdata=resultData.result.code_info.ehv_;
                            break;
                        case "2":
                            _newdata=resultData.result.code_info.ehs_;
                            break;
                        case "3":
                            _newdata=resultData.result.code_info.ehf_;
                            break;
                    }
                }
                for(var i= 0,len=_newdata.length;i<len;i++){
                    html.push("<tr>");
                    html.push("<td>"+(nums+i)+"</td>");
                    html.push("<td>"+_newdata[i].code+"</td>");
                    html.push("<td>"+_newdata[i].name+"</td>");
                    html.push("<td class='"+Utility.getPriceColor(_newdata[i].price_change_ratio)+"'>"+_newdata[i].price+"</td>");
                    html.push("<td>"+(_newdata[i].price_change_ratio / 10000).toFixed(2) + '%' + Utility.getHotUpDown(_newdata[i].price_change_ratio)+"</td>");
                    html.push("<td>"+_newdata[i].differ_price+"</td>");
                    html.push("<td>"+_newdata[i].volume/10000+"</td>");
                    html.push("<td>"+_newdata[i].value+"</td>");
                    html.push("<td>"+_newdata[i].increment+"</td>");
                    html.push("<td></td>");
                    html.push("</tr>");
                }
                $(".hot_data").append(html.join(''));
            }
        }
    });
}
$(function(){
    $("i[data-toggle='popover']").popover({
        container: "body",
        trigger: "hover"
    });
    $(".wk-hot-title").html(decodeURI(rank_name)+"热度情况");
    showData(leaf_page,data_type);
    $(".wk-hotmap li").each(function(){
        if($(this).hasClass("active")){
            t= $(this).attr("data-type");
        }
        $(this).unbind("click").bind("click",function(){
            alert($(this).attr("data-type"));
        })
    });

    $('#get_hot_more').click(function(){
        leaf_page++;
        if(leaf_page>5){
            $("#get_hot_more").hide();
            return false;
        }
        var t=1;
        $(".wk-hotmap li").each(function(){
            if($(this).hasClass("active")){
                t= $(this).attr("data-type");
            }
            $(this).unbind("click").bind("click",function(){
                //alert($(this).attr("data-type"));
            })
        });
        showData(leaf_page,t);
    });
});