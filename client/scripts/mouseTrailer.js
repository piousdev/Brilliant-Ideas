window.addEventListener("mousemove", (e) => {
    const to_append = document.getElementsByClassName('loader-container')[0];

    const parent_div = document.createElement('div');
    parent_div.className = "loader-container";

    const inner_div = document.createElement('div');
    inner_div.className = "loader";
    parent_div.appendChild(inner_div);
    document.body.appendChild(parent_div);

    parent_div.style.left = (e.clientX - 25)+'px';
    parent_div.style.top = (e.clientY - 25)+'px';

    if(document.getElementsByClassName('loader-container').length > 50) {
        document.body.removeChild(to_append)
    }

    // Check if the mouse is over a particular element or not
    const hovered_element = document.elementFromPoint(e.clientX, e.clientY);
    if (hovered_element) {
        // Add the "is-hovered" class to the loader-container element
        parent_div.classList.add('is-hovered');
    } else {
        // Remove the "is-hovered" class from the loader-container element
        parent_div.classList.remove('is-hovered');
    }
});
