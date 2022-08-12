import create from "zustand";

export const useStore = create((set) => ({
  users: [],
  fetchUsers: () => {
    fetch(`http://localhost:4000/api/users`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => set({ users: response }));
  },
}));
