"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, showDeleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small><br>
        <small class="story-author">by ${story.author}</small><br>
        <small class="story-user">posted by ${story.username}</small>
        <hr>
      </li>
    `);
}

function getDeleteBtnHTML(){
  return ` 
    <span class="trash-can">
      <i class="fas fa-trash-alt"></i>
    </span>`;
}


function getStarHTML(story, user){
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function deleteStory(e){
  console.debug("deleteStory");

  const $closestLi = $(e.target).closest("Li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);
  await putUserStoriesOnPage();
}
$ownStories.on("click", ".trash-can", deleteStory);

async function submitNewStory(e){
  console.debug("submitNewStory");
  e.preventDefault();

  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();
  const username = currentUser.username;
  const storyData = {title, url, author, username};

  const newUserstory = await storyList.addStory(currentUser, storyData);

  const $story = generateStoryMarkup(newUserstory);
  $allStoriesList.prepend($story);

  $submitForm.slideUp("slow");
  $submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $ownStories.empty();

  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }

  $ownStories.show();
}


function putFavoritesListOnPage(){
  console.debug("putFavoritesListOnPage");

  $userFavorites.empty();

  if(currentUser.favorites.length === 0){
    $userFavorites.append("<h5>No favorites added yet </h5>");
  } else {
    for (let story of currentUser.favorites){
      const $story = generateStoryMarkup(story);
      $userFavorites.append($story);
    }
  }
  $userFavorites.show();
}

async function toggleStoryFavorite(e){
  console.debug("toggleStoryFavorite");

  const $tgt = $(e.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  if ($tgt.hasClass("fas")){
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}
$storiesList.on("click", ".star", toggleStoryFavorite);