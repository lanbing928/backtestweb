<?php

/**
 * Created by Lee.
 * Date: 2016/3/30 0030 13:49
 * Description:网络请求封装
 */
class RequestUtil
{
    /**
     * HTTP GET 请求
     * @param string $url 请求地址
     * @param array $data 请求数据
     * @param null $cookie COOKIE
     * @param null $cookiefile COOKIE 请求所用的COOKIE文件位置
     * @param null $cookiesavepath 请求完成的COOKIE保存位置
     * @param bool $encode 是否对请求参数进行 urlencode 处理
     * @return mixed 返回结果
     * @throws Exception 抛出异常
     */
    public static function get($url, $data = array(), $cookie = null, $cookiefile = null, $cookiesavepath = null, $encode = false)
    {
        //初始化句柄
        $ch = curl_init();
        //处理GET参数
        if (count($data) > 0) {
            $query = $encode ? http_build_query($data) : urldecode(http_build_query($data));
            curl_setopt($ch, CURLOPT_URL, $url . '?' . $query);
        } else {
            curl_setopt($ch, CURLOPT_URL, $url);
        }
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36');
        curl_setopt($ch, CURLOPT_ENCODING, "");

        //设置cookie
        if (isset($cookie)) curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        //设置cookie请求文件
        if (isset($cookiefile)) {
            if (!is_file($cookiefile)) throw new Exception('Cookie文件不存在');
            curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiefile);
        }
        //设置cookie保存路径
        if (isset($cookiesavepath)) curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiesavepath);
        //执行请求
        $resp = curl_exec($ch);
        //关闭句柄，释放资源
        curl_close($ch);
        return $resp;
    }

    /**
     * HTTP POST 请求
     * @param string $url 请求地址
     * @param array $data 请求数据
     * @param null $cookie 请求COOKIE
     * @param null $cookiefile 请求时cookie文件位置
     * @param null $cookiesavepath 请求完成的COOKIE保存位置
     * @return string 返回结果
     * @throws Exception 抛出异常
     */
    public static function post($url, $data = array(), $cookie = null, $cookiefile = null, $cookiesavepath = null)
    {
        //初始化请求句柄
        $ch = curl_init();
        //设置头信息
        $this_header = array(
            "content-type: application/x-www-form-urlencoded;
             charset=UTF-8"
        );
        //参数设置
        curl_setopt($ch, CURLOPT_HTTPHEADER, $this_header);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36');
        curl_setopt($ch, CURLOPT_ENCODING, "");
        //cookie设置
        if (isset($cookie)) curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        //请求cookie设置
        if (isset($cookiefile)) {
            if (!is_file($cookiefile)) throw new Exception('Cookie文件不存在');
            curl_setopt($ch, CURLOPT_COOKIEFILE, $cookiefile);
        }
        //设置cookie保存路径
        if (isset($cookiesavepath)) curl_setopt($ch, CURLOPT_COOKIEJAR, $cookiesavepath);
        $resp = curl_exec($ch);
        curl_close($ch);
        return $resp;
    }

    /**
     * 模拟post进行url请求
     * @param string $url
     * @param array $post_data
     * @return mixed
     */
    public static function request_post($url = '', $post_data = array())
    {
        if (empty($url) || empty($post_data)) {
            return false;
        }

        $o = "";
        foreach ($post_data as $k => $v) {
            $o .= "$k=" . urlencode($v) . "&";
        }
        $post_data = substr($o, 0, -1);

        $postUrl = $url;
        $curlPost = $post_data;
        $ch = curl_init();//初始化curl
        curl_setopt($ch, CURLOPT_URL, $postUrl);//抓取指定网页
        curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
        curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
        $data = curl_exec($ch);//运行curl
        curl_close($ch);

        return $data;
    }
}