
window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    renderPizza();
};

var models = [
    {
        src: './assets/Pizza01/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Cheese',
    },
    {
        src: './assets/Pizza02/pizza.gltf',
        scale: '2 2 2',
        info: 'Salami',
    },
    {
        src: './assets/Pizza03/pizza.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Pepperoni',
    },
    {
        src: './assets/Pizza04/pizza.gltf',
        scale: '4.124475892003208 4.124475892003208 4.124475892003208',
        info: 'New pizza',
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

    entity.setAttribute('gltf-model', model.src);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPizza() {
    let model = document.querySelector('a-entity');
    setModel(models[modelIndex], model);

    document.querySelector('button[data-action="change"]').addEventListener('click', function () {
        var entity = document.querySelector('a-entity');
        modelIndex++;
        var newIndex = modelIndex % models.length;
        setModel(models[newIndex], entity);
    });
}
