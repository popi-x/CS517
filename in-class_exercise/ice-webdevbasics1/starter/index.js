// This is where your JS goes!

const BASE_AMNS = [1, 15, 14.5, 2, 1, 1, 1]
const REVIEWS = [
    "A burst of warmth and flavor in every spoonful; simple yet irresistible!",
    "The perfect blend of spice and comfort, an easy go-to chili recipe.",
    "Loved the hearty texture and rich taste - a new family favorite!",
    "Quick, flavorful, and satisfying - this chili hits all the right notes!"
]


function updateServingNum(){
    let servingNum = document.getElementById("num-servings").value;
    let rows = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++){
        rows[i].getElementsByTagName("td")[0].innerText = BASE_AMNS[i] * parseInt(servingNum);
    }
}

let reviewNum = 0;

function displayReview(){
    alert(REVIEWS[reviewNum]);
    reviewNum = (reviewNum + 1) % REVIEWS.length;
}