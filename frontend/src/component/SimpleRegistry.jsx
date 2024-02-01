/* eslint-disable react/prop-types */
import { useState } from "react";
// import { ethers } from "ethers";

const SimpleRegistry = ({ contract }) => {
  const [updateName, setUpdateName] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [updateAge, setUpdateAge] = useState("");

  const getEntityDetails = async () => {
    const result = await contract.getEntityDetails();
    console.log("result", result);
    setName(result[0]);
    setAge(result[1]);
  };

  const updateNameHandler = async () => {
    if (updateName !== "") {
      const transaction = await contract.updateName(updateName);
      console.log("updateName", updateName);
      await transaction.wait();
      setUpdateName("");
      getEntityDetails();
    } else {
      alert("Please enter a simpleRegistry");
    }
  };
  const updateAgeHandler = async () => {
    if (updateAge !== "") {
      const transaction = await contract.updateAge(updateAge);
      console.log("updateAge", updateAge);
      await transaction.wait();
      setUpdateName("");
      getEntityDetails();
    } else {
      alert("Please enter a simpleRegistry");
    }
  };

  return (
    <div className="">
      <div className="text-center">
        <h1>My SimpleRegistry DApp</h1>
        <p>
          Current Name: My name is {name} with age {age}
        </p>
      </div>
      <div className="align-center">
        <input
          type="text"
          placeholder="Enter name"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Age"
          value={updateAge}
          onChange={(e) => setUpdateAge(e.target.value)}
        />
        <button onClick={updateNameHandler}>Update name</button>
        <button onClick={updateAgeHandler}>UpdateAge</button>
        <button onClick={getEntityDetails}>Get SimpleRegistry</button>
      </div>
    </div>
  );
};

export default SimpleRegistry;
