let baseUrl = 'http://0d86-59-13-68-52.ngrok-free.app';

let titles = document.querySelectorAll('.song-title');
let artists = document.querySelectorAll('.artist-name');

// let realTime = document.querySelector('.real-time');
// realTime.innerHTML = new Date().toLocaleTimeString();
// 현재 시각 표시
function updateClock() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const day = String(now.getDate()).padStart(2, '0');
	const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][now.getDay()];
	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');

	const dateStr = `${year}.${month}.${day}(${dayOfWeek})`;
	const timeStr = `${hours}:${minutes}:${seconds}`;

	document.getElementById('date').textContent = dateStr;
	document.getElementById('time').textContent = timeStr;
}

// 매 초마다 시간 업데이트
setInterval(updateClock, 1000);

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
