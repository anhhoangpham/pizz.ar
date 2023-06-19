
window.onload = () => {
    renderPizza();
    setupButtons();
};

var models = [
    {
        src: './assets/Pizza01/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Cheese',
        thumbnail: './assets/Pizza01/thumbnail.png'
    },
    {
        src: './assets/Pizza02/pizza.gltf',
        scale: '2 2 2',
        info: 'Salami',
        thumbnail: './assets/Pizza02/thumbnail.png'
    },
    {
        src: './assets/Pizza03/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Pepperoni',
        thumbnail: './assets/Pizza03/thumbnail.png'
    },
    {
        src: './assets/Pizza04/pizza.gltf',
        scale: '4.124475892003208 4.124475892003208 4.124475892003208',
        info: 'New pizza',
        thumbnail: './assets/Pizza04/thumbnail.png'
    },

];

var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.src);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPizza() {
    let model = document.querySelector('a-entity');
    setModel(models[0], model);
}

function setupButtons() {
    let buttonGroup = document.getElementById('button_group')
    models.forEach((pizza) => {
        let thumbnail = document.createElement('img')
        thumbnail.setAttribute('src', pizza.thumbnail)
        thumbnail.setAttribute('width', "100")
        thumbnail.setAttribute('height', "100")

        let button = document.createElement('button')
        button.addEventListener('click', function() {
            let model = document.querySelector('a-entity');
            setModel(pizza, model);
        });

        button.appendChild(thumbnail)
        buttonGroup.appendChild(button)
    });
}