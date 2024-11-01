$(document).ready(function () {
    // Typing animation using setTimeout
    (function ($) {
        $.fn.writeText = function (content) {
            let contentArray = content.split("");
            let current = 0;
            const elem = this;

            const typeCharacter = () => {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                    setTimeout(typeCharacter, 80);
                }
            };

            typeCharacter();
        };
    })(jQuery);

    // Input text for typing animation
    $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");

    // Initialize WOW.js
    new WOW().init();

    // Handle navigation menu
    const NAV_ANIMATION_SPEED = 200;

    $(".fa-bars").click(function () {
        $(".nav-screen").animate({ right: "0px" }, NAV_ANIMATION_SPEED);
        $("body").animate({ right: "285px" }, NAV_ANIMATION_SPEED);
    });

    $(".fa-times, .nav-links a").click(function () {
        $(".nav-screen").animate({ right: "-285px" }, NAV_ANIMATION_SPEED);
        $("body").animate({ right: "0px" }, NAV_ANIMATION_SPEED);
    });

    // Fullpage.js initialization
    $("#fullpage").fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
        anchors: ["home", "about", "portfolio", "contact", "connect"],
        menu: "#myMenu",
        fitToSection: false,
        afterLoad: function (anchorLink, index) {
            const headerLinks = $(".header-links a");
            if (index === 1) {
                $(".fa-chevron-down").css("opacity", "1");
                headerLinks.css("color", "white");
                $(".header-links").css("background-color", "transparent");
            } else {
                headerLinks.css("color", "black");
                $(".header-links").css("background-color", "white");
            }

            if (index === 2) {
                $(".skillbar").each(function () {
                    $(this).find(".skillbar-bar").animate(
                        { width: $(this).attr("data-percent") },
                        2500
                    );
                });
            }
        }
    });

    // Smooth scrolling for navigation links
    $("a[href*=#]:not([href=#])").click(function () {
        const target = $(this.hash.length ? this.hash : `[name=${this.hash.slice(1)}]`);
        if (target.length) {
            $("html, body").animate({ scrollTop: target.offset().top }, 700);
            return false;
        }
    });

    // AJAX form submission
    $("#ajax-contact").submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize();

        $.ajax({
            type: "POST",
            url: $(this).attr("action"),
            data: formData
        })
        .done(function (response) {
            $("#form-messages").removeClass("error").addClass("success").text(response);
            $("#name, #email, #message").val(""); // Clear form fields
        })
        .fail(function (data) {
            $("#form-messages").removeClass("success").addClass("error");
            const errorMessage = data.responseText || "Oops! An error occurred and your message could not be sent.";
            $("#form-messages").text(errorMessage);
        });
    });
});
