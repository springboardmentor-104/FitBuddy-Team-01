import { Tab } from 'bootstrap'
import React from 'react'
import { Tabs } from 'react-bootstrap'
import TabAccountSettings from './tabs/TabAccountSettings'
import TabChangePassword from './tabs/TabChangePassword'
import TabEditProfile from './tabs/TabEditProfile'
import TabOverview from './tabs/TabOverview'
import axios from "axios";
import { useEffect } from 'react'

const ProfileCardDetailsTab = ({setUserDetails,userDetails}) => {
    

    useEffect(()=>{
        getProfileDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getProfileDetails = async () => {   
        let userData = localStorage.getItem("user");
        userData = JSON.parse(userData);

        let headers = {
            Authorization: userData?.token || "",
            "Content-Type": "application/json",
        };
        await axios
            .get("http://localhost:8080/api/v1/auth/profile", {
                headers: headers,
            })
            .then(
                (response) => {
                    if (response.data.success) {
                        setUserDetails(response.data?.user)
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
    };

    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <Tabs
                        defaultActiveKey="overview"
                        id="uncontrolled-tab-example"
                        className="mb-3 profile-nav-item"
                    >
                        <Tab eventKey="overview" title="Overview">
                            <TabOverview 
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        </Tab>
                        <Tab eventKey="edit-profile" title="Edit Profile">
                            <TabEditProfile 
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        </Tab>
                        <Tab eventKey="change-password" title="Change Password">
                            <TabChangePassword 
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        </Tab>
                        <Tab eventKey="account-settings" title="Account Settings">
                            <TabAccountSettings 
                                userDetails={userDetails}
                                setUserDetails={setUserDetails}
                            />
                        </Tab>
                    </Tabs> 
                </div>
            </div>
        </>
    )
}

export default ProfileCardDetailsTab
