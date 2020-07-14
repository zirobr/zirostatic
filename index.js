function submitForm() {
    const form = document.getElementById('myForm')
    const nameInput = document.getElementById('inp_username')
    form.addEventListener('submit', async function(e){
        e.preventDefault()
        let valores = document.querySelector('form.form').elements;
        const msgSucesso = document.getElementById("msgSucesso")
        const btnEnviar = document.getElementById("btnEnviar")
        const formData = new FormData(this)
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
                            "range": "Página1!A1",
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
            const request = await fetch(process.env.SHEET_URL,option)
            console.log(request)
            msgSucesso.style.display = 'flex'
            btnEnviar.style.display = 'none'
        } catch (error) {
            console.log(error)
        }
    })
}

submitForm()