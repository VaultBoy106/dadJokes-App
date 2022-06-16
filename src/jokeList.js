import react, {Component} from 'react'; 
import axios from 'axios';
import {v4} from 'uuid'
import Joke from './Joke';
import "./jokeList.css"
class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props){
        super(props);
        this.state = {jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"), isLoading: false}        
        this.fetchJokes = this.fetchJokes.bind(this);
        this.addScore = this.addScore.bind(this);
        this.saveData = this.saveData.bind(this);
        this.getData = this.getData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.seenJokes = new Set(this.state.jokes.map(j => j.joke));
        
    }
    
    componentDidMount(){
        if(this.state.jokes.length === 0) {
            this.fetchJokes()
        }
    }
    async fetchJokes(){
        try {
            let newArr = []
                while(this.props.numJokesToGet > newArr.length){
                    
                    let res = await axios.get('https://icanhazdadjoke.com/', {
                        headers: {
                            Accept: "application/json"
                        }
                    })
                    const joke = res.data.joke
                    
                    if(!this.seenJokes.has(joke)){
                        newArr.push({joke: joke, score: 0, id: v4()})
                    }else {
                        
                    }
                    
                    
                }
            
            // ne ceka da spasi hajvan
       
            this.setState((st) => ({
                jokes: [...st.jokes, ...newArr],
                isLoading: false
            }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
        
        }catch {
            alert('Error')
            this.setState({isLoading: false})
        }
       
    }

    async fetchJoke(){
        
        let data = axios.get('https://icanhazdadjoke.com/', {
            headers: {
                Accept: "application/json"
            }
        }).then((res) => {
            return res.data.joke
        })
        
        return data
     
    }
    handleClick(){
        this.setState({isLoading: true}, this.fetchJokes)
    }
    addScore(id, score){
        
        this.setState((st) => ({
            jokes: st.jokes.map((item) => 
                item.id === id ? {...item, score: item.score + score} : item
            ) 
        }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))
    }
    getData(){
        if(window.localStorage.getItem('jokes') === null){
            return []
        }
        return window.localStorage.getItem('jokes')
    }
    saveData(){
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    }
    render(){
        
        const jokesSort = this.state.jokes.sort((a, b) => b.score - a.score)
        
        const jokes = jokesSort.map((item, idx) => {
            return <Joke key = {item.id} id = {item.id} joke = {item.joke} score = {item.score} func1 = {this.addScore} />
        })

        if(this.state.isLoading){
            return (
                <div className='spinner'>
                    <i className='far fa-8x fa-laugh fa-spin'></i>
                    <h1 className='jokeList-title'>Loading</h1>
                </div>
            )
        }

        return (
            <>  
                <div className='mainContainer'>
                    <div className = 'sideBar'>
                        <h1 className='jokeList-title'>
                            <span>Dad</span> Jokes   
                        </h1>
                        <img src = "https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" ></img>
                        <button className = "JokesButton" onClick = {this.handleClick}>Fetch Jokes</button>
                        
                    </div>   
                    <div className='jokeList'>
                        <div>{jokes}</div>
                    </div>
                </div>
                
                
            </>
        )
    }
}
export default JokeList;