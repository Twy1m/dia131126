let token = localStorage.getItem('token')
let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

if (!token) {
    window.location.href = `../index.html`
}
btn.addEventListener('click', (e) => {
    e.preventDefault()

    let estado = document.getElementById('estado').value
    let qtdMovimento = document.getElementById('qtdMovimento').value
    let data = document.getElementById('data').value
    let idMaterial = document.getElementById('idMaterial').value

    let valores = {
        estado: estado,
        qtdMovimento: qtdMovimento,
        data: data,
        idMaterial: idMaterial
    }

    fetch('http://localhost:3000/movimento', {
        method: 'POST',
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