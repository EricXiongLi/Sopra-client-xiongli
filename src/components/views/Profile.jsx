import axios from "axios";
import { api, handleError } from "helpers/api";
import { getDomain } from "helpers/getDomain";
import React, { useEffect, useState } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const [username, setUsername] = useState("");
  let userData = "";
  const sendRequest = async () => {
    // const requestBody = JSON.stringify({ username, password });
    // const response = await api.post("/user/login", requestBody);
    const requestUrl = "/users/" + userId;
    try {
      const response = await api.get(requestUrl);
      userData = response.data;
      console.log(userData.username);
      setUsername(userData.username);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const getProfile = () => {};
  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <div className="w-[12rem] h-[12rem]">
          <img
            className="w-full h-full rounded-full"
            src="https://images.unsplash.com/photo-1646988389959-b494ff19e122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
        <div className="bg-blue-200 mt-8 ">
          <div>username:{username}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
