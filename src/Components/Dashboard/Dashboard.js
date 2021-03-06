import React, { Component } from 'react';
import axios from 'axios';
import validator from  'validator';
import api_key from  '../../config/api_key.json'

import './styles.css'

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = { 
            city: '',
            access_key: "",

            name:'',
            country: " ",
            temperature: '',
            weather: ''
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    handleChange(e){
        this.setState({
            city: e.target.value
        });
    }

    getData(response){
        this.setState({
            city: "",
            name: response.data.location.name,
            country: response.data.location.country,
            temperature: `${response.data.current.temperature}°C `,
            weather: response.data.current.weather_descriptions
        });
    }

    handleSubmit(e){
        const params = {
            access_key: api_key.access_key,
            query: this.state.city
        }
        e.preventDefault()
            try{
                if(validator.isEmpty(this.state.city)){
                    alert("Digite o nome de uma cidade")
                }else{                    
                    axios.get("http://api.weatherstack.com/current", { params })
                        .then(response => {
                            if(response.data.error){
                                alert("Digite um nome valido")
                            }else{
                                this.getData(response)
                            }    
                        });
                } 
            }catch(error){
                    console.log(error)
            }
    }
    render(){
        
        return(
            <section className="section__container">
                <div className="section__container--group">     
                    <form className="section__container--input" onSubmit={this.handleSubmit}>
                        <input 
                            type="text"
                            className="input--city" 
                            placeholder="Name of the city: " 
                            value={ this.state.city}
                            onChange={this.handleChange}
                            />
                        <input type="submit" className="input-submit" name="send" value="SEND" />
                        
                    </form>
                    <div className="section__container--message">
                        <span className="message">Message error: </span>
                    </div>
                    <section className="section__container--display">
                        <div className="section__container--card">
                            <ul className="card__region">
                                <li>{this.state.name}</li>
                                <li>{this.state.country}</li>
                            </ul>
                            <div className="card__temperature">
                                <div className="temperature">
                                    
                                    <span> {this.state.temperature} </span>
                                </div>
                            </div>
                            <div className="card-weather">
                                <span> {this.state.weather}  </span>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        );
    }
}