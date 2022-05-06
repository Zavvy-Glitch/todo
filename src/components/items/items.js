import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../context/Settings.js';



const List = ({ list, toggleComplete }) => {

  const settings = useContext(SettingsContext);

  const [page, setPage] = useState(1);

  const renderItems = () => {
    let items = [];
    let start = (settings.itemsToDisplay * page) - 3;
    let end = (settings.itemsToDisplay * page);
    if (list.length > settings.itemsToDisplay) {
      for (let i = start; i < end; i++) {
        items.push(list[i]);
      }
      return items;
    } else {
      return list;
    }
  }

  return (
    <>
      <section id='cards'>
        {renderItems().map(item => (
          item ?
            <div key={item.id}>
              <h3>{item.text}</h3>
              <p>Assigned to: {item.assignee}</p>
              <p>Difficulty: {item.difficulty}</p>
              <button onClick={() => toggleComplete(item.id)} className={item.complete ? 'bp4-intent-danger' : 'bp4-intent-primary'}>Complete: {item.complete.toString()}</button>
              <hr />
            </div> : null
        ))
        }
        {list.length > (settings.itemsToDisplay * 2) || page > 1 ?
          <button 
            type='click' 
            onClick={() => setPage(page - 1)} 
            className=' buttons bp4-intent-warning'
            disabled={page < 2 ? true : false}
            >Previous</button> : null}
        {list.length > settings.itemsToDisplay ?
          <button 
            type='click' 
            onClick={() => setPage(page + 1)} 
            className='buttons bp4-intent-success'
            disabled={list.length / page <= settings.itemsToDisplay ? true : false}
            >Next</button> : null}
      </section>
    </>
  )
}

export default List;
