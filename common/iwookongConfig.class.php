<?php

/**
 * Class iwookongConfig 配置文件
 */
class iwookongConfig
{
    public static $usercookie = "Uj8$!mhy";

    #region 测试版地址
    public static $requireCompanyUrl = "http://61.147.114.67/cgi-bin/luyao/companyprofile/";
    public static $requireReleaseUrl = "http://61.147.114.67/cgi-bin/tangtao/";
//    public static $requireBTUrl = "http://61.147.114.67/cgi-bin/backtest/";//回测平台
    #endregion

    #region 正式版地址
//    public static $requireUrl = "http://61.147.114.76/cgi-bin/twookong122/";
//    public static $requireCompanyUrl = "http://61.147.114.76/cgi-bin/company/companyprofile/";
    public static $requireRateUrl = "http://61.147.114.76/cgi-bin/george/";
    public static $requireBackUrl = "http://61.147.114.76/cgi-bin/george/stock/v1/";//个人中心回测
    public static $requireBTUrl = "http://61.147.114.76/cgi-bin/backtest/";//回测平台
    #endregion

    #region 无用的代码
    /**
     * 获取接口地址前缀
     * @return string
     */
    protected static function getRequireUrl()
    {
        return self::$requireUrl;
    }

    /**
     * 获取策略详情页头部信息
     * @return string
     */
    public static function getStrategyBrief()
    {
        return self::$requireUrl . "strategy/1/strategy_brief.fcgi";
    }

    /**
     * 获取调仓记录
     * @return string
     */
    public static function getStockTransfer()
    {
        return self::$requireUrl . "strategy/1/stock_transfer.fcgi";
    }

    /**获取策略行业股票百分比
     * @return string
     */
    public static function getIndusPercent()
    {
        return self::$requireUrl . "strategy/1/indus_percent.fcgi";
    }

    /**
     * 获取单只股票
     * @return string
     */
    public static function getSingleStock()
    {
        return self::$requireUrl . "stock/1/single_stock.fcgi";
    }
    #endregion
}