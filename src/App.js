import React, { Component } from 'react';

import './App.css';
import ListItem from './ListItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '',
        key: '',
      },
    };
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    // console.log(newItem);
    if (newItem.text !== '') {
      const newItems = [...this.state.items, newItem];
      this.setState({
        items: newItems,
        currentItem: {
          text: '',
          key: '',
        },
      });
    }
  }

  deleteItem(key) {
    const filterItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filterItems,
    });
  }

  setUpdate(text, key) {
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className='App'>
          <header>
            <h1 style={{ color: 'white', textAlign: 'center' }}>To Do List</h1>
            <form
              style={{ textAlign: 'center' }}
              id='to-do-form'
              onSubmit={this.addItem}
            >
              <input
                type='text'
                value={this.state.currentItem.text}
                placeholder='Enter the text'
                onChange={this.handleInput}
              />
              <button type='submit'>Add</button>
            </form>
          </header>
          <ListItem
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
