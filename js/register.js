$(function() {
	var b = $("b");
	var li = $("#ul li");
	$("input").eq(0).blur(function() {
		var str = $(this).val();
		if(/^[a-zA-Z0-9]{6,20}$/.test(str)) {
			b.eq(0).html("用户名可用").css({
				"color": "#666"
			});
			$(this).next().next().next().show(500);
		} else {
			b.eq(0).html("支持字母、数字、的组合，6-20个字符").css({
				"color": "red"
			});
			$(this).next().next().next().hide();
			$(this).val("");
		}
	});
	$("input").eq(1).blur(function() {
		var str = $(this).val();
		if(/^[a-zA-Z]\w{5,18}$/.test(str)) {
			b.eq(1).html("字母开头包含字符、数字和下划线、长度在6-20之间").css({
				"color": "#333"
			});
			$(this).next().next().next().show(500);
		} else {
			b.eq(1).html("字母开头包含字符、数字和下划线、长度在6-20之间").css({
				"color": "red"
			});
			$(this).next().next().next().hide();
			li.eq(2).css({
				"background": "#ccc"
			});
			$(this).val("")
		}
		if(str.length > 5 && str.length <= 10) {
			li.eq(0).css({
				"background": "red"
			});
			li.eq(1).css({
				"background": "#ccc"
			});
			li.eq(2).css({
				"background": "#ccc"
			});
		}
		if(str.length > 10 && str.length <= 14) {
			li.eq(0).css({
				"background": "#ccc"
			});
			li.eq(1).css({
				"background": "red"
			});
			li.eq(2).css({
				"background": "#ccc"
			});
		}
		if(str.length > 14 && str.length < 20) {
			li.eq(0).css({
				"background": "#ccc"
			});
			li.eq(1).css({
				"background": "#ccc"
			});
			li.eq(2).css({
				"background": "red"
			});
		}
	});

	$("input").eq(2).blur(function() {
		var str = $(this).val();
		var str1 = $("input").eq(1).val();
		if(str == str1) {
			$(this).next().next().next().show(500);
			b.eq(2).css({
				"color": "#666"
			});
		} else {
			b.eq(2).css({
				"color": "red"
			}).html("两次密码不一致");
			$(this).next().next().next().hide();
			$(this).val("");
		}
	})

	$("input").eq(3).blur(function() {
		var str = $(this).val();
		if(/^1[3|4|5|8][0-9]\d{8}$/.test(str)) {
			$(this).next().next().next().show(500);
			b.eq(3).css({
				"color": "#ccc"
			});
		} else {
			b.eq(3).css({
				"color": "red"
			});
			$(this).next().next().next().hide();
			$(this).val("");
		}
	});
//验证随机码
	function auth1Code() {
		var str = '';
		for(var i = 0; i < 4; i++) {
			var num = parseInt(48 + Math.random() * (122 - 47));

			if(num >= 58 && num <= 64 || num >= 91 && num <= 96) {
				i--;
			} else {
				str += String.fromCharCode(num);
			}
		}
		return str;
	}
	var ss = auth1Code();

	function colorRandom() {
		var r = Math.floor(Math.random() * (255 + 1));
		var g = Math.floor(Math.random() * (255 + 1));
		var b = Math.floor(Math.random() * (255 + 1));
		return 'RGB(' + r + ',' + g + ',' + b + ')';
	}

	$("input").eq(5).val(ss).css({
		"color": colorRandom()
	})
	$("input").eq(4).blur(function() {
		var str = $("input").eq(4).val();
		var str1 = $("input").eq(5).val();
		var a = new RegExp(str, "ig");
		if(a.test(str1)) {
			$(this).css({
				"color": colorRandom()
			});
			b.eq(4).html("验证码输入正确，点击立即注册").css({
				"color": "#666"
			});
		} else {
			b.eq(4).css({
				"color": "red"
			}).html("验证码输入不正确，请重新输入");
			$(this).val("");
		}
	});
	$(".bten").click(function() {
		var ss = auth1Code();
		$("input").eq(5).val(ss).css({
			"color": colorRandom()
		});
	});
	$("input").eq(6).click(function() {
		if($("input").eq(0).val() != "" && $("input").eq(1).val() != "" && $("input").eq(2).val() != "" && $("input").eq(3).val() != "" && $("input").eq(4).val() != "") {
			$.post("http://h6.duchengjiu.top/shop/api_user.php", {
				"status": "register",
				"username": $("input").eq(0).val(),
				"password": $("input").eq(1).val()
			}, function(data) {
				var data = data.message;
				console.log(data)
				if(data === "注册成功") {
					$("#cg").css({
						"display": "block"
					})
					setTimeout(function() {
						location.href = "index1.html";
					}, 2000);

				}

			});
		
		}
		
	});

})