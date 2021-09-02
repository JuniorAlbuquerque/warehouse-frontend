import { createStore, combineReducers } from "redux";
import SessionReducer from "./reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const allReducers = combineReducers({
    session: SessionReducer,
})

const persistConfigReducer = {
  key: "ware_persisted",
  storage,
};

const persistedReducer = persistReducer(persistConfigReducer, allReducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };


