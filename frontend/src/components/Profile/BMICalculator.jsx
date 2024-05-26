import { Button, Modal } from "react-bootstrap"
import {useEffect,useState} from 'react'

const BMICalculator = ({height,heightUnit,weight,WeightUnit,show,setShow}) => {
	const [bmi, setBMI] = useState("");
	const [bmiStatus, setBMIStatus] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	
	// Define a function to determine the text color based on the BMI status
	const getTextColor = () => {
		switch (bmiStatus) {
			case "Underweight":
				return "blue"; // Change this to your desired color for underweight
			// case "Normal weight":
			case "Normal":
				return "green"; // Change this to your desired color for normal weight
			case "Overweight":
				return "orange"; // Change this to your desired color for overweight
			case "Obesity":
				return "red"; // Change this to your desired color for obesity
			default:
				return "black"; // Default color
		}
	};

	// Define a function to generate suggestions based on BMI status and value
	const generateSuggestions = () => {
		switch (bmiStatus) {
			case "Underweight":
				return [
					"You may want to consider increasing your calorie intake.",
					"Include healthy fats and proteins in your diet to gain weight.",
				];
			case "Normal":
				return ["Maintain your current lifestyle for a healthy weight."];
			case "Overweight":
				return [
					"Focus on portion control and increasing physical activity.",
					"Consider incorporating more fruits and vegetables into your diet.",
				];
			case "Obesity":
				return [
					"Consult with a healthcare professional for personalized advice.",
					"Focus on gradual weight loss through a balanced diet and exercise.",
				];
			default:
				return [];
		}
	};

	// useEffect hook to calculate BMI whenever weight or height changes
	useEffect(() => {
		// Check if weight and height are both valid numbers
		if (weight && height && !isNaN(weight) && !isNaN(height)) {
			// Convert height to meters
			let heightInMeters = calculateHeight(height,heightUnit);
		
			// Convert weight to kilograms
			let weightInKilograms = calculateWeight(weight,WeightUnit);;
		
			// Calculate BMI
			const calculatedBMI =
				weightInKilograms / (heightInMeters * heightInMeters);
			const roundedBMI = calculatedBMI.toFixed(2); // Round BMI to 2 decimal places
			setBMI(roundedBMI);
		
			// Determine BMI status
			let status;
			if (calculatedBMI < 18.5) {
				status = "Underweight";
			} else if (calculatedBMI >= 18.5 && calculatedBMI < 25) {
				status = "Normal";
			} else if (calculatedBMI >= 25 && calculatedBMI < 30) {
				status = "Overweight";
			} else {
				status = "Obesity";
			}
			setBMIStatus(status);
		} else {
			// Reset BMI if weight or height is not a valid number
			setBMI("");
			setBMIStatus("");
		}
	}, [weight, height, heightUnit, WeightUnit]);

	// useEffect hook to update suggestions whenever BMI status changes
	useEffect(() => {
		// Generate suggestions based on BMI status
		const generatedSuggestions = generateSuggestions();
		setSuggestions(generatedSuggestions);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bmiStatus]);
	// BMI Calculator End

	const calculateHeight = (h,unit) =>{
		let heightInMeters = 0;
		switch (unit) {
			case "mm":
				heightInMeters = parseFloat(h) / 1000;
			  break;
			case "cm":
				heightInMeters = parseFloat(h) / 100;
			  break;
			case "m":
				heightInMeters = parseFloat(h);
			  break;
			case "ft":
				heightInMeters = parseFloat(h) * 0.3048;
			  break;
			default:
				heightInMeters = 0;
		}
		return heightInMeters;
	}

	const calculateWeight = (w,unit) =>{
		let weightInKilograms = 0;
		switch (unit) {
			case "gm":
				weightInKilograms = parseFloat(w) / 1000;
			break;
			case "kg":
				weightInKilograms = parseFloat(w);
			break;
			case "lbs":
				weightInKilograms = parseFloat(w) * 0.453592;
			break;
			default:
				weightInKilograms = 0;
		}
		return weightInKilograms;
	}
	 
	return (
		<div>
			<Modal
				show={show}
				onHide={() => {
					setShow(!show);
				}}
				centered
			>
				<Modal.Header className="py-1" closeButton>
					<Modal.Title
						style={{
							fontFamily: "Nunito, sans-serif",
							fontWeight: "600",
							color: "#4154f1",
						}}
					>
						BMI(Body Mass Index)
					</Modal.Title>
				</Modal.Header>
			<Modal.Body className="py-1">
				{/* Display BMI */}
				<div style={{ marginTop: "15px" }}>
					<div
						className="row"
						style={{
						fontFamily: "Nunito, sans-serif",
						color: getTextColor(), // Apply color based on BMI status
						}}
					>
						<div className="col-lg-3 col-md-4">
							<strong>Your BMI is</strong>{" "}
						</div>
						<div className="col-lg-9 col-md-8">
							{bmi ? bmi + " kg/m²" : "N/A"}
						</div>
						<div className="col-lg-3 col-md-4">
							{bmiStatus && <strong>Status</strong>}{" "}
						</div>
						<div className="col-lg-9 col-md-8">
							{bmiStatus}
						</div>
						{suggestions.length > 0 && (
							<div>
								<strong>Suggestions :</strong>
								<ul>
									{suggestions.map(
										(suggestion, index) => (
										<li key={index}>
											{suggestion}
										</li>
										)
									)}
								</ul>
							</div>
						)}
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer className="py-1">
				<Button
					variant="secondary"
					onClick={() => {
						setShow(!show);
					}}
					size="sm"
				>
				Close
				</Button>
			</Modal.Footer>
			</Modal>
		</div>
	)
}

BMICalculator.defaultProps = {

}

export default BMICalculator
