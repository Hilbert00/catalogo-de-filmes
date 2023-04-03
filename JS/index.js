const inputBucarFilme = document.querySelector("#input-buscar-filme");
const btnBucarFilme = document.querySelector("#btn-buscar-filme");
const listaFilmes = document.querySelector("#lista-filmes");
const filmeDetalhes = document.querySelector("#mostrar-filme");
const detalhesCard = document.querySelector("#mostrar-filme #detalhes");
const btnFecharFilme = document.querySelector("#movie-close");
const btnFavoritarFilme = document.querySelector("#movie-favorite");
const btnFavoritos = document.querySelector("#btn-favorites");
const btnEditarFavoritos = document.querySelector("#btn-edit")

let favoritos = window.localStorage.getItem("favorites") ? JSON.parse(window.localStorage.getItem("favorites")) : null;

async function listarFilmes(filmes) {
    listaFilmes.innerHTML = "";

    if (filmes.length > 0) {
        filmes.forEach(async (e) => {
            listaFilmes.appendChild(await e.getCard());
        });
    }
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
        .then((filme) => filme.showDetails());
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

    favoritos = JSON.parse(window.localStorage.getItem("favorites"));
});

btnFavoritos.addEventListener("click", () => {
    if (favoritos !== null) {
        const favoritosFormatados = favoritos.map((e) => {
            return new Filme(e.id, e.titulo, e.ano, e.genero, e.duracao, e.sinopse, e.cartaz, e.direcao, e.elenco, e.classificacao, e.avaliacao);
        })

        listarFilmes(favoritosFormatados);
    }
})
