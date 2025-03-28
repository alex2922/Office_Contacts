const express = require('express');

const app = express();


const posts = [
    {
        id: 1,
        title: 'First Post',
        username: 'John Doe',
        content: 'This is the first post'
    },
    {
        id: 2,
        title: 'Second Post',
        username: 'Jane Doe',
        content: 'This is the second post'
    }
]


app.get('/post', (req, res) => {
    res.json(posts);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
