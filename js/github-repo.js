/*
 * @Author:L.Tao
 * @Description: github-repo挂件插件
 */
;
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
(function($, window, document, undefined) {

    //插件初始化
    function init(target, options) {
        var settings = $.extend({}, $.fn.githubRepo.defaults, options);
        // $(target).append($msb_main);
        // $(target).append($social_group);
        // $(target).append($wemcn);
        $(target).addClass("thumbnail");
        var url = "https://api.github.com/repos/" + settings.user + "/" + settings.repo;
        $.ajax({
            url: url,
            async: false,
            success: function(data, textStatus, jqXHR) {
                var repoTitle = "<div class='card-image-cell'><h3>" + data.name + "</h3></div>"
                var $card = "<div class='card-image'>" + repoTitle + "</div>";
                //$(target).append($card);
                //caption
                var des = data.description;
                if (des.length > 20) {
                    des = des.substring(0, 20) + "......";
                }
                var $cardDescription = "<div class='card-description'><p>" + des + "</p></div>";
                var $cardText = "<div class='card-text'>" + "<span class='meta-info' title='" + data.stargazers_count + " stars'>" + "<i class='fa fa-star' aria-hidden='true'></i>&nbsp;" + data.stargazers_count + "</span>";
                $cardText += "<span class='meta-info' title='" + data.forks_count + " stars'>" + "<i class='fa fa-code-fork' aria-hidden='true'></i>&nbsp;" + data.forks_count + "</span>";
                $cardText += "<span class='meta-info' title='" + data.subscribers_count + " counts'>" + "<i class='fa fa-eye' aria-hidden='true'></i>&nbsp;" + data.subscribers_count + "</span>";
                $cardText += "<span class='meta-info' title='" + new Date(data.pushed_at).Format("yyyy-MM-dd") + "'>" + "<i class='fa fa-clock-o' aria-hidden='true'></i>&nbsp;" + new Date(data.pushed_at).Format("yyyy-MM-dd") + "</span>";

                $cardText += "</div>";
                var $caption = "<div class='caption'>" + $cardDescription + $cardText + "</div>";
                var href = "<a href='" + data.html_url + "' target='_blank'>" + $card + $caption;
                $(target).append(href);
            }
        });
    }



    $.fn.githubRepo = function(options, param) {
        if (typeof options == 'string') {
            var method = $.fn.githubRepo.methods[options];
            if (method)
                return method(this, param);
        } else
            init(this, options);
    }


    //插件默认参数
    $.fn.githubRepo.defaults = {
        user: '',
        repo: ''
    }

    //插件方法
    $.fn.githubRepo.methods = {
        //初始化方法
        init: function(jq, options) {
            return jq.each(function() {
                init(this, options);
            });
        },

    }


})(jQuery, window, document);
