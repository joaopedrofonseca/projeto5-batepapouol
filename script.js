let objName;
let userName;

function username(){
    userName = prompt('Digite seu lindo nome:');
    objName = {name: userName};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objName);
    promise.then(success);
    promise.catch(fail);
}
username();
function fiveSecConection(){
    objName = {name: userName};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objName);
    promise.then(success);
    promise.catch(fail);
}

//setTimeout(fiveSecConection, 5000);

function success(warning){
    console.log(warning.status);
}

function fail(warning){
   // if(warning.response.status === 400){
    //    window.location.reload();
   // }
}
let msg = [];

function getMsg(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(answr);
    
}
getMsg();
setInterval(getMsg, 3000);

function answr(resp){
    msg = resp.data;
    renderizeMsg();
}
function renderizeMsg(){
    const messages = document.querySelector('.screenMessages');
    messages.innerHTML = '';
    for(let i = 0; i<msg.length; i++){
        let from = msg[i].from;
        let to = msg[i].to;
        let text = msg[i].text;
        let type = msg[i].type;
        let time = msg[i].time;
        if(type === "status"){
            messages.innerHTML = messages.innerHTML +`
            <div class="text inAndOutMsg">
            <div class="hour">${time}</div>
            <div class="relatedUsers"><b>${from}</b> ${text}</div>
            </div>`
        } else if(type === 'message'){
            messages.innerHTML = messages.innerHTML +`
            <div class="text msgForAll">
                <div class="hour">${time}</div>
                <div class="relatedUsers"><b>${from}</b> para <b>${to}</b>:</div>
                <div class="msg"> ${text}</div>
            </div>
            `
        } else {
            if(from === userName){
            messages.innerHTML = messages.innerHTML +`
            <div class="text privateMsg">
                <div class="hour">${time}</div>
                <div class="relatedUsers"><b>${from}</b> reservadamente para <b>${to}</b>:</div>
                <div class="msg"> ${text}</div>

            </div>
            `
        }else{
            messages.innerHTML = messages.innerHTML +`
            <div class="text privateMsg">
                <div class="hour">${time}</div>
                <div class="relatedUsers"><b>${from}</b> reservadamente para <b>${to}</b></div>

            </div>
            `
        }
        }
    }
}

let userMsg = {};
function sendMessage(){
    const text = document.querySelector(".message textarea").value;
    userMsg = {from: userName, to: "Todos", text: text, type: "message"};
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', userMsg);
    promise.then(success);
    promise.catch(fail);
}