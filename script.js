
let add = function(){
    let db = JSON.parse(localStorage.getItem("db_todo") || "[]");

    let text = document.getElementById("to-do").value;
    let container = document.getElementById("div-container");
    container.innerHTML += `
                <div class="item">
                    <div class="div-input" id="checkbox1">
                        <div class="div-checkbox" onclick="check()"></div>    
                    </div>
                    <div class="div-content">
                        ${text}
                    </div>
                    <div class="div-info">
                        <img class="option" src="./Images/option.png" width="20px">
                    </div>
                </div>
    `
    console.log(db);
    console.log(db.lenght);
    let item = {
        id: db.lenght,
        content: text
    }

    db.push(item);

    localStorage.setItem("db_todo", JSON.stringify(db));
    console.log(text);

}

let check = function(){
    console.log("teste");
    let item = document.getElementById("checkbox1");
    item.innerHTML = `<div class="div-checkbox" style="background-color: gray;" onclick="uncheck()"><img src="./Images/checkicon.png" width="20px"></div>`
}

let uncheck = function(){
    let item = document.getElementById("checkbox1");
    item.innerHTML = `<div class="div-checkbox" onclick="check()"></div> `
}
