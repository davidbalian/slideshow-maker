document.addEventListener("DOMContentLoaded", () => {
  const slider1 = document.getElementById("slider-1");
  const slider2 = document.getElementById("slider-2");
  const slider3 = document.getElementById("slider-3");
  const sliderImage = document.getElementById("slider-image");

  let currentSlide = 1;
  let slideshowInterval;
  let isTransitioning = false;
  let slide3Timer = null;

  function resetSliders() {
    const sliderFills = document.querySelectorAll(".slider-fill");
    sliderFills.forEach((fill) => fill.classList.remove("stretch"));
    currentSlide = 1;
    // Restart the slideshow after reset
    startSlideshow();
  }

  function updateSlide() {
    if (isTransitioning) return;
    isTransitioning = true;

    try {
      // Fade out current image
      sliderImage.classList.add("fade");

      // Wait for fade out, then update image and fade in
      setTimeout(() => {
        // Update image based on current slide
        switch (currentSlide) {
          case 1:
            sliderImage.src = "/assets/images/step-1.webp";
            slider1.querySelector(".slider-fill").classList.add("stretch");
            currentSlide = 2;
            break;
          case 2:
            sliderImage.src = "/assets/images/step-2.webp";
            slider2.querySelector(".slider-fill").classList.add("stretch");
            currentSlide = 3;
            break;
          case 3:
            sliderImage.src = "/assets/images/step-3.webp";
            slider3.querySelector(".slider-fill").classList.add("stretch");

            // Clear any existing timer
            if (slide3Timer) {
              clearTimeout(slide3Timer);
            }

            // Clear the interval while we wait for slide 3
            if (slideshowInterval) {
              clearInterval(slideshowInterval);
            }

            // Set a timer to reset after the full duration of slide 3
            slide3Timer = setTimeout(() => {
              resetSliders();
            }, 3000); // Wait for the full duration of slide 3
            break;
          default:
            currentSlide = 1;
        }

        // Fade in new image
        sliderImage.classList.remove("fade");
        isTransitioning = false;
      }, 300); // Wait for fade out
    } catch (error) {
      console.error("Error updating slide:", error);
      currentSlide = currentSlide === 3 ? 1 : currentSlide + 1;
      isTransitioning = false;
    }
  }

  function startSlideshow() {
    // Clear any existing interval to prevent multiple instances
    if (slideshowInterval) {
      clearInterval(slideshowInterval);
    }

    // Initial slide setup
    updateSlide();

    // Set up interval for automatic slideshow
    slideshowInterval = setInterval(updateSlide, 3000);
  }

  // Handle image loading errors
  sliderImage.onerror = () => {
    console.warn("Failed to load image, continuing slideshow");
    currentSlide = currentSlide === 3 ? 1 : currentSlide + 1;
    isTransitioning = false;
  };

  // Start the slideshow
  startSlideshow();

  // FAQ Accordion logic
  const faqItems = document.querySelectorAll(".faq-accordion-item");

  faqItems.forEach((item) => {
    const header = item.querySelector(".faq-accordion-item-header");
    const content = item.querySelector(".faq-accordion-item-content");
    const arrow = header.querySelector("img");

    // Set initial state
    content.style.maxHeight = "0px";

    header.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector(
            ".faq-accordion-item-content"
          );
          const otherArrow = otherItem.querySelector(
            ".faq-accordion-item-header img"
          );
          const otherHeader = otherItem.querySelector(
            ".faq-accordion-item-header"
          );
          otherContent.style.maxHeight = "0px";
          otherArrow.style.transform = "rotate(0deg)";
          otherHeader.classList.remove("active");
        }
      });

      // Toggle current item
      const isOpen = content.style.maxHeight !== "0px";
      content.style.maxHeight = isOpen ? "0px" : `${content.scrollHeight}px`;
      arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(90deg)";
      header.classList.toggle("active");
    });
  });
});
