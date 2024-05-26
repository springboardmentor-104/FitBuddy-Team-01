import { Container, Row ,Col} from "react-bootstrap"
import {
	FaLink,
	FaLinkedin,
	FaTwitter,
	FaFacebook,
	FaInstagram,
} from "react-icons/fa";

export const DetailsListData = ({label,value}) => {
    return (
		<Container>
			<Row>
				<Col><strong className='Orv-Pr-Dt-hd'>{label}</strong></Col>
				<Col xs={7}>{value}</Col>
			</Row>
		</Container>
    )
}

export const GetSocialIcon = (url) => {
	let obj ={
		link : url,
		icon : <FaLink />,
		linkName : "",
	}
	if (url.includes("linkedin.com")) {
		obj ={
			link : url,
			icon : <FaLinkedin />,
			linkName : "LinkedIn",
		}
	} else if (url.includes("twitter.com")) {
		obj ={
			link : url,
			icon : <FaTwitter />,
			linkName : "Twitter",
		}
	} else if (url.includes("facebook.com")) {
		obj ={
			link : url,
			icon : <FaFacebook />,
			linkName : "Facebook",
		}
	} else if (url.includes("instagram.com")) {
		obj ={
			link : url,
			icon : <FaInstagram />,
			linkName : "Instagram",
		}
	}
	return obj;
}

export const DynamicFormFields = (formfields) => {

	return <>
		<Row className="mb-2 profile-edit">
			<Col>
				<label htmlFor={`profile_${formfields?.name}`} className="col-form-label">
					{formfields?.displayname}
					{formfields?.required && <span className="text-danger">*</span>}
				</label>
			</Col>
			<Col lg={9}>
				{
					((()=>{
						let parameters = {};
						if(formfields?.required){
							parameters.required = true;
						}
						if(formfields?.readOnly){
							parameters.readOnly = true;
						}
						if(formfields?.disabled){
							parameters.disabled = true;
						}

						if(formfields?.fieldtype?.toLowerCase()==="input"){
							return <input 
								type={formfields?.type || "text"} 
								name={formfields?.name}
								id={`profile_${formfields?.name}`}
								onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
								value={formfields?.value || ""} 
								placeholder={formfields?.displayname}
								className={`form-control  ${formfields?.className || ""}`}
								{...parameters}
							/>
						}else if(formfields?.fieldtype?.toLowerCase()==="textarea"){
							return <textarea 
								type={formfields?.type || "text"} 
								name={formfields?.name}
								id={`profile_${formfields?.name}`}
								onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
								value={formfields?.value || ""} 
								className={`form-control  ${formfields?.className || ""}`}
								placeholder={formfields?.displayname}
								rows={formfields?.rows}
								cols={formfields?.cols}
								{...parameters}
							>
								{formfields?.value || ""} 
							</textarea>
						}else if(formfields?.fieldtype?.toLowerCase()==="select"){
							return <select
								name={formfields?.name}
								id={`profile_${formfields?.name}`}
								onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
								value={formfields?.value || ""} 
								className={`form-control  ${formfields?.className || ""}`}
								placeholder={formfields?.displayname}
								{...parameters}
							>
								{
									formfields?.options?.map(opt=>{
										return <option value={opt?.value} key={Math.random()}>{opt?.label}</option>
									})
								}
							</select>	
						}
					})())
				}
				{formfields?.validate && <small className='text-danger w-100'>{formfields?.validate}</small>}
			</Col>
		</Row>
	</>
}

export const DynamicFormFields2 = (formfields) => {

	return <>
		<Row className="mb-2 profile-edit">
			<Col>
				<label htmlFor={`profile_${formfields?.name}`} className="col-form-label">
					{formfields?.displayname}
				</label>
			</Col>
			<Col lg={9}>
				<div className="input-group">
					<input 
						type={formfields?.type || "text"}  
						className="form-control" 
						placeholder={formfields?.displayname}
						name={formfields?.name}
						value={formfields?.value || ""} 
						onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
					/>
					<span className="input-group-text p-0" id={`profile_${formfields?.name}`}>
						<select
							name={formfields?.name2}
							id={`profile_${formfields?.name2}`}
							onChange={(e)=>{ formfields.setFormValue2(formfields?.name2,e.target.value) }} 
							value={formfields?.value2 || ""} 
							className={`form-control rounded-0 border-0`}
						>
							{
								formfields?.options2?.map(opt=>{
									return <option value={opt?.value} key={Math.random()}>{opt?.label}</option>
								})
							}
						</select>
					</span>
				</div>
			</Col>
		</Row>
	</>
}

export const DynamicFormFields3 = (formfields) => {
	let icon  = GetSocialIcon(formfields?.value || "");

	return <>
		<Row className="mb-2 profile-edit">
			<Col>
				<label htmlFor={`profile_${formfields?.name}`} className="col-form-label">
					{icon?.linkName || formfields?.displayname}
				</label>
			</Col>
			<Col lg={9}>
				<div className="input-group">
					<span className="input-group-text" id={`profile_${formfields?.name}`}>
						{icon?.icon}
					</span>
					<input 
						type={formfields?.type || "text"}  
						className="form-control" 
						placeholder={formfields?.displayname || "Link to Social Profile"}
						name={formfields?.name}
						value={formfields?.value || ""} 
						onChange={(e)=>{ formfields.setFormValue(formfields?.name,e.target.value) }} 
					/>
				</div>
			</Col>
		</Row>
	</>
}