function hideAllTextSections() {
  const sections = [
    'introductions',
    'text_stilllifes',
    'text_oscillators',
    'text_spaceships',
    'center-image',
  ];
  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section.classList.contains('d-block')) {
      section.classList.remove('d-block');
      section.classList.add('d-none');
    }
  });
}
function hideAllImages() {
  const stillImages = document.querySelectorAll('.still-image');
  const oscImages = document.querySelectorAll('.osc-image');
  const spaceImages = document.querySelectorAll('.space-image');

  hideImageCategory(stillImages);
  hideImageCategory(oscImages);
  hideImageCategory(spaceImages);
}

function hideImageCategory(images) {
  images.forEach((image) => {
    image.classList.add('d-none');
  });
}

// Function to show a specific text section
function showTextSection(sectionId) {
  hideAllTextSections();
  const section = document.getElementById(sectionId);
  section.classList.remove('d-none');
  section.classList.add('d-block');
}

function showImages(category) {
  hideAllImages();
  const imagesToShow = document.querySelectorAll(`.${category}`);
  imagesToShow.forEach((image) => {
    image.classList.remove('d-none');
  });
}

// Event listeners for buttons
document.getElementById('still_lifes').addEventListener('click', function () {
  showTextSection('text_stilllifes');
  showImages('still-image');
});

document.getElementById('oscillators').addEventListener('click', function () {
  showTextSection('text_oscillators');
  showImages('osc-image');
});

document.getElementById('spaceships').addEventListener('click', function () {
  showTextSection('text_spaceships');
  showImages('space-image');
});
