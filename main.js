    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');
    const step2 = document.getElementById('step2');
    const inscritosFields = document.getElementById('inscritosFields');
    const quantidadeInput = document.getElementById('quantidade');
    const quantidadeHidden = document.getElementById('quantidadeHidden');
    
    nextButton.addEventListener('click', function(event) {
      event.preventDefault();
      step2.classList.remove('hidden');
      nextButton.classList.add('hidden');
      submitButton.classList.remove('hidden');
      quantidadeHidden.value = quantidadeInput.value;
      renderInscritosFields();
    });
    
    submitButton.addEventListener('click', async function(event) {
      event.preventDefault();
      const quantidade = parseInt(quantidadeInput.value);
    
      for (let i = 1; i <= quantidade; i++) {
        const nome = document.querySelector(`input[name=nome${i}]`).value;
        const email = document.querySelector(`input[name=email${i}]`).value;
        const whatsapp = document.querySelector(`input[name=whatsapp${i}]`).value;
        const cpf = document.querySelector(`input[name=cpf${i}]`).value;
    
        const dados = {
          empresa: document.querySelector('input[name=empresa]').value,
          cnpj: document.querySelector('input[name=cnpj]').value,
          curso: document.querySelector('select[name=curso]').value,
          nome,
          email,
          whatsapp,
          cpf
        };
    
        // Faça a solicitação POST para a API
        await enviarParaAPI(dados);
      }
    
      alert('Inscrições enviadas!');
    });
    
    function renderInscritosFields() {
      const quantidade = parseInt(quantidadeInput.value);
      inscritosFields.innerHTML = '';

      for (let i = 1; i <= quantidade; i++) {
        const inscritoFields = document.createElement('div');
        inscritoFields.innerHTML = `
          <h4 class="text-md font-medium mb-2">Inscrito ${i}</h4>
          <label class="block text-sm font-medium text-gray-700">Nome</label>
          <input type="text" name="nome${i}" class="mt-1 p-2 w-full rounded-md border border-gray-300">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email${i}" class="mt-1 p-2 w-full rounded-md border border-gray-300">
          <label class="block text-sm font-medium text-gray-700">WhatsApp</label>
          <input type="text" name="whatsapp${i}" class="mt-1 p-2 w-full rounded-md border border-gray-300">
          <label class="block text-sm font-medium text-gray-700">CPF</label>
          <input type="text" name="cpf${i}" class="mt-1 p-2 w-full rounded-md border border-gray-300">
        `;
        inscritosFields.appendChild(inscritoFields);
      }
    }
    
    async function enviarParaAPI(data) {
      const apiUrl = 'https://api.sheetmonkey.io/form/9zNZmctLrePe8VgfswcLka'; // URL da API
    
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    
      if (response.ok) {
        console.log('Enviado com sucesso:', data);
      } else {
        console.error('Erro ao enviar:', response.statusText);
      }
    }
    