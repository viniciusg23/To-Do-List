let loadPage = function(){
    let text = document.getElementsByClassName('to-do');
    text.value = "";
    document.getElementsByName('todo')[0].placeholder="To-do";
    let db = JSON.parse(localStorage.getItem("db_todo") || "[]");
    let container = document.getElementById("div-container");
    container.innerHTML = "";
    db.forEach(item =>{
        if(item.check == true){
            container.innerHTML += `
                <div class="item">
                    <div class="div-input" id="${item.id}">
                        <div class="div-checkbox" style="background-color: #607EAA;" onclick="uncheck('${item.id}')"><img src="./Images/checkicon.png" width="20px"></div>    
                    </div>
                    <div class="div-content" style="text-decoration: line-through;">
                        ${item.content}
                    </div>
                    <div class="div-info">
                        <img class="option" onclick="openMenu('${item.id}')" src="./Images/option.png" width="20px" id="info-${item.id}">
                    </div>
                </div>
                `
        }
        else{
            container.innerHTML += `
                <div class="item">
                    <div class="div-input" id="${item.id}">
                        <div class="div-checkbox" onclick="check('${item.id}')"></div>    
                    </div>
                    <div class="div-content">
                        ${item.content}
                    </div>
                    <div class="div-info">
                        <img class="option" onclick="openMenu('${item.id}')" src="./Images/option.png" width="20px" id="info-${item.id}">
                    </div>
                </div>
                `
        }
        
    })

    localStorage.setItem("db_todo", JSON.stringify(db));
}

loadPage();

document.addEventListener("keypress", function(e){
    if(e.key === "Enter")
        add();
})
let add = function(){
    let db = JSON.parse(localStorage.getItem("db_todo"));

    let text = document.getElementById('to-do');

    if(text.value != ""){
        let item = {
            id: Math.random().toString(16).substring(2),
            content: text.value,
            check: false,
        }

        db.push(item);
        localStorage.setItem("db_todo", JSON.stringify(db));

        loadPage();  
        text.value = "";
    }
    else{
        document.getElementsByName('todo')[0].placeholder="Não se esqueça da tarefa ;)";
        text.focus();
    }
    
}
let openMenu = function(item){
    let menu = document.getElementById("menu");
    let container = document.getElementById("container");
    let edit3 = document.getElementById("edit");
    let delet = document.getElementById("delete");
    
    menu.setAttribute("style", "display: block;")
    container.setAttribute("style", "filter:blur(3px);");
    setTimeout(()=>{
        container.setAttribute("onclick", "cancel()");
    }, 200);
    edit3.setAttribute("onclick", `edit('${item}')`);
    delet.setAttribute("onclick", `delet3('${item}')`);
}

let cancel = function(){
    let menu = document.getElementById("menu");
    let container = document.getElementById("container");
    let edit3 = document.getElementById("edit");
    let delet = document.getElementById("delete");
    let div = document.getElementById("div-buttons");

    div.innerHTML = `
        <div class="button cancel-edit" onclick="cancel()"><p>Cancelar</p></div>
        <div class="button cancel-edit" id="edit"><p>Editar</p></div>
        <div class="button" id="delete"><p>Excluir</p></div>
    `
    menu.setAttribute("style", "display: none;")
    container.setAttribute("style", "filter:blur(0px);")
    container.removeAttribute("onclick");
    try{
        edit3.removeAttribute("onclick");
        delet.removeAttribute("onclick");
    }
    catch{}
    
}
let edit = function(item){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    let div = document.getElementById("div-buttons");

    db.forEach(task =>{
        if(task.id == item){
            //task.content = text.value;
            div.innerHTML = `
                <div id="div-edit">
                    <input type="text" value="${task.content}" id="text-edit" placeholder="Digite aqui sua alteração...">
                    <div class="edit-button" onclick="editCancel('${item}')"><p>Cancelar</p></div>
                    <div class="edit-button" id="save-edit" onclick="editSave('${item}')"><b>Salvar</b></div>
                </div>
            `
        }
    })
}
let editSave = function(item){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    let text = document.getElementById("text-edit");
    db.forEach(task =>{
        if(task.id == item){
            task.content = text.value;
        }
    })
    localStorage.setItem("db_todo", JSON.stringify(db));

    cancel();
    loadPage();
}

let editCancel = function(item){
    let div = document.getElementById("div-buttons");
    div.innerHTML = `
        <div class="button cancel-edit" onclick="cancel()"><p>Cancelar</p></div>
        <div class="button cancel-edit" id="edit" onclick="edit('${item}')"><p>Editar</p></div>
        <div class="button" id="delete" onclick="delet3('${item}')"><p>Excluir</p></div>
    `
} 


let delet3 = function(item){
    let db = JSON.parse(localStorage.getItem("db_todo"));

    let removeItem = function(array, prop, value){
        return array.filter(function(i){return i[prop] !== value})
    }

    db = removeItem(db, "id", item);
    localStorage.setItem("db_todo", JSON.stringify(db));

    cancel();
    loadPage();
}

let check = function(aux){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    db.forEach(data =>{
        if(data.id == aux)
            data.check = true;
    })
    localStorage.setItem("db_todo", JSON.stringify(db));

    // let item = document.getElementById(aux);
    // item.innerHTML = `<div class="div-checkbox" style="background-color: #607EAA;" onclick="uncheck('${aux}')"><img src="./Images/checkicon.png" width="20px"></div>`
    
    loadPage();
}

let uncheck = function(aux){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    db.forEach(data =>{
        if(data.id == aux)
            data.check = false;
    })
    localStorage.setItem("db_todo", JSON.stringify(db));

    // let item = document.getElementById(aux);
    // item.innerHTML = `<div class="div-checkbox" onclick="check('${aux}')"></div> `
    loadPage();
}
