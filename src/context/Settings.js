import React from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({children}) {

  const state = {
    showCompleted: true, 
    itemsToDisplay: 3,
    sort: 'difficulty',

  }

  return (
    <SettingsContext.Provider value={state}>
      {children}
    </SettingsContext.Provider>
  )
}


export default SettingsProvider;
