let token = localStorage.getItem('token')
let resposta = document.getElementById('res')
let btn = document.getElementById('btn')

if (!token) {
    window.location.href = `../index.html`
}
btn.addEventListener('click', (e) => {
    e.preventDefault()


    fetch(`http://localhost:3000/movimentos`, {
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
            dados.forEach(movimento => {

                resposta.innerHTML += `
                <td>${movimento.codMovimento}</td>
                <td>${movimento.estado}</td>
                <td>${movimento.qtdMovimento}</td>
                <td>${movimento.data}</td>
                <td>${movimento.idMaterial}</td>
                `
            });
        })
        .catch((err) => {
            console.error
        })
})

