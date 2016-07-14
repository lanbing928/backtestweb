var Utility = {
    /**
     * 根据参数名获取值
     * @param name 参数名
     * @returns {*}
     */
    getQueryStringByName: function (name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    },
    /**
     * 获取热力图涨跌颜色
     * @param num
     * @returns {*}
     */
    getTreeMapColor: function (num) {
        switch (num) {
            case 0:
                return "rgb(158,158,158)";
                break;
            case 1:
                return "rgb(255,211,211)";
                break;
            case 2:
                return "rgb(255,175,175)";
                break;
            case 3:
                return "rgb(255,128,128)";
                break;
            case 4:
                return "rgb(255,90,90)";
                break;
            case 5:
                return "rgb(255,52,52)";
                break;
            case 6:
                return "rgb(255,0,0)";
                break;
            case 7:
                return "rgb(221,25,29)";
                break;
            case 8:
                return "rgb(208,23,22)";
                break;
            case 9:
                return "rgb(196,20,17)";
                break;
            case 10:
                return "rgb(166,3,0)";
                break;
            case -1:
                return "rgb(219,246,228)";
                break;
            case -2:
                return "rgb(124,210,154)";
                break;
            case -3:
                return "rgb(76,187,115)";
                break;
            case -4:
                return "rgb(35,166,76)";
                break;
            case -5:
                return "rgb(32,155,70)";
                break;
            case -6:
                return "rgb(10,143,8)";
                break;
            case -7:
                return "rgb(10,126,7)";
                break;
            case -8:
                return "rgb(5,111,0)";
                break;
            case -9:
                return "rgb(13,83,2)";
                break;
            case -10:
                return "rgb(10,72,0)";
                break;
            default:
                return "rgb(158,158,158)";
                break;
        }
    },
    /**
     * 获取利好\利空
     * @param emotion
     * @returns {*}
     */
    getgetEmotion: function (emotion) {
        switch (emotion) {
            case 0:
                return "<span class=\"wk-news-list-tips wk-likong\"></span>";
                break;
            case 1:
                return "<span class=\"wk-news-list-tips wk-lihao\"></span>";
                break;
            case -1:
                return "";
                break;
        }
    },
    /**
     * 获取热度的涨跌箭头
     * @param hot
     * @returns {*}
     */
    getHotUpDown: function (hot) {
        if (hot > 0) {
            return "<span class=\"wk-red\">↑</span>";
        }
        return "<span class=\"wk-green\">↓</span>";
    },
    /**
     * 根据价格获取股票颜色
     * @param $mark
     * @return string
     */
    getPriceColor: function ($mark) {
        if ($mark > 0) {
            return "wk-red";
        } else if ($mark < 0) {
            return "wk-green";
        } else {
            return "wk-gray";
        }
    },
    getUpDownColor: function ($mark) {
        if ($mark > 0) {
            return "wk-up";
        } else if ($mark < 0) {
            return "wk-down";
        } else {
            return "";
        }
    },
    /**
     * Unix 时间戳转换为时间
     * @param unixtime
     * @returns {string}
     */
    unixToDate: function (unixtime) {
        var date = new Date(unixtime);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':';
        var m = ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        return (Y + M + D + h + m);
    },
    /**
     * unix时间戳转时间
     * @param unixtime
     * @returns {string}
     */
    unixToTime: function (unixtime) {
        var date = new Date(unixtime);
        var h = ((date.getHours() < 10) ? '0' + date.getHours() : date.getHours()) + ':';
        var m = ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes());
        return (h + m);
    },
    /**
     * 获取时间范围
     * @param beginTime
     * @param endTime
     * @returns {boolean}
     */
    timeRange: function (beginTime, endTime) {
        var strb = beginTime.split(":");
        if (strb.length != 2) {
            return false;
        }
        var stre = endTime.split(":");
        if (stre.length != 2) {
            return false;
        }
        var b = new Date();
        var e = new Date();
        var n = new Date();
        b.setHours(strb[0]);
        b.setMinutes(strb[1]);
        e.setHours(stre[0]);
        e.setMinutes(stre[1]);
        return !!(n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0);
    },
    /**
     * 格式化数字
     * @param strNum
     * @returns {*}
     */
    formatNum: function (strNum) {
        if (strNum.length <= 3) {
            return strNum;
        }
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
            return strNum;
        }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
        var re = new RegExp();
        re.compile("(\\d)(\\d{3})(,|$)");
        while (re.test(b)) {
            b = b.replace(re, "$1,$2$3");
        }
        return a + "" + b + "" + c;
    },
    /**
     * 热度时间计算
     * @param time
     * @returns {string}
     */
    calTime: function (time) {
        if (time > 0) {
            return (time - 1) + ":00 - " + time + ":00";
        } else {
            return "0:00 - " + time + ":00";
        }
    },
    /**
     * 获取当前日期,格式为YYYY-MM-DD
     * @returns {string}
     */
    getNowFormatDate: function () {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        return year + seperator1 + month + seperator1 + strDate;
    },
    /**
     * 获取字符串长度,汉字两个字节
     * @param val
     * @returns {number}
     */
    getByteLen: function (val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^x00-xff]/ig) != null) //全角
                len += 2;
            else
                len += 1;
        }
        return len;
    },

    /**
     * 获取当前的交易情况
     */
    getTradeTime: function () {
        if (Utility.timeRange("09:15", "09:25")) {
            return "竞价中";
        }
        if (Utility.timeRange("09:30", "11:30") || Utility.timeRange("13:00", "15:00")) {
            return "交易中";
        }
        return "休市";
    }
};
