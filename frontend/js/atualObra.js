let token = localStorage.getItem('token')
let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

if (!token) {
    window.location.href = `../index.html`
}
btn.addEventListener('click', (e) => {
    e.preventDefault()

    let id = document.getElementById('id').value
    let nome = document.getElementById('nome').value
    let cnpj = document.getElementById('cnpj').value

    let valores = {
        nome: nome,
        cnpj: cnpj
    }

    fetch(`http://localhost:3000/obra/${id}`, {
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