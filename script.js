const input = document.getElementById('search_bar');
const add_button = document.getElementById('search_bar_button');
const add_button_textContent = add_button.textContent;
const bottom = document.querySelector('.bottom');
let edit_icon;

let search_bar_content = '';
let key_value = [];
let edit_id = null;




const persist_key_value = localStorage.getItem('user');
persist_key_value_fun();

function persist_key_value_fun() {
    if (persist_key_value !== null) key_value = JSON.parse(persist_key_value);
}

append_div();


function add_button_click() {
    if (input.value === '') {
        return;
    }
    if (edit_id === null) {
        value = input.value;
        arr_obj_str(value);
        input.value = '';
    }
    if (edit_id !== null) {
        key_value.splice(edit_id, 1, { user: input.value });
        str = JSON.stringify(key_value);
        localStorage.setItem('user', str);
        append_div();
        edit_id = null;
        add_button.textContent = add_button_textContent;
        input.value = '';
    }
}

function arr_obj_str(value) {
    key_value.push({ user: value });
    let str = JSON.stringify(key_value);
    localStorage.setItem('user', str);
    append_div();
}

function append_div() {
    let clutter = '';
    key_value.forEach((key_value_elements, i) => {
        clutter += `<div class="name_Actions_list flex">
         <span>${i + 1}.</span>
         <h4>${key_value_elements.user}</h4>
         <div class="icons">
           <i class='bx bxs-calendar-edit' onclick='editt(${i})'></i>
           <i class='bx bx-trash' onclick='trash(${i})'></i>
         </div>
       </div>`
    })
    bottom.innerHTML = clutter;
}


function trash(id) {
    key_value.splice(id, 1);
    append_div();
    str = JSON.stringify(key_value);
    localStorage.setItem('user', str);
}

function editt(id) {
    edit_id = id;
    input.value = key_value[id].user;
    input.focus();
    add_button.textContent = 'Save Edit';
}

add_button.addEventListener('click', add_button_click)



