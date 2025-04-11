document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("nojs").style.display = "none";

    const sections = document.querySelectorAll("h2");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    const setActiveLink = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3 - 50) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentSection) {
                link.classList.add("active");
            }
        });

        if (currentSection) {
            history.replaceState(null, null, `#${currentSection}`);
        } else {
            history.replaceState(null, null, " ");
        }
    };

    window.addEventListener("scroll", setActiveLink);
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
                history.replaceState(null, null, `#${targetId}`);
            }
        });
    });

    const sectionContents = document.querySelectorAll(".section-content");
    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "pink"];
    let currentColor = 0;

    sectionContents.forEach(element => {
        element.classList.add(`sc-${colors[currentColor]}`);
        currentColor++;
        if (currentColor >= colors.length) {
            currentColor = 0;
        }
    });

    const colorElements = document.querySelectorAll(".color");

    colorElements.forEach(element => {
        const colorNameElement = element.querySelector(".color-code");
        if (colorNameElement) {
            const color = colorNameElement.textContent.trim();
            element.style.backgroundColor = color;

            // Create a darker border color
            const darkerColor = tinycolor(color).isDark()
                ? tinycolor(color).lighten(30).toString()
                : tinycolor(color).darken(30).toString();
            element.style.border = `1px solid ${darkerColor}`;

            element.addEventListener("click", () => {
                navigator.clipboard.writeText(color);
                const tooltip = document.createElement("span");
                tooltip.className = "tooltip";
                tooltip.textContent = `Copied ${color} to clipboard!`;
                document.body.appendChild(tooltip);
                setTimeout(() => {
                    tooltip.remove();
                }, 2000);
            });
        }

        const colorTextElement = element.querySelector(".color-text");
        if (colorTextElement) {
            const colorText = colorTextElement.textContent.trim();
            element.style.color = colorText;
        }

        if (colorNameElement && colorTextElement) {
            const colorText = colorTextElement.textContent.trim();
            colorNameElement.style.color = colorText;
        }
    });
});
