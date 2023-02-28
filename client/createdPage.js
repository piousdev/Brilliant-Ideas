// console.log('Loading createdPage.js');
//
// // Define the function that handles form submission
// async function handleSubmit(event) {
//     event.preventDefault();
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     console.log('Creating idea:', { title, description });
//     try {
//         const urlParams = new URLSearchParams(window.location.search);
//         const id = urlParams.get('id');
//         if (id) {
//             const response = await fetch(`http://localhost:3000/ideas/${id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ title, description })
//             });
//             console.log(`Edited File title and ID:`, { title, description });
//             if (response.ok) {
//                 console.log('Idea updated successfully');
//                 alert('Idea updated successfully!');
//                 window.location.href = 'index.html';
//             } else {
//                 console.error('Failed to update idea:', response.statusText);
//                 alert('Failed to update idea!');
//             }
//         } else {
//             const response = await fetch('http://localhost:3000/ideas', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ title, description })
//             });
//             console.log(`Created File title and ID:`, { title, description });
//             const idea = await response.json();
//             console.log('Idea created:', idea);
//             alert(`Idea created with ID ${idea.id}!`);
//             window.location.href = 'index.html'; // Redirect to the main page
//         }
//     } catch (error) {
//         console.error('Failed to create/update idea:', error);
//         alert('Failed to create/update idea!');
//     }
// }
//
// const createIdeaForm = document.getElementById('create-idea-form');
// createIdeaForm.addEventListener('submit', handleSubmit);

// console.log('Loading createdPage.js');
//
// // Extract the URL parameters using the URLSearchParams API
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id');
//
// // If an id parameter is present, fetch the existing idea data from the server using a GET request, and populate the form fields with the data
// if (id) {
//     try {
//         const text = await response.text(); // <-- Log the response as text
//         console.log('Response:', text);
//         const idea = await response.json();
//         const titleInput = document.getElementById('title');
//         const descriptionInput = document.getElementById('description');
//         titleInput.value = idea.title;
//         descriptionInput.value = idea.description;
//     } catch (error) {
//         console.error('Failed to load idea:', error);
//         alert('Failed to load idea!');
//     }
// }
//
// // Define the function that handles form submission
// async function handleSubmit(event) {
//     event.preventDefault();
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     console.log('Creating idea:', { title, description });
//     try {
//         if (id) {
//             const response = await fetch(`http://localhost:3000/ideas/${id}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ title, description })
//             });
//             console.log(`Edited File title and ID:`, { title, description });
//             if (response.ok) {
//                 console.log('Idea updated successfully');
//                 alert('Idea updated successfully!');
//                 window.location.href = 'index.html';
//             } else {
//                 console.error('Failed to update idea:', response.statusText);
//                 alert('Failed to update idea!');
//             }
//         } else {
//             const response = await fetch('http://localhost:3000/ideas', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ title, description })
//             });
//             console.log(`Created File title and ID:`, { title, description });
//             const newIdea = await response.json();
//             console.log('Idea created:', newIdea);
//             alert(`Idea created with ID ${newIdea.id}!`);
//             window.location.href = 'index.html'; // Redirect to the main page
//         }
//     } catch (error) {
//         console.error('Failed to create/update idea:', error);
//         alert('Failed to create/update idea!');
//     }
// }
//
// const createIdeaForm = document.getElementById('create-idea-form');
// createIdeaForm.addEventListener('submit', handleSubmit);

console.log('Loading createdPage.js');

// Extract the URL parameters using the URLSearchParams API
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// If an id parameter is present, fetch the existing idea data from the server using a GET request, and populate the form fields with the data
if (id) {
    try {
        const response = await fetch(`http://localhost:3000/ideas/${id}`);
        const idea = await response.json(); // <-- Parse the response as JSON
        console.log('Response:', idea);
        if (Object.keys(idea).length === 0) { // <-- Check if the response is empty
            console.error('Failed to load idea: response is empty');
            alert('Failed to load idea!');
        } else {
            const titleInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');
            titleInput.value = idea.title;
            descriptionInput.value = idea.description;
        }
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
            const response = await fetch(`http://localhost:3000/ideas/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            console.log(`Edited File title and ID:`, { title, description });
            if (response.ok) {
                console.log('Idea updated successfully');
                alert('Idea updated successfully!');
                window.location.href = 'index.html';
            } else {
                console.error('Failed to update idea:', response.statusText);
                alert('Failed to update idea!');
            }
        } else {
            const response = await fetch('http://localhost:3000/ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description })
            });
            console.log(`Created File title and ID:`, { title, description });
            const newIdea = await response.json();
            console.log('Idea created:', newIdea);
            alert(`Idea created with ID ${newIdea.id}!`);
            window.location.href = 'index.html'; // Redirect to the main page
        }
    } catch (error) {
        console.error('Failed to create/update idea:', error);
        alert('Failed to create/update idea!');
    }
}

const createIdeaForm = document.getElementById('create-idea-form');
createIdeaForm.addEventListener('submit', handleSubmit);





