function getFormattedTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + ':' + minutes;
}

const inputElement = document.getElementById('exampleFormControlInput1');
const time         = getFormattedTime();

function sendMensageYou(text, time) {
    disabledText('exampleFormControlInput1');
    document.querySelector('.card-body ').innerHTML += `
        <div class="d-flex flex-row justify-content-start">
            <img src="assets/logo.png" alt="avatar 1" style="width: 70px; height: 100%;">
            <div>
                <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${ text }</p>
                <p class="small ms-3 mb-3 rounded-3 text-muted">${ time }</p>
            </div>
        </div>
    `;
    //Aqui precisa informar a url do back end
    fazerRequisicaoPOST('http://localhost:5000/teste', { "prompt": text }).then(async resultado => {
        var resposta = await resultado.content;
        sendMensageAI(resposta, time);
        habilitdText('exampleFormControlInput1');
    })
    .catch(erro => {
        console.log(erro);
    });
}

function sendMensageAI(text, time) {
    document.querySelector('.card-body ').innerHTML += `
        <div class="d-flex flex-row justify-content-end mb-4 pt-1">
            <div>
                <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${ text }</p>
                <p class="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">${ time }</p>
            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="avatar 1" style="width: 45px; height: 100%;">
        </div>
    `;
}

inputElement.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        const value = inputElement.value;
        sendMensageYou(value, time);
        inputElement.value = '';
    }
});

function fazerRequisicaoPOST(url, dados) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição POST: ' + response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erro:', error);
      throw error;
    });
}

function disabledText(id) {
    document.getElementById(`${id}`).disabled = true;
    document.getElementById(`loading`).style.display = 'block';
}

function habilitdText(id) {
    document.getElementById(`${id}`).disabled = false;
    document.getElementById(`${id}`).focus();
    document.getElementById(`loading`).style.display = 'none';
}