import $ from "jquery";
$.ajax({
	url:
		"http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=hokuto&api_key=29fa1439db0295d74ff77b07317b07b8&format=json&period=3month",
	type: "GET",
	dataType: "json"
})
	.done(data => {
		$.each(data.topartists.artist, (index, val) => {
			console.log(val.image[4]["#text"]);
			$(".artist").append(`
<li class="artist__item">
	<img src="${val.image[3]["#text"]}" alt="">
	<p>日本語テスト。</p>
</li>
`)
		});
	})
	.fail(() => {
		console.log("error");
	})
	.always(() => {
		console.log("complete");
	});
