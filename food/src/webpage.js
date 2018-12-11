import React from 'react';
import Frontpage from "./Frontpage/Frontpage.js";
import "./Sass/datapanel.css"

export default class Webpage extends React.Component{
  constructor(){
    super();
    this.state={
      data:[]
    }
  }
  myCallback = (dataFromChild) => {
    console.log(dataFromChild)
    this.setState({data:dataFromChild})
  }
  
  render(){
    return(
    <div> 
      <Frontpage 
        callbackFromParent={this.myCallback}>
      </Frontpage>
      <DataList
        data={this.state.data}>
      </DataList> 
    </div>
    )
  }
}

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
            <a target="_blank" href={data.url}><img src={data.image_url}></img></a>
          </div>
          <div className="businesspanel__info">
            <h3><a href={data.url} target="_blank">{data.name}</a></h3>
            <Rating data={data}/>
            {data.price} 	
            {" "}&#xb7;{" "} 
            {data.categories.map(category=>category.title).join(", ")}
          </div>
          <div className="businesspanel__communication">
          {data.phone}<br/>
          {data.location.address1}<br/>
          {data.location.city}
          </div>
          <BusinessHours data={data}/>
          </div>
        )
      })}
    </div>
  )
  }
}

class Rating extends React.Component{
  render(){
    /*Yelp Rating URL  */
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
   super()
  }
  

  render() {
    var weekdays={
      0 : "Monday",
      1 : "Tuesday",
      2 : "Wednesday",
      3 : "Thursday",
      4 : "Friday", 
      5 : "Saturday",
      6 : "Sunday",
    }
    return(
      <div className="businesspanel__other">
      Hours
      {console.log(this.props.data)}
    </div>
    )
  }
}