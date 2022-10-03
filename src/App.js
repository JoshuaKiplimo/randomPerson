import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const fetchUsers = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const info = data.results[0];
    const newUser = {
      name: `${info.name.first} ${info.name.last}`,
      email: info.email,
      age: info.dob.age,
      street: `${info.location.street.number} ${info.location.street.name}`,
      picture: info.picture.medium,
      phone: info.phone,
      password: info.login.password,
    };
    setUser(newUser);
    //setTitle(newUser.name);
    setValue(newUser.name);
  };

  const displayUserInfo = (e) => {
    if (e.target.classList.contains("icon")) {
      const label = e.target.attributes.datalabel.value;
      setTitle(label);
      setValue(user[label]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <main>
        <div className="block bcg-black"></div>
        <div className="block">
          <div className="container">
            <img src={user.picture} className="user-img" alt="person"></img>
            <div>
              <p className="user-title">{`my ${title} is`}</p>
              <p className="user-value">{value}</p>
            </div>

            <div className="values-list">
              <FaUser
                className="icon"
                datalabel="name"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaUser>
              <FaEnvelopeOpen
                className="icon"
                datalabel="email"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaEnvelopeOpen>
              <FaCalendarTimes
                className="icon"
                datalabel="age"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaCalendarTimes>
              <FaMap
                className="icon"
                datalabel="street"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaMap>
              <FaPhone
                className="icon"
                datalabel="phone"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaPhone>
              <FaLock
                className="icon"
                datalabel="password"
                onMouseOver={(e) => displayUserInfo(e)}
              ></FaLock>
            </div>
            <button className="btn" type="button" onClick={fetchUsers}>
              Random User
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
