let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//funcionamiento para el fetch data de la api

let getMovie = () =>{
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
     //si el input esta vacio

    if(movieName.length <= 0) {
        result.innerHTML = `<h3 class ="msg">Por favor ingrese el nombre de la pelicula </h3>`
    }

    //si el input no esta vacio
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //si la pelicula existe en la base de datos
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class ="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            //si la pelicula no existe en la base de datos
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}
                </h3>`
            }
        })

             //si un error ocurre
            .catch(() => {
                result.innerHTML = `<h3 class="msg"> Error Occured
                </h3> `;
            });
    }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);