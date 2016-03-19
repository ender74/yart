let state = {
    todos: {
        todos: [
            {
                "id": "readall",
                "text": "Read all this",
                "due": "2016-03-20",
                "description": "a longer description what to do",
                "location": "Melchior-Bauer-Straße 5, 99092 Erfurt"
            },
            {
                "id": "reactauth",
                "text": "Adding authentication to your React Flux app",
                "url": "https://auth0.com/blog/2015/04/09/adding-authentication-to-your-react-flux-app/"
            },
            {
                "id": "letsencrypt",
                "text": "Let's encrypt",
                "url": "https://letsencrypt.org/",
                "complete": "true"
            },
            {
                "id": "redux",
                "text": "Full stack redux tutorial",
                "url": "http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html"
            },
            {
                "id": "reflux",
                "text": "flux vs. reflux",
                "url": "http://blog.krawaller.se/posts/react-js-architecture-flux-vs-reflux/"  
            },
            {
                "id": "todo-parse-backbone",
                "text": "TODO app backbone with parse",
                "url": "https://parse.com/tutorials/todo-app-with-javascript"  
            }
        ],
        activeTodo: null,
        showAll: false
    }
}

export default function initialState() {
    return state
}