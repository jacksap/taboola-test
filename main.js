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
            const adCard = document.createElement('div');
            adCard.setAttribute('class', 'adCard');
            adCard.setAttribute("style", `background-image: url('${advertisement.thumbnail[0].url}');`);
            // adCard.setAttribute("style", `width: ${advertisement.thumbnail[0].width}; height: ${advertisement.thumbnail[0].height}`);

            const h4 = document.createElement('h4');
            h4.textContent = advertisement.name;
            const a = document.createElement('a');
            a.setAttribute("href", advertisement.url);
            a.setAttribute("target", '_blank');
            // make it open in new tab

            const p = document.createElement('p');
            advertisement.name = advertisement.branding.substring(0, 300);
            p.textContent = `${advertisement.branding}`;

            container.appendChild(adCard);
            adCard.appendChild(a);
            adCard.appendChild(h4);
            adCard.appendChild(p);
        });
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Page Error, Refresh`;
        app.appendChild(errorMessage);
    }
}

request.send();