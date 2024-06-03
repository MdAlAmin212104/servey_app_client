import { createContext, useState } from "react";

export const UserRoleContext = createContext(null);

export const FilterRole = ({ children }) => {
  const [role, setRole] = useState("");
  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};