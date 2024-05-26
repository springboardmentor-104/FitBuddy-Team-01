import "./profile.css"
import React from "react";
import ProfileBreadcrumb from "./ProfileBreadcrumb";
import ProfileCard from "./ProfileCard";
import ProfileCardDetailsTab from "./ProfileCardDetailsTab";
import BackToTop from "./BackToTop";
import { useState } from "react";


const Profile = (props) => {
	const [userDetails,setUserDetails] = useState(null);

	return (
		<div className="profile-page">
			<div className="pagetitle">
				<h1>My Profile</h1>
				<ProfileBreadcrumb />
			</div>
			<section className="section profile">
				<div className="row">
					<div className="col-xl-4">
						<ProfileCard {...userDetails}/>
					</div>
					<div className="col-xl-8">
						<ProfileCardDetailsTab setUserDetails={setUserDetails} userDetails={userDetails}/>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Profile;
