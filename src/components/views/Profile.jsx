import { api, handleError } from "helpers/api";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [creationDate, setCreationDate] = useState("");
  let userData = "";
  const sendRequest = async () => {
    // const requestBody = JSON.stringify({
    //   token: localStorage.getItem("token"),
    // });
    const requestUrl = "/users/" + userId;
    try {
      const response = await api.get(requestUrl);
      userData = response.data;
      setUser(userData);
      setNewUsername(userData.username);
      if (userData.birthday) {
        setNewBirthday(userData.birthday.substring(0, 10));
      }
      setCreationDate(userData.creation_date.substring(0, 10));
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const sendNewUserInfo = async () => {
    const requestBody = JSON.stringify({
      username: newUsername,
      birthday: newBirthday,
      token: localStorage.getItem("token"),
    });
    const requestUrl = "/users/" + userId;
    try {
      const response = await api.put(requestUrl, requestBody);
      localStorage.setItem("token", newUsername);
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const doSubmit = () => {
    sendNewUserInfo();
    history.push("/game");
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <div className="flex justify-center w-[12rem] h-[12rem]">
          <img
            className="w-full h-full rounded-full"
            src="https://images.unsplash.com/photo-1646988389959-b494ff19e122?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                defaultValue={user.username}
                readOnly={user.username !== localStorage.getItem("token")}
                onChange={(event) => {
                  setNewUsername(event.target.value);
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="birthday"
              >
                Birthday
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="creationDate"
                type="date"
                defaultValue={newBirthday}
                onChange={(event) => {
                  setNewBirthday(event.target.value);
                }}
                readOnly={user.username !== localStorage.getItem("token")}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="creationDate"
              >
                Creation Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="creationDate"
                type="date"
                value={creationDate}
                readOnly={true}
              />
            </div>

            <div class="flex items-center justify-between">
              <button
                // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                className={`${
                  user.username === localStorage.getItem("token")
                    ? ""
                    : "hidden"
                }  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  doSubmit();
                }}
              >
                Update my profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
