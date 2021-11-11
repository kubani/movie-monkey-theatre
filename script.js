const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

populateUI();

function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const seatsIndex = [...selectedSeats].map((seat) => {
		return [...seats].indexOf(seat);
	});
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	count.innerText = selectedSeats.length;
	total.innerText = selectedSeats.length * ticketPrice;
}

function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
	if (selectedSeats !== null && selectedSeats.length > 0) {
		selectedSeats.forEach((seatIndex) => {
			seats[seatIndex].classList.add('selected');
		});
	}
	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
		ticketPrice = localStorage.getItem('selectedMoviePrice');
	}
}
movieSelect.addEventListener('change', (event) => {
	ticketPrice = parseInt(event.target.value);
	console.log(event.target.value);
	setMovieData(event.target.selectedIndex, event.target.value);
	updateSelectedCount();
});

container.addEventListener('click', (event) => {
	if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
		event.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

updateSelectedCount();
