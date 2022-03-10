import { defineStore, acceptHMRUpdate } from 'pinia';

export type DarkMode = 'light' | 'dark';

export const STORAGE_KEY = 'dark-mode';

export function getWindowDarkMode(): DarkMode {
	if (!import.meta.env.SSR) {
		return window.matchMedia('(prefers-color-scheme: light)').matches
			? 'light'
			: 'dark';
	} else {
		return 'dark';
	}
}

export function getInitialDarkMode(): DarkMode {
	if (!import.meta.env.SSR) {
		return (
			(localStorage.getItem(STORAGE_KEY) as DarkMode) || getWindowDarkMode()
		);
	} else {
		return 'dark';
	}
}

const useDarkMode = defineStore({
	id: 'dark-mode',
	state: () => {
		return {
			mode: getInitialDarkMode(),
		};
	},
	getters: {
		windowMode: getWindowDarkMode,
		shape(): 'moon' | 'sun' {
			return this.mode !== 'light' ? 'moon' : 'sun';
		},
	},
	actions: {
		set(mode: DarkMode) {
			if (!import.meta.env.SSR) {
				localStorage.setItem(STORAGE_KEY, mode);
				document.documentElement.classList.toggle('dark', mode !== 'light');
			}
			this.mode = mode;
			return mode;
		},
		toggle() {
			return this.set(this.mode === 'light' ? 'dark' : 'light');
		},
		reset() {
			return this.set(getWindowDarkMode());
		},
	},
	persist: {
		key: 'pinia-theme',
	},
});

export default useDarkMode;

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useDarkMode, import.meta.hot));
}
