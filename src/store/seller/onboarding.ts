import { create } from "zustand"

type OnboardingStore = {
  step: number,
  page: number,
  active: boolean,
  complete: { business: boolean, bank: boolean, verification: boolean, setup: boolean },
  nextStep: () => void,
  prevStep: () => void,
  togglePage: () => void,
  setStep: (step: number) => void,
  setPage: (page: number) => void,
  setComplete: (page: keyof OnboardingStore["complete"]) => void,
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  step: 0,
  page: 1,
  active: false,
  complete: {
    business: false,
    bank: false,
    verification: false,
    setup: false
  },

  nextStep: () => {
    set(state => ({
      step: state.step + 1 % state.step
    }))
  },

  prevStep: () => {
    set(state => ({
      step: Math.max(1, state.step - 1)
    }))
  },

  setStep: (step) => set({ step }),
  setPage: (page) => set({ page }),
  togglePage: () => set(s => ({ active: !s.active })),
  setComplete: (page) => set(state => ({
    complete: { ...state.complete, [page]: !state.complete[page] }
  }))

}))

