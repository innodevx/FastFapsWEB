const promptDefault = process.env.PROMPT_DEFAULT;
const apiUrl = process.env.API_URL;
import './style.css'

document.addEventListener('DOMContentLoaded', function() {
  const promptInput = document.getElementById('promptInput');
  if (promptInput) {
    promptInput.value = promptDefault || '';
  }

  const generateImageButton = document.getElementById('generateImageButton');
  if (generateImageButton) {
    generateImageButton.addEventListener('click', onGenerateImageClick);
  }
});

function onGenerateImageClick() {
  const loadingButton = document.getElementById('loadingButton');
  const generateImageButton = document.getElementById('generateImageButton');

  if (loadingButton) loadingButton.style.display = 'block';
  if (generateImageButton) generateImageButton.style.display = 'none';

  const prompt = document.getElementById('promptInput').value;
  const width = document.getElementById('widthInput') ? document.getElementById('widthInput').value : 300;
  const height = document.getElementById('heightInput') ? document.getElementById('heightInput').value : 300;

  fetch(apiUrl + '/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: prompt,
      width: parseInt(width),
      height: parseInt(height),
      random_prompt: false,
      nsfw: false,
    })
  })
  .then(response => response.json())
  .then(data => {
    const imageContainer = document.getElementById('imageContainer');

    if (data.filenames && data.filenames.length > 0) {
      data.filenames.forEach(imageFilename => {
        const imageUrl = apiUrl + '/images/' + imageFilename;
        console.log(imageUrl);

        const img = document.createElement('img');
        img.src = imageUrl;
        img.classList.add('img-fluid', 'rounded');
        if (imageContainer) imageContainer.appendChild(img);

        if (data.characters) {
          const p = document.createElement('p');
          p.textContent = data.characters;
          if (imageContainer) imageContainer.appendChild(p);
        }

        const placeholderImg = document.getElementById('placeholderImg');
        if (placeholderImg) placeholderImg.remove();
      });
      document.getElementById('descriptionContainer').textContent = 'Images have been generated successfully.';
    } else {
      document.getElementById('descriptionContainer').textContent = 'No images were generated.';
    }

    if (loadingButton) loadingButton.style.display = 'none';
    if (generateImageButton) generateImageButton.style.display = 'block';
  })
  .catch(error => {
    console.error('Error:', error);
    document.getElementById('descriptionContainer').textContent = 'An error occurred while generating the image.';
    if (loadingButton) loadingButton.style.display = 'none';
    if (generateImageButton) generateImageButton.style.display = 'block';
  });
}
