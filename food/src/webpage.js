import React from 'react';
import Frontpage from "./Frontpage/Frontpage.js";
import datapage from "./dataQueried/datapage.js"

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
      {this.props.data.map(data=>(
        <div>
          {data.name}
        </div>
        ))}
    </div>
  )
  }
}