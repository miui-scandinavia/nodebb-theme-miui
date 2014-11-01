<div class="panel panel-primary">
		<div class="panel-heading">Nyheter</div>
		<div class="panel-body">
			<div id="topic-list"></div>
		</div>
</div>

<script>
$(function(){
	$.getJSON(RELATIVE_PATH + '/api/category/1/miui-xiaomi-nyheter', function(data){

		var months = [
			"Januar",
			"Februar",
			"Mars",
			"April",
			"Mai",
			"Juni",
			"Juli",
			"August",
			"September",
			"Oktober",
			"November",
			"Desember"
		];

		var html = '<div class="row">';

		data.topics.forEach(function(topic){
			if (!topic.deleted) {
				var date = new Date(parseInt(topic.timestamp, 10));
				var currentDate = date.getDate();
				var currentMonth = date.getMonth();
				var currentYear = date.getFullYear();

				html += '<div class="col-xs-3">';
				html += '' + currentDate + ' ' + months[currentMonth] + ' ' + currentYear + '';
				html += '</div>';
				html += '<div class="col-xs-9">';
				html += '<a href="/topic/' + topic.slug + '">' + topic.title + '</a>';
				html += '</div>';


			}
		});

		html += '</div>';

		$('#topic-list').html(html);
	});
})
</script>
