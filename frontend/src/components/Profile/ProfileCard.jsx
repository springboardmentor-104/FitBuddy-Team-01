import React from 'react'
import person_icn from "./../../Assets/person.png";
import { GetSocialIcon } from './tabs/TabCommon';

const ProfileCard = ({name="",occupation="",link1="",link2="",link3="",link4="",profile_pic="",...details}) => {

    let social1 = link1 && GetSocialIcon(link1);
	let social2 = link2 && GetSocialIcon(link2);
	let social3 = link3 && GetSocialIcon(link3);
	let social4 = link4 && GetSocialIcon(link4);
    
    return (
        <>
            <div className="card">
                <div className="card-body profile-card pt-4 text-center">
                    <img
                    alt="Profile"
                    src={profile_pic || person_icn}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                    />
                    <h2>{name || "N/A"}</h2>
                    <h3>{occupation || "N/A"}</h3>
                    <div className="social-links mt-2">
                        {link1 && <a target="_blank" href={link1} rel="noreferrer">{social1?.icon}</a>}
                        {link2 && <a target="_blank" href={link2} rel="noreferrer">{social2?.icon}</a>}
                        {link3 && <a target="_blank" href={link3} rel="noreferrer">{social3?.icon}</a>}
                        {link4 && <a target="_blank" href={link4} rel="noreferrer">{social4?.icon}</a>}
                    </div>
                </div>
            </div>
        </>
    )
}
ProfileCard.defaultProps = {
    name:"",
    occupation:"",
    link1:"",
    link2:"",
    link3:"",
    link4:"",
    profile_pic:""
}

export default ProfileCard
