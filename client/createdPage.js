// const createIdeaForm = document.getElementById('create-idea-form');
// createIdeaForm.addEventListener('submit', async event => {
//     event.preventDefault();
//     const title = document.getElementById('title').value;
//     const description = document.getElementById('description').value;
//     try {
//         const response = await fetch('/ideas', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title, description })
//         });
//         const idea = await response.json();
//         alert(`Idea created with ID ${idea.id}!`);
//         createIdeaForm.reset();
//     } catch (error) {
//         console.error('Failed to create idea:', error);
//         alert('Failed to create idea!');
//     }
// });

const createIdeaForm = document.getElementById('create-idea-form');
createIdeaForm.addEventListener('submit', async event => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    console.log('Creating idea:', { title, description });
    try {
        const response = await fetch('http://localhost:3000/ideas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        const idea = await response.json();
        console.log('Idea created:', idea);
        alert(`Idea created with ID ${idea.id}!`);
        createIdeaForm.reset();
    } catch (error) {
        console.error('Failed to create idea:', error);
        alert('Failed to create idea!');
    }
});
