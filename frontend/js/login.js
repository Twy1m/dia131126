let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

btn.addEventListener('click', (e)=>{
    e.preventDefault()

    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value

    let valores = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        console.log(dados)

        resposta.innerHTML = ``
        resposta.innerHTML += `${dados.message}`

        localStorage.setItem('token', dados.token)
        localStorage.setItem('nome', dados.nome)
    })
    .catch((err)=>{
        console.error
    })
})