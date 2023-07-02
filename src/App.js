import { useState } from "react";
import "./App.css";

function App() {
  const [addItem, setAddItem] = useState("");
  const [showItem, setShowItem] = useState(["Milk", "Eggs", "Bread"]);
  const [toggle, setToggle] = useState([]);

  function handleAdd() {
    setAddItem("");
    if (addItem.trim() === "") return;
    setShowItem([...showItem, addItem]);
  }
  function handleFilter(Item) {
    setShowItem(showItem.filter((item) => item !== Item));
    if (toggle.length !== 0) {
      handleToggle(Item);
    }
  }
  function handleToggle(Item) {
    if (toggle.includes(Item)) {
      setToggle(toggle.filter((item) => item !== Item));
    } else {
      setToggle([...toggle, Item]);
    }
  }
  function handleDeleteAll() {
    console.log("hide all");
    setToggle([]);
    setShowItem([]);
  }

  const percentage = Math.round((toggle.length / showItem.length) * 100);

  return (
    <>
      <div className="container">
        <Header />
        <ShoppingList
          showItem={showItem}
          handleFilter={handleFilter}
          handleToggle={handleToggle}
        />
        <AddItemToList
          addItem={addItem}
          setAddItem={setAddItem}
          handleAdd={handleAdd}
          handleDeleteAll={handleDeleteAll}
          percentage={percentage}
        />
      </div>
      <Percentage toggle={toggle} showItem={showItem} />
    </>
  );
}

export default App;
function Header() {
  return <h1>Shopping List</h1>;
}
function ShoppingList({ showItem, handleFilter, handleToggle }) {
  return (
    <ul className="shopping-list">
      {showItem.map((item) => (
        <li className="shopping-item" key={item}>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={`checkbox_${item}`}
              onClick={() => handleToggle(item)}
            />
            <div className="custom-checkbox"></div>
            <div className="checkmark"></div>
          </div>
          <label htmlFor={`checkbox_${item}`}>{item}</label>
          <button className="delete-button" onClick={() => handleFilter(item)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}

function AddItemToList({
  addItem,
  setAddItem,
  handleAdd,
  handleDeleteAll,
  percentage,
}) {
  return (
    <div>
      <div className="add-item">
        <input
          type="text"
          placeholder="Add an item"
          value={addItem}
          onChange={(e) => setAddItem(e.target.value)}
        />
        <input type="submit" value="Add" onClick={handleAdd} />
      </div>
      <div className="all-delete">
        <button className="delete-button-all" onClick={handleDeleteAll}>
          <i className="fas fa-trash-alt"></i> All
        </button>
        {percentage > 1 ? (
          <div className="percentage-indicator">
            <div
              className="progress-bar"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        ) : (
          ""
        )}
        {percentage > 1 ? <p>{percentage}%</p> : ""}
      </div>
    </div>
  );
}
function Percentage({ toggle, showItem }) {
  if (showItem.length === 0)
    return (
      <div className="welcome">
        <h2>Welcome to the shopping list !</h2>
      </div>
    );
  if (showItem.length === toggle.length)
    return (
      <div className="percentage">
        <h2> Purchased Completed ! </h2>
      </div>
    );
  const value = toggle.length;
  return (
    <div>
      {toggle.length > 0 ? (
        <div className="percentage">
          <h2>Total Items purchased: {value}</h2>
        </div>
      ) : (
        <div className="no-items">
          <h2>No items purchased yet</h2>
        </div>
      )}
    </div>
  );
}
