if (typeof(KCAPTCHA_JS) == 'undefined') {
    if (typeof rt_path == 'undefined')
        alert('rt_path 변수가 선언되지 않았습니다.');

    var KCAPTCHA_JS = true,
		md5_norobot_key = '';

	$(document).ready(function() {
	    $('#kcaptcha').live('click', load_kcaptcha);
		if (typeof $.validator != 'undefined') {
			$.validator.addMethod('wrKey', function(value, element) {
				return this.optional(element) || hex_md5(value) == md5_norobot_key;
			});
		}
	});
}
