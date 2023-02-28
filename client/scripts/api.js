// imported in client/script.js
export async function loadIdeas() {
    try {
        const response = await fetch('http://localhost:3000/ideas');
        const ideasList = document.getElementById('ideas-list');
        const ideas = await response.json();
        ideas.forEach(idea => {
            const li = document.createElement('li');
            li.textContent = `${idea.title}: ${idea.description}`;

            // Add an "Update" button for each idea
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', async () => {
                // Redirect to the created page with the idea data
                window.location.href = `http://localhost:3000/createdPage.html?id=${idea.id}&title=${idea.title}&description=${idea.description}`;
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                const res = await fetch(`http://localhost:3000/ideas/${idea.id}`, { method: 'DELETE' });
                if (res.ok) {
                    li.remove();
                }
            });

            li.appendChild(updateButton);
            li.appendChild(deleteButton);
            ideasList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load ideas:', error);
        alert('Failed to load ideas!');
    }
}

// imported in client/createdPage.js
export async function createIdea(title, description) {
    const response = await fetch('http://localhost:3000/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
    });
    const newIdea = await response.json();
    console.log('Idea created:', newIdea);
    return newIdea;
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
