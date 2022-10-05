let userInput = document.getElementById('user-input')
let main = document.getElementById('main')
let http = new XMLHttpRequest()
let res = null;
let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
let newAwesomplete = new Awesomplete(userInput, {autoFirst: true});
let cNames = null;
let cID = null;
// Content variables
let dType = document.getElementById('dtype')
let dName = document.getElementById('dname')
let titleImage = document.getElementById('title-image')
let ings = document.getElementById('ings')
let dirList = document.getElementById('dirs-list')

window.onload = function() {
    userInput.focus();
  }

let cocktail = {
    id: "",
    name: "",
    alcoholic: "",
    pic: "",
    ingridients: {
        pics: [],
        name: [],
        qty: []
    },
    directions: []
}

let fecthData = () =>{
    http.open('GET', url + userInput.value, true)
    http.responseType = 'json'
    
    http.onload = () => {
        res = http.response;
        if(res.drinks == null){
            return;
        }
        cNames = res.drinks.map((value, index, arr) => {
            return value.strDrink;
        })
        newAwesomplete.list = cNames;
        cID = res.drinks.map((value, index, arr) => {
            return value.idDrink;
        })
    }

    // http.onerror = () => {
    //     //Error handing goes here
    // }

    // http.onprogress = () => {
    //     //While req is under progress this methid will execute
    // }

    http.send()
}

userInput.addEventListener('input', fecthData)
userInput.addEventListener('awesomplete-select', obj => {
    //obj.text
    for(let i=0; i<res.drinks.length; i++){
        if(res.drinks[i].strDrink == obj.text){
            //console.log(res.drinks[i]);
            let temp = res.drinks[i]
            cocktail.id = temp.idDrink
            cocktail.name = temp.strDrink
            cocktail.alcoholic = temp.strAlcoholic
            cocktail.pic = temp.strDrinkThumb
            cocktail.directions = temp.strInstructions.split('.')
            for(let i = 1; i<=15; i++){
                if(temp['strIngredient' + i] == null){
                    break;
                }
                cocktail.ingridients.name[i-1] = temp['strIngredient' + i]
                cocktail.ingridients.pics[i-1] = 'https://www.thecocktaildb.com/images/ingredients/' + temp['strIngredient' + i] + '-Medium.png'
                cocktail.ingridients.qty[i-1] = (temp['strMeasure' + i] != null) ? temp['strMeasure' + i] : ""
            }
            //console.log(cocktail);
            //main.innerHTML = JSON.stringify(cocktail, null, 2)
            break;
        }
    }
    //plotting to page
    dType.innerHTML = cocktail.alcoholic
    dName.innerHTML = cocktail.name
    titleImage.src = cocktail.pic
    let temp = ""
    for(let i = 0; i<cocktail.ingridients.pics.length; i++){
        temp += '<li>' +
                '<div class="ing-image-cont"><img src="' + cocktail.ingridients.pics[i] + '" alt="Ingridient"></div>' +
                '<div class="ing-name">' + cocktail.ingridients.qty[i] + " " + cocktail.ingridients.name[i] + '</div>' +
                '</li>'
    }
    ings.innerHTML = temp;
    temp = ""
    for(let i=0; i<cocktail.directions.length - 1; i++){
        temp += '<li>' + cocktail.directions[i] + '</li>'
    }
    dirList.innerHTML = temp
    cocktail = {
        id: "",
        name: "",
        alcoholic: "",
        pic: "",
        ingridients: {
            pics: [],
            name: [],
            qty: []
        },
        directions: []
    }
})







// let cocktail2 = {
//     id: "12345",
//     name: "California Lemonade",
//     alcoholic: "Alcoholic",
//     pic: "http://google.com/image.jpg",
//     ingridients: {
//         pics: [
//             'link1',
//             'link2',
//             'link3'
//         ],
//         name: [
//             'name1',
//             'name2',
//             'name3'
//         ],
//         qty: [
//             'qty1',
//             'qty2',
//             'qty3'
//         ]
//     },
//     directions: [
//         'direction1',
//         'direction2',
//         'direction3'
//     ]
// }
