// contexts/User/index.jsx

import React, { useState, useEffect } from 'react';
import { isMobile } from '../../helpers/index.js';

export const StyleContext = React.createContext({
  dispatch: () => null,
});

export const StyleProvider = ({ children }) => {
  const [state, setState] = useState({
    isMobile: false,
    showSider: false,
  });

  const dispatch = (action) => {
    if ('type' in action) {
      switch (action.type) {
        case 'TOGGLE_SIDER':
          setState(prev => ({ ...prev, showSider: !prev.showSider }));
          break;
        case 'SET_SIDER':
          setState(prev => ({ ...prev, showSider: action.payload }));
          break;
        case 'SET_MOBILE':
          setState(prev => ({ ...prev, isMobile: action.payload }));
          break;
        default:
          setState(prev => ({ ...prev, ...action }));
      }
    } else {
      setState(prev => ({ ...prev, ...action }));
    }
  };

  useEffect(() => {
    const updateIsMobile = () => {
      dispatch({ type: 'SET_MOBILE', payload: isMobile() });
    };

    updateIsMobile();

    // Optionally, add event listeners to handle window resize
    window.addEventListener('resize', updateIsMobile);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

  return (
    <StyleContext.Provider value={[state, dispatch]}>
      {children}
    </StyleContext.Provider>
  );
};
