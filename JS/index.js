const inputBucarFilme = document.querySelector("#input-buscar-filme");
const btnBucarFilme = document.querySelector("#btn-buscar-filme");
const listaFilmes = document.querySelector("#lista-filmes");
const filmeDetalhes = document.querySelector("#mostrar-filme");
const detalhesCard = document.querySelector("#mostrar-filme #detalhes");
const btnFecharFilme = document.querySelector("#movie-close");
const btnFavoritarFilme = document.querySelector("#movie-favorite");
const btnFavoritos = document.querySelector("#btn-favorites")

const favoritos = window.localStorage.getItem("favorites") ? JSON.parse(window.localStorage.getItem("favorites")) : null;
console.log(favoritos)

async function listarFilmes(filmes) {
    listaFilmes.innerHTML = "";

    if (filmes.length > 0) {
        filmes.forEach(async (e) => {
            listaFilmes.appendChild(await e.getCard());
        });
    }
}

async function showDetails(filme) {
    const poster = document.querySelector("#movie-image");
    const title = document.querySelector("#movie-title");
    const year = document.querySelector("#movie-year");
    const genre = document.querySelector("#movie-genre");
    const time = document.querySelector("#movie-time");
    const direction = document.querySelector("#movie-direction");
    const cast = document.querySelector("#movie-cast");
    const synopsis = document.querySelector("#movie-synopsis");

    const directionFormated = filme.direcao.map((e, i) => {
        const director = document.createElement("a");
        director.setAttribute("data-id", e.id);

        director.appendChild(document.createTextNode(e.nome));
        if (i + 1 !== filme.direcao.length) {
            director.appendChild(document.createTextNode(", "));
        }

        return director;
    });

    const castFormated = filme.elenco.map((e, i) => {
        const ator = document.createElement("a");
        ator.setAttribute("data-id", e.id);

        ator.appendChild(document.createTextNode(e.nome));
        if (i + 1 !== filme.elenco.length) {
            ator.appendChild(document.createTextNode(", "));
        }

        return ator;
    });

    listaFilmes.style.display = "none";
    filmeDetalhes.style.display = "flex";
    poster.setAttribute("src", filme.cartaz);
    title.innerText = filme.titulo;
    year.innerText = filme.ano;
    genre.innerText = filme.genero.join(", ");
    time.innerText = filme.duracao;
    synopsis.innerText = filme.sinopse;
    btnFavoritarFilme.setAttribute("data-object", JSON.stringify(filme));

    if (favoritos.filter((e) => e.id === filme.id).length) {
        btnFavoritarFilme.innerHTML = '<i class="bi bi-heart-fill align-self-center"></i>';
    } else {
        btnFavoritarFilme.innerHTML = '<i class="bi bi-heart align-self-center"></i>';
    }

    direction.innerHTML = "";
    direction.appendChild(document.createTextNode("Direção: "));
    directionFormated.forEach((e) => {
        direction.appendChild(e);
    });

    cast.innerHTML = "";
    cast.appendChild(document.createTextNode("Elenco: "));
    castFormated.forEach((e) => {
        cast.appendChild(e);
    });
}

async function getDetails(id) {
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=c6319160`)
        .then((res) => res.json())
        .then((result) => {
            const id = result.imdbID;
            const titulo = result.Title;
            const lancamento = result.Year;
            const genero = result.Genre.split(",").map((e) => e.trim());
            const duracao = result.Runtime;
            const sinopse = result.Plot;
            const cartaz = result.Poster;
            const direcao = result.Director.split(",").map((e, i) => new Diretor(i + 1, e.trim()));
            const elenco = result.Actors.split(",").map((e, i) => new Ator(i + 1, e.trim()));
            const idade = result.Rated;
            const avaliacoes = result.Ratings;

            return new Filme(
                id,
                titulo,
                lancamento,
                genero,
                duracao,
                sinopse,
                cartaz,
                direcao,
                elenco,
                idade,
                avaliacoes
            );
        })
        .then((final) => showDetails(final));
}

btnBucarFilme.onclick = () => {
    if (inputBucarFilme.value.length > 0) {
        fetch(`http://www.omdbapi.com/?s=${inputBucarFilme.value}&apikey=c6319160`)
            .then((res) => res.json())
            .then((result) => {
                const filmes = result.Search.map((e) => {
                    const id = e.imdbID;
                    const titulo = e.Title;
                    const lancamento = e.Year;
                    const cartaz = e.Poster;

                    return new Filme(id, titulo, lancamento, null, null, null, cartaz, null, null, null, null);
                });

                listarFilmes(filmes);
            });
    }

    return false;
};

btnFecharFilme.addEventListener("click", () => {
    filmeDetalhes.style.display = "none";
    listaFilmes.style.display = "grid";
});

btnFavoritarFilme.addEventListener("click", (e) => {
    const movieData = JSON.parse(e.currentTarget.getAttribute("data-object"));
    
    if (favoritos === null) {
        window.localStorage.setItem("favorites", JSON.stringify([movieData]));
        btnFavoritarFilme.innerHTML = '<i class="bi bi-heart-fill align-self-center"></i>';
    } else {
        if (favoritos.filter((e) => e.id === movieData.id).length) {
            const indexCopy = favoritos.indexOf(favoritos.filter((e) => e.id === movieData.id)[0]);
            btnFavoritarFilme.innerHTML = '<i class="bi bi-heart align-self-center"></i>';
            favoritos.splice(indexCopy, 1);
        } else {
            btnFavoritarFilme.innerHTML = '<i class="bi bi-heart-fill align-self-center"></i>';
            favoritos.push(movieData);
        }
        window.localStorage.setItem("favorites", JSON.stringify(favoritos));
    }
});

btnFavoritos.addEventListener("click", () => {
    if (favoritos !== null) {
        const favoritosFormatados = favoritos.map((e) => {
            return new Filme(e.id, e.titulo, e.ano, e.genero, e.duracao, e.sinopse, e.cartaz, e.direcao, e.elenco, e.classificacao, e.avaliacao);
        })
        console.log(favoritosFormatados);
        listarFilmes(favoritosFormatados);
    }
})