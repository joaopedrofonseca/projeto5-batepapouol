let objName;
let userName;

function username(){
    userName = document.querySelector(".openScreen input").value;
    console.log(userName);
    objName = {name: userName};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", objName);
    promise.then(success);
    promise.catch(fail);
    const hideScreen = document.querySelector(".openScreen");
    hideScreen.classList.add("hide");
}

function fiveSecConection(){
    objName = {name: userName};
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", objName);
    promise.then(success);
    promise.catch(fail);
}

setInterval(fiveSecConection, 5000);

function success(warning){
    console.log(warning.status);
}

function fail(warning){
    if(warning.response.status === 400){
       window.location.reload();
    }
}


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

let msg = [];
let lastmsg;
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

function scrollmesssage(){
    lastmsg = msg[99];
    if(lastmsg !== msg[99]){
        let element = document.querySelectorAll(".text");
        element[(element.length - 1)].scrollIntoView({behavior: "smooth"});
    }
}



let userMsg = {};
function sendMessage(){
    const text = document.querySelector(".message textarea").value;
    userMsg = {from: userName, to: "Todos", text: text, type: "message"};
    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', userMsg);
    promise.then(success);
    promise.catch(fail);
    cleanText();
}

function cleanText(){
    const u = document.querySelector(".message textarea");
    u.value="";
}

function openSidebar(){
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove("hide");
    let blur = document.querySelector(".blur");
    blur.classList.remove("hide");
}

function closeSidebar(){
    let blur = document.querySelector(".blur");
    blur.classList.add("hide");
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.add("hide");
}
function openCtts(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");
    promise.then(openCttsAns);
}

let ctts;
function openCttsAns(r){
    ctts = r.data;
}

function renderizeCtts(){
    for(let i = 0; i<ctts.length; i++){
        let sidebar = document.querySelectorAll(".sidebar.contacts");
        sidebar.innerHTML = '';
        sidebar.innerHTML = sidebar.innerHTML +
        `
        <div class="ctt">
        <ion-icon name="person-circle"></ion-icon>
        ${ctts[i]}
    </div>

        `
    }
}