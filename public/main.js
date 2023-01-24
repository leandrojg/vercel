const socket = io.connect();

const render = data =>{
    const html = data.map((element, index)=>{
        return (
            `<div>
            <strong>${element.author}</strong>--
            <em>${element.text}</em>
            </div>`
        )
    }).join('------------------------------');
    document.querySelector('#messages').innerHTML = html
};

const addMessage = e => {
    const message = {
        author : document.querySelector('#username').value,
        text: document.querySelector('#text').value
    }
    socket.emit(`new-message`, message)
    return false;
}

socket.on(`messages`, data =>{
    render(data);
})

const renderAdd = data =>{
    const html = 
        
        `<strong>${data.author}</strong>--
        <em>${data.text}</em>`
        
    const nuevo = document.createElement('div')
    nuevo.innerHTML = html
    document.querySelector('#messages').append(nuevo)
}

socket.on(`messages-push`, data =>{
    renderAdd(data);
    
})