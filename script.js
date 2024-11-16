const galleryElement = document.getElementById("gallery");
const spinnerElement = document.getElementById("spinner");

let imageList = [];
let isReady = false;
let imagesLoadedCount = 0;
let totalImagesCount = 0;

const imageCount = 10;
const apiKey = "0DJFLHoOOB0403Lwk37QcD_bbGbMJqyTTLu7lysOtiI"; 
const apiEndpoint = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function onImageLoad() {
    imagesLoadedCount++;
    if (imagesLoadedCount === totalImagesCount) {
        isReady = true;
        console.log("All images loaded:", isReady);
    }
}

function renderImages() {
    totalImagesCount = imageList.length;
    imagesLoadedCount = 0;

    imageList.forEach((image) => {
        const anchor = document.createElement("a");
        setAttributes(anchor, {
            href: image.links.html,
            target: "_blank",
        });

        const imgElement = document.createElement("img");
        setAttributes(imgElement, {
            src: image.urls.regular,
            alt: image.alt_description,
            title: image.alt_description,
        });

        imgElement.addEventListener('load', onImageLoad);
        anchor.appendChild(imgElement);
        galleryElement.appendChild(anchor);
    });
}

async function fetchImages() {
    try {
        const response = await fetch(apiEndpoint);
        imageList = await response.json();
        renderImages();
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight && isReady) {
        isReady = false;
        fetchImages();
    }
});


fetchImages();