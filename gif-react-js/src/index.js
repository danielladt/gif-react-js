import React from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import GifList from './components/GifList';
import SearchBar from './components/SearchBar';
import * as serviceWorker from './serviceWorker';
import request from 'superagent';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: []
        }
    }


    handleTermChange = (term) => {
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=GZKGwdu6xlIM0iV58yFKJOFLqj0NLXFw`;

        request.get(url, (err, res) => {
            this.setState({ gifs: res.body.data })
        });
    };

    render() {
        return (
            <div>
                <SearchBar onTermChange={this.handleTermChange} />
                <GifList gifs={this.state.gifs} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

