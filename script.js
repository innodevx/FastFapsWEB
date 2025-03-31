const promptDefault = import.meta.env.VITE_PROMPT_DEFAULT;
const apiUrl = import.meta.env.VITE_API_URL;

$(document).ready(function() {
    var defaultValue = promptDefault || '';
    $('#promptInput').val(defaultValue);

    $('#widthInput').val(824);
    $('#heightInput').val(1328);
});

function onGenerateImageClick() {
    $('#loadingButton').show();
    $('#generateImageButton').hide();

    const prompt = $('#promptInput').val();
    const width = $('#widthInput').val();
    const height = $('#heightInput').val();

    $.ajax({
        url: `${apiUrl}/generate`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            prompt: prompt,
            width: parseInt(width),
            height: parseInt(height),
            random_prompt: false,
            nsfw: false,
        }),
        success: function(response) {
            if (response.filenames && response.filenames.length > 0) {
                let imageHtml = '';
                response.filenames.forEach(function(imageFilename) {
                    const imageUrl = `${apiUrl}/images/${imageFilename}`;
                    console.log(imageUrl);

                    $('#imageContainer').append(`<img src="${imageUrl}" class="img-fluid rounded">`);
                    
                    if (response.characters) {
                        $('#imageContainer').append(`<p>${response.characters}</p>`);
                    }

                    $('#placeholderImg').remove();
                });

                $('#descriptionContainer').text('Images have been generated successfully.');
            } else {
                $('#descriptionContainer').text('No images were generated.');
            }

            $('#loadingButton').hide();
            $('#generateImageButton').show();
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
            $('#descriptionContainer').text('An error occurred while generating the image.');
            $('#loadingButton').hide();
            $('#generateImageButton').show();
        }
    });
}

$('#generateImageButton').on('click', onGenerateImageClick);
