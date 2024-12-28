const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    const ecrit = document.querySelector('.ecrit');

    button.addEventListener('click', function() {
        const lastChar = ecrit.innerText.slice(-1);

        if (button.innerText === 'Del') {
            ecrit.innerText = ecrit.innerText.slice(0, -1);
            return;
        }

        else if (button.innerText === 'AC') {
            ecrit.innerText = '';
            return;
        }

        else if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(button.innerText)) {
            return; 
        }

        else if (button.innerText === '=') {
            const rep = eval(ecrit.innerText);
            ecrit.innerText = rep;
        }

        else {
            ecrit.innerText += button.innerText;
        }
    })
});