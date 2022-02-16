import { defineStore, acceptHMRUpdate } from 'pinia';

const useCounterStore = defineStore('counter', {
	state: () => ({
		count: 0,
	}),
	getters: {
		doubleCount(state) {
			return state.count * 2;
		},
	},
	actions: {
		increment(amount = 1) {
			this.count += amount;
		},
		decrement(amount = 1) {
			this.count -= amount;
		},
		set(amount: number) {
			this.count = amount;
		},
	},
});

export default useCounterStore;

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
