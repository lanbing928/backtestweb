<?php

/**
 * Class iwookongConfig 配置文件
 */
class iwookongConfig
{
    public static $usercookie = "Uj8$!mhy";
    /**
     * 测试版地址
     * @var string
     */
    public static $requireUrl = "http://61.147.114.67/cgi-bin/test_wookong/";
    /**
     * 测试版公司概况的地址
     * @var string
     */
    //public static $requireCompanyUrl = "http://61.147.80.227/cgi-bin/northsea/prsim/";
    /**
     * 正式版公司概况的地址
     * @var string
     */
    public static $requireCompanyUrl = "http://61.147.114.76/cgi-bin/company/companyprofile/";
    /**
     * 测试收益率接口前缀地址
     * @var string
     */
    public static $requireRateUrl = "http://61.147.114.67/cgi-bin/george/";
    /**
     * 正式版收益率接口
     * @var string
     */
    //public static $requireRateUrl = "http://61.147.80.236/cgi-bin/george/";

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