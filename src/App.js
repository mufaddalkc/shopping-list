import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [search, setSearch] = useState("");

  const _items = JSON.parse(localStorage.getItem('items'))
  const [items, setItems] = useState(_items);

  useEffect(()=>{
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  function getItems () {
    return items.filter(item => {
      return item.includes(search)
    })
  }

  function addItem (event) {
    event.preventDefault();
    setItems([...items, item]);
    setItem("");
  }

  function removeItem (item) {
      const newItems = items.filter((_item) => _item !== item);
      setItems(newItems);
  }

  function removeAll () {
    setItems([])
  }

  return (
    <div className="App">
      <div className="container">
        <header>
          <img src="images/note.png" alt="" />
          <h1>Shopping List</h1>
        </header>
        <form id="item-form" onSubmit={addItem}>
          <div className="form-control">
            <input
              type="text"
              className="form-input"
              id="item-input"
              name="item"
              placeholder="Enter Item"
              value={item}
              onChange={(event) => {
                setItem(event.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <button
              type="submit"
              className="btn"
            >
              <i className="fa-solid fa-plus"></i> Add Item
            </button>
          </div>
        </form>

        <div className="filter">
          <input
            type="text"
            className="form-input-filter"
            id="filter"
            placeholder="Filter Items"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>

        <ul id="item-list" className="items">
          {getItems().map((item, index) => {
            return (
              <li key={index}>
                {item}
                <button
                  className="remove-item btn-link text-red"
                  onClick={() => removeItem(item)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </li>
            );
          })}
        </ul>

        <button id="clear" className="btn-clear" onClick={removeAll}>
          Clear All
        </button>
      </div>
    </div>
  );
}

export default App;
