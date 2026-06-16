import { create } from "zustand"
import { persist } from "zustand/middleware"

type OnboardingStore = {
  step: number,
  active: boolean,
  pages: {
    business: boolean,
    bank: boolean,
    verification: boolean,
    setup: boolean
  },
  formData: {
    businessType: string,
    businessAddress: string,
    gstNumber: string,
    accountHolder: string,
    accountNumber: string,
    ifscCode: string,
    bankName: string,
    storeName: string,
    storeLogo: {
      name: string,
      src: string,
    },
    storeBanner: {
      name: string,
      src: string,
    },
    storeDescription: string
  },
  nextStep: () => void,
  prevStep: () => void,
  togglePage: () => void,
  setStep: (step: number) => void,
  setPage: (page: Partial<OnboardingStore["pages"]>) => void,
  setFormData: (form: Partial<OnboardingStore["formData"]>) => void
}

const initiaState = {
  step: 0,
  active: false,
  pages: {
    business: false,
    bank: false,
    verification: false,
    setup: false
  },
  formData: {
    businessType: "individual",
    businessAddress: "",
    gstNumber: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    storeName: "",
    storeLogo: {
      name: "",
      src: ""
    },
    storeBanner: {
      name: "",
      src: ""
    },
    storeDescription: ""
  }
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist((set, get) => ({
    ...initiaState,

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
    })),

    setFormData: (data) => set(state => ({
      formData: {
        ...state.formData, ...data,
      }
    }))

  }), { name: "sellerOnboarding" }
  )
)

