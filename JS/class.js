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

    showDetails = async () => {
        const direction = document.querySelector("#movie-direction");
        const cast = document.querySelector("#movie-cast");
    
        const directionFormated = this.direcao.map((e, i) => {
            const director = document.createElement("a");
            director.setAttribute("data-id", e.id);
    
            director.appendChild(document.createTextNode(e.nome));
            if (i + 1 !== this.direcao.length) {
                director.appendChild(document.createTextNode(", "));
            }
    
            return director;
        });
    
        const castFormated = this.elenco.map((e, i) => {
            const ator = document.createElement("a");
            ator.setAttribute("data-id", e.id);
    
            ator.appendChild(document.createTextNode(e.nome));
            if (i + 1 !== this.elenco.length) {
                ator.appendChild(document.createTextNode(", "));
            }
    
            return ator;
        });
    
        listaFilmes.style.display = "none";
        filmeDetalhes.style.display = "flex";
    
        document.querySelector("#movie-image").setAttribute("src", this.cartaz);
        document.querySelector("#movie-title").innerText = this.titulo;
        document.querySelector("#movie-year").innerText = this.ano;
        document.querySelector("#movie-genre").innerText = this.genero.join(", ");
        document.querySelector("#movie-time").innerText = this.duracao;
        document.querySelector("#movie-synopsis").innerText = this.sinopse;
    
        btnFavoritarFilme.setAttribute("data-object", JSON.stringify(this));
    
        if (favoritos)
            if (favoritos.filter((e) => e.id === this.id).length) {
                btnFavoritarFilme.innerHTML = '<i class="bi bi-heart-fill align-self-center"></i>';
                document.querySelector("#btn-edit").style.display = "block";
                document.querySelector("#btn-edit").onclick = this.editDetails;
            } else {
                btnFavoritarFilme.innerHTML = '<i class="bi bi-heart align-self-center"></i>';
                document.querySelector("#btn-edit").style.display = "none";
                document.querySelector("#btn-edit").onclick = "";
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

    editDetails = async () => {
        filmeDetalhes.style.display = "none";
        listaFilmes.style.display = "block";

        const form = document.createElement("form");
        form.setAttribute("action", "GET");
        form.addEventListener("submit", (e) => handleEdit(e));
        
        const divTitle = document.createElement("div");
        const labelTitle = document.createElement("label");
        const inputTitle = document.createElement("input");
        labelTitle.appendChild(document.createTextNode("Título: "));
        inputTitle.value = this.titulo;
        divTitle.appendChild(labelTitle);
        divTitle.appendChild(inputTitle);

        const divYear = document.createElement("div");
        const labelYear = document.createElement("label");
        const inputYear = document.createElement("input");
        labelYear.appendChild(document.createTextNode("Ano: "));
        inputYear.value = this.ano;
        inputYear.setAttribute("type", "number");
        divYear.appendChild(labelYear);
        divYear.appendChild(inputYear);

        const divGenre = document.createElement("div");
        const labelGenre = document.createElement("label");
        const inputGenre = document.createElement("input");
        labelGenre.appendChild(document.createTextNode("Gênero(s): "));
        inputGenre.value = this.genero;
        divGenre.appendChild(labelGenre);
        divGenre.appendChild(inputGenre);

        const divDuration = document.createElement("div");
        const labelDuration = document.createElement("label");
        const inputDuration = document.createElement("input");
        labelDuration.appendChild(document.createTextNode("Duração (minutos): "));
        inputDuration.value = this.duracao;
        divDuration.appendChild(labelDuration);
        divDuration.appendChild(inputDuration);

        const divSynopsis = document.createElement("div");
        const labelSynopsis = document.createElement("label");
        const inputSynopsis = document.createElement("input");
        labelSynopsis.appendChild(document.createTextNode("Sinopse: "));
        inputSynopsis.value = this.sinopse;
        divSynopsis.appendChild(labelSynopsis);
        divSynopsis.appendChild(inputSynopsis);

        const divImage = document.createElement("div");
        const labelImage = document.createElement("label");
        const inputImage = document.createElement("input");
        labelImage.appendChild(document.createTextNode("Cartaz (URL): "));
        inputImage.value = this.cartaz;
        divImage.appendChild(labelImage);
        divImage.appendChild(inputImage);

        const divDirection = document.createElement("div");
        const labelDirection = document.createElement("label");
        const inputDirection = document.createElement("input");
        labelDirection.appendChild(document.createTextNode("Direção: "));
        inputDirection.value = this.direcao.map((e) => e.nome);
        divDirection.appendChild(labelDirection);
        divDirection.appendChild(inputDirection);

        const divCast = document.createElement("div");
        const labelCast = document.createElement("label");
        const inputCast = document.createElement("input");
        labelCast.appendChild(document.createTextNode("Elenco: "));
        inputCast.value = this.elenco.map((e) => e.nome);
        divCast.appendChild(labelCast);
        divCast.appendChild(inputCast);

        const divRated = document.createElement("div");
        const labelRated = document.createElement("label");
        const inputRated = document.createElement("input");
        labelRated.appendChild(document.createTextNode("Classificação: "));
        inputRated.value = this.classificacao;
        divRated.appendChild(labelRated);
        divRated.appendChild(inputRated);

        const btnSubmit = document.createElement("button");
        btnSubmit.appendChild(document.createTextNode("Confirmar"));
        btnSubmit.setAttribute("type", "submit");
        btnSubmit.setAttribute("class", "btn btn-success");

        const btnCancel = document.createElement("button");
        btnCancel.appendChild(document.createTextNode("Cancelar"));
        btnCancel.setAttribute("type", "button");
        btnCancel.setAttribute("class", "btn btn-danger");
        btnCancel.onclick = () => {
            listaFilmes.innerHTML = "";
            listaFilmes.style.display = "grid";
        }

        form.appendChild(divTitle);
        form.appendChild(divYear);
        form.appendChild(divGenre);
        form.appendChild(divDuration);
        form.appendChild(divSynopsis);
        form.appendChild(divImage);
        form.appendChild(divDirection);
        form.appendChild(divCast);
        form.appendChild(divRated);
        form.appendChild(btnSubmit);
        form.appendChild(btnCancel);

        listaFilmes.innerHTML = "";
        listaFilmes.appendChild(form);

        function handleEdit(e) {
            e.preventDefault();
        }
    }
}
