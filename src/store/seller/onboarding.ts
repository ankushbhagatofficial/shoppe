import { create } from "zustand"
import { persist } from "zustand/middleware"

export type OnboardingStore = {
  step: number,
  active: boolean,
  pages: {
    business: boolean,
    bank: boolean,
    verification: boolean,
    setup: boolean
  },
  errors: Record<string, string[] | string>,
  formData: {
    businessType: string,
    businessAddress: string,
    gstNumber: string,
    accountHolder: string,
    accountNumber: string,
    ifscCode: string,
    bankName: string,
    files: Partial<{
      panCard: {
        name: string,
        url: string,
        status: boolean | string
      },
      identityCard: {
        name: string,
        url: string,
        status: boolean | string
      },
      gstCertificate: {
        name: string,
        url: string,
        status: boolean | string
      },
      logo: {
        name: string,
        url: string,
        status: boolean | string
      },
      banner: {
        name: string,
        url: string,
        status: boolean | string
      },
    }>,
    storeName: string,
    storeURL: string,
    storeDescription: string
  },
  reset: () => void,
  nextStep: () => void,
  prevStep: () => void,
  togglePage: () => void,
  resetErrors: () => void,
  setStep: (step: number) => void,
  setPage: (page: Partial<OnboardingStore["pages"]>) => void,
  setErrors: (errors: OnboardingStore["errors"]) => void,
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
  errors: {},
  formData: {
    businessType: "individual",
    businessAddress: "",
    gstNumber: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    files: {
      panCard: {
        name: "",
        url: "",
        status: false
      },
      identityCard: {
        name: "",
        url: "",
        status: false
      },
      gstCertificate: {
        name: "",
        url: "",
        id: "",
        status: false
      },
      logo: {
        name: "",
        url: "",
        status: false
      },
      banner: {
        name: "",
        url: "",
        status: false
      },
    },
    storeName: "",
    storeURL: "",
    storeDescription: ""
  }
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist((set, get) => ({
    ...initiaState,

    reset: () => set(initiaState),

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

    setErrors: (errors) => set(state => ({
      errors: {
        ...state.errors, ...errors
      }
    })),

    resetErrors: () => set({
      errors: {}
    }),

    setFormData: (data) => set(state => ({
      formData: {
        ...state.formData, ...data,
        files: {
          ...state.formData.files,
          ...data.files,
        }
      }
    }))

  }), { name: "sellerOnboarding" }
  )
)

