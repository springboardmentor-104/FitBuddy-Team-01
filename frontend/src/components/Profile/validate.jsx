export const validateBasicForm = (name,value) => {
    let obj = {};
    obj.isValid = true;
    obj.message = "Success";

    if(name==="name"){
        const nameRegex = /^[A-Za-z\s]*$/;
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Full name is required";
        } else if (!nameRegex.test(value)) {
            obj.isValid = false;
            obj.message = "Please enter a valid full name";
        }
    }else if(name==="userName"){
        const userNameRegex = /^[A-Za-z0-9@#]+$/;
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Username is required";
        } else if (!userNameRegex.test(value)) {
            obj.isValid = false;
            obj.message = "Please enter a valid username";
        }
    }else if(name==="email"){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Email is required";
        } else if (!emailRegex.test(value)) {
            obj.isValid = false;
            obj.message = "Please enter a valid email address";
        }
    }else if(name==="phoneno"){
        if (value && !/^\d*$/.test(value)) {
            obj.isValid = false;
            obj.message = "Invalid phone number";
        } if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Phone number is required";
        }
    }else if(name==="dob"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "DOB is required";
        }
    }else if(name==="Age"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Age is required";
        }else if(isNaN(value)){
            obj.isValid = false;
            obj.message = "Not a number";
        }
    }else if(name==="gender"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Gender is required";
        }
    }else if(name==="country"){
        const nameRegex = /^[A-Za-z\s]*$/;
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Country is required";
        } else if (!nameRegex.test(value)) {
            obj.isValid = false;
            obj.message = "Please enter a valid country name";
        }
    }else if(name==="country"){
        const nameRegex = /^[A-Za-z\s]*$/;
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Country is required";
        } else if (!nameRegex.test(value)) {
            obj.isValid = false;
            obj.message = "Please enter a valid country name";
        }
    }


    return obj;
}

export const validatePassword = (name,value) => {
    let obj = {};
    obj.isValid = true;
    obj.message = "Success";
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    if(name==="currentpassword"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Field is required";
        }else if(value?.length<8){
            obj.isValid = false;
            obj.message = "Field must be at least 8 characters long";
        }else if(!pattern.test(value)){
            obj.isValid = false;
            obj.message = " Field does not match the required pattern";
        }
    }else if(name==="newPassword"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Field is required";
        }else if(value?.length<8){
            obj.isValid = false;
            obj.message = "Field must be at least 8 characters long";
        }else if(!pattern.test(value)){
            obj.isValid = false;
            obj.message = " Field does not match the required pattern";
        }
    }else if(name==="reEnterPassword"){
        if (!value.trim()) {
            obj.isValid = false;
            obj.message = "Field is required";
        }else if(value?.length<8){
            obj.isValid = false;
            obj.message = "Field must be at least 8 characters long";
        }else if(!pattern.test(value)){
            obj.isValid = false;
            obj.message = " Field does not match the required pattern";
        }
    }


    return obj;
}
