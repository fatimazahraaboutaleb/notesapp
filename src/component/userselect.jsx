import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";

const animatedComponents = makeAnimated();

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#1B263B",
    border: state.isFocused ? "2px solid #778DA9" : "1px solid #415A77",
    borderRadius: "8px",
    boxShadow: "none",
    fontSize: "16px",
    color: "#E0E1DD",
    minHeight: "50px",
    "&:hover": {
      border: "2px solid #778DA9",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#778DA9",
    fontSize: "14px",
    fontStyle: "italic",
  }),
  menu: (base) => ({
    ...base,
    maxHeight: "150px",
    borderRadius: "8px",
    overflowY: "auto",
    backgroundColor: "#1B263B",
  }),
  menuList: (base) => ({
    ...base,
    padding: "0",
    maxHeight: "150px",
    overflowY: "auto",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? "#778DA9"
      : isFocused
      ? "#415A77"
      : "#1B263B",
    color: isSelected || isFocused ? "#E0E1DD" : "#E0E1DD",
    padding: "8px 12px",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#415A77",
    borderRadius: "4px",
    padding: "4px 8px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#E0E1DD",
    fontSize: "12px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#E0E1DD",
    ":hover": {
      backgroundColor: "#778DA9",
      color: "#1B263B",
    },
  }),
};



const UserSelect = ({ selectedUsers, setSelectedUsers }) => {
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const options = response.data.map((user) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
        }));
        setUserOptions(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Select
      isMulti
      components={animatedComponents}
      options={userOptions}
      value={selectedUsers}
      onChange={(selected) => setSelectedUsers(selected)}
      placeholder="Select users to share with"
      styles={customStyles}
    />
  );
};

export default UserSelect;
