


export function printPage(printWidth: string, callback: () => void) {

    // Add the page cover to hide the changed styles
    const pageCover = document.createElement("div");
    pageCover.classList.add("page-cover", "page-cover-visible");
    document.body.appendChild(pageCover);

    setTimeout(() => {



            /* Page Stylesheets */

        // Page styles
        const styleSheets = Array.from(document.styleSheets);

        // Deep copy of the original stylesheet
        const originalStyles = styleSheets.map(styleSheet => {
            const newStyleElem = document.createElement('style');
            const cssRules = styleSheet.cssRules || styleSheet.cssRules;
            for (let i = 0; i < cssRules.length; i++){
                newStyleElem.textContent += cssRules[i].cssText + '\n';
            }
            return newStyleElem;
        });

        // Page styles with the "@media query" removed
        const noMediaStyles = styleSheets.map(styleSheet => {
            const newStyleElem = document.createElement('style');
            const cssRules = styleSheet.cssRules || styleSheet.cssRules;
            for (let i = 0; i < cssRules.length; i++){
                const rule = cssRules[i];
                if (!(rule instanceof CSSMediaRule) ||
                    !(rule as any).media.mediaText.includes('screen')){
                    newStyleElem.textContent += rule.cssText + '\n';
                }
            }
            return newStyleElem;
        });

        // Remove all of the page styles
        const removeStyles = () => {
            document.head.querySelectorAll('style').forEach((styleElem) => {
                if (styleElem && styleElem.parentNode){
                    styleElem.parentNode.removeChild(styleElem);
                }
            });
        };

        removeStyles();

        // Apply no media styles
        const applyStyles = (styles: HTMLStyleElement[]) => {
            styles.forEach((styleElem) => {
                document.head.appendChild(styleElem);
            });
        };

        applyStyles(noMediaStyles);



            /* Print Settings */

        // Set the body print class to apply the styles
        document.body.classList.add("page-print");

        // Set the print width
        document.body.style.width = printWidth;

        // Set the print page dimensions
        // + 48px for the footer bottom-padding, to ensure everything fits
        const printHeight: string = `${document.body.scrollHeight + 48}px`;
        document.documentElement.style.setProperty("--printWidth", printWidth);
        document.documentElement.style.setProperty("--printHeight", printHeight);



            /* Printing */

        setTimeout(() => {
                
            // Print the page
            window.print();

            // IsPrinting Callback (for the chart gap)
            callback();



                /* Original Stylesheets */

            // Remove all of the page (no media) styles
            removeStyles();

            // Apply the original styles
            applyStyles(originalStyles);



                /* Original Page State */

            // Remove the print styles
            document.body.classList.remove("page-print");

            // Set the page body to the normal width
            document.body.style.width = "100%";

            // Fade out the page cover
            pageCover.classList.remove("page-cover-visible");

            // Remove the page cover after the fade-out transition
            setTimeout(() => {
                document.body.removeChild(pageCover);
            }, 150); // CSS - trans2
            
        }, 250);

    }, 150); // CSS - trans2
}

export default printPage;