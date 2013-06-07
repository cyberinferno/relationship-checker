String.prototype.replaceAt = function(index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}

$('#checker-form').submit( function () {
	checkStatus();
	return false;
});

function checkStatus() {
	$('#result-div').html('');
	var n1 = $.trim($('#n1').val());
	n1 = n1.replace(/[^A-Za-z0-9]/g,'');
	var n2 = $.trim($('#n2').val());
	n2 = n2.replace(/[^A-Za-z0-9]/g,'');
	if(n1 == '' || n2 == '')
		show_failure("Please enter both the names!");
	else if(n1 == n2)
		show_failure("Please enter two different names!");
	else {
		show_success("Please wait while we check...");
		var longer, shorter, l, s;
		var n1l = n1.length, n2l = n2.length;
		if(n1l > n2l) {
			longer = n1l;
			l = n1;
			shorter = n2l;
			s = n2;
		}
		else {
			longer = n2l;
			l = n2;
			shorter = n1l;
			s = n1;
		}
		for(var i = 0; i < longer; i++) {
			for(var j = 0; j < shorter; j++) {
				if(l.charAt(i) == s.charAt(j)) {
					l = l.replaceAt(i, '$');
					s = s.replaceAt(j, '$');
				}
			}
		}
		var t = l + s;
		t = remove_letters(t, '$');
		console.log("End string is " + t);
		var key = t.length
		var rstr = "flames";
		for(var k = 1; k <= 5; k++ )
			rstr = remake_string(rstr, key);
		var status;
		switch(rstr) {
			case 'f':
				status = "FRIENDS";
				break;
			case 'l':
				status = "LOVERS";
				break;
			case 'a':
				status = "ADORABLE COUPLE";
				break;
			case 'm':
				status = "MARRIED";
				break;
			case 'e':
				status = "ENEMIES";
				break;
			case 's':
				status = "SIBLINGS";
				break;
		}
		console.log(status);
		var content = "<b>" + n1 + "</b> and <b>" + n2 + "</b> are " + status;
		$('#errordiv').fadeOut('fast');
		$('#result-div').html(content);
		$('#result-div').show();
	}
}

function remove_letters(str, ltr) {
	var nstr = '';
	for(var i = 0; i < str.length; i++) {
		if(str.charAt(i) != ltr)
			nstr += str.charAt(i);
	}
	return nstr;
}

function remake_string(str, pos) {
	var nstr = '';
	while(pos != str.length && pos > str.length)
		pos = pos - str.length;
	if(pos == str.length) {
		for(var i = 0; i < str.length - 1; i++)
			nstr += str.charAt(i);
	}
	else {
		for(var i = pos; i < str.length; i++)
			nstr += str.charAt(i);
		for(var i = 0; i < pos - 1; i++)
			nstr += str.charAt(i);
	}
	return nstr;
}

function show_success(str) {
    $('#errordiv').removeClass('alert-error alert-success');
    $('#errordiv').addClass('alert-success');
    $('#error-msg').html(str);
    $('#errordiv').fadeIn("slow");
}

function show_failure(str) {
    $('#errordiv').removeClass('alert-error alert-success');
    $('#errordiv').addClass('alert-error');
    $('#error-msg').html(str);
    $('#errordiv').fadeIn("slow");
}