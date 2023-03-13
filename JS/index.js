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

btnBucarFilme.onclick = () => {
    if (inputBucarFilme.value.length > 0) {
        fetch(`http://www.omdbapi.com/?s=${inputBucarFilme.value}&apikey=c6319160`)
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const filmes = result.Search.map((e) => {
                    console.log(e);

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
