let url = 'http://localhost:8080/musics/';

let titles = document.querySelectorAll('.song-title');
let artists = document.querySelectorAll('.artist-name');

// let realTime = document.querySelector('.real-time');
// realTime.innerHTML = new Date().toLocaleTimeString();

fetch(url)
	.then((res) => res.json())
	.then((result) => {
		for (let i = 0; i < titles.length; i++) {
			titles[i].innerHTML = result[i].title;
			artists[i].innerHTML = result[i].artist;
		}
	});


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