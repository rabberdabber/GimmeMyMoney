import * as React from 'react';
import {useState, useCallback} from 'react';
import portalContext from './portalContext';

const PortalProvider = ({ children }: {children: React.ReactNode}) => {
  const [portalVisible, setPortalVisible] = useState<boolean>(false);

  const show = useCallback(() => {
    setPortalVisible(true);
  }, []);

  const hide = useCallback(() => {
    setPortalVisible(false); 
  }, []);

  return (
    <portalContext.Provider value={{visible: portalVisible, show, hide}}>
        {children}
    </portalContext.Provider>
  )
  ;
};

export default PortalProvider;
