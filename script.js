const track = document.getElementById('image-track');
const quotes = document.getElementById('quotes');
const quotesContent = quotes.querySelector("#quotes .content");
const quotesClose = quotes.querySelector("#quotes .close");
const body = document.querySelector('body');
let desktopOrientation = "landscape";

document.addEventListener('wheel', showImage);
quotesClose.addEventListener('click', showImage);
track.addEventListener('click', imageClick);

if (window.innerWidth <= 720) {
  document.body.style.backgroundColor = 'lightblue';
  desktopOrientation = "portrait";
}

track.addEventListener('wheel', function(event){
  let deltaY = event.deltaY;
  track.scrollLeft += deltaY;
  // event.preventDefault();
});

function showImage(){
  track.style.display = "flex";
  quotes.style.display = 'none';
  setTimeout(function(){
    track.style.opacity = "1";
    track.style.transform = 'scale(100%, 100%)';
  }, 100)
}

function imageClick(){
  setTimeout(() => {
    let images = document.getElementsByClassName('image');
    for(let i = 0; i <= images.length -1; i++){
      let img = images[i];
      img.addEventListener('click', () => {
        body.style.backgroundImage = `url('${img.src}')`;
        track.style.transform = 'scale(50%, 50%)';
        track.style.opacity = "0";
          setTimeout(function() {
            track.style.display = 'none';
          }, 1000);
      })
    }
    showQuotes();
  }, 2000);
}

function addIdImage(imageID) {
  let data = JSON.parse(localStorage.getItem('data')) || [];
  if(data.indexOf(imageID) !== -1){
    return
  }
  data.push(imageID);
  localStorage.setItem('data', JSON.stringify(data));
  let resultArray = JSON.parse(localStorage.getItem('data'));
  return
}
function showQuotes(){
  quotes.style.display = 'block';
  var category = 'happiness';
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
      headers: { 'X-Api-Key': 'R9qWQ9/EGZgYhazk/Cr8ng==yyDt3QVBd9t5MLmv'},
      contentType: 'application/json',
      success: function(result) {
        let myQuotes= result[0]['quote'];
        quotesContent.innerHTML = myQuotes;
        console.log(myQuotes);
      },
      error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
      }
  });
}

$.ajax({
  method: 'GET',
  url: `https://api.unsplash.com/photos/random/?orientation=${desktopOrientation}&count=20`,
  headers: { 'Authorization': 'Client-ID xAgCHAqL90zYj3Y0d-tJO06ZWLs9Ta9oWYWc5r51FoE'},
  contentType: 'application/json',
  success: function(result) {
    let myPics= result;
    for(const i in myPics){
      const nama = myPics[i]['slug'];
      const link = myPics[i]['urls']['regular'];
      const img = `<img class='image' src='${link}' draggable='false' />`;
      addIdImage(link);
      track.insertAdjacentHTML('beforeend', img);
    }
  },
  error: function ajaxError(jqXHR) {
    console.error('Error: ', jqXHR.responseText);
    if(jqXHR.responseText == "Rate Limit Exceeded"){
      // alert("Request Over");
      let localImg = JSON.parse(localStorage.getItem('data'));
      for(a of localImg){
        const img = `<img class='image' src='${a}' draggable='false' />`;
        track.insertAdjacentHTML('beforeend', img);
      }
    }
  }
});


// window.addEventListener('scroll', () => {
//   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//     document.querySelector("#navbar").style.padding = "15px 10px";
//     document.querySelector("#navbar .container h1").style.fontSize = "25px";
//   } else {
//     document.querySelector("#navbar").style.padding = "30px 10px";
//     document.querySelector("#navbar .container h1").style.fontSize = "35px";
//   }
// })