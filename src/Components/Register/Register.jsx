import React, { useState, useEffect } from "react";
import SimpleInput from "../Utilities/SimpleInput";
import SelectInput from "../Utilities/SelectInput";
import DatePickerInput from "../Utilities/DatePickerInput";

// this page opens only if
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {} from "../../config";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Button from "../Utilities/Button";

const isDigit = (phoneNum) => {
  return /^\d{10}$/.test(phoneNum);
}

const isValidEmailAddress = (email) => {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

const initialStateUser = {
  name: "",
  college: "",
  email: "",
  phone: "",
  dob: "",
  degree: "",
  year: "",
  gender: "",
  password: "",
  isVerified: false,
};

const initialValidStates = {
  isNameValid: true,
  isCollegeValid: true,
  isEmailValid: true,
  isPhoneValid: true,
  isDobValid: true,
  isDegreeValid: true,
  isYearValid: true,
  isGenderValid: true,
  isPasswordValid: true,
};

function Register({ onFlip }) {
  const navigate = useNavigate();
  const [user, editUser] = useState(initialStateUser);

  const [checkValidStates, setCheckValidStates] = useState(initialValidStates);
 

  const onFlipBtnClick = () => {  
    onFlip();
    editUser(initialStateUser);
    setCheckValidStates(initialValidStates);
  }

  function appendUser() {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        
        navigate("/events");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
    // store this user in db and redirect to events page
  }

  const changeHandler = (name, value) => {
    editUser({ ...user, [name]: value });
  };
  

  const submitHandler = (e) => {
    e.preventDefault();

    let formIsValid = true;

    for (var det in user) { 
      if (det === "name") {
        if (user[det].length < 2 || user[det].length > 50) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isNameValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isNameValid: true };
          });
      }         
      else if (det === "college") {
        if (user[det].length === 0 || user[det].length > 50) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isCollegeValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isCollegeValid: true };
          });
      } 
      
      else if (det === "email") {
        if (!isValidEmailAddress(user[det])) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isEmailValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isEmailValid: true };
          });
      } 
      
      else if (det === "phone") {
        if (!isDigit(user[det])) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isPhoneValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isPhoneValid: true };
          });
      } 
      
      else if (det === "password") {
        if (user[det].length < 8) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isPasswordValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isPasswordValid: true };
          });
      }

      else if (det === "dob") {
        if (user[det].length === 0) {
          setCheckValidStates((prevState) => {
            return { ...prevState, isDobValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isDobValid: true };
          });
      }

      else if (det === "degree") {
        if (user[det] === "") {
          setCheckValidStates((prevState) => {
            return { ...prevState, isDegreeValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isDegreeValid: true };
          });
      }

      else if (det === "year") {
        if (user[det] === "") {
          setCheckValidStates((prevState) => {
            return { ...prevState, isYearValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isYearValid: true };
          });
      }

      else if (det === "gender") {
        if (user[det] === "") {
          setCheckValidStates((prevState) => {
            return { ...prevState, isGenderValid: false };
          });
          formIsValid = false;  
        } else
          setCheckValidStates((prevState) => {
            return { ...prevState, isGenderValid: true };
          });
      }
      
    }

    if(!formIsValid){
      console.log(user);
      return false;
    }
    editUser(initialStateUser);
    setCheckValidStates(initialValidStates);
    console.log("not stopped");
    // appendUser();
  };

  return (
    <>
      <div
        className="text-center text-uppercase fs-1 my-3"
        style={{ fontFamily: "'Audiowide', serif", color: "white" }}
      >
        REGISTER
      </div>
      <form onSubmit={submitHandler} className="h-auto mh-100 mt-3 overflow-auto">
        <div
          className={`w-100 d-flex flex-column align-items-center`}
        >
          <SimpleInput
            type="text"
            icon="user"
            placeholder="Name"
            name="name"
            val={user.name}
            changeFunc={changeHandler}
            isValid={checkValidStates.isNameValid}
          />    
          <SimpleInput
            type="text"
            icon="at"
            name="email"
            placeholder="Email Address"
            val={user.email}
            changeFunc={changeHandler}
            isValid={checkValidStates.isEmailValid}
          />
          <SimpleInput
            type="text"
            icon="university"
            name="college"
            placeholder="College Name"
            val={user.college}
            changeFunc={changeHandler}
            isValid={checkValidStates.isCollegeValid}
          />
          <SimpleInput
            type="text"
            icon="phone-alt"
            name="phone"
            placeholder="Mobile Number"
            val={user.phone}
            changeFunc={changeHandler}
            isValid={checkValidStates.isPhoneValid}
          />

          <SelectInput
            value={user.gender}
            changeFunc={changeHandler}
            name="gender"
            icon="transgender-alt"
            label="gender"
            val={user.gender}
            disabledOption="Gender"
            options={["Male", "Female", "Other"]}
            isValid={checkValidStates.isGenderValid}
          />
          <DatePickerInput 
            label="dob" 
            icon="calendar" 
            name="dob"
            val={user.dob}
            changeFunc={changeHandler}
            isValid={checkValidStates.isDobValid}
          />

          <SelectInput
            val={user.year}
            changeFunc={changeHandler}
            name="year"
            icon="graduation-cap"
            label="grad_year"
            disabledOption="Graduation Year"
            options={["2022", "2023", "2024", "2025"]}
            isValid={checkValidStates.isYearValid}
          />
          <SelectInput
            val={user.degree}
            changeFunc={changeHandler}
            name="degree"
            icon="book"
            label="course"
            disabledOption="Course"
            options={["BTech", "MTech", "PhD"]}
            isValid={checkValidStates.isDegreeValid}
          />
          <SimpleInput
            type="password"
            name="password"
            val={user.password}
            password="true"
            icon="key"
            placeholder="Password"
            changeFunc={changeHandler}
            isValid={checkValidStates.isPasswordValid}
          />
        </div>
        <div className="d-flex flex-row justify-content-center mt-2 mb-4">
          <Button className="mx-3" type="button" onClickFunc={onFlipBtnClick}>
            BACK
          </Button>
          <Button className="mx-3" type="submit" >
            SIGN UP
          </Button>
        </div>
      </form>
    </>
  );
}

export default Register;