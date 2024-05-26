import { DetailsListData } from "../TabCommon"

const TabBasicInformation = ({userDetails}) => {
    return (
		<>
			<DetailsListData label={'Full Name'} value={userDetails?.name || 'N/A'}/>
			<DetailsListData label={'User Name'} value={userDetails?.username || 'N/A'}/>
			<DetailsListData label={'Email'} value={userDetails?.email || 'N/A'}/>
			<DetailsListData label={'Phone No.'} value={userDetails?.phoneno || 'N/A'}/>
			<DetailsListData label={'Date of Birth'} value={userDetails?.dob || 'N/A'}/>
			<DetailsListData label={'Age'} value={userDetails?.Age || 'N/A'}/>
			<DetailsListData label={'Gender'} value={userDetails?.gender || 'N/A'}/>
			<DetailsListData label={'Country'} value={userDetails?.country || 'N/A'}/>
			<DetailsListData label={'Address'} value={userDetails?.address || 'N/A'}/>
			<DetailsListData label={'Occupation'} value={userDetails?.occupation || 'N/A'}/>
		</>
    )
}

export default TabBasicInformation;