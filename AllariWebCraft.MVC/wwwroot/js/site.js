function updateClock() {
    var now = new Date();

    // get hours, minutes, and seconds and format them with leading zeros if needed
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');

    var timeString = `${hours}:${minutes}:${seconds}`;
    $('#clock').text(timeString);
}

function createCarouselItems() {
    var imageUrls = [
        "/images/img1.png",
        "/images/img2.png",
        "/images/img3.png",
        "/images/img4.png",
        "/images/img5.png",
        "/images/img6.png"
    ];

    // get references to carousel elements
    var carouselInner = $("#dynamicImageSlider .carousel-inner");
    var carouselIndicators = $("#dynamicImageSlider .carousel-indicators");

    imageUrls.forEach(function (imageUrl, index) {
        // create a new carousel item element
        var carouselItem = $("<div>").addClass("carousel-item" + (index === 0 ? " active" : ""));

        // create and configure the image element
        var img = $("<img>").addClass("d-block w-100").attr({ src: imageUrl, alt: "Image " + (index + 1) });
        carouselItem.append(img);

        // create and configure the carousel indicator element
        var indicator = $("<li>").attr({ "data-bs-target": "#dynamicImageSlider", "data-bs-slide-to": index });
        indicator.addClass(index === 0 ? "active" : "");

        carouselInner.append(carouselItem);
        carouselIndicators.append(indicator);
    });
}

$(document).ready(function () {        
    createCarouselItems();
    updateClock();
    setInterval(updateClock, 1000);

    // update mouse position on mousemove
    $(document).mousemove(function (event) {
        $('#mouseX').text(event.clientX);
        $('#mouseY').text(event.clientY);
    });

    const ripple = $('<div class="ripple"></div>');

    // create ripple effect on mousedown
    $(document).on('mousedown', '.btn', function (e) {
        const $target = $(e.target);

        if ($target.hasClass('btn')) {           

            ripple.css({
                top: e.offsetY + 'px',
                left: e.offsetX + 'px'
            });

            $target.append(ripple);

            setTimeout(function () {
                ripple.remove();
            }, 600);
        }
    });

    // Generate list on button click using AJAX
    $("#generateListButton").click(function () {
        $.ajax({
            url: "/api/list",
            method: "GET",
            success: function (data) {
                if (Array.isArray(data)) {
                    const itemsList = data.map(item => `<li>${item}</li>`).join('');
                    $("#generatedList").html(`<ul>${itemsList}</ul>`);
                }
            }
        });
    });
});