const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// When the page loads, make a 'GET' request to fetch all the toy objects.
document.addEventListener("DOMContentLoaded", () => {
  // console.log("hello");
  const endpoint = "http://localhost:3000/toys/";
  fetch(endpoint)
    .then(resp => resp.json())
    .then(parsedToys => showToys(parsedToys));

  //grab parent
  toyParent = document.getElementById("toy-collection");
  console.log(toyParent);

  // With the response data, make a <div class="card"> for each toy
  const showToys = toys => {
    toys.forEach(toy => {
      toyCard = document.createElement("DIV");

      toyCard.innerHTML = `<div class="card"><h2>${toy.name}</h2><img src=${toy.image} class="toy-avatar" /><p>Likes: ${toy.likes} </p><button class="like-btn">Like <3</button></div>`;

      //add it to the toy-collection div.
      toyParent.append(toyCard);
    });
  };

  //SAVING TOYS====================================================================================

  //grab form data

  const postToys = formData => {
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: formData.name.value,
        image: formData.image.value,
        likes: 0
      })
    })
      .then(resp => resp.json())
      .then(newToyObj => {
        // with this object, create toy cards.
        renderToy(newToyObj);
      });
  };
  //RENDER POSTED TOY OPTIMISTICALLY
  const renderToy = newToyObj => {
    toyCard = document.createElement("DIV");

    toyCard.innerHTML = `<div class="card"><h2>${newToyObj.name}</h2><img src=${newToyObj.image} class="toy-avatar" /><p>Likes: ${newToyObj.likes} </p><button class="like-btn">Like <3</button></div>`;

    //add it to the toy-collection div.
    toyParent.append(toyCard);
  };

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener("submit", event => {
        event.preventDefault();
        postToys(event.target);
      });
    } else {
      toyForm.style.display = "none";
    }
  });
});
