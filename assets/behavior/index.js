/*



	" Reimplement the wheel to either learn, or make it better. "

    http://www.hayder.design/
    https://www.youtube.com/watch?v=QOlTGA3RE8I
    
    Product Name: YouTubeTracker,
	Description: Tracking YouTube"s data.
	Beneficiary: COSMOS
	
	Copyright © 1992 - 2021 HAYDER, All Rights Reserved.
	
	
	
*/
const body = document.querySelector("body");

const modal = document.getElementById("modals");
const content = document.getElementById("content");
const card = content.querySelectorAll("#card");
const modalwindow = document.getElementById("window");

const topBtn = document.getElementById("returnTop");

const sectionTracker = modal.querySelector("#trackers");
const trackers = sectionTracker.querySelector("ul");
const tracker = trackers.querySelectorAll("li");

const trackMenu = document.getElementById("trackMenu");
const trackBtn = document.querySelectorAll("#trackStatusButton");

const bottom = document.getElementById("bottom");
const message = bottom.querySelector("#message");
const details = message.querySelector("#details");
const btnWrapper = message.querySelector("#buttonWrapper");
const closeBtn = bottom.querySelector("#close");

const filters = document.getElementById("filters");
const filter = filters.querySelectorAll("li");
const sortToggler = document.getElementById("sort-toggler");

const viewTypes = document.getElementById("views");
const viewType = viewTypes.querySelectorAll("button");

const favor = document.querySelectorAll("#favor");

let selectionChannel = 0;
let selectionVideo = 0;

btnWrapper.addEventListener("click", () => {
  var rect = btnWrapper.getBoundingClientRect();
  btnWrapper.classList.add("selected");
});

document.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  const search = document.querySelector("#search");
  const navsearch = nav.querySelector("input");
  const navlist = nav.querySelector("ul");
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    // const seperator = document.getElementById("seperator");
    // seperator.style.display = "none";
    search.style.display = "none";
    navsearch.classList.remove("invisible");
    navlist.classList.add("invisible");
  } else {
    search.style.display = "initial";
    navsearch.classList.add("invisible");
    navlist.classList.remove("invisible");
  }

  if (
    document.body.scrollTop > 2500 ||
    document.documentElement.scrollTop > 2500
  ) {
    topBtn.classList.add("scroll");
  } else {
    topBtn.classList.remove("scroll");
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

tracker.forEach((modalTrack) => {
  modalTrack.addEventListener("click", () => {
    const modalTrackBtn = modalTrack.querySelector("#checkMark");
    modalTrackBtn.classList.toggle("selected");
  });
});

trackBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    var rect = btn.getBoundingClientRect();

    trackMenu.classList.toggle("hidden");
    trackMenu.classList.toggle("dummy");
    btn.classList.toggle("selected");

    trackMenu.style.position = "fixed";
    trackMenu.style.top = rect.top - 410 + "px";
    trackMenu.style.left = rect.left - 105 + "px";

    const trck = trackMenu.querySelectorAll("li");
    trck.forEach((t) => {
      t.addEventListener("click", () => {
        const b = t.querySelector("button");
        b.classList.toggle("selected");
      });
    });

    const addTrack = trackMenu.querySelector("#addTracker");
    const createTrack = trackMenu.querySelector("#createTrackerForm");
    const createTracker = trackMenu.querySelector("#createTracker");
    addTrack.addEventListener("click", (e) => {
      e.preventDefault();
      addTrack.style.display = "none";
      createTracker.style.display = "initial";
    });
  });
});

sortToggler.addEventListener("click", () => {
  filter[0].classList.add("selected");
  filter.forEach((tab) => {
    const filterBtn = tab.querySelector("button");
    filterBtn.classList.toggle("invisible");
    sortToggler.classList.remove("invisible");
    tab.addEventListener("click", () => {
      filters.querySelector(".selected").classList.remove("selected");
      filterBtn.classList.add("selected");
    });
  });
});

card.forEach((crd) => {
  const thumbnail = crd.querySelector("#thumbnail");
  const photo = thumbnail.querySelector("img");
  const checkMark = thumbnail.querySelector("button");

  checkMark.addEventListener("click", () => {
    checkMark.classList.toggle("highlighted");
    if (checkMark.classList.contains("highlighted")) {
      if (crd.classList.contains("channel")) {
        selectionChannel++;
      } else {
        selectionVideo++;
      }
    } else {
      if (crd.classList.contains("channel")) {
        selectionChannel--;
      } else {
        selectionVideo--;
      }
    }
    if (selectionVideo > 0 || selectionChannel > 0) {
      bottom.classList.remove("invisible");
      btnWrapper.classList.remove("invisible");
      closeBtn.classList.remove("invisible");
      closeBtn.addEventListener("click", () => {
        bottom.classList.add("invisible");
        btnWrapper.classList.add("invisible");
        closeBtn.classList.add("invisible");
        selectionChannel = 0;
        selectionVideo = 0;
        card.forEach((c) => {
          checkMark.classList.remove("highlighted");
        });
      });
      if (selectionChannel > 0 && selectionVideo > 0) {
        details.innerHTML = `${selectionVideo + " Videos . "} 
        ${selectionChannel + " Channels selected"}`;
      } else if (selectionChannel > 0 && selectionVideo === 0) {
        details.innerHTML = `${selectionChannel + " Channels "}selected`;
      } else {
        details.innerHTML = `${selectionVideo + " Videos "}selected`;
      }
    } else {
      bottom.classList.add("invisible");
      closeBtn.classList.add("invisible");
    }
  });

  // tracks.addEventListener("click", () => {
  //   trackMenu.classList.toggle("dummy");
  //   trackMenu.classList.toggle("hidden");
  // });

  photo.addEventListener("click", () => {
    modal.classList.remove("invisible");
    window.scrollTo(0, 0);
    body.style.overflow = "hidden";
    console.log(photo.offsetTop);

    modalwindow.addEventListener("click", () => {
      modal.classList.add("invisible");
      content.style.visibility = "visible";
      body.style.overflow = "initial";
    });
  });
});

favor.forEach((fv) => {
  fv.addEventListener("click", () => {
    // fv.classList.remove("highlighted");
    fv.classList.toggle("selected");
  });
});
