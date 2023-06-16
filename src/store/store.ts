import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

type BearState = {
  bears: number;
  bearCover: String | null;
  autoIncreaseTimeout: NodeJS.Timeout | null;
};

type BearActions = {
  increase: (by: number) => void;
  decrease: (by: number) => void;
  reset: () => void;
  autoIncrease: () => void;
  resetAutoIncrease: () => void;
  fetchBear: (url: string) => void;
};

// define the initial state
const initialState: BearState = {
  bears: 0,
  bearCover: null,
  autoIncreaseTimeout: null,
};

const useBearStore = create<BearState & BearActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        bears: 0,
        increase: by => set({bears: get().bears + by}),
        decrease: by => set({bears: get().bears - by}),
        reset: () => {
          set(initialState);
        },
        autoIncrease: () => {
          const timeoutId = setInterval(() => {
            get().increase(1);
          }, 500);
          set({autoIncreaseTimeout: timeoutId});
        },
        resetAutoIncrease: () => {
          const {autoIncreaseTimeout} = get();
          if (autoIncreaseTimeout) {
            clearInterval(autoIncreaseTimeout);
            set({autoIncreaseTimeout: null});
          }
        },
        fetchBear: async url => {
          const response = await fetch(url);
          // eslint-disable-next-line node/no-unsupported-features/node-builtins
          set({
            // eslint-disable-next-line node/no-unsupported-features/node-builtins
            bearCover: URL.createObjectURL(await response.blob()),
          });
        },
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);

export default useBearStore;
