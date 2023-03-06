// let ator = new Ator(1, "John Boy")
// console.log(ator)

// let diretor = new Diretor(1, "John Man")
// console.log(diretor)

fetch("http://www.omdbapi.com/?s=cars&apikey=c6319160")
    .then((res) => res.json())
    .then((result) => {
        const filmes = result.Search.map((e) => {
            return new Filme
        })
        console.log(result)
    })