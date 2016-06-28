<?php
/**
 * Created by Lee.
 * Date: 2016/4/10 0020 9:41
 * Description:工具类
 */
class UtilityTools
{
    /**
     * 转换股票代码
     * @param string $stockcode 股票代码
     * @return string 返回新代码
     */
    public static function changeStockCode($stockcode)
    {
        if (!empty($stockcode)) {
            $head = substr($stockcode, 0, 1);
            switch ($head) {
                case "5":
                case "6":
                case "9":
                    return "sh" . $stockcode;
                    break;
                case "0":
                case "2":
                    return "sz" . $stockcode;
                    break;
                case "3":
                    return "sz" . $stockcode;
                    break;
                case "4":
                    return $stockcode;
                    break;
                default :
                    return $stockcode;
            }
        }
    }

    /**
     * 获取新浪股票数据
     * @param $stockCode 股票代码
     * @return array 返回数组数据
     */
    public static function getSinaData($stockCode)
    {
        $url = "http://hq.sinajs.cn/list=" . self::changeStockCode($stockCode);
        $result = mb_convert_encoding(RequestUtil::get($url), "utf-8", "gbk");
        $sinaData = explode('=', $result);
        if (!empty($sinaData[1]) && !strstr($sinaData[1], "FAILED")) {
            $valArr = explode(',', $sinaData[1]);
            return $valArr;
        }
        return null;
    }

    /**
     * 转换时间刻度
     * @return int|string
     */
    public static function getNowMinute()
    {
        $nowMin = (int)date("i");
        if ($nowMin <= 15 && $nowMin > 0) {
            return "00";
        }
        if (15 < $nowMin && $nowMin <= 30) {
            return 15;
        }
        if ($nowMin > 30 && $nowMin <= 45) {
            return 30;
        }
        if ($nowMin > 45 && $nowMin <= 59) {
            return 45;
        }
        return "00";
    }

    /**
     * 获取热力图涨跌颜色
     * @param $num
     * @return string
     */
    public static function getTreeMapColor($num)
    {
        switch ($num) {
            case 0:
                return "rgba(158,158,158)";
                break;
            case 1:
                return "rgba(255,211,211)";
                break;
            case 2:
                return "rgba(255,175,175)";
                break;
            case 3:
                return "rgba(255,128,128)";
                break;
            case 4:
                return "rgba(255,90,90)";
                break;
            case 5:
                return "rgba(255,52,52)";
                break;
            case 6:
                return "rgba(255,0,0)";
                break;
            case 7:
                return "rgba(221,25,29)";
                break;
            case 8:
                return "rgba(208,23,22)";
                break;
            case 9:
                return "rgba(196,20,17)";
                break;
            case 10:
                return "rgba(166,3,0)";
                break;
            case -1:
                return "rgba(219,246,228)";
                break;
            case -2:
                return "rgba(124,210,154)";
                break;
            case -3:
                return "rgba(76,187,115)";
                break;
            case -4:
                return "rgba(35,166,76)";
                break;
            case -5:
                return "rgba(32,155,70)";
                break;
            case -6:
                return "rgba(10,143,8)";
                break;
            case -7:
                return "rgba(10,126,7)";
                break;
            case -8:
                return "rgba(5,111,0)";
                break;
            case -9:
                return "rgba(13,83,2)";
                break;
            case -10:
                return "rgba(10,72,0)";
                break;
            default:
                return "rgba(158,158,158)";
                break;
        }
    }

    /**
     * 情感值获取利空利好
     * @param $emotion
     * @return string
     */
    public static function getEmotion($emotion)
    {
        switch ($emotion) {
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
    }

    /**
     * 根据价格获取股票颜色
     * @param $mark
     * @return string
     */
    public static function getPriceColor($mark)
    {
        if ((float)$mark > 0) {
            return "wk-red";
        } elseif ((float)$mark < 0) {
            return "wk-green";
        } else {
            return "wk-gray";
        }
    }

    /**
     * 数字转字母
     * @param $num
     * @return string 返回转换后的字母
     */
    public static function numToLetter($num){
        $new = '';
        for ($i=0; $i<strlen($num); ++$i) {
            $new .= chr(ord('a') + intval($num{$i}) - 1);
        }
        return strtoupper($new);
    }
}