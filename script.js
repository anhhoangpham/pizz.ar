
window.onload = () => {
    setupSizeUI();
    setupCrustUI();
    setupToppingUI();
    generatePizza();
};

var scales = [
    {
        name: 'S',
        scale: '30, 30, 30'
    },
    {
        name: 'M',
        scale: '50, 50, 50'
    },
    {
        name: 'L',
        scale: '75, 75, 75'
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
var selectedToppings = [];

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
    generatePizza();
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
  crustSelect.addEventListener('change', function() {
    generatePizza();
  });

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
  var toppingSelect = document.createElement("div");
  toppingSelect.name = "topping";
  toppingSelect.id = "topping";
  toppingSelect.setAttribute('class', 'ToppingsOption');

  for (const val of toppings) {
    var option = document.createElement("input");
    option.value = val.value;
    option.text = val.name;
    option.textContent = val.name
    option.setAttribute('class', 'btnTopping');
    option.setAttribute('type', 'checkbox');
    option.setAttribute("checked", "true");
    option.addEventListener('change', function() {
        if (this.checked) {
            selectedToppings.push(val.value);
        } else {
            const newArr = selectedToppings.filter(item => item !== val.value)
            selectedToppings = newArr
        }
        console.log("Selected toppings " + selectedToppings);
        generatePizza();
    })
    var label = document.createElement("label");
    label.innerHTML = val.name
    label.setAttribute('class', 'labelTopping');

    toppingSelect.appendChild(label);
    toppingSelect.appendChild(option);

  }

  var label = document.createElement("label");
  label.innerHTML = "Topping: "
  label.htmlFor = "toppingSelect";
  document.getElementById("customize_control").appendChild(label).appendChild(toppingSelect);
}

function generatePizza() {
    var selectedSize = document.getElementById('size').value;
    var selectedCrust = document.getElementById('crust').value;
    var options = document.getElementById('topping').selectedOptions;
    
    var pizzaModelName = './assets/Custom/' + selectedCrust;

    if (selectedToppings.length > 0) {
        selectedToppings.sort(function(a, b) {
            var textA = a.toUpperCase();
            var textB = b.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        pizzaModelName += '_' + selectedToppings.join('_');
    }
    pizzaModelName += ".gltf";

    console.log('Selected crust = ' + selectedCrust + ", size = " + selectedSize + ", toppings = " + selectedToppings);
    console.log('Pizza file = ' + pizzaModelName);

    const pizza = { scale: selectedSize, src: pizzaModelName };
    let model = document.querySelector('a-entity');
    setModel(pizza, model);
}

function setupGenerateButton() {
    let buttonGroup = document.getElementById('customize_control')
    let button = document.createElement('button')
    button.id = 'buttonGenerate';
    button.textContent = "Bake!";
    button.addEventListener('click', function() {
        generatePizza();
    });

    buttonGroup.appendChild(button)
}