let token = localStorage.getItem('token')
let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

if (!token) {
    window.location.href = `../index.html`
}
btn.addEventListener('click', (e) => {
    e.preventDefault()


    fetch(`http://localhost:3000/obras`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        },
    })

        .then(res => res.json())
        .then(dados => {
            console.log(dados)

            resposta.innerHTML = ``
            dados.forEach(obra => {
                resposta.innerHTML += `
                <td> ${obra.codObra}</td >
                <td>${obra.nome}</td>
				<td>${obra.cnpj}</td>`
            });
        })
        .catch((err) => {
            console.error
        })
})

