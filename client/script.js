// async function loadIdeas() {
//     try {
//         const response = await fetch('/ideas');
//         const ideasList = document.getElementById('ideas-list');
//         const ideas = await response.json();
//         ideas.forEach(idea => {
//             const li = document.createElement('li');
//             li.textContent = `${idea.title}: ${idea.description}`;
//             const deleteButton = document.createElement('button');
//             deleteButton.textContent = 'Delete';
//             deleteButton.addEventListener('click', async () => {
//                 await fetch(`/ideas/${idea.id}`, { method: 'DELETE' });
//                 li.remove();
//             });
//             li.appendChild(deleteButton);
//             ideasList.appendChild(li);
//         });
//     } catch (error) {
//         console.error('Failed to load ideas:', error);
//         alert('Failed to load ideas!');
//     }
// }
//
// loadIdeas();

async function loadIdeas() {
    try {
        const response = await fetch('http://localhost:3000/ideas');
        const ideasList = document.getElementById('ideas-list');
        const ideas = await response.json();
        ideas.forEach(idea => {
            const li = document.createElement('li');
            li.textContent = `${idea.title}: ${idea.description}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await fetch(`/ideas/${idea.id}`, { method: 'DELETE' });
                li.remove();
            });
            li.appendChild(deleteButton);
            ideasList.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load ideas:', error);
        alert('Failed to load ideas!');
    }
}

(async () => {
    await loadIdeas();
})();



