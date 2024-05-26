import { useState,useEffect } from 'react';
import { Tabs, Button, Tab } from 'react-bootstrap';
import axios from 'axios';
import ProfileImage from './tab-edit-profile/ProfileImage';
import TabBasicInformation from './tab-edit-profile/TabBasicInformation'
import TabBodyHealthStatus from './tab-edit-profile/TabBodyHealthStatus'
import TabSocialAccounts from './tab-edit-profile/TabSocialAccounts'

const TabEditProfile = ({userDetails,setUserDetails}) => {
	const [mainFormData,setMainFormData] = useState({});
	const [mainFormValidate,setMainFormValidate] = useState({});

	useEffect(()=>{
		setMainFormData(userDetails);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[userDetails])
	
	const setFormData = (formData) => {
		setMainFormData({...mainFormData,...formData});
		setUserDetails({...mainFormData,...formData})
	}

	const onFormSubmit =async () => {
		if(Object.keys(mainFormValidate).length===0){
			let userData = localStorage.getItem("user");
			userData = JSON.parse(userData);
			let data = mainFormData;
			let headers = {
				Authorization: userData?.token || "",
				"Content-Type": "application/json",
			};

			await axios.put("http://localhost:8080/api/v1/auth/update-profile", data, {
				headers: headers,
			}).then(
				(response) => {
					alert("Update profile successfully!");
				 	// Update state to indicate form submission
				},
				(error) => {
					console.log(error);
					// alert(error?.data?.error || error?.response?.data?.error);
				}
			);
		}else{
			alert("Please fill form properly");
		}
	}
	
    return (
        <div className="profile">
			<ProfileImage setMainFormData={setFormData} mainFormData={mainFormData}/>
			<h5 className="card-title" id="crd-ttl"> Profile Details </h5>
			<Tabs
				defaultActiveKey="basic-information"
				id="uncontrolled-tab-example"
				className="mb-3 profile-nav-item"
			>
				<Tab eventKey="basic-information" title="Basic Information">
					<TabBasicInformation setMainFormData={setFormData} mainFormData={mainFormData} setMainFormValidate={setMainFormValidate}/>
				</Tab>
				<Tab eventKey="body-helth-status" title="Body & Health Status">
					<TabBodyHealthStatus setMainFormData={setFormData} mainFormData={mainFormData}/>
				</Tab>
				<Tab eventKey="social-accounts" title="Social Accounts">
					<TabSocialAccounts setMainFormData={setFormData} mainFormData={mainFormData}/>
				</Tab>
			</Tabs>
			<div className="text-center">
				<Button type="submit" size={`sm`} onClick={()=>{ onFormSubmit(); }}>Update Profile</Button>
			</div>
        </div>
    )
}
export default TabEditProfile
