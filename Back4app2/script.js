Parse.serverURL = "https://parseapi.back4app.com";

Parse.initialize(
  "oZCIgulMLQeU5mMlRapmJr4jPj7ZuuF67jlguft1", "90JUfLIaw103oamMT175UMeJujO5Lq2E3Znotevb"
);

let tarefas = [];
const lista = document.getElementById("lista");
const desc_tarefa = document.getElementById("desc_t");
const btnInserir = document.getElementById("inserir");


const gerarLista = async () =>{
  lista.innerHTML = "";
  for (let i = 0; i < tarefas.length; i++) {
    const li = document.createElement("li");
    const label = document.createElement("label")
    const desc = document.createTextNode(tarefas[i].get("desc_tarefa"));
    const status = document.createElement("input");
    const remover = document.createElement("button");
    const editar = document.createElement("button");

    status.type = "checkbox";
    status.id = "status";
    status.checked = tarefas[i].get("status");
    status.onclick = (evt1) => verStatus(evt1, tarefas[i], desc)

  
    remover.innerHTML = "Remover";
    remover.id = "remover";
    remover.onclick = (evt2) => removerTarefa(evt2, tarefas[i]);

    editar.innerHTML = "Editar";
    editar.id = "editar";
    editar.onclick = (evt2) => editarT(evt2, tarefas[i]);

    li.id = "linha";
    li.style = "display: flex;";

    label.appendChild(status);
    label.appendChild(desc);
    li.appendChild(label);
    li.appendChild(remover);
    li.appendChild(editar);
    lista.appendChild(li);
  }
};

const inserir = async () => {
  const Tarefas = new Parse.Object('Tarefas');
  Tarefas.set('desc_tarefa', desc_tarefa.value);
  Tarefas.set('status', false);
  desc_tarefa.value = "";
  try {
    const result = await Tarefas.save();
    console.log('Tarefas created', result);
  } catch (error) {
    console.error('Error while creating Tarefas: ', error);
  }
  lerLista();
};


const lerLista = async () => {
  const Tarefas = Parse.Object.extend('Tarefas');
  const query = new Parse.Query(Tarefas);
  try {
    const results = await query.find();
    tarefas = results;
  } catch (error) {
    console.error('Error while fetching Tarefas', error);
  }
  gerarLista();
};

async function removerTarefa(evt2, tarefas){
  tarefas.set(evt2.target.remove);
  try {
    const response = await tarefas.destroy();
    console.log('Delet ParseObject', response);
    lerLista();
  } catch (error) {
    console.error('Error while updating Tarefa', error);
  }
  lerLista();
};

const verStatus = async (evt1, tarefas) => {
  tarefas.set('status', evt1.target.checked);
  try {
    const response = await tarefas.save();
    console.log(response.get('status'));
    console.log('Tarefa updated', response);
  } catch (error) {
    console.error('Error while updating Tarefas', error);
  };
};


  const editarT = async () => {
    const edicao = document.getElementById("edicao");
    edicao.innerHTML="";

    const span = document.createElement("span");
    const txt = document.createTextNode("Editar:  ");
    const novaDesc = document.createElement("input");
    novaDesc.type = "text";
    novaDesc.id = "novaDesc";

    const editarDesc = document.createElement("button");
    editarDesc.id = "editarDesc";
    editarDesc.textContent = "Confirmar";

    const cancelarEditar = document.createElement("button");
    cancelarEditar.id = "cancelarEditar";
    cancelarEditar.textContent = "Cancelar";

    span.appendChild(txt);
    span.appendChild(novaDesc);
    span.appendChild(editarDesc);
    span.appendChild(cancelarEditar);
    edicao.appendChild(span);
   

    editarDesc.onclick = async () =>{

      document.getElementById("remover").click();
  
    const Tarefas = new Parse.Object('Tarefas');
    Tarefas.set('desc_tarefa', novaDesc.value);
    Tarefas.set('status', false);
    desc_tarefa.value = "";
        try {
        const result = await Tarefas.save();
        console.log('Tarefas created', result);
        } catch (error) {
        console.error('Error while creating Tarefas: ', error);
        }
        edicao.innerHTML = "";
        }  

    cancelarEditar.onclick = async () =>{
    edicao.innerHTML = "";}
    lerLista();
  };

function exibicaoPend(){;
  const check = document.getElementById("filtroPendentes");
  if(check.checked == true){
    for (let i = 0; i < tarefas.length; i++) {
    const exb = document.getElementById("status");
    let linha = document.getElementById('linha');
    if(exb == true){      
      linha.style.display = "none";
    }
  else{
    linha.style.display = "flex";
    }
}
}
}
lerLista();


