
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    renderPizza();
};

var models = [
    {
        url: './assets/Pizza01/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Cheese',
    },
    {
        url: './assets/Pizza02/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Salami',
    },
    {
        url: './assets/Pizza03/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Pepperoni',
    },
];

var modelIndex = 0;
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

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPizza() {
    let scene = document.querySelector('a-scene');

    let marker = document.createElement('a-marker');
    marker.setAttribute('preset', 'hiro');

    let model = document.createElement('a-entity');
    setModel(models[modelIndex], model);
//    model.setAttribute('animation-mixer', '');

    marker.appendChild(model);
    scene.appendChild(marker);

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var entity = document.querySelector('a-entity');
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
    });
}
