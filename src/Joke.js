import react, {Component} from 'react';
import "./joke.css"
import {BiUpArrowAlt} from 'react-icons/bi';
import {BiDownArrowAlt} from 'react-icons/bi';

class Joke extends Component {
    constructor(props){
        super(props)
        this.state = {score: this.props.score, color: '', emoji: ''}
        this.subScore = this.subScore.bind(this); 
        this.addScore = this.addScore.bind(this);
    }
    subScore(){
        this.setState((st) => ({
            score: st.score - 1
        }))
        this.props.func1(this.props.id, this.state.score)
    }
    addScore(){
        this.setState((st) => ({
            score: st.score + 1 
        }))
        this.props.func1(this.props.id, this.state.score)
        this.getData = this.getData.bind(this)
    }
    getData(value){
        if (this.state.score >= 15) {
            return (value === 1 ? "#4CAF50" : "em em-rolling_on_the_floor_laughing");
        } else if (this.state.score >= 12) {
            return (value === 1 ? "#8BC34A" : "em em-laughing");;
        } else if (this.state.score >= 9) {
            return (value === 1 ? "#CDDC39" : "em em-smiley");
        } else if (this.state.score >= 6) {
            return  (value === 1 ? "#FFEB3B" : "em em-slightly_smiling_face");
        } else if (this.state.score >= 3) {
            return  (value === 1 ? "#FFC107" : "em em-neutral_face");
        } else if (this.state.score >= 0) {
            return  (value === 1 ? "#FF9800" : "em em-confused");
        } else {
            return  (value === 1 ? "#f44336" : "em em-angry");
        }
    }
    
    render(){
        
        return(
            
            <div className = "joke-container">
                    <div className = "icon-container" >

                        <i className="fa-solid fa-arrow-up icon arr-up"  onClick={this.addScore} ></i>
                                <span style={{ borderColor: this.getData(1) }} className='score'>{this.state.score}</span>
                        <i className="fa-solid fa-arrow-down icon arr-down" onClick = {this.subScore} ></i>
                    
                    </div>
                    <div className='joke-text'>{this.props.joke}</div>
                    
                    <i className={`${this.getData(2)} emoji`}></i>
            </div>
        )
    }
}
export default Joke;