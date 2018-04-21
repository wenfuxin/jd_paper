$(function() {
	$(".header").load("footer.html");
	var $tab = $(".login-tab").children();
	$tab.click(function() {
		$(this).addClass("login-a").siblings().removeClass("login-a");
		if($(this).index() == 0) {
			$(".login-input").css("display", "none");
			$(".login-tab1").css("display", "block");
		}
		if($(this).index() == 1) {
			$(".login-input").css("display", "block");
			$(".login-tab1").css("display", "none");
		}
	});
	$(".login-img").mousemove(function() {
		$(this).stop().animate({
			"left": 20
		}, 100).next().show(300);
	}).mouseout(function() {
		$(this).stop().animate({
			"left": 80
		}, 100).next().hide();
	});
	$("#login-btn").click(function() {	
		$.post("http://h6.duchengjiu.top/shop/api_user.php", {
			"status": "login",
			"username": $("#name").val(),
			"password": $("#word").val()
		}, function(data) {
			var ts = data.message;
			$("#ts").show(500).html(ts);
			if(ts === "登录成功") {
				setTimeout(function() {
					location.href = "index1.html"
				}, 2000);
			}
		});
	});
});