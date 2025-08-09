import React, {useState} from "react";

function UserForm () {

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState({});
    const[showPassword, setShowPassword] = useState(false);

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleChange = (e) => {
        const{name, value} = e.target;

        if(name === "name") setName(value);
        if(name === "email") setEmail(value);
        if(name === "password") setPassword(value);

        setErrors((prevErrors) => ({...prevErrors, [name]: ""}));

    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        let newErrors = {};

        if(!name.trim()) newErrors.name = "Name is required";
        if(!email.trim() || !validateEmail(email)) newErrors.email = "Enter a valid Email";
        if(password.length < 6)newErrors.password = "Password must be atleast 6 characters";

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        }else{
            alert("Form Submitted Successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setErrors({});
        }
    };

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="user-form">
                <h2>Registration Form</h2>

                <div>
                    <label>Name:</label>
                    <input 
                    type = "text"
                    value = {name}
                    name = "name" 
                    onChange={handleChange}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div>
                    <label>Email: </label>
                    <input 
                    type = "email" 
                    value = {email}
                    name = "email"
                    onChange = {handleChange}
                    />
                </div>

                    {errors.email && <p className="error-message">{errors.email}</p>}

                    <div className = "password-container">
                        <label>Password: </label>
                        <input 
                        type = {showPassword ? "text" : "password"}
                        value = {password}
                        name = "password"
                        onChange = {handleChange} 
                        />

                        <button 
                        type="button"
                        className = "toggle-btn"
                        onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide": "show"}
                        </button>
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <button type="submit">Submit</button>


            </form>
        </div>
    )
}
export default UserForm;