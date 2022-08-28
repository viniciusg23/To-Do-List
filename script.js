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
                    <div class="div-content">
                        ${item.content}
                    </div>
                    <div class="div-info">
                        <img class="option" src="./Images/option.png" width="20px" id="info-${item.id}">
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
                        <img class="option" src="./Images/option.png" width="20px" id="info-${item.id}">
                    </div>
                </div>
                `
        }
        
    })

    localStorage.setItem("db_todo", JSON.stringify(db));
}

loadPage();


let add = function(){
    let db = JSON.parse(localStorage.getItem("db_todo"));

    let text = document.getElementById('to-do');

    if(text.value != ""){
        let item = {
            id: `checkbox${db.length + 1}`,
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

let check = function(aux){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    db.forEach(data =>{
        if(data.id == aux)
            data.check = true;
    })
    localStorage.setItem("db_todo", JSON.stringify(db));

    let item = document.getElementById(aux);
    item.innerHTML = `<div class="div-checkbox" style="background-color: #607EAA;" onclick="uncheck('${aux}')"><img src="./Images/checkicon.png" width="20px"></div>`
    
}

let uncheck = function(aux){
    let db = JSON.parse(localStorage.getItem("db_todo"));
    db.forEach(data =>{
        if(data.id == aux)
            data.check = false;
    })
    localStorage.setItem("db_todo", JSON.stringify(db));

    let item = document.getElementById(aux);
    item.innerHTML = `<div class="div-checkbox" onclick="check('${aux}')"></div> `
}
