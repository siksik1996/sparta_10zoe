let url = 'http://localhost:8080/musics/';

let titles = document.querySelectorAll('.song-title');
let artists = document.querySelectorAll('.artist-name');

let realTime = document.querySelector('.real-time');
realTime.innerHTML = new Date().toLocaleTimeString();

fetch(url)
	.then((res) => res.json())
	.then((result) => {
		for (let i = 0; i < titles.length; i++) {
			titles[i].innerHTML = result[i].title;
			artists[i].innerHTML = result[i].artist;
		}
	});
