import store, { RootState } from "./store";

export function loadData(dispatch: any, data: any) {}

export async function pushToServer(dispatch: any) {
  const state: RootState = store.baseStore.getState();
  console.log("🚀 ~ file: index.tsx ~ line 11 ~ pushToServer ~ state", state);
}
