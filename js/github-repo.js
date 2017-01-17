/*
 * @Author:L.Tao
 * @Description: github-repo挂件插件
 */
;
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
                console.info(data);
                var repoTitle = "<div class='card-image-cell'><h3>" + data.name + "</h3></div>"
                var $card = "<div class='card-image'>" + repoTitle + "</div>";
                $(target).append($card);
                //caption
                var des = data.description;
                if(des.length>20){
                    des = des.substring(0,20)+"......";
                }
                var $cardDescription = "<div class='card-description'><p>" + des + "</p></div>";
                var $cardText = "<div class='card-text'>" + "<span class='meta-info' title='" + data.stargazers_count + " stars'>" + "<i class='fa fa-star' aria-hidden='true'></i>&nbsp;" + data.stargazers_count + "</span>";
                $cardText += "<span class='meta-info' title='" + data.forks_count + " stars'>" + "<i class='fa fa-code-fork' aria-hidden='true'></i>&nbsp;" + data.forks_count + "</span>";
                $cardText += "<span class='meta-info' title='" + data.updated_at + " stars'>" + "<i class='fa fa-clock-o' aria-hidden='true'></i>&nbsp;" + data.updated_at + "</span>";

                $cardText += "</div>";
                var $caption = "<div class='caption'>" + $cardDescription + $cardText + "</div>";
                $(target).append($caption);
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
