$(document).ready(() => {
    $('#searchbar').submit(function(e){
        var searchedmovies = $('#searchedtext').val();
        searchmovies(searchedmovies);
        e.preventDefault();
      });
    });



function searchmovies(searchedmovies){
      axios.get(' https://www.omdbapi.com/?i=tt3896198&apikey=da224dc6&s='+searchedmovies)  //returning promise
.then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let result = '';
      $.each(movies, (index, movie) => {
        result += `
          <div class="cont">
            <div class="rendermovies">
             <section id ="images"> <img src="${movie.Poster}"> </section>
              <h5>${movie.Title} ( ${movie.Year} ) </h5>
            <button  onclick="movieSelected('${movie.imdbID}')" id= ${movie.imdbID} class="btnNominate" href="#">Nominate</button>
            </div>
          </div>
        `;

      });

      $('#movies').html(result);
    })
    .catch((error) => {
      console.log("Oops! Error");
    });
}

var list =[];
function movieSelected(imdbID){

    var li = document.createElement("li");
    var ii = li.setAttribute("id",imdbID);
    var parent = document.getElementById("nom");

    axios.get(' https://www.omdbapi.com/?apikey=da224dc6&i='+imdbID)
    .then((response) => {
    let render = response.data;
    let ans = render.Title + '('+render.Year+')' + ' '+`<img class="nomimg" src="${render.Poster}">`;
    if(list.includes(ans)){
        alert("already exists");
        
    }
    else if(list.length < 5 ){
        
        list.push(ans);
        document.getElementById(imdbID).setAttribute('disabled', true);
        var i = list.indexOf(ans)
        var allBut = parent.getElementsByTagName("button");
        var deleteBut = document.createElement("button");
        deleteBut.setAttribute("id", "rembtn");
        deleteBut.innerHTML =  "Delete";
        var answer = document.getElementById('list').appendChild(li).innerHTML = ans
        deleteBut.innerHTML =  "Delete";
        document.getElementById('list').appendChild(deleteBut); 
        deleteBut.onclick = function(){
            list.splice(i,1);
            li.remove(imdbID);
            deleteBut.remove();
            document.getElementById(imdbID).removeAttribute('disabled');

        }

    }
    else{
        alert("cannot nominate more than 5");
    }
 });



}

        
