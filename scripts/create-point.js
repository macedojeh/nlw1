function populateUfs()
{
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    // .then( (res) => { return res.json() }) ou
    .then ( res => res.json() )
    .then ( states => {
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // para limpar o campo
    citySelect.disabled = true

    fetch(url)
    .then ( res => res.json() )
    .then ( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


// Itens de coleta
// Pegar todos os LIs e rodar uma repeticao
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// Array - sequência não ordenada de dados
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    // add or remove uma classe com JavaScript - pode usar ADD, REMOVE ou TOGGLE. TOGGLE ja faz as duas coisas
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    // Verificar se existem itens selecionados,
    // Se SIM,
    // Pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // Isso sera true ou false
        return itemFound
    })

    // Se ja estiver selecionado, tirar da selecao
    if (alreadySelected >= 0){ // ou diferente != -1
        // Tirar da selecao
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
    }
    // Sena oestiver selecioando, adicionar a selecao
    // Atualizar o campo escondido com os itens selecionados
}