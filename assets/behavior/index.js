/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.hayder.design/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: YouTubeTracker,
	Description: Tracking YouTube"s data.
	Beneficiary: COSMOS
	
	Copyright © 1992 - 2021 HAYDER, All Rights Reserved.
	
	
	
*/
const body = document.querySelector("body"); //body element

const modal = document.getElementById("modals"); //modal element
const content = document.getElementById("content");
const card = content.querySelectorAll("#card");
const modalwindow = document.getElementById("window");

const topBtn = document.getElementById("returnTop"); //scroll to top button

const sectionTracker = modal.querySelector("#trackers");
const trackers = sectionTracker.querySelector("ul");
const tracker = trackers.querySelectorAll("li");

// for the tracker list
const trackMenu = document.getElementById("trackMenu");
const trackBtn = document.querySelectorAll("#trackStatusButton");

// keeping tracks of selected tracks and channels
const bottom = document.getElementById("bottom");
const message = bottom.querySelector("#message");
const details = message.querySelector("#details");
const btnWrapper = message.querySelector("#buttonWrapper");
const closeBtn = bottom.querySelector("#close");

// for the sort options
const filters = document.getElementById("filters");
const listItems = filters.querySelector(".listItems");
const sortToggler = document.getElementById("sort-toggler");
const sortLabel = document.getElementById("sortLabel");

// for the view types
const viewTypes = document.getElementById("views");
const viewType = viewTypes.querySelectorAll(".viewButton");

// for adding favorites
const favor = document.querySelectorAll("#favor");

// search bar
const search = document.querySelector("#search");

// variables to count selected channels and videos
let selectionChannel = 0;
let selectionVideo = 0;

viewType.forEach((view) => {
  //view buttons toggle
  view.addEventListener("click", () => {
    if (!view.classList.contains("selected")) {
      viewTypes.querySelector(".selected").classList.remove("selected");
      view.classList.add("selected");
    }
  });
});

document.addEventListener("scroll", () => {
  //behavior for the nav menu
  const nav = document.querySelector("nav");
  const navsearch = nav.querySelector("input");
  const navlist = nav.querySelector("ul");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    //removes the top links and replaces it with the search bar
    search.style.display = "none";
    navsearch.classList.remove("invisible");
    navlist.classList.add("invisible");
  } else {
    search.style.display = "initial";
    navsearch.classList.add("invisible");
    navlist.classList.remove("invisible");
  }

  if (
    //displays the scroll to top button
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    topBtn.classList.add("scroll");
  } else {
    topBtn.classList.remove("scroll");
  }
});

topBtn.addEventListener("click", () => {
  //behavior of the scroll to top button
  window.scrollTo(0, 0);
});

tracker.forEach((modalTrack) => {
  //for adding style to selected tracks
  modalTrack.addEventListener("click", () => {
    const modalTrackBtn = modalTrack.querySelector("#checkMark");
    modalTrackBtn.classList.toggle("selected");
  });
});

trackBtn.forEach((btn) => {
  //displaying the track list if clicked on the 'tracks' button
  btn.addEventListener("click", () => {
    var rect = btn.getBoundingClientRect();

    trackMenu.classList.toggle("hidden");
    trackMenu.classList.toggle("dummy");
    btn.classList.toggle("selected");

    trackMenu.style.position = "fixed";
    trackMenu.style.top = rect.top - 410 + "px";
    trackMenu.style.left = rect.left - 105 + "px";

    const trck = trackMenu.querySelectorAll("li"); //addomg styles to selected tracks inside modals
    trck.forEach((t) => {
      t.addEventListener("click", () => {
        const b = t.querySelector("button");
        b.classList.toggle("selected");
        trackMenu.style.position = "fixed";
        trackMenu.style.top = rect.top - 210 + "px";
        trackMenu.style.left = rect.left - 105 + "px";
      });
    });

    const addTrack = trackMenu.querySelector("#addTracker");
    const createTrack = trackMenu.querySelector("#createTrackerForm");
    const formWrapper = createTrack.querySelector("#createTrackerFormWrapper");
    const createTracker = trackMenu.querySelector("#createTracker");

    addTrack.addEventListener("click", (e) => {
      //for adding tracks
      e.preventDefault();
      addTrack.style.display = "none";
      formWrapper.style.maxHeight = "300px";
      trackMenu.style.top = rect.top - 595 + "px";
      createTracker.style.display = "initial";

      createTracker.addEventListener("click", (e) => {
        //for create form in tracklist
        e.preventDefault();
        addTrack.style.display = "initial";
        createTracker.style.display = "none";
        formWrapper.style.maxHeight = "0px";
        trackMenu.style.top = rect.top - 405 + "px";
      });
    });
  });
});

sortToggler.addEventListener("click", () => {
  listItems.classList.remove("invisible");
  const rect = sortToggler.getBoundingClientRect();
  listItems.style.position = "absolute";
  listItems.style.top = rect.top - 140 + "px";
  listItems.style.left = rect.left - 30 + "px";
  const listItem = listItems.querySelectorAll("button");
  listItem.forEach((item) => {
    item.addEventListener("click", () => {
      listItems.classList.add("invisible");
      listItems.querySelector(".selected").classList.remove("selected");
      item.classList.add("selected");
      sortLabel.textContent = listItems.querySelector(".selected").textContent;
    });
  });
});

card.forEach((crd) => {
  //behavior for the cards
  const thumbnail = crd.querySelector("#thumbnail");
  const photo = thumbnail.querySelector("img");
  const checkMark = thumbnail.querySelector("button");

  const addTracker = modal.querySelector("#addTracker");
  const trackercreate = modal.querySelectorAll("input");
  const trackertext = modal.querySelector("textarea");
  const createBtn = modal.querySelector("#createTracker");

  checkMark.addEventListener("click", () => {
    //behavior for the selection of tracks and channels
    checkMark.classList.toggle("highlighted");
    if (checkMark.classList.contains("highlighted")) {
      if (crd.classList.contains("channel")) {
        //checks for selected channels
        selectionChannel++;
      } else {
        selectionVideo++;
      }
    } else {
      if (crd.classList.contains("channel")) {
        //checks for unselected channels
        selectionChannel--;
      } else {
        selectionVideo--;
      }
    }
    if (selectionVideo > 0 || selectionChannel > 0) {
      //to keep track of selected channels and tracks
      message.style.backgroundColor = "#fd4444";
      btnWrapper.classList.remove("invisible");
      closeBtn.style.display = "initial";
      closeBtn.addEventListener("click", () => {
        btnWrapper.classList.add("invisible");
        closeBtn.style.display = "none";
        selectionChannel = 0;
        selectionVideo = 0;
        resetBottom();
        card.forEach((c) => {
          checkMark.classList.remove("highlighted");
        });
      });
      if (selectionChannel > 0 && selectionVideo > 0) {
        //displaying correct count
        details.innerHTML = `${selectionVideo + " Videos . "} 
        ${selectionChannel + " Channels selected"}`;
      } else if (selectionChannel > 0 && selectionVideo === 0) {
        details.innerHTML = `${selectionChannel + " Channels "}selected`;
      } else {
        details.innerHTML = `${selectionVideo + " Videos "}selected`;
      }
    } else {
      closeBtn.style.display = "none";
    }
  });

  photo.addEventListener("click", () => {
    //behavior of the cards. modal pops up if clicked
    modal.classList.remove("invisible");
    window.scrollTo(0, 0); //scroll into visibility
    body.style.overflow = "hidden";
    console.log(photo.offsetTop);

    modalwindow.addEventListener("click", () => {
      //closes the modal window
      modal.classList.add("invisible");
      content.style.visibility = "visible";
      body.style.overflow = "initial";

      addTracker.style.display = "flex";
      trackercreate.forEach((tc) => {
        tc.style.display = "none";
      });
      trackertext.style.display = "none";
      createBtn.style.display = "none";
    });

    addTracker.addEventListener("click", (e) => {
      e.preventDefault();
      addTracker.style.display = "none";
      trackercreate.forEach((tc) => {
        tc.style.display = "initial";
      });
      trackertext.style.display = "initial";
      createBtn.style.display = "initial";
    });

    createBtn.addEventListener("click", () => {
      e.preventDefault();
      addTracker.style.display = "flex";
      trackercreate.forEach((tc) => {
        tc.style.display = "none";
      });
      trackertext.style.display = "none";
      createBtn.style.display = "none";
    });
  });
});

favor.forEach((fv) => {
  //for adding to favorites
  fv.addEventListener("click", () => {
    // fv.classList.remove("highlighted");
    fv.classList.toggle("selected");
  });
});

function resetBottom() {
  details.textContent = "Select Videos/ Channels to track";
  message.style.backgroundColor = "#4b9fff";
  closeBtn.style.display = "none";
}

function crossSign() {
  const icon = search.querySelector("i");
  icon.className = "fas fa-times fa-3x";

  icon.addEventListener("click", () => {
    const input = search.querySelector("input");
    input.value = "";
  });
}

resetBottom();
