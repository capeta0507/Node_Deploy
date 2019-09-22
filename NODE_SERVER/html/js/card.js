const data = [
    {
        name: 'Mclaren Mercedes',
        img: 'Mercedes-Benz-McLaren-MP4-15-14.jpg',
        title: 'MP4-15'
    },
    {
        name: 'Mika Hakkinen',
        img: 'mika-hakkinen.jpg',
        title: 'Lotus -> Mclaren'
    },
    {
        name: 'David Coulthard',
        img: 'david-coulthard-portrait.jpg',
        title: 'Williams -> Mclaren -> Red Bull'
    }
]

let card = '';

for (let x = 0; x<data.length; x++){
    card += '<div class="col-md-4 col-12">';
    card += '<div class="card mb-3">';
    card += '<h3 class="card-header">' + data[x].name + '</h3>';
    card += '<img class="cardImg" src="./img/' + data[x].img + '" alt="' + data[x].name + '">';
    card += '<div class="card-body">';
    card += '<p class="card-text">' + data[x].title + '</p>';
    card += '</div></div></div>';
}

document.getElementById('myCard').innerHTML = card