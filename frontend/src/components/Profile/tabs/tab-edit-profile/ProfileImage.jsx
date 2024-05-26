
import { Col, Row } from "react-bootstrap";
import profile_icn from "./../../../../Assets/person.png";
import { BiTrash, BiUpload, } from "react-icons/bi";
import { useState } from "react";
  
const ProfileImage = ({setMainFormData,mainFormData}) => {
	const [formData,setFormData] = useState({});

	const setFormValue = (name,value) =>{
		setFormData({...formData, [name]: value })
		setMainFormData({...mainFormData, [name]: value })
	}

	const handleDeleteProfilePic = ()=>{
		if(window.confirm( "Are you sure you want to reset your current avatar?")){
			setFormData({})
			setFormValue("profile_pic","");
		}
	}

	return (
		<>
			<Row className="profile-edit">
				<Col sm={6} lg={3}><label htmlFor='profileImage' className='col-form-label'>Profile Image: </label></Col>
				<Col sm={6} lg={3}>
					<img
						alt="Profile"
						id="profilepic"
						src={formData?.profile_pic || profile_icn}
						className={`profilepic img-thumbnail`}
					/>
					<div className="pt-2">
						<input
							name="Image"
							type="file"
							accept="image/jpej, image/png, image/jpg"
							id="input-file"
							style={{ display: "none" }}
							onChange={(event) => {
								var tmppath = URL.createObjectURL(
								event.target.files[0]
								);
								setFormValue('profile_pic',tmppath);
								
							}}
						/>
						<label
							htmlFor="input-file"
							className="btn btn-primary btn-sm"
							title="Upload new profile image"
						>
							<BiUpload style={{ color: "#fff" }} />
						</label>
						&nbsp;
						<label
							to=""
							className="btn btn-danger btn-sm"
							title="Remove my profile image"
							onClick={()=>{ handleDeleteProfilePic() }}
						>
							<BiTrash style={{ color: "#fff" }} />
						</label>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default ProfileImage;