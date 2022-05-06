import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form.js';

import { SettingsContext } from '../../context/Settings.js';
import { v4 as uuid } from 'uuid';

import Header from '../header/header.js'
import Form from '../form/Form.js'
import List from '../items/items.js'
import Footer from '../footer/Footer.js'

const ToDo = () => {

  const settings = useContext(SettingsContext);

  const defaultValues = {
    difficulty: 4,
  }

  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    console.log(item);
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
    console.log(settings.itemsToDisplay)
  }

  // function deleteItem(id) {
  //   const items = list.filter(item => item.id !== id);
  //   setList(items);
  // }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
  }, [list]);

  useEffect(() => {
    document.title = `To Do List: ${incomplete}`;
  }, [incomplete])

  return (
    <>
      <Header incomplete={incomplete} />
      <div id='main'>
      <h1>To Do List: {incomplete} items pending</h1>
        <Form
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          defaultValues={defaultValues}
        />

        <List
          list={list}
          toggleComplete={toggleComplete}
        />
      </div>
    <Footer />
    </>
  );
};

export default ToDo;