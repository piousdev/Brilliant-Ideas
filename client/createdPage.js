import { fetchIdea } from './scripts/utils.js';
import { createIdea, updateIdea } from './scripts/api.js';

console.log('Loading createdPage.js');

// Extract the URL parameters using the URLSearchParams API
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// If an id parameter is present, fetch the existing idea data from the server using a GET request, and populate the form fields with the data
if (id) {
    try {
        const idea = await fetchIdea(id);
        console.log('Response:', idea);
        const titleInput = document.getElementById('title');
        const descriptionInput = document.getElementById('description');
        titleInput.value = idea.title;
        descriptionInput.value = idea.description;
    } catch (error) {
        console.error('Failed to load idea:', error);
        alert('Failed to load idea!');
    }
}

// Define the function that handles form submission
async function handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    console.log('Creating idea:', { title, description });
    try {
        if (id) {
            await updateIdea(id, title, description);
        } else {
            const newIdea = await createIdea(title, description);
            alert(`Idea created with ID ${newIdea.id}!`);
        }
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Failed to create/update idea:', error);
        alert('Failed to create/update idea!');
    }
}

const createIdeaForm = document.getElementById('create-idea-form');
createIdeaForm.addEventListener('submit', handleSubmit);
