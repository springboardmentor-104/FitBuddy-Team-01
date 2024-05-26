import { DetailsListData, GetSocialIcon } from "../TabCommon";


const TabSocialAccounts = ({link1,link2,link3,link4}) => {

	let social1 = link1 && GetSocialIcon(link1);
	let social2 = link2 && GetSocialIcon(link2);
	let social3 = link3 && GetSocialIcon(link3);
	let social4 = link4 && GetSocialIcon(link4);

    return (
		<>
			{link1 && <DetailsListData label={social1?.linkName || 'Social A/C'} value={link1 || 'N/A'}/>}
			{link2 && <DetailsListData label={social2?.linkName || 'Social A/C'} value={link2 || 'N/A'}/>}
			{link3 && <DetailsListData label={social3?.linkName || 'Social A/C'} value={link3 || 'N/A'}/>}
			{link4 && <DetailsListData label={social4?.linkName || 'Social A/C'} value={link4 || 'N/A'}/>}
		</>
    )
}
TabSocialAccounts.defaultProps = {
	link1: null,
	link2: null,
	link3: null,
	link4: null,
}

export default TabSocialAccounts;