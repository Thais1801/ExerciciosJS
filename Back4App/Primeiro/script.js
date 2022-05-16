Parse.serverURL = "https://parseapi.back4app.com";

Parse.initialize(
  "5hAYxiFAd3KoSMZC59Pr2kpo2JtndUwTLFjaSyvS", "D9H29A3iu7ZECeS9dXzfES61OX5EFLt8oHRph4gt"
);

let livros = [];
const tabela = document.getElementById("lista");

function gerarLista() {
    lista.innerHTML = "";
    for (let i = 0; i < livros.length; ++i) {
      const li = document.createElement("li");
      const texto = document.createTextNode(
        `${[i+1]} - ${livros[i].titulo}, ${livros[i].autor}, ${livros[i].ano_de_lancamento}`
      );
      li.appendChild(texto);
      lista.appendChild(li);
    }
}

const fetchLivros = () => {
  const Livros = Parse.Object.extend("Livros");
  const query = new Parse.Query(Livros);
  query
  .find()
  .then((results) => {
    livros = [];
    for (const object of results) {
      const titulo = object.get("titulo");
      const autor = object.get("autor");
      const ano_de_lancamento = object.get("ano_de_lancamento");
      livros.push({ titulo, autor, ano_de_lancamento });
    }
    gerarLista(results);
  }) 
  .catch ((error) => {
    console.error("Error while fetching Livro", error);
});
};
fetchLivros();