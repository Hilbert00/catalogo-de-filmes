const inputBucarFilme = document.querySelector("#input-buscar-filme");
const btnBucarFilme = document.querySelector("#btn-buscar-filme");

async function listarFilmes(filmes) {
    const listaFilmes = document.querySelector("#lista-filmes");
    listaFilmes.innerHTML = "";

    if (filmes.length > 0) {
        filmes.forEach(async (e) => {
            listaFilmes.appendChild(await e.getCard());
        });
    }
}

async function showDetails(filme) {
    const body = document.querySelector("#mostrar-filme")
    const poster = document.querySelector("#movie-image");
    const title = document.querySelector("#movie-title");
    const year = document.querySelector("#movie-year");
    const genre = document.querySelector("#movie-genre");
    const time = document.querySelector("#movie-time");
    const sinopse = document.querySelector("#movie-sinopse");

    body.style.display = "flex";
    poster.setAttribute("src", filme.cartaz)
    title.innerText = filme.titulo;
    year.innerText = filme.ano;
    genre.innerText = filme.genero.join(", ");
    time.innerText = filme.duracao;
    sinopse.innerText = filme.sinopse;
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

        return new Filme(id, titulo, lancamento, genero, duracao, sinopse, cartaz, direcao, elenco, idade, avaliacoes);
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
                    // const genero = e.Genre.split(",").map((e) => e.trim());
                    const duracao = e.Runtime;
                    const sinopse = e.Plot;
                    const cartaz = e.Poster;
                    // const direcao = e.Director.split(",").map((e, i) => new Diretor(i + 1, e.trim()));
                    // const elenco = e.Actors.split(",").map((e, i) => new Ator(i + 1, e.trim()));
                    const idade = e.Rated;
                    const avaliacoes = e.Ratings;

                    return new Filme(id, titulo, lancamento, null, null, null, cartaz, null, null, null, null);
                });

                listarFilmes(filmes);
            });
    }

    return false;
};
