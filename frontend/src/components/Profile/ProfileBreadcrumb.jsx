import React from "react";
import { Link } from "react-router-dom";

const ProfileBreadcrumb = (props) => {
	return (
		<>
			<nav>
				<ol className="breadcrumb">
					<li className="breadcrumb-item">
						<Link to="/Userdashboard" style={{ textDecoration: "none" }}>
							Home
						</Link>
					</li>
					<li className="breadcrumb-item">Users</li>
					<li className="breadcrumb-item active">My Profile</li>
				</ol>
			</nav>
		</>
	);
};

export default ProfileBreadcrumb;
