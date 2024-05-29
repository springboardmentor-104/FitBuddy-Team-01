import { useEffect } from "react";
import { useState } from "react";
import { DynamicFormFields3 } from "../TabCommon";

const TabSocialAccounts = ({setMainFormData,mainFormData}) => {
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
				<DynamicFormFields3
					fieldtype="input"
					name={`link1`}
					displayname={''}
					type={`url`}
					setFormValue={setFormValue}
					value={formData['link1']}
				/>
				<DynamicFormFields3
					fieldtype="input"
					name={`link2`}
					displayname={''}
					type={`url`}
					setFormValue={setFormValue}
					value={formData['link2']}
				/>
				<DynamicFormFields3
					fieldtype="input"
					name={`link3`}
					displayname={''}
					type={`url`}
					setFormValue={setFormValue}
					value={formData['link3']}
				/>
				<DynamicFormFields3
					fieldtype="input"
					name={`link4`}
					displayname={''}
					type={`url`}
					setFormValue={setFormValue}
					value={formData['link4']}
				/>
				{/* <div className="text-center">
					<Button type="submit" size={`sm`}>Submit</Button>
				</div> */}
			</form>
		</>
    )
}
export default TabSocialAccounts