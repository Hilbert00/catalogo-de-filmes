class Ator {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class Diretor {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

class Filme {
    constructor(id, titulo, ano, genero, duracao, sinopse, cartaz, direcao, elenco, classificacao, avaliacao) {
        this.id = id;
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
        this.duracao = duracao;
        this.sinopse = sinopse;
        this.cartaz = cartaz;
        this.direcao = direcao;
        this.elenco = elenco;
        this.classificacao = classificacao;
        this.avaliacao = avaliacao;
    }

    getCard = async () => {
        const card = document.createElement("div");
        card.classList.add("card", "position-relative", "pb-5");
        card.setAttribute("style", "width: 100%;");

        const imgCartaz = document.createElement("img");
        imgCartaz.classList.add("card-img-top");
        imgCartaz.setAttribute("style", "height: 24rem; object-fit: cover;");
        imgCartaz.setAttribute("src", this.cartaz);

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.appendChild(document.createTextNode(this.titulo));

        const cardDetails = document.createElement("div");
        cardDetails.setAttribute("style", "display: flex; justify-content: space-around;");

        const btnDetails = document.createElement("button");
        btnDetails.classList.add("btn", "btn-primary");
        btnDetails.setAttribute("id", "btn-details");
        btnDetails.setAttribute("style", "position: absolute; bottom: 1rem;");
        btnDetails.setAttribute("data-id", this.id)
        btnDetails.onclick = (e) => getDetails(e.target.getAttribute("data-id"));
        btnDetails.appendChild(document.createTextNode("Ver Detalhes"));

        const detailsYear = document.createElement("div");
        detailsYear.setAttribute("style", "flex-grow: 1;");
        detailsYear.appendChild(document.createTextNode(this.ano));

        cardDetails.appendChild(detailsYear);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardDetails);
        cardBody.appendChild(btnDetails)

        card.appendChild(imgCartaz);
        card.appendChild(cardBody);

        return card;
    };
}
