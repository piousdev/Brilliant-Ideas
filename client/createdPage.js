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
    let errorMessage = '';
    if (!title || !description) {
        errorMessage = 'Title and description cannot be empty';
    }
    try {
        if (!errorMessage) {
            if (id) {
                await updateIdea(id, title, description);
            } else {
                const newIdeaId = await createIdea(title, description);
                if (newIdeaId) {
                    alert(`Idea created with ID ${newIdeaId}!`);
                }
            }
            window.location.href = 'index.html';
        } else {
            console.error('Failed to create/update idea:', errorMessage);
            alert(errorMessage);
        }
    } catch (error) {
        console.error('Failed to create/update idea:', error);
        alert(error.message);
    }
}


const createIdeaForm = document.getElementById('create-idea-form');
createIdeaForm.addEventListener('submit', handleSubmit);

// Add event listeners for the input fields to disable the form submission button if the fields are empty
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const submitButton = document.getElementById('submit-button');

titleInput.addEventListener('input', () => {
    submitButton.disabled = titleInput.value === '' || descriptionInput.value === '';
});

descriptionInput.addEventListener('input', () => {
    submitButton.disabled = titleInput.value === '' || descriptionInput.value === '';
});
