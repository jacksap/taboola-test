const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.list.forEach(advertisement => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = advertisement.description;
      const img = document.createElement('img');
      img.setAttribute("src", advertisement.thumbnail[0].url);

    //   const p = document.createElement('p');
    //   advertisement.description = advertisement.description.substring(0, 300);
    //   p.textContent = `${advertisement.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(img);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Page Error, Refresh`;
    app.appendChild(errorMessage);
  }
}

request.send();