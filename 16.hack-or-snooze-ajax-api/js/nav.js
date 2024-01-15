"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}
$body.on("click", "#nav-all", navAllStories);

// function to show new story submit form when user click "submit" on top nav
function navStorySubmitEvent(e){
  console.debug("navStorySubmitEvent", e);
  hidePageComponents();
  $allStoriesList.show();
  $submitForm.show();
}
$navStorySubmit.on("click", navStorySubmitEvent);

//function to show user favorite stories when user click "favorites" on top nav
function navMyFavoritesEvent(e){
  console.debug("navMyFavoritesEvent", e);
  hidePageComponents();
  putFavoritesListOnPage();
}
$body.on("click", "#nav-my-favorites", navMyFavoritesEvent);

//function to show user stories when user click "my stories" on top nav
function navMyStoryList(e){
  console.debug("navMyStoryList", e);
  hidePageComponents();
  putUserStoriesOnPage();
  $ownStories.show();
}
$body.on("click", "#nav-my-story-list", navMyStoryList);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

//when user click "profile", it shows user profile info
function navUserProfileEvent(e){
  console.debug("navUserProfileEvent", e);
  hidePageComponents();
  $userProfile.show();
}
$navUserProfile.on("click", navUserProfileEvent);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
