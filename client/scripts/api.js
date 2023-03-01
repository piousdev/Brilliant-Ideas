// imported in client/script.js
export async function loadIdeas() {
    try {
        const response = await fetch('http://localhost:3000/ideas');
        const ideasList = document.getElementById('ideas-list');
        const ideas = await response.json();
        ideas.forEach(idea => {
            const ideaDiv = document.createElement('div');
            ideaDiv.classList.add('ideas');

            const titleRowDiv = document.createElement('div');
            titleRowDiv.classList.add('titles');
            titleRowDiv.textContent = idea.title;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', async () => {
                window.location.href = `http://localhost:3000/createdPage.html?id=${idea.id}&title=${idea.title}&description=${idea.description}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                const confirmed = confirm('Are you sure you want to delete this idea?');
                if (!confirmed) {
                    return;
                }

                try {
                    const res = await fetch(`http://localhost:3000/ideas/${idea.id}`, { method: 'DELETE' });
                    if (res.ok) {
                        ideaDiv.remove();
                    } else {
                        console.error('Failed to delete idea:', res.statusText);
                    }
                } catch (error) {
                    console.error('Failed to delete idea:', error);
                }
            });

            const buttonsDiv = document.createElement('div');
            buttonsDiv.appendChild(updateButton);
            buttonsDiv.appendChild(deleteButton);

            titleRowDiv.appendChild(buttonsDiv);
            ideaDiv.appendChild(titleRowDiv);

            const descriptionRowDiv = document.createElement('div');
            descriptionRowDiv.classList.add('descriptions');
            descriptionRowDiv.textContent = idea.description;

            ideaDiv.appendChild(descriptionRowDiv);

            ideasList.appendChild(ideaDiv);
        });
    } catch (error) {
        console.error('Failed to load ideas:', error);
        alert('Failed to load ideas!');
    }
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
