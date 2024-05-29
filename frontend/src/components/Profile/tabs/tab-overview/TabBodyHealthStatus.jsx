import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import BMICalculator from "../../BMICalculator"
import { DetailsListData } from "../TabCommon"

const TabBodyHealthStatus = ({height,heightUnit,weight,WeightUnit}) => {
	const [showBMI,setShowBMI] = useState(false);
	
    return (
		<>
			<DetailsListData label={'Height'} value={(height && heightUnit)?(height+""+heightUnit): 'N/A'}/>
			<DetailsListData label={'Weight'} value={(weight && WeightUnit)?(weight+""+WeightUnit): 'N/A'}/>
			<Button variant="primary" size="sm" className="pull-right" onClick={()=>{ setShowBMI(true) }}>Check BMI</Button>
			<BMICalculator
				show={showBMI}
				setShow={setShowBMI}
				height={height}
				heightUnit={heightUnit}
				weight={weight}
				WeightUnit={WeightUnit}
			/>
		</>
    )
}
TabBodyHealthStatus.defaultProps = {
	height: 0,
	heightUnit: null,
	weight: 0,
	WeightUnit: null,
}

export default TabBodyHealthStatus;