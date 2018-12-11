window.addEventListener('load', () => {
    const close = document.querySelector('.js-close')
    close.addEventListener('click', () => {
        window.close()
    })
    
    const print = document.querySelector('.js-print')
    const iframe = document.querySelector('.js-iframe')
    print.addEventListener('click', () => {
        iframe.contentWindow.print();
    })
})