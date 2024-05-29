import { useEffect } from "react";
import { useState } from "react";
import { DynamicFormFields2 } from "../TabCommon";

const TabBodyHealthStatus = ({setMainFormData,mainFormData}) => {

	const [formData,setFormData] = useState({});

	useEffect(()=>{
		if(mainFormData){
			mainFormData.userName=mainFormData.username; 
			setFormData(mainFormData);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[mainFormData])

	const  onFinish = (e) => {
		e.preventDefault();
		console.log(formData)
	}

	const setFormValue = (name,value) =>{
		setFormData({...formData, [name]: value })
		setMainFormData({...mainFormData, [name]: value })
	}

    return (
		<>
			<form
				name="control-hooks"
				onSubmit={onFinish}
			>
				<DynamicFormFields2
					fieldtype="input"
					name="height"
					displayname={'Height'}
					type={`number`}
					setFormValue={setFormValue}
					value={formData['height']}
					name2="heightUnit"
					value2={formData['heightUnit']}
					setFormValue2={setFormValue}
					options2={[
						{label:"--Unit--",value:""},
						{label:"mm",value:"mm"},
						{label:"cm",value:"cm"},
						{label:"m",value:"m"},
						{label:"ft",value:"ft"},
					]}
				/>
				<DynamicFormFields2
					fieldtype="input"
					name="weight"
					displayname={'Weight'}
					type={`number`}
					setFormValue={setFormValue}
					value={formData['weight']}
					name2="WeightUnit"
					value2={formData['WeightUnit']}
					setFormValue2={setFormValue}
					options2={[
						{label:"--Unit--",value:""},
						{label:"gm",value:"gm"},
						{label:"kg",value:"kg"},
						{label:"lbs",value:"lbs"},
					]}
				/>
				{/* <div className="text-center">
					<Button type="submit" size={`sm`}>Submit</Button>
				</div> */}
			</form>
		</>
    )
}
export default TabBodyHealthStatus