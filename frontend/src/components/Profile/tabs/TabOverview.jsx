import { Tab } from 'bootstrap'
import React from 'react'
import { Tabs } from 'react-bootstrap'
import TabBasicInformation from './tab-overview/TabBasicInformation'
import TabBodyHealthStatus from './tab-overview/TabBodyHealthStatus'
import TabSocialAccounts from './tab-overview/TabSocialAccounts'

const TabOverview = ({userDetails}) => {
    return (
		<>
			<h5 className="card-title" id="crd-ttl">About</h5>
			<p className="">{userDetails?.about || "N/A"}</p>

			<h5 className="card-title" id="crd-ttl"> Profile Details </h5>

			<Tabs
				defaultActiveKey="basic-information"
				id="uncontrolled-tab-example"
				className="mb-3 profile-nav-item"
			>
				<Tab eventKey="basic-information" title="Basic Information">
					<TabBasicInformation userDetails={userDetails}/>
				</Tab>
				<Tab eventKey="body-helth-status" title="Body & Health Status">
					<TabBodyHealthStatus {...userDetails}/>
				</Tab>
				<Tab eventKey="social-accounts" title="Social Accounts">
					<TabSocialAccounts {...userDetails}/>
				</Tab>
			</Tabs>
		</>
    )
}

export default TabOverview
