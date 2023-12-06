 

//1. Select the section with an id of container without using querySelector.
document.getElementById("container");

//2. Select the section with an id of container using querySelector.
document.querySelector("#container");

// 3. Select all of the list items with a class of “second”.
document.getElementsByClassName("second");

document.querySelectorAll(".second");

// 4. Select a list item with a class of third, but only the list item inside of the ol tag.
 const q4 = document.querySelectorAll(".third");
 q4[1];

// 5. Give the section with an id of container the text “Hello!”.
const hello = document.getElementById("container");
hello.textContent = "Hello";

// 6. Add the class main to the div with a class of footer.
const div = document.querySelector(".footer");
div.classList.add("footer", "main");

// 7. Remove the class main on the div with a class of footer.
div.classList.remove("main");

// 8. Create a new li element.
const li = document.createElement("li");

// 9. Give the li the text “four”.
li.innerText = "four";

// 10. Append the li to the ul element.

// 11. Loop over all of the lis inside the ol tag and give them a background color of “green”.
const lists = document.querySelector("ol");
lists.style.backgroundColor = "green";

// 12. Remove the div with a class of footer