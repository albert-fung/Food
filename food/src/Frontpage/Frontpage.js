import React from 'react';
import axios from 'axios';
import "../Sass/Frontpage.css";


export default class Frontpage extends React.Component{
  constructor() {
    super()
    this.submitform = this.submitform.bind(this)
    this.addanimation = this.addanimation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.findlocation = this.findlocation.bind(this)
    this.state={ 
      searchInput:"",
      locationInput:"Toronto,ON",
      data:""
    }
  }

  /*Method to run animation and fetch required
  data*/
  submitform(){
    this.addanimation();
    this.fetchdata();
  }
  /*Located current location and fill location field*/
  findlocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
       (position)=>{
          var key = require('../Google_apiKey.js');
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + key.Google_apiKey)
          .then((response) => response.json())
          .then((responseJson) => {
            //Setting location as current location retrieved by reverse geocoding
            this.setState({locationInput:responseJson.results[0].formatted_address});
            })  
          },
      //Function if user does not allow for location to be used.
      ()=>{
        alert("Location disabled , please enable this function in order to use 'current location'. ")
      })
    } 
    //Error message if browser does not support location 
    else {
      alert('Your browser does not support current location')
    }
  }
/*Get request using axios library */
  fetchdata(){
    axios.get('/api/restaurants',{
      params:{
        term:this.state.searchInput,
        location:this.state.locationInput
      }
    })
    .then(
      (res)=>{
        this.props.callbackBusiness(res.data.jsonBody.businesses)  
      })
      .catch(
        (e)=>console.log(e)
      );
   }
  /*add animation when submit button is clicked  */
  addanimation(){
    var btn=document.getElementById('btn-submit');
    btn.classList.add("pop-animation");
    btn.children[0].classList.add('icon-animation');
    this.removeanimation();
  }
  /*Delay*/
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  /*resetting submit animation */
  async removeanimation(){
    await this.sleep(5100);
    var btn=document.getElementById('btn-submit');
    btn.classList.remove("pop-animation");
    btn.children[0].classList.remove('icon-animation');
  }

  /*Handeling input changes given the DOM
   and state handler name of the input
  that is being changed*/
  handleChange(e,stateName){
    this.setState({[stateName]:e.target.value})
  }  
/*Adding event listeners to input fields 
to simulate form element to avoid default browser validation */
  componentDidMount(){
    var input = document.getElementsByClassName('search');
    input[0].addEventListener('keydown',(e)=>{
      if(e.keyCode== 13){this.submitform()}});
    input[1].addEventListener('keydown',(e)=>{
      if(e.keyCode== 13){this.submitform()}});
    }
  
  render(){return(
  <div className="frontpage-container">
    <div className="mainsearch-container">
      <div className="title">Food</div>
      <div className="search-container">
        <div className="input-container">
          <input
            required 
            value={this.state.searchInput} 
            spellcheck="false"
            autoComplete="off"
            name="search" 
            class="search form-control" 
            id="search-input"
            onChange={(e)=>this.handleChange(e,"searchInput")} 
            value={this.state.name}>
          </input>
          <label for="search" class="form-placeholder">Find</label>
        </div>
        <div className="input-container">
          <input 
            required
            value={this.state.locationInput} 
            spellcheck="false"
            autoComplete="off"
            name="location" 
            id="location-input"
            class="search form-control" 
            onChange={(e)=>this.handleChange(e,"locationInput")}>
          </input>
          <label for="search" class="form-placeholder">Location</label>
        </div>
        {/*Submit and location buttons */}

        <button id="btn-location" onClick={()=>this.findlocation()}>
          <i class="fas fa-map-marker-alt fa-2x"></i>
        </button>
        <button id="btn-submit" onClick={(e)=>this.submitform(e)}>
          <i class="fas fa-arrow-right fa-2x"></i>
        </button>
       
      </div>
    </div>
  </div>
    )}
}
