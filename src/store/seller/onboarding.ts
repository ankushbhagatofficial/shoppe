import { create } from "zustand"

type OnboardingStore = {
  step: number,
  active: boolean,
  pages: {
    business: boolean,
    bank: boolean,
    verification: boolean,
    setup: boolean
  },
  nextStep: () => void,
  prevStep: () => void,
  togglePage: () => void,
  setStep: (step: number) => void,
  setPage: (page: Partial<OnboardingStore["pages"]>) => void,
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  step: 0,
  active: false,
  pages: {
    business: false,
    bank: false,
    verification: false,
    setup: false
  },

  nextStep: () => {
    set(state => ({
      pages: { ...state.pages, [Object.keys(state.pages)[state.step]]: true },
      step: Math.min(Object.keys(state.pages).length - 1, state.step + 1)
    }))
  },

  prevStep: () => {
    set(state => ({
      step: Math.max(0, state.step - 1)
    }))
  },

  setStep: (step) => set({ step }),
  togglePage: () => set(s => ({ active: !s.active })),
  setPage: (pages) => set(state => ({
    pages: { ...state.pages, ...pages }
  }))

}))

