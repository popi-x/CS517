// This is where your JS goes!

// You can fetch data from https://cs571api.cs.wisc.edu/rest/f24/ice/chili
// When you are complete, you should also be able to fetch data from...
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pasta
//  https://cs571api.cs.wisc.edu/rest/f24/ice/pizza

let recipe;
let baseAmounts = [];
let review = [];

function updateRecipe(){

    recipe = document.getElementById("recipe-selector").value;

    fetch ("https://cs571.org/rest/f24/ice/" + recipe, {
        headers: {
            "X-CS571-ID": CS571.getBadgerId()
        }
    }).then((res) => {
        console.log(res.status)
        return res.json()
    }).then(data => {
        console.log("The recipe is....")
        console.log(data)

        const titleElem = document.getElementById("recipe-name");
        titleElem.innerText = data.name;
        console.log("Title", data.name);

        const authorElem = document.getElementById("recipe-author");
        authorElem.innerText = "by" + data.author;

        const imgElem = document.getElementsByTagName("img")[0];
        imgElem.src = data.img.location;
        imgElem.alt = data.img.description;

        const recipeElem = document.getElementById("instructions");
        for (let step of data.recipe){
            const newLiElem = document.createElement("li");
            newLiElem.innerText = step;
            recipeElem.appendChild(newLiElem);

        }
        let ingredients = data.ingredients;
        const ingredientsElem = document.getElementById("ingredients-body");
        ingredientsElem.innerHTML = ""; // clear out any existing ingredients
        let ingdtNames = Object.keys(ingredients);

        for (let ingdtName of ingdtNames){
            let ingdt = ingredients[ingdtName];

            const newRowElem = document.createElement("tr");
            const amountElem = document.createElement("td");
            const unitElem = document.createElement("td");
            const nameElem = document.createElement("td");

            amountElem.innerText = ingdt.amount;
            if (ingdt.unit){
                unitElem.innerText = ingdt.unit;
            }
            if (ingdt.misc){
                nameElem.innerText = ingdtName + " (" + ingdt.misc + ")";
            }
            else {
                nameElem.innerText = ingdtName;
            }

            newRowElem.appendChild(amountElem);
            newRowElem.appendChild(unitElem);
            newRowElem.appendChild(nameElem);
            ingredientsElem.appendChild(newRowElem);

            baseAmounts.push(ingdt.amount);
        }
        
        for (let re of data.reviews){
            review.push(re.txt); 
        }

    })

    console.log("I will be executed first!");   
}

function updateYield(){
    const servingNum = document.getElementById("serving-selector").value;
    let rows = document.getElementById("ingredients-body").getElementsByTagName("tr");

    for (let i=0; i<rows.length; i++){
        rows[i].getElementsByTagName("td")[0].innerText = baseAmounts[i] * servingNum; 
    }
}

cnt = 0;

function displayReview(){
    if (!recipe){
        alert("I'm still loading the recipe!");
    } else{
        alert(review[cnt]); 
        cnt = (cnt + 1) % review.length;
    } 
}

updateRecipe();


