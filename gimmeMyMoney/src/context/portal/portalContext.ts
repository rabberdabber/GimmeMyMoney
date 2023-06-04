import {createContext} from 'react';

export type PortalCtxType = {
  visible: boolean;
  show: () => void;
  hide: () => void;
};

const portalContext = createContext<PortalCtxType>({
  visible: false,
  show: () => {},
  hide: () => {},
});

export default portalContext;