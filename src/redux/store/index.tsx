import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';
import key from '../../services/config/key.json';
var createSensitiveStorage = require('redux-persist-sensitive-storage').default;

const sensitiveStorage = createSensitiveStorage({
  keychainService: key['secret-key'],
  sharedPreferencesName: key['shared-preferences-name'],
});

const persistConfig = {
  key: 'root',
  storage: sensitiveStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const baseStore = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(baseStore);

export type RootState = ReturnType<typeof baseStore.getState>;
export type AppDispatch = typeof baseStore.dispatch;

const store = {
  baseStore,
  persistor,
};

export default store;
