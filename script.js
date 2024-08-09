document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('dataForm');
    const idNumberInput = document.getElementById('idNumber');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Generate a random ID number
    idNumberInput.value = '#' + Math.floor(100000 + Math.random() * 900000);

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const rank = document.getElementById('rank').value;
        const idNumber = idNumberInput.value;
        const photo = document.getElementById('photo').files[0];

        // Margins for photo, ID, and name
        const photoMarginTop = 20;
        const photoMarginLeft = 20;
        const textMarginTop = 10; // Margin for ID number from top
        const textMarginRight = 10; // Margin for ID number from right
        const nameMarginLeft = 20; // Margin between photo and name

        if (photo) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    // Clear the canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw the image with margins
                    const imageSize = 100;
                    ctx.drawImage(img, photoMarginLeft, photoMarginTop, imageSize, imageSize);

                    // Set font size and padding
                    const fontSize = 16;

                    // Draw the user's name next to the photo with additional space
                    ctx.font = `bold ${fontSize}px Arial`;
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'left';
                    const nameText = 'Name: ' + name;
                    ctx.fillText(nameText, photoMarginLeft + imageSize + nameMarginLeft, photoMarginTop + imageSize / 2);

                    // Draw the ID number at the top-right corner with margin
                    ctx.font = `${fontSize}px Arial`;
                    ctx.textAlign = 'right';
                    ctx.fillText('ID: ' + idNumber, canvas.width - textMarginRight, textMarginTop + fontSize);

                    // Draw the Congratulations message at the bottom-right corner
                    const rankText = `Congratulations, you have secured ${rank} Rank`;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.textAlign = 'right';
                    ctx.fillText(rankText, canvas.width - textMarginRight, canvas.height - fontSize - textMarginRight);
                }
                img.src = e.target.result;
            }
            reader.readAsDataURL(photo);
        }
    });
});
