$(function(){$(".header").on("click",".bts",function(){""!==$("#bt").val()?window.location.href="list.html?"+$("#bt").val():window.location.href="list.html?"+$("#bt").attr("placeholder")}),$("#bt").bind("input property",function(){$.getJSON("https://suggest.taobao.com/sug?code=utf-8&q="+$("#bt").val()+"&callback=?",function(t){var c="";(t=t.result).forEach(function(t){c+="<li>"+t[0]+"</li>",$(".search").show().html(c)})})}),$(".search").on("mouseover","li",function(){$(this).css({background:"#ccc"}).siblings().css({background:"#fff"})}),$(".search").on("click","li",function(){var t=$(this).html();$("#bt").val(t),$(".search").css("display","none")})});