var selRange;
if (typeof(COMMON_JS) == 'undefined') {
    jQuery.migrateTrace = false;
    jQuery.migrateMute = true;
    $.fn.outerHTML = function(){
        return $(this).clone().wrapAll("<div/>").parent().html();
    }

    if (typeof rt_path == 'undefined')
        alert('rt_path 변수가 선언되지 않았습니다.');


    var COMMON_JS = true;

    function win_open(url, name, option) {
        var popup = window.open(rt_path + '/' + url, name, option);
        popup.focus();
    }

    // 쪽지 창
    function win_memo(url) {
        if (!url)
            url = "member/memo/lists";
        win_open(url, "winMemo", "left=50,top=50,width=620,height=460,scrollbars=1");
    }

    // 자기소개 창
    function win_profile(mb_id) {
        win_open("member/profile/qry/" + mb_id, 'winProfile', 'left=50,top=50,width=400,height=500,scrollbars=1');
    }

    // 우편번호 창
    function win_zip(frm_name, frm_zip1, frm_zip2, frm_addr1, frm_addr2) {
        url = "useful/zip/qry/" + frm_name + "/" + frm_zip1 + "/" + frm_zip2 + "/" + frm_addr1 + "/" + frm_addr2;
        win_open(url, "winZip", "left=50,top=50,width=616,height=460,scrollbars=1");
    }

    // POST 전송, 결과값 리턴
    function post_s(href, parm, del) {
        if (!del || confirm(  $.lang[LANG]['page.board.cts.msg.delete'] )) {
            $.post(rt_path + '/' + href, parm, function (req) {
                document.write(req);
            });
        }
    }

    // POST 이동
    function post_goto(url, parm, target) {
        var f = document.createElement('form');

        var objs, value;
        for (var key in parm) {
            value = parm[key];
            objs = document.createElement('input');
            objs.setAttribute('type', 'hidden');
            objs.setAttribute('name', key);
            objs.setAttribute('value', value);
            f.appendChild(objs);
        }

        if (target)
            f.setAttribute('target', target);

        f.setAttribute('method', 'post');
        f.setAttribute('action', rt_path + '/' + url);
        document.body.appendChild(f);
        f.submit();
    }

    // POST 창
    function post_win(name, url, parm, opt) {
        var temp_win = window.open('', name, opt);
        post_goto(url, parm, name);
    }

    // 일반 삭제 검사 확인
    function del(href) {
        if (confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?"))
            document.location.href = rt_path + '/' + href;
    }

    // 플래시에 변수 추가 fh
    function flash_movie(src, ids, width, height, wmode, fh) {
        var wh = "";
        if (parseInt(width) && parseInt(height))
            wh = " width='" + width + "' height='" + height + "' ";
        return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' " + wh + " id=" + ids + "><param name=wmode value=" + wmode + "><param name=movie value=" + src + "><param name=quality value=high><param name=flashvars value=" + fh + "><embed src=" + src + " quality=high wmode=" + wmode + " flashvars=" + fh + " type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' " + wh + "></embed></object>";
    }

    // 동영상 파일
    function obj_movie(src, ids, width, height, autostart) {
        var wh = "";
        if (parseInt(width) && parseInt(height))
            wh = " width='" + width + "' height='" + height + "' ";
        if (!autostart) autostart = false;
        return "<embed src='" + src + "' " + wh + " autostart='" + autostart + "'></embed>";
    }

    // 아이프레임 높이 자동조절
    function reSize(obj) {
        try {
            var objBody = frames[obj].document.body;
            var objFrame = document.getElementById(obj);
            ifrmHeight = objBody.scrollHeight + (objBody.offsetHeight - objBody.clientHeight);
            objFrame.style.height = ifrmHeight;
        }
        catch (e) {
        }
    }

    function sEncode(val) {
        return encodeURIComponent(val).replace(/%/g, '.');
    }

    // script 에서 js 파일 로드
    function importScript(FILES) {
        var _importScript = function (filename) {
            if (filename) {
                document.write('<script type="text/javascript" src="' + rt_path + '/js/' + filename + '.js"></s' + 'cript>');
            }
        };

        for (var i = 0; i < FILES.length; i++) {
            _importScript(FILES[i]);
        }
    }

    // jQuery textarea
    function txresize(tx, type, size) {
        var tx = $('#' + tx);
        if (type == 1)
            tx.animate({'height': '-=' + size + 'px'}, 'fast');
        else if (type == 2)
            tx.animate({'height': size}, 'fast');
        else if (type == 3)
            tx.animate({'height': '+=' + size + 'px'}, 'fast');
    }

    // 팝업 닫기
    function popup_close(id, onday) {
        if (onday) {
            var today = new Date();
            today.setTime(today.getTime() + (60 * 60 * 1000 * 24));
            document.cookie = id + "=" + escape(true) + "; path=/; expires=" + today.toGMTString() + ";";
        }

        if (window.parent.name.indexOf(id) != -1)
            window.close();
        else
            document.getElementById(id).style.display = 'none';
    }

    function checkcode(e) {
        var code = (window.event) ? event.keyCode : e.which; //IE : FF - Chrome both
        if (code > 31 && code < 45) nAllow(e);
        if (code > 45 && code < 48) nAllow(e);
        if (code > 57 && code < 65) nAllow(e);
        if (code > 90 && code < 97) nAllow(e);
        if (code > 122 && code < 127) nAllow(e);
    }

    function nAllow(e) {
        alert('특수문자 - 만 사용할수있습니다');
        if (navigator.appName != "Netscape") {
            //for not returning keycode value
            event.returnValue = false;  //IE ,  - Chrome both
        } else {
            e.preventDefault(); //FF ,  - Chrome both
        }
    }

    function copyTextToClipboard(text) {
        var copyFrom = $('<textarea class="hide"/>');
        copyFrom.text(text);
        $('body').append(copyFrom);
        copyFrom.select();
        document.execCommand('copy');
        copyFrom.remove();
    }

    function trim(str) {
        str = str.replace(/^\s*/, '').replace(/\s*$/, '');
        return str; //변환한 스트링을 리턴.
    }

    jQuery.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
        return this;
    }

    function setCookie(cookieName, cookieValue, expireDate) {
        var today = new Date();
        today.setDate(today.getDate() + parseInt(expireDate));
        document.cookie = cookieName + "=" + escape(cookieValue) + "; path=/; expires=" + today.toGMTString() + ";";
    }

    function getCookie(cookieName) {
        var search = cookieName + "=";
        var cookie = document.cookie;

        // 현재 쿠키가 존재할 경우
        if (cookie.length > 0) {
            // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
            startIndex = cookie.indexOf(cookieName);

            // 만약 존재한다면
            if (startIndex != -1) {
                // 값을 얻어내기 위해 시작 인덱스 조절
                startIndex += cookieName.length;

                // 값을 얻어내기 위해 종료 인덱스 추출
                endIndex = cookie.indexOf(";", startIndex);

                // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
                if (endIndex == -1) endIndex = cookie.length;

                // 쿠키값을 추출하여 리턴
                return unescape(cookie.substring(startIndex + 1, endIndex));
            } else {
                // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
                return false;
            }
        } else {
            // 쿠키 자체가 없을 경우
            return false;
        }
    }

    function deleteCookie(cookieName) {
        var expireDate = new Date();

        //어제 날짜를 쿠키 소멸 날짜로 설정한다.
        expireDate.setDate(expireDate.getDate() - 1);
        document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
    }

    function getRandom() {
        var result = Math.floor(Math.random() * 10) + 1;
        return result;
    }

    function strpos(haystack, needle, offset) {
        // From: http://phpjs.org/functions
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: Onno Marsman
        // +   bugfixed by: Daniel Esteban
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
        // *     returns 1: 14
        var i = (haystack + '').indexOf(needle, (offset || 0));
        return i === -1 ? false : i;
    }

    function htmlspecialchars_decode(string, quote_style) {
        var optTemp = 0,
            i = 0,
            noquotes = false;
        if (typeof quote_style === 'undefined') {
            quote_style = 2;
        }
        string = string.toString()
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;lt;/g, '<')
            .replace(/&amp;gt;/g, '>');

        var OPTS = {
            'ENT_NOQUOTES': 0,
            'ENT_HTML_QUOTE_SINGLE': 1,
            'ENT_HTML_QUOTE_DOUBLE': 2,
            'ENT_COMPAT': 2,
            'ENT_QUOTES': 3,
            'ENT_IGNORE': 4
        };
        if (quote_style === 0) {
            noquotes = true;
        }
        if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
            quote_style = [].concat(quote_style);
            for (i = 0; i < quote_style.length; i++) {
                // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[quote_style[i]] === 0) {
                    noquotes = true;
                } else if (OPTS[quote_style[i]]) {
                    optTemp = optTemp | OPTS[quote_style[i]];
                }
            }
            quote_style = optTemp;
        }
        if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
            string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
            // string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
        }
        if (!noquotes) {
            string = string.replace(/&quot;/g, '"');
        }
        // Put this in last place to avoid escape being double-decoded
        string = string.replace(/&amp;/g, '&');

        return string;
    }

    function explode(delimiter, string, limit) {
        //  discuss at: http://phpjs.org/functions/explode/
        // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        //   example 1: explode(' ', 'Kevin van Zonneveld');
        //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

        if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
        if (delimiter === '' || delimiter === false || delimiter === null) return false;
        if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
            'object') {
            return {
                0: ''
            };
        }
        if (delimiter === true) delimiter = '1';

        // Here we go...
        delimiter += '';
        string += '';

        var s = string.split(delimiter);

        if (typeof limit === 'undefined') return s;

        // Support for limit
        if (limit === 0) limit = 1;

        // Positive limit
        if (limit > 0) {
            if (limit >= s.length) return s;
            return s.slice(0, limit - 1)
                .concat([s.slice(limit - 1)
                    .join(delimiter)
                ]);
        }

        // Negative limit
        if (-limit >= s.length) return [];

        s.splice(s.length + limit);
        return s;
    }

    function microtime(get_as_float) {
      var now = new Date()
        .getTime() / 1000;
      var s = parseInt(now, 10);

      return (get_as_float) ? now*1000 : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
    }

    function log(r) {
        console.log(r);
    }
    
    function pathinfo(path, options) {
    //        note: which makes it fully compliant with PHP syntax.
    //  depends on: basename
    //   example 1: pathinfo('/www/htdocs/index.html', 1);
    //   returns 1: '/www/htdocs'
    //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME');
    //   returns 2: 'index.html'
    //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION');
    //   returns 3: 'html'
    //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME');
    //   returns 4: 'index'
    //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4);
    //   returns 5: {basename: 'index.html', extension: 'html'}
    //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL');
    //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
    //   example 7: pathinfo('/www/htdocs/index.html');
    //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
        var opt = '',
        optName = '',
        optTemp = 0,
        tmp_arr = {},
        cnt = 0,
        i = 0;
        var have_basename = false,
        have_extension = false,
        have_filename = false;

        // Input defaulting & sanitation
        if (!path) {
            return false;
        }
        if (!options) {
            options = 'PATHINFO_ALL';
        }

        // Initialize binary arguments. Both the string & integer (constant) input is
        // allowed
        var OPTS = {
            'PATHINFO_DIRNAME': 1,
            'PATHINFO_BASENAME': 2,
            'PATHINFO_EXTENSION': 4,
            'PATHINFO_FILENAME': 8,
            'PATHINFO_ALL': 0
        };
    
        // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
        for (optName in OPTS) {
            OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
        }
        if (typeof options !== 'number') { // Allow for a single string or an array of string flags
            options = [].concat(options);
            for (i = 0; i < options.length; i++) {
            // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
                if (OPTS[options[i]]) {
                    optTemp = optTemp | OPTS[options[i]];
                }
            }
            options = optTemp;
        }

        // Internal Functions
        var __getExt = function(path) {
            var str = path + '';
            var dotP = str.lastIndexOf('.') + 1;
                return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
        };
        function basename(path, suffix) {
            //  discuss at: http://phpjs.org/functions/basename/
            // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: Ash Searle (http://hexmen.com/blog/)
            // improved by: Lincoln Ramsay
            // improved by: djmix
            // improved by: Dmitry Gorelenkov
            //   example 1: basename('/www/site/home.htm', '.htm');
            //   returns 1: 'home'
            //   example 2: basename('ecra.php?p=1');
            //   returns 2: 'ecra.php?p=1'
            //   example 3: basename('/some/path/');
            //   returns 3: 'path'
            //   example 4: basename('/some/path_ext.ext/','.ext');
            //   returns 4: 'path_ext'

            var b = path;
            var lastChar = b.charAt(b.length - 1);

            if (lastChar === '/' || lastChar === '\\') {
                b = b.slice(0, -1);
            }

            b = b.replace(/^.*[\/\\]/g, '');

            if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
                b = b.substr(0, b.length - suffix.length);
            }
            return b;
        }        

        // Gather path infos
        if (options & OPTS.PATHINFO_DIRNAME) {
            var dirName = path.replace(/\\/g, '/')
                .replace(/\/[^\/]*\/?$/, ''); // dirname
            tmp_arr.dirname = dirName === path ? '.' : dirName;
        }

        if (options & OPTS.PATHINFO_BASENAME) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            tmp_arr.basename = have_basename;
        }

        if (options & OPTS.PATHINFO_EXTENSION) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            if (false === have_extension) {
                have_extension = __getExt(have_basename);
            }
            if (false !== have_extension) {
                tmp_arr.extension = have_extension;
            }
        }

        if (options & OPTS.PATHINFO_FILENAME) {
            if (false === have_basename) {
                have_basename = basename(path);
            }
            if (false === have_extension) {
                have_extension = __getExt(have_basename);
            }
            if (false === have_filename) {
                have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 :
                have_extension === false ? 0 : 1));
            }
            tmp_arr.filename = have_filename;
        }

        // If array contains only 1 element: return string
        cnt = 0;
        for (opt in tmp_arr) {
            cnt++;
        }
        if (cnt == 1) {
            return tmp_arr[opt];
        }

        // Return full-blown array
        return tmp_arr;
    }    
    
    function isIE () {
          userAgent = window.navigator.userAgent;
          return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;
      }

    function isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
    }

    function sendSns(sns,url,txt) {
        var img = $('meta[property="og:image"]').attr('content');
        var o,
            _url = (typeof url == "undefined") ? encodeURIComponent("http://creatorlink.net") : encodeURIComponent(url),
            _txt = (typeof txt == "undefined") ? encodeURIComponent("Make your portfolio site as easily as stacking blocks") : encodeURIComponent(txt),
            _br  = encodeURIComponent('\r\n'),
            _img  = (typeof img == "undefined") ? 'https://storage.googleapis.com/i.addblock.net/config/aboutVideoImg00.png' : img;

        switch(sns) {
            case 'facebook':
                o = {
                    method : 'popup',
                    url : 'https://www.facebook.com/sharer/sharer.php?u=' + _url + '&t=' + _txt
                };
                break;
            case 'twitter':
                o = {
                    method:'popup',
                    url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url + '&source=' + _url
                };
                break;
            case 'google':
                o = {
                    method:'popup',
                    url:'https://plus.google.com/share?url=' + _url
                };
                break;
            case 'pinterest':
                o = {
                    method:'popup',
                    url:'http://pinterest.com/pin/create/button/?url=' + _url + '&media=' + _img + '&description=' + _txt
                };
                break;
            case "tumblr":
                o = {
                    method:'popup',
                    url:'http://www.tumblr.com/share?v=3&u=' + _url + '&t=creatorlink&s='
                };
                break;
            default :
                o = {
                    method:''
                };
                break;
        }
        switch(o.method) {
            case "popup":
                var left = (screen.width/2)-(575/2);
                var top = (screen.height/2)-(575/2);            
                window.open(o.url,'Share','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=575, height=575, top=' + top + ', left=' + left);
                break;
            default : 
                break;
        }
    }

    function stripslashes(str) {
      return (str + '')
        .replace(/\\(.?)/g, function(s, n1) {
          switch (n1) {
            case '\\':
              return '\\';
            case '0':
              return '\u0000';
            case '':
              return '';
            default:
              return n1;
          }
        });
    }

    function isNumber(s) {
        s += '';
        s = s.replace(/^\s*|\s*$/g, '');
        if (s == '' || isNaN(s)) return false;
        return true;
    }

    function saveSelection() {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    }

    function restoreSelection(range) {
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    }

     function getBytes( string ) {
        var cnt = 0, ch = "";
        for(var i = 0; i < string.length; i++) {
            ch = string.charAt(i);
            if(escape(ch).length > 4) {
                cnt += 2;
            } else {
                cnt += 1;
            }
        }
        return cnt;
    }

    function getWidthPercent(el) {
        var width = parseFloat($(el).css('width'))/parseFloat($(el).parent().css('width'));
        return Math.round(100*width)+'%';
    }

    // smartresize
    (function($,sr){

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');

    function emailcheck(email) {
        var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        if(email.lenght == 0) return false;
        if (!email.match(regExp)) return false;
        return true;
    }

    function shareModal() {
        var title = $('meta[property="og:title"]').attr('content'),
            description = $('meta[property="og:description"]').attr('content');
        $(this).showModalFlat('Share',snsPost(),false,false,'');
    }

    var snsPost = function() {
        str = "" + 
        "   <ul class='tpl-share-sns'>" +
        "       <li class='tpl-share-snsPost' data-sns='facebook'><i class='fa fa-facebook-official'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.facebook"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='twitter'><i class='fa fa-twitter-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.twitter"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='google'><i class='fa fa-google-plus-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.google"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='pinterest'><i class='fa fa-pinterest-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.pinterest"] + "</span></li>" + 
        "       <li class='tpl-share-snsPost' data-sns='tumblr'><i class='fa fa-tumblr-square'></i> <span class='tpl-share-sns-name'>" + $.lang[LANG]["config.sns.tumblr"] + "</span></li>" + 
        "   </ul>" +
        "";
        return str;
    }

    $(document).on('click','.tpl-share-snsPost', function(e) {
        var sns = $(this).attr('data-sns'),
            sid = (typeof SID == 'undefined') ? property.SID : SID,
            host = (typeof HOST == 'undefined') ? property.HOST : HOST,
            view = (typeof VIEW == 'undefined') ? property.VIEW : VIEW,
            page = (property.PAGE).split(','),
            url = window.location.protocol + '//' + window.location.hostname + '/' + page[0] + '/view/' + view,
            txt = (page[0]=='forum') ? $('.tpl-forum-title').text() : $('[data-project-title]').text()
        sendSns(sns,url,txt);
    });

    var displayPageToolbar = function(option) {
        option = (typeof option == "undefined") ? "" : option;
        str = "" +
        "       <ul class='tpl-page-toolbar' data-page-option='" + option + "'>" + 
        // "           <li class='tpl-forum-toolbar-button'><i class='fa fa-heart-o'></i> <span class='tpl-page-toolbar-number'>13</span></li>" + 
        // "           <li class='tpl-forum-toolbar-button'><i class='fa fa-thumb-tack'></i></li>" + 
        "           <li class='tpl-forum-toolbar-button share hide'><button type='button' class='btn btn-default btn-round'><i class='fa fa-share'></i> <span>" + $.lang[LANG]['board.button.share'] + "</span></button></li>" + 
        "       </ul>" + 
        "";

        if($('.tpl-forum-list-footer').length) {
            if($('.tpl-forum-list-footer .tpl-forum-toolbar-button').length == 0) $('.tpl-forum-list-footer').prepend(str);
        } else {
            var g_btn_prev = ($('.data-page-prev').hasClass('active')) ? 'active' : '',
                g_btn_next = ($('.data-page-next').hasClass('active')) ? 'active' : '',
                g_toolbar =  "" +
            "       <div class='tpl-page-toolbar' data-page-option='" + option + "' style='width: 100%;'>" + 
            "           <div class='pull-left tpl-forum-toolbar-button share'><i class='fa fa-share-alt'></i></div>" + 
            "           <div class='pull-right tpl-project-toolbar-button data-page-next " + g_btn_next + "'><i class='fa fa-angle-right'></i></div>" + 
            "           <div class='pull-right tpl-project-toolbar-button data-page-prev " + g_btn_prev + "'><i class='fa fa-angle-left'></i></div>" + 
            "           <div class='pull-right tpl-project-toolbar-button data-page-back'><i class='fa fa-bars'></i></div>" + 
            "       </div>" + 
            "";

            var $wrap = $('<div class="tpl-page-footer hide">');
            $wrap.append('<div class="container"><div class="row"><div class="col-md-12 col-sm-12 col-xs-12 tpl-page-footer-wrap"></div></div></div>');
            $wrap.find('.tpl-page-footer-wrap').append(g_toolbar);
            $wrap.css({
                'background-color' : 'transparent',
                'padding' : '30px 0px'
            });
            if($('.page-comments').length) {
                $('.page-comments').before($wrap);
            } else if($('.page-bottomlist').length) {
                $('.page-bottomlist').before($wrap);
            } else {
                $('.el-footer').before($wrap);
            }
        }
    }

    $(document).on('click','.data-feed-load-more',function() {
        var feed = $(this).attr('data-feed-el');
        if($('.' + feed + ' .listprogress').length) {
            $(this).showModalFlat('INFORMATION', 'Please wait...',true,false,'','ok');
            return false;
        }
        $('.' + feed + ' .social-feed-element').addClass('show-posts');
        if(typeof $('.' + feed + ' .social-feed-element:eq(0)').first().attr('social-feed-id') != 'undefined') $(this).hide();
    });

    var loadingElement = function(el,msg) {
        $('.' + el + ' .listprogress').remove();
        if($('.'+el).find('.social-feed-container').hasClass('listprogress-end')) return false;
        msg = (typeof msg == "undefined") ? "" : msg;
        var p = (msg) ? "<p class='text-center'>" + msg + "</p>" : "";
        $('.'+ el + ' .social-feed-container').append('<div class="listprogress" style="width: 100%; text-align:center; padding:50px 0;"><svg version="1.1" xmlns="http://www.w3.org/svg/2000" viewBox="0 0 30 30" width="60" style="width:20px; height: 20px;"><circle cy="15" cx="15" r="14" style="stroke:#00baff;"></circle></svg>' + p + '</div>');
    }

    var setCustomPagination = function( config ) { 

        var $obj = config['$obj'], 
            total = config['total'], 
            view = ( config['view'] ) ? config['view'] : 10, 
            page_num = ( config['page_num'] ) ? config['page_num'] : 1, 
            page_view = ( config['page_view'] ) ? config['page_view'] : 5, 
            pagingContainer = config['pagingContainer'], 
            section = config['section'], 
            base_url = config['base_url']; 

            start = Math.floor((page_num-1) / page_view) * page_view,
            pages = Math.ceil(total/view),
            end = (Math.floor((page_num-1) / page_view) + 1) * page_view,
            end = (end>pages) ? pages : end,
            prev = (start > 0) ? start : 1,
            next = ((end+1) > pages) ? pages : end+1,
            page_class = section + '-page';

        $obj.empty();

        for( i=start; i<end; i++ ) {
            var active = ((i+1) == page_num) ? "active" : "",
                pageHref = base_url + (i + 1);

            $obj.append($("<li class='" + page_class + " " + active + "' data-view='" + view + "' data-page-num='" + (i+1) + "'><a href='" + pageHref + "'>" + (i+1) + "</a></li>"));
        }

        var prevHref = base_url + prev,
            nextHref = base_url + next,
            firstHref = base_url + '1',
            lastHref = base_url + pages,
            $prev = "" +
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='" + (start) + "'>" +
                    "<a href='" + prevHref + "' aria-label='Previous'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-left'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $next = "" +
                "<li class='" + page_class + " next' data-view='" + view + 
                    "' data-page-num='" + (i+1) + "'>" +
                    "<a href='" + nextHref + "' aria-label='Previous'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-right'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $first = "" + 
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='1'>" +
                    "<a href='" + firstHref + "' aria-label='First'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-double-left'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>",
            $last = "" + 
                "<li class='" + page_class + " prev' data-view='" + view + 
                    "' data-page-num='" + pages + "'>" +
                    "<a href='" + lastHref + "' aria-label='Last'>" +
                        "<span aria-hidden='true'>" +
                            "<i class='fa fa-angle-double-right'></i>" +
                        "</span>" +
                    "</a>" +
                "</li>";                        

            if ( start != 0 )
                $obj.prepend($prev);

            if ( end != pages )
                $obj.append($next);

            if ( pages > 5) {
                if(page_num > 5) $obj.prepend($first);
                $obj.append($last);
            }

    }

    function memberLogin() {
        location.href = "/";
    }


    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };    

    // 뎁스가 있는 값을 확인하기
    var checkNested = function(obj) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
              return false;
            }
            obj = obj[args[i]];
        }
        return true;
    }

    Number.prototype.format = function(){
        if(this==0) return 0;
     
        var reg = /(^[+-]?\d+)(\d{3})/;
        var n = (this + '');
     
        while (reg.test(n)) n = n.replace(reg, '$1' + ',' + '$2');
     
        return n;
    };
     

    String.prototype.format = function(){
        var num = parseFloat(this);
        if( isNaN(num) ) return "0";
     
        return num.format();
    };

    function selectionRect() {
        var s = window.getSelection();
        oRange = s.getRangeAt(0); //get the text range
        oRect = oRange.getBoundingClientRect();
        return oRect;
    }
    
    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
                && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    var insertVideo = function (sUrl,mode) {
        if(typeof sUrl == "object") {
            var result = [];
            $.each(sUrl, function(i,v) {
                var r = insertVideo(v);
                if(typeof r != "undefined") result.push(r);
            });
            return (sUrl.length == result.length) ? result : false;
        }

        sUrl = sUrl.replace("www.","");
        var img = 'https://storage.googleapis.com/i.addblock.net/video-icon.jpg';
        // video url patterns(youtube, instagram, vimeo, dailymotion)
        var ytRegExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var ytMatch = sUrl.match(ytRegExp);

        var igRegExp = /\/\/instagram.com\/p\/(.[a-zA-Z0-9]*)/;
        var igMatch = sUrl.match(igRegExp);

        var vRegExp = /\/\/vine.co\/v\/(.[a-zA-Z0-9]*)/;
        var vMatch = sUrl.match(vRegExp);

        var vimRegExp = /\/\/(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/;
        var vimMatch = sUrl.match(vimRegExp);

        var dmRegExp = /.+dailymotion.com\/(video|hub|embed)\/([^_]+)[^#]*(#video=([^_&]+))?/;
        var dmMatch = sUrl.match(dmRegExp);

        var mcRegExp =  /\/\/metacafe.com\/watch\/(.[a-zA-Z0-9]*)\/(.[a-zA-Z0-9\-]*)\//;
        var mcMatch = sUrl.match(mcRegExp);

        var kakaoExp = /\/\/tv.kakao.com\/(channel|embed)\/([0-9]{6,11}|player)\/cliplink\/([0-9]{6,11})/;
        var kaMatch = sUrl.match(kakaoExp);

        var kakaoExp2 = /\/\/tv.kakao.com\/(v|l)\/([0-9]{6,11})/;
        var kaMatch2 = sUrl.match(kakaoExp2);

        var naverExp = /\/\/serviceapi.rmcnmv.naver.com\/(.*)/;
        var naMatch = sUrl.match(naverExp);

        var sound = sUrl.search("soundcloud.com");
        var $video, src;
        if (ytMatch && ytMatch[2].length === 11) {
            var youtubeId = ytMatch[2];
            src = '//www.youtube.com/embed/' + youtubeId;
            src = src.replace("watch?v=", "v/");

            $video = $('<iframe>')
            .attr({"src": src + "?wmode=transparent", "frameborder":"0"});
            img = "//img.youtube.com/vi/" + youtubeId + "/default.jpg";
        /*        
        } else if (igMatch && igMatch[0].length > 0) {
            $video = $('<iframe>')
            .attr('src', igMatch[0] + '/embed/')
            .attr('width', '612').attr('height', '710')
            .attr('scrolling', 'no')
            .attr('allowtransparency', 'true');
        } else if (vMatch && vMatch[0].length > 0) {
            $video = $('<iframe>')
            .attr('src', vMatch[0] + '/embed/simple')
            //.attr('width', '600').attr('height', '600')
            .attr('class', 'vine-embed');
            src = vMatch[0] + '/embed/simple';
        */        
        } else if (vimMatch && vimMatch[3].length > 0) {
            $video = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>')
            .attr('src', '//player.vimeo.com/video/' + vimMatch[3]);
            //.attr('width', '640').attr('height', '360');
            src = '//player.vimeo.com/video/' + vimMatch[3];
            $.getJSON('//vimeo.com/api/v2/video/' + vimMatch[3] + '.json', function(data) {
                if(typeof data[0]['thumbnail_small'] != 'undefined') {
                    img = data[0]['thumbnail_small'];
                }
            });
        } else if (dmMatch && dmMatch[2].length > 0) {
            dmMatch[2] = dmMatch[2].replace("video/","");
            $video = $('<iframe>')
            .attr('src', '//www.dailymotion.com/embed/video/' + dmMatch[2]);
            //.attr('width', '640').attr('height', '360');
            src = '//www.dailymotion.com/embed/video/' + dmMatch[2];
            img = '//dailymotion.com/thumbnail/video/' + dmMatch[2];
        } else if (mcMatch && mcMatch[1].length > 0) {
            $video = $('<iframe>')
            .attr('src', 'http://www.metacafe.com/embed/' + mcMatch[1] + '/' + mcMatch[2]);
            //.attr('width', '640').attr('height', '360');
            src = 'http://www.metacafe.com/embed/' + mcMatch[1] + '/' + mcMatch[2];
        } else if (sound>-1) {
            $.getJSON('http://soundcloud.com/oembed?format=json&url=' + sUrl, function(data) {
                if(typeof data.html == 'undefined') {
                    alert('get Soundcloud API error');
                    return;
                }
                $video = $(data.html);
                src = $video.prop('src');
                img = data.thumbnail_url;
            });
        } else if(kaMatch && kaMatch[3].length > 0) {
            $video = $('<iframe>')
            .attr('src', '//tv.kakao.com/embed/player/cliplink/' + kaMatch[3] + '?service=kakao_tv');
            src = '//tv.kakao.com/embed/player/cliplink/' + kaMatch[3] + '?service=kakao_tv';
            // img = file_get_contents('//tv.kakao.com/v/' + kaMatch[3]);
        } else if(kaMatch2 && kaMatch2[2].length > 0) {
            var kakao_tv_iframe = {
                    'l': '//play-tv.kakao.com/embed/player/livelink?liveLinkId=',
                    'v': '//play-tv.kakao.com/embed/player/cliplink/'
                },
                kakao_tv_parameter = {
                    'l': '&service=player_share',
                    'v': '?service=player_share'
                }
                kakao_tv_src = kakao_tv_iframe[kaMatch2[1]] + kaMatch2[2] + kakao_tv_parameter[kaMatch2[1]];

            $video = $('<iframe>')
            .attr('src', kakao_tv_src)
            .attr('scrolling', 'no')
            .attr('allow', 'autoplay');
            src = kakao_tv_src;
        } else if(naMatch && naMatch[1].length > 0) {
            $video = $('<iframe>')
            .attr('src', '//serviceapi.rmcnmv.naver.com/' + naMatch[1]);
            src = '//serviceapi.rmcnmv.naver.com/' + naMatch[1];
        } else {
            // this is not a known video link. Now what, Cat? Now what?
        }

        if ($video) {
            $video.attr('frameborder', 0);
        }

        switch(mode) {
            case "src" : return src; break;
            case "img" : return img; break;
            default : return $video; break;
        }
    }

    function setForumWrap() {
        var width = $('body').width(),
            margin = 0,
            size = $('.fr-view').width(),
            sidebar = $('.dsgn-body').hasClass('sidebar');

        width = (sidebar) ? width - $('header.sidebar').width() : width;
        $.each($('.f-align-full, .f-align-wide'), function(i,v) {
            if($(this).hasClass('f-align-full')) {
                margin = (width-size) / 2;
            } else {
                container = (size == 720) ? (size+240) : (size+220);
                if(width <= container) container = width;
                width = container;
                margin = (container - size ) / 2;
            }
            $(this).css('cssText', 'width: ' + width + 'px !important; margin-left:-' + margin + 'px; max-width:' + width + 'px !important;');
        });
    }
    function doGetCaretPosition (oField) {

      // Initialize
      var iCaretPos = 0;

      // IE Support
      if (document.selection) {

        // Set focus on the element
        oField.focus();

        // To get cursor position, get empty selection range
        var oSel = document.selection.createRange();

        // Move selection start to 0 position
        oSel.moveStart('character', -oField.value.length);

        // The caret position is selection length
        iCaretPos = oSel.text.length;
      }

      // Firefox support
      else if (oField.selectionStart || oField.selectionStart == '0')
        iCaretPos = oField.selectionStart;


      // Return results
      return iCaretPos;
    }

    function resetForm($obj) {
        $.each($obj.find('.tpl-form-element'), function(i,v) {
            var type = $(this).prop('type');
            switch(type) {
                case 'text' : case 'tel' : case 'number': case 'textarea':            
                    $(this).val('');
                break;
                
                case 'radio': case 'checkbox':
                    $(this).prop('checked',false);
                break;
                
                case 'select-one': case 'select-multi':
                    $(this).val('');
                    $(this)[0].selectIndex  = -1;            
                break;                                                                             
            }        
        });
    }

    function getRecommendInfo($el,$img,mode) {
        if(typeof mode == 'undefined' || $el.hasClass('el-footer')) mode = true;

        var width = '';
        if(mode == false) {
            width = ($('#element-display > div').is('[data-width]')) ? $('#element-display > div').attr('data-width') : $el.attr('data-width');
        } else {
            if(typeof $el.attr('data-width') != 'undefined') width = $el.attr('data-width');
            else width = 0;
        }

        var src = $img.prop('src'),
            img_resolution = '',
            img = new Image(),
            nWidth = 0, nHeight = 0,
            txt_img_click = (mode) ? $.lang[LANG]['editor.image.click.change'] + '<br>' : '',
            recomm_str = '',
            footerlogo = (selectEL == 'el-footer') ? $img[0].src.split(':')[1] : '',
            isfooterAttach = typeof $('img[src="'+footerlogo+'"]').is('[data-footer-attach]') == 'undefined' ? false : $('img[src="'+footerlogo+'"]').is('[data-footer-attach]');

        img.src = (typeof src == 'undefined') ? '' :  src;
        
        if(width == 0) {

            if(selectEL == 'el-menu' || (selectEL == 'el-footer' && isfooterAttach)) {
                var el_img = $('.'+selectEL).find('img[data-attach="true"]');
                if(typeof el_img.attr('src') != "undefined" && src.match(el_img.attr('src')) !== null) {
                    // HTML[data-max-width] > CSS max-width > HTML ELEMENT width()
                    nWidth = (typeof el_img.css('max-width') != 'undefined' && el_img.css('max-width').match(/px/gi) !== null) ? el_img.css('max-width').replace('px','') : el_img.width();
                    nHeight = (typeof el_img.css('max-height') != 'undefined' && el_img.css('max-height').match(/px/gi) !== null) ? el_img.css('max-height').replace('px','') : el_img.height();

                    img_resolution = (typeof el_img.closest('.navbar-brand').attr('data-recommend') != 'undefined') ? el_img.closest('.navbar-brand').attr('data-recommend') : nWidth + ' X ' + nHeight;
                    // return '<div class="text-left">' + txt_img_click + '<span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm.menu'] + '<br>' + img_resolution + '</span></div>';
                    return "<div class=\'text-left\'>" + txt_img_click + "</div>";
                }
            } else {
                img.onload = function() {
                    nWidth = this.width;
                    nHeight = this.height;
                    img_resolution = ((nWidth) ? nWidth : $img.width()) + ' X ' + ((nHeight) ? nHeight : $img.height());

                    recomm_str = "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\'>" + $.lang[LANG]['editor.image.recomm'] + "<br>" + img_resolution + "</span></div>";

                    if(mode) {
                        var this_src = src.substr(src.lastIndexOf('/') + 1);
                        $('.bc-resource').find('img[src$="' + this_src + '"]').attr('data-original-title', recomm_str);
                    } else {
                        if($('.recomm-image-text').length > 0) $('.recomm-image-text').html(recomm_str).show();
                        else $('body').append(recomm_str);
                    }
                }
                return "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\' data-loading=\'true\'>Loading...</span></div>";
            }


            // if(mode) return '<div class="text-left">' + $.lang[LANG]['editor.image.click.change'] + '<br><span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm'] + '<br>' + img_resolution + '</span></div>';
            // else return '<div class="text-left"><span class="txt-recomm">' + $.lang[LANG]['editor.image.recomm'] + '<br>' + img_resolution + '</span></div>';
        } else {
            switch(width) {
                case '1920':    img_resolution = '1920 X FREE'; break;
                case '800':     img_resolution = '800 X FREE'; break;
                case '700':     img_resolution = '700 X 500'; break;
                case '670':     img_resolution = '670 X 980'; break;
                case '650':     img_resolution = '650 X 370'; break;
                case '600':     img_resolution = '600 X 600'; break;
                case '250':     img_resolution = '250 X 250'; break;
                case '60':      img_resolution = '60 X 60'; break;
            }

            return "<div class=\'text-left\'>" + txt_img_click + "<span class=\'txt-recomm\'>" + $.lang[LANG]['editor.image.recomm'] + "<br>" + img_resolution + "</span></div>";
        }

    }

    var getRatio = function(w) {
        var r = '';
        switch(w) {
            case "1920":    r = '&w=1920&fit=crop'; break;
            case "800":     r = '&w=800&fit=crop'; break;
            case "700":     r = '&w=700&h=500&crop=face&fit=crop'; break;
            case "670":     r = '&w=670&h=980&crop=face&fit=crop'; break;
            case "650":     r = '&w=600&h=370&crop=face&fit=crop'; break;
            case "600":     r = '&w=600&h=600&crop=face&fit=crop'; break;
            case "250":     r = '&w=250&h=250&crop=face&fit=crop'; break;
            case "60" :     r = '&w=60&h=60&crop=face&fit=crop'; break;
            case "0" :      r = ''; break;
        }
        return r;
    }

    var tplFormitem = function(type,idx,val) {
        var tpl = '';

        if(typeof val=='undefined' || val == '') {
            val = ['A','B'];
        } else {
            val = val.split('`');
        }

        var blang = $('.' + selectEL).attr('data-lang'),
            sdefault = '';
        if(typeof blang == 'undefined') {
            blang = getLanguage(true);
        }

        if(blang == 'ko') {
            sdefault = '선택하세요';
        } else if(blang == 'en') {
            sdefault = 'Choose';
        } else if(blang == 'ja') {
            sdefault = '選択してください';
        } else {
            sdefault = 'Choose';
        }
        switch(type) {
            case 'text' : tpl = '<input class="form-control" type="text">'; break;
            case 'memo' : tpl = '<textarea class="form-control"></textarea>'; break;
            case 'select' : tpl = '<select class="form-control">';
                tpl = tpl + '<option value="">' + sdefault + '</option>';
                $.each(val,function(i,v) {
                    tpl = tpl + '<option value="' + replaceQuote(v) + '">' + v + '</option>';
                });
                tpl = tpl + '</select>'; 
                break;
            case 'check':
                tpl = '<div>';
                $.each(val, function(i,v) {
                    tpl = tpl + '<label class="checkbox-inline"><input type="checkbox" class="forms-item-check" name="' + (type + idx) + '" value="' + replaceQuote(v) + '">' + v + '</label>';
                });
                tpl = tpl + '</div>';
                break;
            case 'radio':
                tpl = '<div>';
                $.each(val, function(i,v) {
                    tpl = tpl + '<label class="radio-inline"><input type="radio" class="forms-item-radio" name="' + (type + idx) + '" value="' + replaceQuote(v) + '">' + v + '</label>';
                });
                tpl = tpl + '</div>';
                break;
            case 'date':
                tpl = '<div>';
                tpl = tpl + '<input type="number" class="form-control date-yyyy form-date" placeholder="YYYY"> <span class="date-divider">/</span> <input type="number" class="form-control date-mm form-date" placeholder="MM"> <span class="date-divider">/</span> <input type="number" class="form-control date-dd form-date" placeholder="DD">';
                tpl = tpl + '</div>';
                break;
            case 'date2':
                tpl = '<div>';
                tpl = tpl + '<input type="number" class="form-control date-yyyy form-date" placeholder="YYYY"> <span class="date-divider">/</span> <input type="number" class="form-control date-mm form-date" placeholder="MM"> <span class="date-divider">/</span> <input type="number" class="form-control date-dd form-date" placeholder="DD"> <span class="date-divider clear"></span> <input type="number" class="form-control date-hh form-date" placeholder="HH"> <span class="date-divider">:</span> <input type="number" class="form-control date-ii form-date" placeholder="MM">';
                tpl = tpl + '</div>';
                break;
        }

        return tpl;
    }

    function replaceQuote(str) {
        // str = str.replace(/\\/g, '\\\\');
        // str = str.replace(/\'/g, '\\\'');
        str = str.replace(/\"/g, '&quot;');
        // str = str.replace(/\0/g, '\\0');
        return str;
    }

    var captchaContainer = null;
    var loadCaptcha = function() {
        $('#recaptcha').attr('data-res','');
        captchaContainer = grecaptcha.render('recaptcha', {
            'sitekey' : '6LfZjyIUAAAAAIMcTzt0XriAdVXHExtrVsNUaiHz',
            'callback' : loadCaptchaCallback
        });
    }
    var loadCaptchaCallback = function(res) { $('#recaptcha').attr('data-res', res); }
    var recaptchCallback = function() { }
    var checkCaptcha = function() {
        var s = $('#recaptcha').attr('data-res');
        var res = $.post('/fm/recaptcha', { r : s }, function(data) {
            return data;
        },'json');
        return res;
    }

    var load_kcaptcha = function() {
        $('#kcaptcha').attr('src', 'https://storage.googleapis.com/i.addblock.net/js/load_kcaptcha.gif');
        $('#kcaptcha').attr('title', $.lang[LANG]['page.reset-password.captcha-tip'] );
        $.post(rt_path + '/check/kcaptcha/session?_' + new Date().getTime(), function(data) {
            md5_norobot_key = data;
            var tmpImg = new Image(),
                t = (new Date).getTime();
            tmpImg.src = rt_path + '/check/kcaptcha/image/' + t;
            tmpImg.onload = function() {
                $('#kcaptcha').attr('src', rt_path + '/check/kcaptcha/image/' + t);
            };          
        });
    }
    
    $('#comm-name,#comm-pass').live('blur',function(e) {
        window.scrollTo(0,0);
    });
    var getLocation = function(url) {
        var parser = document.createElement("a");
        parser.href = url;
        parser.href = parser.href;

        if (parser.host === "") {
            var newProtocolAndHost = window.location.protocol + "//" + window.location.host;
            if (url.charAt(1) === "/") {
                parser.href = newProtocolAndHost + url;
            } else {
                var currentFolder = ("/"+parser.pathname).match(/.*\//)[0];
                parser.href = newProtocolAndHost + currentFolder + url;
            }
        }
        var properties = ['host', 'hostname', 'hash', 'href', 'port', 'protocol', 'search'];
        for (var i = 0, n = properties.length; i < n; i++) {
          this[properties[i]] = parser[properties[i]];
        }
        this.pathname = (parser.pathname.charAt(0) !== "/" ? "/" : "") + parser.pathname;
    }
    
    function changeLanguage(code,mode) {
        var sid = (typeof SID == 'undefined') ? property.SID : SID,
            type = '';
        if(typeof mode == 'undefined') {
            type = (property.LOAD == 'RENDER') ? 'render' : 'publish';
        } else type = 'config';

        $.post('/language/' + code, { sid : sid, type : type }, function(data) { 
            if(typeof mode == 'undefined') {
                if(property.LOAD == 'RENDER') location.href='/render';
                else location.href = '/';
            } else location.href = '/'+CONFIG_URL+'config';
        },'json');
    }
    

    $(document).on('click','.bizcommpop-open', function(e) {
        var url = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=1148687877";
        window.open(url, "bizCommPop", "width=750, height=700;");
    });


    function setMadeWithCreatorlink() {
        var host = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE,
            go_to_link = (host.indexOf('gabia') > -1) ? "http://creatorlink-gabia.com" : "http://creatorlink.net?utm_source=FreeSite&utm_medium=banner&utm_campaign=powered_by_Creatorlink&utm_term=sitebanner&utm_content=free",
            go_to_txt = (host.indexOf('gabia') > -1) ? $.lang[LANG]['footer.made-mark.description.gabia'] : $.lang[LANG]['footer.made-mark.description'],
            made_txt = $.lang[LANG]['footer.made-mark.description.title'];

        if($('.dsgn-body').find('.made-with-creatorlink').length > 0) {
            $('.dsgn-body').find('.made-with-creatorlink').show().attr('style','display: block!important');
        } else {
            var str = "\
                    <div class='made-with-creatorlink' alt='" + made_txt + "' title='" + made_txt + "'>\
                        <button class='made-with-creatorlink-close' onclick='hideMadeWithCreatorlink();'><img src='https://storage.googleapis.com/i.addblock.net/icon/icon_made_it_with_creatorlink_close.png' alt='made it width Creatorlink closed' /></button>\
                        <p>\
                            <a class='made-creatorlink-link' href='" + go_to_link + "' target='_blank'>\
                                <img src='https://storage.googleapis.com/i.addblock.net/icon/icon_made_it_with_creatorlink_logo.png' alt='made it width Creatorlink' class='img-responsive icon-logo'>\
                                <span>" + go_to_txt + "</span>\
                            </a>\
                        </p>\
                    </div>\
            ";
            $('.dsgn-body').append(str);
        }
    }

    function siteNotice(menu) {
        var location = window.location.href,
            upgrade_url = (location.indexOf('gabia') > -1) ? 'https://www.gabia.com/mygabia/service" target="_blank' : ((menu=='shopping') ? '/shoppingevent' : '/upgrade/site/'),
            service = (location.indexOf('gabia') > -1) ? 'GA' : 'CR';
            gaiaText = (service=='GA') ? '.2' : '',
            menu = (service=='GA') ? 'gabia' : menu,
            menu = (service=='GA' && menu=='language') ? 'language.gabia' : menu,
            btnstr = (menu=='sitelimit') ? '<div class="btn-box btn-closeOnly">\
                                                <button type="button" class="btn btn-default btn-sm close-button-dialog" data-dismiss="modal">'+$.lang[LANG]['config.close']+'</button>\
                                            </div>\
                                            ' : '<div class="btn-box">\
                                                    <a href="'+upgrade_url+'" id="upgrade-usemember-link">\
                                                    <svg viewBox="0 0 18 18" width="18" height="18"><polygon points="9 0 1 8 5 8 5 11 13 11 13 8 17 8 "/><rect x="5" y="13" width="8" height="2"/><rect x="5" y="17" width="8" height="1"/></svg>'+$.lang[LANG]['dashbord.toolbar.upgrade-site']+'</a>\
                                                    <button type="button" class="btn btn-default btn-sm close-button-dialog" data-dismiss="modal">'+$.lang[LANG]['config.close']+'</button>\
                                                </div>\
                    ',
            str = '\
                <div class="site-upgrade-notice">\
                    <p>\
                        <span class="text-centermodal">'+$.lang[LANG]['dashbord.detail.usemember.upgrade.'+menu]+'</span>\
                    </p>' + btnstr +                   
                '</div>\
                ';
        
        $(this).showModalFlat($.lang[LANG]['dashbord.detail.usemember.modal.title.'+menu], str,false,false,'','','','cl-cmmodal cl-s-btn w560 cl-p130 cl-p0','','','',function(){
            if(menu=='metaDetail' || menu=='metaPlus')               
                $('.modal.modal-default.fade.in').css('zIndex','');
        });
    }

    function hideMadeWithCreatorlink() {
        $('.goto-top').removeClass('moved');
        $('#cl-music-player-icon').removeClass('moved');
        $('.made-with-creatorlink').hide();
    }

    /*180822 delete - powered by Creatorlink 
    var setFooterLink = function() {
        var host = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE;
        if(host.indexOf('gabia') > -1) {
            $('.creatorlink-footer').find('a').attr('href','https://creatorlink.gabia.com').find('b').text('Creatorlink-Gabia.com');
        }
    }

    var setFooterCretorlinkBox = function() {
        if($('.el-footer').find('.creatorlink-footer').length == 0 ) {
            var host = (typeof SERVICE == 'undefined') ? property.SERVICE : SERVICE;

            if(host.indexOf('gabia') > -1) {
                var str = "\
                    <div class='creatorlink-footer'>\
                        <a href='http://creatorlink-gabia.com' target='_blank'><span>powered by <b>Creatorlink-Gabia.com</b></span></a>\
                    </div>\
                ";
            } else {
                var str = "\
                    <div class='creatorlink-footer'>\
                        <a href='http://creatorlink.net' target='_blank'><span>powered by <b>Creatorlink.net</b></span></a>\
                    </div>\
                ";
            }

            $('.el-footer').find('*[data-edit="true"]').first().closest('.row').append(str);

            // color 
            // var $footer_text = $('.el-footer').find('*[data-edit="true"]').first(),
            //     fcolor = ($footer_text.find('span').length == 0) ? $footer_text.css('color') : $footer_text.find("span[style*='color']").first().css('color'),
            //     fbgcolor = ($('.el-footer').css('background-color') == 'rgba(0, 0, 0, 0)' ) ? $('.dsgn-body').css('background-color') : $('.el-footer').css('background-color');
            // if(fbgcolor == 'rgba(0, 0, 0, 0)') {
            //     fbgcolor = '#ffffff';
            //     fcolor= '#000000';
            // }
            // var fdefaultcss = 'background-color:'+fbgcolor+';color:'+fcolor+';border-color:'+fcolor+';white-space:nowrap;';
            // $('.el-footer').find('.creatorlink-footer').first().find('span').attr("style",fdefaultcss);
            var fdefaultcss = 'background-color:#fff;color:#666;border-color:#000;white-space:nowrap;';
            $('.el-footer').find('.creatorlink-footer').first().find('span').attr("style",fdefaultcss);
        }
    }
    */

    function sites(s) {
        return $.ajax({
            url : '/template/publishSites',
            data : { sid : s },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbSite(s,onoff) {
        return $.ajax({
            url : '/template/publish1',
            data : { sid : s, onoff : onoff },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbGallery(s,onoff,count,p,sCount, i) {
        return $.ajax({
            url : '/template/publish2',
            data : { sid : s, count : count, p : p + 1, onoff : onoff, sCount : sCount, i : i },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function pbPages(s,onoff,count,p,sCount, i) {
        return $.ajax({
            url : '/template/publish3',
            data : { sid : s, count : count, p : p + 1, onoff : onoff, sCount : sCount, i : i },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                // console.log(data);
            }
        });
    }

    function clearData(type,s,onoff,count,p) {
        return $.ajax({
            url : '/template/clear',
            data : { type : type, sid : s, count : count, p : p + 1, onoff : onoff },
            type : 'POST',
            dataType : 'json',
            async : true,
            cashe : false,
            success : function(data) {
                console.log(data);
            }
        });
    }

    function user_location() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var ip = this.responseText,
                    sid = (typeof property.SID) ? property.SID : "",
                    refer = (typeof property.VIREFER) ? property.VIREFER : "";
                if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip) && sid) {
                    $.post('/template/visitor/' + sid, { ip : ip, refer :  refer }, function(r) { 
                        // console.log(r);
                    }, 'json');
                }
            }
        };
        xhttp.open("GET", "//api.ipify.org", true);
        xhttp.send();
    }

    function getProgressWidth() {
        var $p = $('.progress-bar');
        return $p.width() / $p.parent().width() * 100;
    }

    var checkError = function(data) {
        if(typeof data.error != "undefined" && data.error) {
            // alert(data.error);
            if(data.error=="No user data") {
                internalLink = true;
                // location.replace('/member/login');
                if(CONFIG_URL) location.replace('/_admin');
                setTimeout(function() {
                    hideAllModal(); 
                    var modal = $(this).showModalFlat('<img src="https://storage.googleapis.com/i.addblock.net/modal-logo-dark.png" alt="creaotrlink logo"/>', loginForm(), true, true, function() {
                    }, 'cancel', 'w450');
                    $('.flat-modal .modal-footer').hide();
                    $('.modal-default[id*=flat-modal] .modal-dialog .modal-body').css('margin','55px 45px 35px');
                    $('.modal-default[id*=flat-modal]').css('z-index','1041');
                    $('.flat-modal').next('.modal-backdrop').css('z-index','1040');
                },500);
            } else {
                $.processOFF();
                alert(data.error);
            }
            return false;
        } else {
            internalLink = false;
            return true;
        }
    }

    $(document).on('keyup','input[numberOnly]', function(e) {
        $(this).val(addCommas($(this).val().replace(/[^0-9.]/g,"")));
    });

    function addCommas(x) {
        // var arr,int,dec;
        // str += '';
        // arr = str.split('.');
        // int = arr[0] + '';
        // dec = arr.length>1?'.'+arr[1]:'';
        // return int.replace(/(\d)(?=(\d{3})+$)/g,"$1,") + dec;        
        if(x.length > 0 && x.indexOf('.') > -1) return x;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
     
    function removeCommas(x) {
        if(!x || x.length == 0) return "";
        else return x.split(",").join("");
    }

    function formTranslate(l) {
        if(l != 'ko') {
            $('select[form-type="select"] option:selected').text('Select');
        }
    }

    function changeFavicon(src) {
        document.head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link'),
            oldLink = document.getElementById('dynamic-favicon');

        link.id = 'dynamic-favicon';
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = src;
        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    }

    function occurrences(string, subString, allowOverlapping) {
        string += "";
        subString += "";
        if (subString.length <= 0) return (string.length + 1);

        var n = 0,
            pos = 0,
            step = allowOverlapping ? 1 : subString.length;

        while (true) {
            pos = string.indexOf(subString, pos);
            if (pos >= 0) {
                ++n;
                pos += step;
            } else break;
        }
        return n;
    }

    function errorTag(tag) {
        var divStart = occurrences(tag,'<div',false),
            divEnd = occurrences(tag,'</div>',false);

        if(divStart!=divEnd) return true;
        return false;
    }

    function checkBase64Encode(str) {
        var regExp = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        return (str.length % 4 == 0) && regExp.test(str);
    }

    function number_format(val) {
       return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function checkTemplateSite(sid) {
        if(!sid) return false;

        var templates = ["simensis", "euryzona", "leopardus", "gryphus", "rubicola", "wintoni", "iliensis", "javan", "acinonyx", "ochotona", "tayra", "fennec", "beluga", "itatsi", "pennantii", "luscinius", "kidogo", "rourei", "graysoni", "pagensis", "lilliae", "inscinius", "diazi", "gerpi", "lutreola", "walie", "gambieri", "saola", "waldeni", "indri", "jefferyi"],
            is_templates = ($.inArray(sid.toLowerCase(), templates) > -1) ?  true : false;

        return is_templates;
    }

    jQuery.fn.serializeObject = function() {
        var obj = null;
        try {
            if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
                var arr = this.serializeArray();
                if (arr) {
                    obj = {};
                    jQuery.each(arr, function() {
                        obj[this.name] = this.value;
                    });
                }//if ( arr ) {
            }
        } catch (e) {
            alert(e.message);
        } finally {
        }
        return obj;
    }

    function errorCss(css) {
        css = css.replace("::",":");
        var cssStart = occurrences(css,'{',false),
            cssEnd = occurrences(css,'}',false),
            pStart = occurrences(css,':',false),
            pEnd = occurrences(css,';',false),
            min  = occurrences(css,'(min-width',false),
            min2 = occurrences(css,'( min-width',false),
            max  = occurrences(css,'(max-width',false),
            max2 = occurrences(css,'( max-width',false),
            hover = occurrences(css,':hover',false),
            active = occurrences(css,':active',false),
            focus = occurrences(css,':focus',false),
            before = occurrences(css,':before',false),
            after = occurrences(css,':after',false),
            empty = occurrences(css,':empty',false),
            not = occurrences(css,':not',false),
            checked = occurrences(css,':checked',false),
            first = occurrences(css,':first-child',false);
            last = occurrences(css,':last-child',false);
            first_letter = occurrences(css,':first-letter',false),
            first_line = occurrences(css,':first-line',false),
            first_of_type = occurrences(css,':first-of-type',false),
            nth = occurrences(css,':nth',false),
            nth_even = occurrences(css,':nth-child(even)',true),
            nth_odd = occurrences(css,':nth-child(odd)',true),
            holder1 = occurrences(css,':-webkit-input-placeholder',false),
            holder2 = occurrences(css,':-moz-placeholder',false),
            holder3 = occurrences(css,':-ms-input-placeholder',false),
            media_controls = occurrences(css,':-webkit-media-controls',false),
            select_icon = occurrences(css,':-ms-expand',false),
            scrollbar1 = occurrences(css,':-webkit-scrollbar',false),
            scrollbar2 = occurrences(css,':-webkit-scrollbar-track',false),
            scrollbar3 = occurrences(css,':-webkit-scrollbar-thumbr',false),
            https = occurrences(css,'https:',false),
            http = occurrences(css,'http:',false);

        if(rt_admin == "admin") {
            console.log('{', cssStart);
            console.log('}', cssEnd);
            console.log(':', pStart);
            console.log(';', pEnd);
            console.log('media css', (min + min2 + max + max2));
            console.log('hover', hover);
            console.log('active', active);
            console.log('focus', focus);
            console.log('before', before);
            console.log('after', after);
            console.log('empty', empty);
            console.log('not', not);
            console.log('checked', checked);
            console.log('first-child', first);
            console.log('last-child', last);
            console.log('first-letter', first_letter);
            console.log('first-line', first_line);
            console.log('first-of-type', first_of_type);
            console.log('nth', nth);
            console.log('nth-even', nth_even);
            console.log('nth-odd', nth_odd);
            console.log('holder', (holder1 + holder2 + holder3));
            console.log('video-controls(::-webkit-media-controls)', media_controls);
            console.log('select-icon(::-ms-expand)', select_icon);
            console.log('scrollbar', scrollbar1);
            console.log('scrollbar-track', scrollbar2);
            console.log('scrollbar-thumb', scrollbar3);
            console.log('https:', https);
            console.log('http:', http);
        }
        if(cssStart!=cssEnd) return true;
        if(pStart!=(pEnd + min + min2 + max + max2 + hover + active + focus + before + after + empty + not + checked + first + last + first_letter + first_line + first_of_type + nth + holder1 + holder2 + holder3 + media_controls + select_icon + scrollbar1 + scrollbar2 + scrollbar3 + https + http)) return true;
        return false;
    }

    if(typeof(MD5_JS)=='undefined'){
        var MD5_JS=true;var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz));}function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz));}function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz));}function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data));}function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data));}function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data));}function core_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return Array(a,b,c,d);}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function core_hmac_md5(key,data){var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128);}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function str2binl(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin;}function binl2str(bin){var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str;}function binl2hex(binarray){var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);return str;}function binl2b64(binarray){var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3){var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++){if(i*8+j*6>binarray.length*32)str+=b64pad;else
str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}return str;}}
    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3}}return string}}

    $('.newcheckbox').live('click', function() {
        var checkCollection = $(this).parents('.collection-item').length;
        if(checkCollection < 1) {
            if($(this).hasClass('disabled')) {
                return false;
            }
        }        
    });


    var setPanelTranslate = function(obj) {
        $.each(obj.find('[data-title]'), function(i,v) {
            var el_title = $(this).attr('data-title'),
                lang_check = /[ㄱ-ㅎㅏ-ㅣ가-힣]/,
                el_title_lang = (lang_check.test(el_title)) ? 'ko' : 'en',
                arr = $.lang[el_title_lang];
            if($(this).parent().hasClass('gallery-item')) return true;
            key = getKeyByValue(arr,el_title);

            if(key && el_title_lang != LANG) $(this).attr('data-title',$.lang[LANG][key]);
        });
    }

    var cutStrInBytes = function(str, limit) {
        var size = 0;
        for(var i=0; i<str.length; i++) {
            size += (str.charCodeAt(i) > 128) ? 2 : 1;
            if(size > limit) return str.substring(0,i) + '...';
        }
        return str;
    }

    var refreshGalleryField = function(elObj,elsettings) {
        if( typeof elsettings == 'undefined' ||
            $.isEmptyObject(elsettings) ||
            typeof elsettings.field_disable == 'undefined' ||
            $.isEmptyObject(elsettings.field_disable)
        ) {
            return false;
        }

        var el_mode = elObj.attr('data-mode'),
            checkGalleryField = (elObj.find('h5.figure').eq(0).hasClass('title')) ? true : false;
        if(!checkGalleryField) return false;

        var gfield_disable = (typeof elsettings.field_disable != 'undefined' && !$.isEmptyObject(elsettings.field_disable)) ? elsettings.field_disable : [],
            gfield_listSet = (typeof el_mode != 'undefined' && el_mode == 'shopping') ? ['title','caption','price','review_cnt','review_score'] : ['title', 'caption'];

        $.each(gfield_listSet, function(g_i,g_v) {
            var onoff = ($.inArray(g_v,gfield_disable) > -1) ? false : true,
                checkReviewField = (g_v.match(/^review_/gi) !== null) ? true : false;
            if(checkReviewField) {
                elObj.find('.figure.review').attr('data-'+g_v,onoff);
            } else {
                if(onoff) elObj.find('.figure.'+g_v).each(function() { $(this).removeAttr('style'); $(this).removeClass('hide'); });
                else elObj.find('.figure.'+g_v).each(function() { $(this).addClass('hide'); });
            }
        });
    }

    var refreshGalleryHeight = function(el) {
        if(el == 'el-menu' || el == 'el-footer') return false;

        var g_block = (typeof el != 'undefined' && el) ? '.'+el : '',
            g_block_selector = (typeof el != 'undefined' && el == 'el_display') ? '#element-display' : '.element[data-type="gallery"]'+g_block;

        $(g_block_selector).each(function() {
            if($(this).find('.empty-txt').length > 0 || $(this).find('.grid').length == 0) return;

            var gsort = $(this).find('.goption').attr('data-gsort'),
                gh = $(this).find('.goption').attr('data-gh');
            if(typeof gh == 'undefined' || gh == 'auto') { return; }
            if(typeof gsort != 'undefined' && gsort == 'm') {
                $(this).find('.grid .g-img').removeClass('style');
                return;
            }

            var gel = $(this).find('.grid').eq(0),
                // gw = parseFloat(gel.css('width').replace(/[^0-9]/g,'')),
                gw = parseFloat(gel[0].getBoundingClientRect().width),
                gpl = parseFloat(gel.css('padding-left').replace(/[^0-9]/g,'')),
                gpr = parseFloat(gel.css('padding-right').replace(/[^0-9]/g,'')),
                g_img_height = (gw - (gpl+gpr)) * parseFloat(gh);
                
            $(this).find('.grid .g-img').css('height',g_img_height + 'px');
        });
    }






}
