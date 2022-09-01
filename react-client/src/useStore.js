import create from "zustand";

export const useStore = create((set) => ({
  users: [], // if express server localhost:4000
  fetchUsers: () => {
    fetch(`http://localhost:8000/api/users`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => set({ users: response }));
  },
}));
