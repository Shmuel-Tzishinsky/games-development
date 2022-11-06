import { useState } from "react";
// import Navbar from '../../global/Navbar';

export default function Start({ props, setUserName, setSelectLevel }) {
  const [value, setValue] = useState("");

  return (
    <>
      {/* <Navbar params={props.match} /> */}
      <div className="start">
        <h2>צור פרופיל</h2>
        <div className="startInput">
          <input onChange={(e) => setValue(e.target.value)} className="floating__input" placeholder=" " name="username" type="text" />
          <span className="hidden--visually">*שם </span>
        </div>
        <button
          className="startButton button-style"
          onClick={() => {
            setUserName(value);
            setSelectLevel(1);
          }}
        >
          התחל
        </button>
      </div>
    </>
  );
}
