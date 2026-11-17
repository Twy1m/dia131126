let token = localStorage.getItem('token')
let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

if (!token) {
    window.location.href = `../index.html`
}
btn.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value
    let categoria = document.getElementById('categoria').value
    let qtdEstoque = document.getElementById('qtdEstoque').value
    let lote = document.getElementById('lote').value
    let idObra = document.getElementById('idObra').value

    let valores = {
        categoria: categoria,
        qtdEstoque: qtdEstoque,
        lote: lote,
        idObra: idObra,
    }

    fetch(`http://localhost:3000/material/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
        body: JSON.stringify(valores)
    })

        .then(res => res.json())
        .then(dados => {
            console.log(dados)

            resposta.innerHTML = ``
            resposta.innerHTML += `${dados.message}`
        })
        .catch((err) => {
            console.error
        })
})