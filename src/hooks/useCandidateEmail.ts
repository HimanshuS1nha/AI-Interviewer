import { create } from "zustand";

type UseCandidateEmailType = {
  email: string | null;
  setEmail: (email: string | null) => void;
};

export const useCandidateEmail = create<UseCandidateEmailType>((set) => ({
  email: null,
  setEmail: (email) => set({ email }),
}));
