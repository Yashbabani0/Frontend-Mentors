const images = {
    bgDesktopDark: '/public/bg-desktop-dark.jpg',
    bgDesktopLight: '/public/bg-desktop-light.jpg',
    bgMobileDark: '/public/bg-mobile-dark.jpg',
    bgMobileLight: '/public/bg-mobile-light.jpg',
};

async function cacheImage(path) {
    const response = await fetch(path);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

async function cacheImages() {
    for (const [id, path] of Object.entries(images)) {
        if (!localStorage.getItem(path)) {
            const base64Image = await cacheImage(path);
            localStorage.setItem(path, base64Image);
        }
    }
}

function loadCachedImages() {
    for (const [id, path] of Object.entries(images)) {
        const cachedImage = localStorage.getItem(path);
        if (cachedImage) {
            const pictureElement = document.getElementById(id);
            if (pictureElement) {
                pictureElement.innerHTML = `<img src="${cachedImage}" alt="${id} background">`;
            }
        } else {
            const pictureElement = document.getElementById(id);
            if (pictureElement) {
                pictureElement.innerHTML = `<img src="${path}" alt="${id} background">`;
            }
        }
    }
}

window.addEventListener('load', async () => {
    await cacheImages();
    loadCachedImages();
});
