function f() {
    let p = document.createElement('p');
    p.innerHTML = "text";
    p.textContent = "Вы клацнули по кнопке";
    p.style = "color: red;";
    document.body.appendChild(p);
    console.log(p);
    //document.write("aboba");
}

