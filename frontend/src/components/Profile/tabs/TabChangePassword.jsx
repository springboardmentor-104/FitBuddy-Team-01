import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Row,Col,Button } from 'react-bootstrap';

import {
	FaEye,
	FaEyeSlash,
  } from "react-icons/fa";
import { validatePassword } from '../validate';

const TabChangePassword = props => {
    const [formData,setFormData] = useState({});
	const [validate,setValidate] = useState({});

	const  onFinish =async (e) => {
		e.preventDefault();
		console.log("FormData",formData)
		if (formData?.currentpassword === formData?.newPassword) {
			// eslint-disable-next-line no-useless-computed-key
			return setValidate({...validate,['password']:"Current Password and New Password Matched!, Try another"})
		}else if(formData?.newPassword!==formData?.reEnterPassword){
			// eslint-disable-next-line no-useless-computed-key
			return setValidate({...validate,['reEnterPassword']:"New Password and Re-entered New Password not Matched !"})
		}
		if(Object.keys(validate).length===0){
			let userData = localStorage.getItem("user");
			userData = JSON.parse(userData);
			let data = {
				oldpassword: formData?.currentpassword,
				newPassword: formData?.newPassword,
			};
			let headers = {
				Authorization: userData?.token || "",
				"Content-Type": "application/json",
			};
			await axios.put("http://localhost:8080/api/v1/auth/update-password", data, {
				headers: headers,
			}).then(
				(response) => {
					if (response.data.success) {
						alert(response.data.message);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}

	const setFormValue = (name,value) =>{
		if(isValidate(name,value)){
			setFormData({...formData, [name]: value })
		}
	}

	const isValidate = (name,value)=>{
		let valid = validatePassword(name,value);
		if(valid?.isValid){
			delete validate[name];
			setValidate(validate)
		}else{
			setValidate({...validate,[name]:valid?.message})
		}
		return true;
	}

    return (
        <div>
            <form
				name="control-hooks"
				onSubmit={onFinish}
			>
				<DynamicFormFields4
					fieldtype="input"
					name={`currentpassword`}
					displayName={'Current Password'}
					setFormValue={setFormValue}
					value={formData['currentpassword']}
					validate={validate['currentpassword']}
					required
				/>
				<DynamicFormFields4
					fieldtype="input"
					name={`newPassword`}
					displayName={'New Password'}
					setFormValue={setFormValue}
					value={formData['newPassword']}
					validate={validate['newPassword']}
					required
				/>
				<DynamicFormFields4
					fieldtype="input"
					name={`reEnterPassword`}
					displayName={'Re-enter New Password'}
					setFormValue={setFormValue}
					value={formData['reEnterPassword']}
					validate={validate['reEnterPassword']}
					required
				/>
				<div className="text-center" >
					<Button type="submit" size={`sm`}>Change Password</Button>
				</div>
			</form>
        </div>
    )
}

const DynamicFormFields4 = (formfields) => {
    const [showPassword,setShowPassword] = useState(false);
	let parameters = {};
	if(formfields?.required){
		parameters.required = true;
	}
	return <>
		<Row className="mb-2 profile-edit">
			<Col>
				<label htmlFor={`profile_${formfields?.name}`} className="col-form-label">
                    {formfields?.displayName}
				</label>
			</Col>
			<Col lg={9}>
				<div className="input-group">
					<input 
						type={(showPassword?"password":"text")}  
						className="form-control" 
						placeholder={formfields?.displayName || "Password"}
						name={formfields?.name}
						value={formfields?.value || ""} 
						onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
						{...parameters}
					/>
					<span className="input-group-text" id={`profile_${formfields?.name}`} onClick={()=>{setShowPassword(!showPassword)}}>
						{!showPassword && <FaEye className="cursor-pointer"/>}
                        {showPassword && <FaEyeSlash className="cursor-pointer"/>}
					</span>
				</div>
				{formfields?.validate && <small className='text-danger w-100'>{formfields?.validate}</small>}
			</Col>
		</Row>
	</>
}

export default TabChangePassword
