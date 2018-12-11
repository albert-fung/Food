import React from 'react';
import axios from 'axios';
import "../Sass/Frontpage.css";

export default class Frontpage extends React.Component{
  constructor()
  {
    super()
    this.submitform = this.submitform.bind(this);
    this.addanimation = this.addanimation.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state={ 
    searchInput:"",
    locationInput:"",
    data:""
    }
  }
  /*Method to run animation and fetch required
  data*/
  submitform(){
    this.addanimation();
    this.fetchdata();
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
        this.props.callbackFromParent(res.data.jsonBody.businesses);
      })
      .catch(
        (e)=>console.log("Error fetching and compiling data")
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
to simulate form element 
without to avoid default browser validation */
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
            spellcheck="false"
            autoComplete="off"
            name="location" 
            id="location-input"
            class="search form-control" 
            onChange={(e)=>this.handleChange(e,"locationInput")}>
          </input>
          <label for="search" class="form-placeholder">Location</label>
        </div>
        <div id="btn-submit" onClick={(e)=>this.submitform(e)}>
          <i class="fas fa-arrow-right fa-2x"></i>
        </div>
      </div>
    </div>
    <div className="roundbtn-container">
      <Roundbtn></Roundbtn>
      <Roundbtn></Roundbtn>
      <Roundbtn></Roundbtn>
      <Roundbtn></Roundbtn>
    </div>
  </div>
    )}
}

class Roundbtn extends React.Component {
  render(){
    return(
    <div>
      <div className="round-btn">
      <i className={"fas fa-2x "+this.props.symbol}></i>
      </div>
      text
    </div>
    )
  }
}