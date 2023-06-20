
window.onload = () => {
    setupSizeUI();
    setupCrustUI();
    setupToppingUI();
    setupGenerateButton();
    document.getElementById('buttonGenerate').click();
};

var scales = [
    {
        name: 'S',
        scale: '10, 10, 10'
    },
    {
        name: 'M',
        scale: '15, 15, 15'
    },
    {
        name: 'L',
        scale: '20, 20, 20'
    }
];
var crusts = [
    {
        name: 'Pan',
        value: 'thin'
    },
    {
        name: 'Thick',
        value: 'thick'
    }
];
var toppings = [
    {
        name: 'Onion',
        value: 'onion'
    },
    {
        name: 'Sausage',
        value: 'sausage'
    },
    {
        name: 'Mushroom',
        value: 'mushroom'
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

    if (model.instructions) {
        const div = document.querySelector('.instructions');
        div.innerText = model.info;
    }
};


function setupSizeUI() {
  var select = document.createElement("select");
  select.name = "size";
  select.id = "size";
  select.setAttribute('class', 'pizzaOptions');
  select.addEventListener('change', function() {
    let model = document.querySelector('a-entity');
    const pizza = {src: './assets/Custom/thin.gltf', scale: this.value};
    setModel(pizza, model);
  });

  for (const val of scales) {
    var option = document.createElement("option");
    option.value = val.scale;
    option.text = val.name;
    select.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Pizza size: "
  label.htmlFor = "size";

  document.getElementById("customize_control").appendChild(label).appendChild(select);
}

function setupCrustUI() {
  var crustSelect = document.createElement("select");
  crustSelect.name = "crust";
  crustSelect.id = "crust";
  crustSelect.setAttribute('class', 'pizzaOptions');

  for (const val of crusts) {
    var option = document.createElement("option");
    option.value = val.value;
    option.text = val.name;
    crustSelect.appendChild(option);
  }

  var crustLabel = document.createElement("label");
  crustLabel.innerHTML = "Crust: "
  crustLabel.htmlFor = "crust";

  document.getElementById("customize_control").appendChild(crustLabel).appendChild(crustSelect);
}

function setupToppingUI() {
  var toppingSelect = document.createElement("select");
  toppingSelect.name = "topping";
  toppingSelect.id = "topping";
  toppingSelect.setAttribute('class', 'pizzaOptions');
  toppingSelect.setAttribute('multiple', '');

  for (const val of toppings) {
    var option = document.createElement("option");
    option.value = val.value;
    option.text = val.name;
    toppingSelect.appendChild(option);
  }

  var label = document.createElement("label");
  label.innerHTML = "Topping: "
  label.htmlFor = "toppingSelect";

  document.getElementById("customize_control").appendChild(label).appendChild(toppingSelect);
  document.multiselect('#topping');
}

function setupGenerateButton() {
    let buttonGroup = document.getElementById('customize_control')
    let button = document.createElement('button')
    button.id = 'buttonGenerate';
    button.textContent = "Bake!";
    button.addEventListener('click', function() {
        var selectedSize = document.getElementById('size').value;
        var selectedCrust = document.getElementById('crust').value;
        var options = document.getElementById('topping').selectedOptions;
        var selectedTopping = Array.from(options).map(({ value }) => value).join("_");
        
        var pizzaModelName = './assets/Custom/' + selectedCrust;
        if (selectedTopping) {
            pizzaModelName += '_' + selectedTopping;
        }
        pizzaModelName += ".gltf";

        console.log('Selected crust = ' + selectedCrust + ", size = " + selectedSize + ", toppings = " + selectedTopping);
        console.log('Pizza file = ' + pizzaModelName);

        const pizza = { scale: selectedSize, src: pizzaModelName };
        let model = document.querySelector('a-entity');
        setModel(pizza, model);
    });

    buttonGroup.appendChild(button)
}