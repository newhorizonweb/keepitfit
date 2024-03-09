


export function printPage(printWidth: string){

    // Add the page cover to hide the narrow body
    const pageCover = document.createElement("div");
    pageCover.classList.add("page-cover", "page-cover-visible");
    document.body.appendChild(pageCover);

    setTimeout(() => {

        // Set the body print class to apply the styles
        document.body.classList.add("page-print");

        // Set the print width
        document.body.style.width = printWidth;

        // Set the print page dimensions
        // + 64px for the footer bottom-padding, to ensure everything fits
        const printHeight:string = `${document.body.scrollHeight + 64}px`;

        document.documentElement.style.setProperty("--printWidth", printWidth);
        document.documentElement.style.setProperty("--printHeight", printHeight);

        // Print the page
        window.print();

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

    }, 150); // CSS - trans2

}

export default printPage;