import React, { Component } from "react"; 
import "./TodoList.css";
import TodoItems from "./TodoItems";
import _ from "underscore";

class TodoList extends Component { 
  constructor(props) {    
    super(props);     

    // don't forget to bind the state with this
    this.state = {    
      items: []  
    };

    this.addItem = this.addItem.bind(this); 
    this.deleteItem = this.deleteItem.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  addItem(e) {
    var itemArray = this.state.items;

    if (this._inputElement.value !== "") {    
      itemArray.unshift(
        {      
          text: this._inputElement.value,      
          key: Date.now()    
        }
      );

      this.setState({      
        items: itemArray    
      });   

      this._inputElement.value = "";  
    }   
    console.log(itemArray);   
    e.preventDefault();
  }

  deleteItem(key) {  
    var filteredItems = this.state.items.filter(function (item) {    
      return (item.key !== key);  
    }); 

    this.setState({    
      items: filteredItems  
    });
  }

  sortItems() {
    var itemArray = this.state.items;
    const sortedItems = _.sortBy(itemArray, 'text');
    this.setState({items: sortedItems});
  }

  render() {    
    return (      
      <div className="todoListMain">     
        <div> 
          <button className="buttonSort" onClick={this.sortItems}>
           sort items
          </button>  
        </div>     
        <div className="header">          
          <form onSubmit={this.addItem}>            
            <input ref={(a) => this._inputElement = a} 
              placeholder="enter task">
            </input>            
            <button type="submit">add</button>    
            <span id="counter">items: {this.state.items.length}</span>         
          </form>        
        </div>

        <TodoItems entries={this.state.items} 
                  delete={this.deleteItem}/>     
      </div>    
    );  
  }
} 

export default TodoList;