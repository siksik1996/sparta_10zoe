let baseUrl = 'http://localhost:8080';

let titles = document.querySelectorAll('.song-title');
let artists = document.querySelectorAll('.artist-name');

let realTime = document.querySelector('.real-time');
realTime.innerHTML = new Date().toLocaleTimeString();

$(document).ready(function () {
	getMusics();
	getComments();
});

let getMusics = () => {
	let url = baseUrl + '/musics';

	fetch(url)
		.then((res) => res.json())
		.then((result) => {
			for (let i = 0; i < titles.length; i++) {
				titles[i].innerHTML = result[i].title;
				artists[i].innerHTML = result[i].artist;
			}
		});
};

let getComments = () => {
	let url = baseUrl + '/guestbook/comments';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			$(`.cards`).empty();
			data.forEach((row) => {
				let name = row['name'];
				let comment = row['comment'];
				let emoji = row['emoji'];

				let temp_html = `<div class="card">
																<div class="card-header">
																		날짜
																</div>
																<div class="card-body">
																		<blockquote class="blockquote mb-0">
																				<p>${comment}</p>
																				<div class="footer">
																						<footer class="blockquote-footer"><cite title="Source Title">${name}</cite></footer>
																						<p class="emoji">${emoji}</p>
																				</div>
																		</blockquote>
																</div>
														</div>`;
				$(`.cards`).append(temp_html);
			});
		});
};

let saveComment = (e) => {
	e.preventDefault();
	let url = baseUrl + '/guestbook/comments';

	let name = $('#floatingInput').val();
	let emoji = $('#inputGroupSelect01').val();
	let comment = $('#floatingTextarea').val();

	if (name == '' || comment == '') {
		alert('이름과 내용을 모두 입력해주세요');
		return;
	}

	let formData = new FormData();
	formData.append('name_give', name);
	formData.append('emoji_give', emoji);
	formData.append('comment_give', comment);

	fetch(url, { method: 'POST', body: formData })
		.then((res) => res.json())
		.then((data) => {
			alert(data['msg']);
			getComments();
		});

	$('#floatingInput').val('');
	// $('#inputGroupSelect01').val('');
	$('#floatingTextarea').val('');
};
