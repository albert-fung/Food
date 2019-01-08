import React from 'react';
import Frontpage from "./Frontpage/Frontpage.js";
import axios from 'axios';
import "./Sass/datapanel.css"

/*Container for whole website */
export default class Webpage extends React.Component{
  constructor(){
    super();
    this.state={
      data:[]
    }
  }
  myCallback = (business) => {
    this.setState({
      data:business,
    })
  }
  render(){
    return(
    <div> 
      <Frontpage callbackBusiness={this.myCallback}/>
      <DataList data={this.state.data}/> 
    </div>
    )
  }
}
/*List of places Yelp returns  */
class DataList extends React.Component{
  render()
  {return(
    <div>
      {/*Object 'data' holds response from Yelp API
      please refer to yelp fusion documentation
      business endpoint ; 
      data.id = id 
      and ext.
       */}
      {this.props.data.map(data=>{
        return(
        <div className="businesspanel">
          <div className="businesspanel__image">
            <a target="_blank" rel="noopener noreferrer" href={data.url}>
              <img alt={data.name} src={data.image_url}></img>
            </a>
          </div>
          <div className="businesspanel__info">
            <h3>
              <a href={data.url} target="_blank" rel="noopener noreferrer">
                {data.name}
              </a>
            </h3>
            <Rating data={data}/>
            {data.price}
            {/*#xb7 is just a text center dot */}
            {" "}&#xb7;{" "} 
            {data.categories.map(category=>category.title).join(", ")}
          </div>
          <div className="businesspanel__communication">
          {/*Formating phone number  */}
          {data.phone.slice(2,5)+" "+data.phone.slice(5,8)+" "+data.phone.slice(8,12)}<br/>
          {data.location.address1}<br/>
          {data.location.city}
          </div>
          <BusinessHours name={data.name} id={data.id}/>
          </div>
        )})
      }

    </div>
  )
  }
}

class Rating extends React.Component{
  render(){
    /*Yelp Rating star pictures from 0-5  */
    var rating_url = {
    0:"./rating_img/regular_0.png",
    1:"./rating_img/regular_1.png",
    1.5:"./rating_img/regular_1_half.png",
    2:"./rating_img/regular_2.png",
    2.5:"./rating_img/regular_2_half.png",
    3:"./rating_img/regular_3.png",
    3.5:"./rating_img/regular_3_half.png",
    4:"./rating_img/regular_4.png",
    4.5:"./rating_img/regular_4_half.png",
    5:"./rating_img/regular_5.png",
            }
    return(
      <div className="rating">
        <img 
          src={rating_url[this.props.data.rating]}
          alt={"rating: "+this.props.data.rating}
        />
        <div className="rating__reviewcount">
          {this.props.data.review_count + " Reviews"}
        </div> 
      </div>
    )
  }
}

class BusinessHours extends React.Component{
  constructor() {
    super();
    this.getHours=this.getHours.bind(this);
    this.state={
      hours:"",
      isloading:true
    }
  }
  /*Get hours when search first time or multiple times */
  componentDidMount(){
    this.getHours(this.props.id,this.props.name);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.getHours(this.props.id,this.props.name);
    }
  }

  getHours(id,name){
      axios.get('./api/restauranthours',{params:{id}})
      .then((res)=>{
          this.setState({
          hours:res.data.jsonBody.hours,
          isloading:false},
          )
        })
      .catch(
      )
  }
  render() {
  //*Referencing Yelps API day:0 = monday .. day:6 = sunday */
    var weekdays={
      0 : "Monday", 
      1 : "Tuesday",
      2 : "Wednesday",
      3 : "Thursday",
      4 : "Friday", 
      5 : "Saturday",
      6 : "Sunday",
    }
    if(this.state.isloading || typeof this.state.hours === "undefined"){
      return( 
      <div className="businesspanel--error">
        {"Sorry could not find these hours"}
      </div>   
      )  
    }
    return(
      /*Check if there are multiple hours opening hours per day
      if so dont repeat the weekday */
      <div className="businesspanel__hours">
      {this.state.hours[0].open.map((openhours,index)=>{
        //*if a store has more than one opening
        //time per day put them on the same line else add a breakline*//
        if (index == 0 || openhours.day != this.state.hours[0].open[index-1].day) {
          return(
          <span><br/>
            {weekdays[openhours.day]+" : " + openhours.start+" - "+ openhours.end}
          </span>
          )
        }
        else {
          return(
            <span>{" & "+openhours.start+" - "+ openhours.end}</span>
          )
        }
        })}
    </div>
    )
    }
  }
