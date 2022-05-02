import React, { useEffect, useState } from "react";

export const SettingsContext = React.createContext();

function Settings(props) {
  let [itemPref, setItemPref] = useState(5);
  let [dispComp, setDisComp] = useState(true);

  useEffect(() => {
    let item = JSON.parse(window.localStorage.getItem("settings")) || {};
    if (Object.keys(item).length === 0) {
      console.log("Not Items");
    } else {
      console.log("This", item);
      setItemPref(item.itemPref);
      setDisComp(item.dispComp);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "settings",
      JSON.stringify({ itemPref, dispComp })
    );
  }, [itemPref, dispComp]);

  let val = {
    dispComp,
    setDisComp: function () {
      setDisComp(!dispComp);
    },
    itemPref,
    setItemPref: function (count) {
      setItemPref(count);
    },
    sort: "",
  };

  return (
    <SettingsContext.Provider value={val}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default Settings;
