document.addEventListener('keydown', function(event) {
    if(event.keyCode != 46 && event.keyCode != 8 && event.keyCode != 9 && event.keyCode != 16 && event.keyCode != 18 && event.keyCode != 20 && event.keyCode != 144 && event.keyCode != 17){
        let i = document.getElementById("inp_whatsapp").value.length
        if(i === 2)
            document.getElementById("inp_whatsapp").value = document.getElementById("inp_whatsapp").value + " ";
        else if (i === 8)
            document.getElementById("inp_whatsapp").value = document.getElementById("inp_whatsapp").value + "-";
    }
  });
function submitForm() {
    const form = document.getElementById('myForm')
    form.addEventListener('submit', async function(e){
        e.preventDefault()
        let valores = document.querySelector('form.form').elements;
        const msgSucesso = document.getElementById("msgSucesso")
        const btnEnviar = document.getElementById("btnEnviar")
        const userInput = valores['inp_username'].value
        const emailInput = valores['inp_whatsapp'].value
        const mensagemInput = valores['inp_mensagem'].value
        const option = {
            method:'POST',
            headers:{
                    'Content-Type':'application/json',
                    Authorization: process.env.SHEET_TOKEN
                },
                body: JSON.stringify({
                "apiResource": "values",
                "apiMethod": "batchUpdate",
                "spreadsheetId": process.env.SHEET_ID,
                "resource": {
                    "data": [
                        {
                            "range": "formPay!A1",
                            "values": [
                                [
                                userInput,
                                emailInput,
                                mensagemInput
                                ]
                            ]
                        }
                    ]
                },
                "valueInputOption": "user_entered"
            })
        }
        try {
            if(!/^(\d{2}) [0-9]\d{4}-[0-9]\d{3}$/gm.test(document.getElementById("inp_whatsapp").value)){
                msgSucesso.innerHTML = 'Digite corretamente o WHATSAPP (11 99999-9999).'
                msgSucesso.style.color = 'red' 
                msgSucesso.style.marginTop = '20px' 
                msgSucesso.style.display = 'flex'
            }else{
                const request = await fetch(process.env.SHEET_URL,option)
                if(request.status === 200){
                    msgSucesso.innerHTML = 'Obrigado! Entraremos em contato em breve.' 
                    msgSucesso.style.display = 'flex'
                    msgSucesso.style.color = 'green'
                    btnEnviar.style.display = 'none'
                }else{
                    msgSucesso.style.display = 'flex'
                    msgSucesso.style.color = 'red'
                    msgSucesso.style.marginTop = '20px' 
                    msgSucesso.innerHTML = 'Ocorreu um erro, tente novamente.' 
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
}

submitForm()
