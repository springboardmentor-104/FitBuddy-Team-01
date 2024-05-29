import { useEffect } from "react";
import { useState } from "react";
import { validateBasicForm } from "../../validate";
import { DynamicFormFields } from "../TabCommon";

const TabBasicInformation = ({setMainFormData,mainFormData,setMainFormValidate}) => {
	const [formData,setFormData] = useState({});
	const [validate,setValidate] = useState({});

	useEffect(()=>{
		if(mainFormData){
			mainFormData.userName=mainFormData.username; 
			setFormData(mainFormData);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[mainFormData])

	useEffect(()=>{
		setMainFormValidate(validate);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[validate])

	const  onFinish = (e) => {
		e.preventDefault();
		console.log(formData)
	}

	const setFormValue = (name,value) =>{
		if(isValidate(name,value)){
			setFormData({...formData, [name]: value })
			setMainFormData({...mainFormData, [name]: value })
		}
	}

	const isValidate = (name,value)=>{
		let valid = validateBasicForm(name,value);
		if(valid?.isValid){
			delete validate[name];
			setValidate(validate)
		}else{
			setValidate({...validate,[name]:valid?.message})
		}
		return true;
	}

    return (
		<>
			<form
				name="control-hooks"
				onSubmit={onFinish}
			>
				<DynamicFormFields 
					fieldtype="input"
					name="name"
					displayname={'Full Name'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['name']}
					validate={validate['name']}
					required
					// readOnly
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="userName"
					displayname={'User Name'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['userName']}
					validate={validate['userName']}
					required
					readOnly
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="email"
					displayname={'Email'}
					type={`email`}
					setFormValue={setFormValue}
					value={formData['email']}
					validate={validate['email']}
					required
					readOnly
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="phoneno"
					displayname={'Phone No.'}
					type={`phone`}
					setFormValue={setFormValue}
					value={formData['phoneno']}
					validate={validate['phoneno']}
					required
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="dob"
					displayname={'Date of Birth'}
					type={`date`}
					setFormValue={setFormValue}
					value={formData['dob']}
					validate={validate['dob']}
					required
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="Age"
					displayname={'Age'}
					type={`number`}
					setFormValue={setFormValue}
					value={formData['Age']}
					validate={validate['Age']}
					required
				/>
				<DynamicFormFields 
					fieldtype="select"
					name="gender"
					displayname={'Gender'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['gender']}
					validate={validate['gender']}
					options={[{'label':'--Select--',value:''},{'label':'Male',value:'Male'},{'label':'Female',value:'female'},{'label':'Other',value:'other'},]}
					required
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="country"
					displayname={'Country'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['country']}
					validate={validate['country']}
					required
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="address"
					displayname={'Address'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['address']}
				/>
				<DynamicFormFields 
					fieldtype="input"
					name="occupation"
					displayname={'Occupation'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['occupation']}
					required
				/>
				<DynamicFormFields 
					fieldtype="textarea"
					name="about"
					displayname={'About'}
					type={`text`}
					setFormValue={setFormValue}
					value={formData['about']}
					rows={3}
					required
				/>
				{/* <div className="text-center">
					<Button type="submit" size={`sm`}>Submit</Button>
				</div> */}
			</form>
		</>
    )
}
export default TabBasicInformation