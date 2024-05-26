import React from "react";
import "./MyProfile.css";
import "./Userdashboard.css";
import Userdashboard from "./Userdashboard";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
    return (
		<Userdashboard
			content={
				<div>
					<Profile />
				</div>
			}
		/>
    );
};

export default ProfilePage;
