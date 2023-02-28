export async function fetchIdea(id) {
    const response = await fetch(`http://localhost:3000/ideas/${id}`);
    const idea = await response.json();
    if (Object.keys(idea).length === 0) {
        throw new Error('Failed to load idea: response is empty');
    }
    return idea;
}
