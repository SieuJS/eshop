import cartSlice from './cartSlice'
import {configureStore} from '@reduxjs/toolkit'

const loadState = () => {
    try {
      const serializedState = sessionStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };

  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      sessionStorage.setItem('reduxState', serializedState);
    } catch (error) {
      // Handle errors here
    }
  };

// const store = createStore(rootReducer, loadState())
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
  preloadedState: loadState(),  
})

store.subscribe(() => {
    saveState(store.getState());
})

export default store;