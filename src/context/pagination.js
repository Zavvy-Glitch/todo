import React from 'react';

const PaginationContext = React.createContext();

function PaginationProvider({children}) {

  return(
    <PaginationContext.Provider>
      {children}
    </PaginationContext.Provider>
  )
}

export default PaginationProvider;