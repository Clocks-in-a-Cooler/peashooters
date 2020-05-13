function element(tag, c, id) { //"c" is for class
    var elt = document.createElement(tag || "div");
    if (c) {
        elt.className = c;
    }
    
    if (id) {
        elt.id = c;
    }
    
    return elt;
}

function create_menu(menu) {
    var menu_element = element("div", null, menu.name);
    menu.buttons.forEach(button => {
        var b = element("button", button.type);
        b.innerHTML = button.label;
        b.addEventListener("click", button.onclick);
        
        menu_element.appendChild(b);
    });
    
    return menu_element;
}

function load_menu(menu) {
    var menu_element = create_menu(menu);
    wrapper.innerHTML = "";
    wrapper.appendChild(menu_element);
}

var main_menu = {
    name: "main_menu",
    buttons: [
        {
            label: "Play",
            type: "main_menu_button",
            onclick: () => {
                //replace the main menu with the level selection
                load_menu(level_select);
            }
        },
    ],
};

var level_select = {
    name: "level_select",
    buttons: [
        {
            label: "Level 1",
            type: "level_select_button",
            onclick: () => {
                //load level 1
                console.log("level 1 selected");
            }
        },
        {
            label: "Level 2",
            type: "level_select_button",
            onclick: () => {
                //load level 1
            }
        },
        {
            label: "Level 3",
            type: "level_select_button",
            onclick: () => {
                //load level 1
            }
        },
    ],
};
