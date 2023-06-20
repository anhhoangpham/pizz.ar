
window.onload = () => {
    renderPizza();
    setupButtons();
};

var currentScaleIndex = 0
var scales = [
    {
        name: 'S',
        scale: '3, 3, 3'
    },
    {
        name: 'M',
        scale: '5, 5, 5'
    },
    {
        name: 'L',
        scale: '7, 7, 7'
    }
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
    // setModel(models[0], model);
}


function setupButtons() {
    let buttonGroup = document.getElementById('button_group')
    scales.forEach((scale) => {
        let button = document.createElement('button')
        button.textContent = scale.name;
        button.addEventListener('click', function() {
            let model = document.querySelector('a-entity');
            const pizza = {src: './assets/Custom/thin.gltf', scale: scale.scale};
            setModel(pizza, model);
        });
        buttonGroup.appendChild(button)
    });
}