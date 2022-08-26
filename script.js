let loadPage = function(){
    let text = document.getElementsByClassName('to-do');
    text.value = '';
    let db = JSON.parse(localStorage.getItem("db_todo") || "[]");
    let container = document.getElementById("div-container");
    container.innerHTML = "";
    db.forEach(item =>{
        if(item.check == true){
            container.innerHTML += `
                <div class="item">
                    <div class="div-input" id="${item.id}">
                        <div class="div-checkbox" style="background-color: gray;" onclick="uncheck('${item.id}')"><img src="./Images/checkicon.png" width="20px"></div>    
                    </div>
                    <div class="div-content">
                        ${item.content}
                    </div>
                    <div class="div-info">
                        <img class="option" src="./Images/option.png" width="20px">
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
                        <img class="option" src="./Images/option.png" width="20px">
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

    let form = document.getElementById("div-form");
    // let text = document.getElementsByClassName('to-do');
    let textContent = document.getElementById("to-do-content");
    let text = document.getElementsByName('todo')[0].placeholder="Não se esqueça da tarefa ;)";
    console.log(textContent.value);
    if(textContent.value != ""){
        
    }

    //     console.log("Entrou if")
    //     let item = {
    //         id: `checkbox${db.length + 1}`,
    //         content: textContent.value,
    //         check: false,
    //     }
    
    //     db.push(item);
    //     localStorage.setItem("db_todo", JSON.stringify(db));
        
    //     form.innerHTML = `
    //                         <input type="text" name="to-do" class="to-do" id="to-do-content" placeholder="To-do" maxlength="128"></input>
    //                         <div id="add" onclick="add()"><b>ADICIONAR</b></div>
    //                     `

    //     loadPage();    
    // }
    // else{
    //     form.innerHTML = `
    //                         <input type="text" name="to-do" class="to-do" id="to-do-null" placeholder="Não se esqueça da tarefa ;)" maxlength="128">
    //                         <div id="add" onclick="add()"><b>ADICIONAR</b></div>
    //                     `
    //     let text = document.getElementsByClassName('to-do');
    //     text.focus();
    // }
    
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
