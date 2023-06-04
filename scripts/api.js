// // imported in client/script.js
export async function loadIdeas() {
    try {
        const response = await fetch('http://localhost:3000/ideas');
        const ideasList = document.getElementById('ideas-list');
        const ideas = await response.json();

        let count = 1; // initialize a counter variable

        ideas.forEach((idea) => {
            const ideaDiv = document.createElement("div");
            ideaDiv.classList.add("ideas");

            const countDiv = document.createElement("div");
            countDiv.classList.add("count");
            countDiv.textContent = `${count}.`; // display the count

            const titleDiv = document.createElement("div");
            titleDiv.classList.add("title");
            const titleHeader = document.createElement("p");
            titleHeader.classList.add("title-header");
            titleHeader.textContent = "Title:";
            const titleName = document.createElement("h3");
            titleName.classList.add("title-name");
            titleName.textContent = idea.title;
            titleDiv.appendChild(titleHeader);
            titleDiv.appendChild(titleName);

            const descriptionDiv = document.createElement("div");
            descriptionDiv.classList.add("description");
            const descriptionHeader = document.createElement("p");
            descriptionHeader.classList.add("description-header");
            descriptionHeader.textContent = "Description:";
            const descriptionText = document.createElement("h5");
            descriptionText.classList.add("description-text");
            descriptionText.textContent = idea.description;
            descriptionDiv.appendChild(descriptionHeader);
            descriptionDiv.appendChild(descriptionText);

            const dateDiv = document.createElement("div");
            dateDiv.classList.add("date");

            const createdDate = document.createElement("p");
            createdDate.classList.add("created-date");
            createdDate.textContent = `Created: ${new Date(
                idea.created_at
            ).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})}`;
            dateDiv.appendChild(createdDate);

            const isModified = idea.updated_at && idea.updated_at !== idea.created_at; // check if the idea was modified
            if (isModified) {
                const modifiedDate = document.createElement("p");
                modifiedDate.classList.add("modified-date");
                modifiedDate.textContent = `Modified: ${new Date(
                    idea.updated_at
                ).toLocaleString('en-US', {weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})}`;
                dateDiv.appendChild(modifiedDate);
            }

            ideaDiv.appendChild(dateDiv);

            const buttonDivs = document.createElement("div");
            buttonDivs.classList.add("buttons");

            const updateButton = document.createElement("button");
            updateButton.classList.add("updateButton");
            updateButton.classList.add("pulse");
            updateButton.textContent = "Update";

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("deleteButton");
            deleteButton.classList.add("up");
            deleteButton.textContent = "Delete";

            // add event listeners to the buttons
            updateButton.addEventListener("click", async () => {
                window.location.href = `../html/createdPage.html`;
            });

            // Add a click event listener to the delete button
            deleteButton.addEventListener("click", async () => {
                // Display the confirmation modal
                const confirmed = await showConfirmation(
                    "Are you sure you want to delete this idea?"
                );
                if (!confirmed) {
                    return;
                }

                try {
                    const res = await fetch(`http://localhost:3000/ideas/${idea.id}`, {
                        method: "DELETE",
                    });
                    if (res.ok) {
                        ideaDiv.remove();
                    } else {
                        console.error("Failed to delete idea:", res.statusText);
                    }
                } catch (error) {
                    console.error("Failed to delete idea:", error);
                }
            });

            buttonDivs.appendChild(updateButton);
            buttonDivs.appendChild(deleteButton);

            ideaDiv.appendChild(countDiv); // add the count div to the idea div
            ideaDiv.appendChild(titleDiv);
            ideaDiv.appendChild(descriptionDiv);
            ideaDiv.appendChild(dateDiv);
            ideaDiv.appendChild(buttonDivs);

            ideasList.appendChild(ideaDiv);

            count++; // increment the counter variable
        });
    } catch (error) {
        console.error('Failed to load ideas:', error);
        alert('Failed to load ideas!');
    }
}


// Function to display a confirmation modal
function showConfirmation(message) {
    return new Promise((resolve) => {
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop');

        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const modalTitle = document.createElement('div');
        modalTitle.classList.add('modal-title');
        modalTitle.textContent = 'Please Confirm:';

        const modalMessage = document.createElement('div');
        modalMessage.classList.add('modal-message');
        modalMessage.textContent = message;

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', () => {
            modalBackdrop.remove();
            resolve(false);
        });

        const confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-button');
        confirmButton.textContent = 'Confirm';
        confirmButton.addEventListener('click', () => {
            modalBackdrop.remove();
            resolve(true);
        });

        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalMessage);
        modalContent.appendChild(cancelButton);
        modalContent.appendChild(confirmButton);

        modalContainer.appendChild(modalContent);
        modalBackdrop.appendChild(modalContainer);

        document.body.appendChild(modalBackdrop);
    });
}




// imported in client/createdPage.js
export async function createIdea(title, description) {
    if (!title || !description) {
        throw new Error('Title and description cannot be empty');
    }
    try {
        const response = await fetch('http://localhost:3000/ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        if (response.ok) {
            const newIdea = await response.json();
            console.log('Idea created:', newIdea);
            return newIdea;
        } else if (response.status === 400) {
            const errorMessage = await response.text();
            console.error('Failed to create idea:', errorMessage);
            return { error: errorMessage };
        } else {
            console.error('Failed to create idea:', response.statusText);
            return { error: 'Failed to create idea' };
        }
    } catch (error) {
        console.error('Failed to create idea:', error);
        return { error: 'Failed to create idea' };
    }
}



export async function updateIdea(id, title, description) {
    const response = await fetch(`http://localhost:3000/ideas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    if (response.ok) {
        console.log('Idea updated successfully');
    } else {
        console.error('Failed to update idea:', response.statusText);
        throw new Error('Failed to update idea');
    }
}
