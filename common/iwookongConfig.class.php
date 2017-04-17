<?php

/**
 * Class iwookongConfig 配置文件
 */
class iwookongConfig
{
    public static $usercookie = "BACK";

    #region 测试版地址
//    public static $requireBTUrl = "http://61.147.114.67/cgi-bin/backtest/";//回测平台
    public static $requireUrl = "http://61.147.114.76/cgi-bin/wookong3/";//交易平台搜索搜索
    #endregion

    #region 正式版地址
    public static $requireBTUrl = "http://61.147.114.88/cgi-bin/backtest/";//回测平台


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