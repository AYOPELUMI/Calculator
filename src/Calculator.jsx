import {useState,useEffect, useRef} from "react"
import {removeComma} from "./assets/removeComma"
import {toOptionalFixed, round , numberFormat }from "./assets/numberFormat"
import"./Calculator.scss"
import "./Reponsive.scss"
export function Calculator() {
   
	const [calcVariable1, setCalcVariable1] = useState("")
	const [calcVariable2, setCalcVariable2] = useState("")
	const [isOperandActive, setIsOperandActive] = useState(false)
	const [keyOperand, setKeyOperand] = useState("")
	const[resultOperand, setResultOperand] = useState(false)
	const [decimalPoint, setDecimalPoint] = useState(false)
	const[result, setResult] = useState("")
	const calcKeysArray = [7,8,9,"DEL",4,5,6,"+",1,2,3,"-",".",0,"/","x","RESET","="]

	let keyValue
	let divRef = useRef(null)

	const handleKeyPressed = (e) => {
		console.log({keyValue})
		if (e.key) {
			keyValue = e.key
			e.target.value = undefined
		}
		else{
			keyValue = e.target.value
		 // keyValue = e.key || e.target.value 
		}
		console.log("e.key is "+e.key)
		console.log("e.target.value is "+e.target.value)
		console.log({keyValue})
		console.log({isOperandActive})
		console.log({calcVariable1})
		console.log({calcVariable2})
		console.log({keyOperand})
		// console.log("calcVariable2,length is "+calcVariable2.length)
		// console.log("calcVariable1.length is "+calcVariable1.length)
		if(result !=null && result !=""){
			setKeyOperand("")
			setCalcVariable2("")
			setResult("")
			console.log({result})
		}
		if (calcVariable1.length <"9" || calcVariable2.length < "9") {

			if (keyValue == "+" || keyValue=="-" || keyValue == "/" || keyValue=="x" || keyValue == "*") {
				setIsOperandActive(true)
				setDecimalPoint(false)
				console.log({keyOperand})
				if (keyOperand != null && calcVariable2 != null) {
					if (keyOperand == "/") {
						let divided = Number(calcVariable1)/Number(calcVariable2)
						console.log({divided})
						setCalcVariable1(divided)
						setCalcVariable2("")
					}
					if (keyOperand == "x" || keyOperand =="*") {
						let multiplied = Number(calcVariable1) * Number(calcVariable2)
						console.log({multiplied})
						setCalcVariable1(multiplied)
						setCalcVariable2("")
					}
					if (keyOperand == "+") {
						let sum = Number(calcVariable1) + Number(calcVariable2)
						console.log({sum})
						setCalcVariable1(sum)
						setCalcVariable2("")
					}
					if (keyOperand == "-") {
						let subtraction = Number(calcVariable1) - Number(calcVariable2)
						console.log({subtraction})
						setCalcVariable1(subtraction)
						setCalcVariable2("")
					}
				}   
				if (keyValue == "*") {
					setKeyOperand("x")
				}
				else {
					setKeyOperand(keyValue)
				}
			}
			let numberKeyValue= isNaN(keyValue)
			if (!numberKeyValue) {
				console.log({keyValue})
				if (isOperandActive) {
					if (calcVariable2 == 0 && decimalPoint== false) {
						setCalcVariable2(keyValue)
					}
					else{
					setCalcVariable2(calcVariable2+keyValue)
					setResultOperand(false)
					}
				}
				else{
					if ((calcVariable1==0 || resultOperand == true) && decimalPoint == false) {
						setCalcVariable1(keyValue)
						setResultOperand(false)
					}
					else{
					setCalcVariable1(calcVariable1+keyValue)
					}
				}
			}
			if (keyValue== ".") {
				if (decimalPoint == false) {

					if (isOperandActive) {
						setCalcVariable2(calcVariable2+keyValue)
						setDecimalPoint(true)

					}
					else{
						setCalcVariable1(calcVariable1+keyValue)
						setDecimalPoint(true)
					}
				}
			}
		}
		if (keyValue=="=" || keyValue == "Enter") {
			setIsOperandActive(false)
			setResultOperand(true)
			if (calcVariable2!= null && keyOperand!= null) {
				let result
				if (keyOperand == "+") {
					result = Number(removeComma(calcVariable1)) + Number(removeComma(calcVariable2))
				}
				if (keyOperand == "-") {
					result = Number(removeComma(calcVariable1)) - Number(removeComma(calcVariable2))
				}
				if (keyOperand == "/") {
					result = Number(removeComma(calcVariable1)) / Number(removeComma(calcVariable2))
				}
				if (keyOperand == "x" || keyOperand == "*") {
					result = Number(removeComma(calcVariable1)) * Number(removeComma(calcVariable2))
				}
				console.log({result})
				if ((keyOperand == "" || keyOperand == undefined) && calcVariable1 != null){
					result = calcVariable1;
				}
				console.log({result})
				// alert((result - Math.floor(result)) != 0 )
				if (result != Math.floor(result)) {
					console.log("true")
					setResult(round(result,6))
				}
				else{
					setResult(result)
					// setCalcVariable1(result)
				}
			}
			// setKeyOperand(null)
			// 	setCalcVariable2("")
		}
		if (keyValue=="RESET"||keyValue == "Delete") {
			setResult("")
			setIsOperandActive(false)
			setKeyOperand("")
			setCalcVariable2("")
			setCalcVariable1("")
			setResultOperand(false)
			setDecimalPoint(false)
		}
		if (keyValue=="DEL" || keyValue == "Backspace") {
			setResultOperand(false)
			if (isOperandActive && calcVariable2 != "") {
				let calcVariable2Clone = String(calcVariable2)
				console.log({calcVariable2Clone})
				calcVariable2Clone =Array.from( calcVariable2Clone)
				if (calcVariable2Clone.length >=1) {
					calcVariable2Clone.pop()
					if (calcVariable2Clone[calcVariable2Clone.length-1] ==".") {
						setDecimalPoint(false)
					}
					calcVariable2Clone = Number(calcVariable2Clone.join(""))
					setCalcVariable2(calcVariable2Clone)
				}
			}
			if (isOperandActive && calcVariable2=="") {
				setKeyOperand("")
				setIsOperandActive(false)
			}
			if (isOperandActive == false) {
				let calcVariable1Clone = String(calcVariable1)
				calcVariable1Clone =Array.from( calcVariable1Clone)
				console.log({calcVariable1Clone})
				if (calcVariable1Clone.length >=1) {
					calcVariable1Clone.pop()
					console.log({calcVariable1Clone})
					if (calcVariable1Clone[calcVariable1Clone.length-1] ==".") {
						setDecimalPoint(false)
					}
					calcVariable1Clone = Number(calcVariable1Clone.join(""))
					setCalcVariable1(calcVariable1Clone)
				}
			}
		}
		// keyValue = undefined
	}
	console.log({isOperandActive})
	console.log({calcVariable1})
	console.log(numberFormat(calcVariable1))
	console.log({calcVariable2})
	console.log({keyOperand})
	console.log({resultOperand})
  
	const handleKeyPress = (e) =>{
		e.persist();
		console.log(e.key)
		console.log(e.charCode)
		// console.log(e.which)
	}

	let displayKeyArray =[]

	useEffect(() => {
		document.addEventListener("onKeyUp",() =>{
			console.log("i am in keyboard event")
		});
		divRef.current.focus()
		window.console.log("i am here")
		console.log(divRef)

		return(()=>{
			
		})

	},[])

	for (var i = 0; i < calcKeysArray.length; i++) {
		let style=[]
		if (calcKeysArray[i] == "DEL" || calcKeysArray[i]=="RESET") {
			style={
				background : "#65709e",
				color : "white"
			}
		}
		if (calcKeysArray[i] == "=") {
			style={
				background :"#d13f30",
				color:"white"
			}
		}
		const keyEl = (
			<button type="button" className="calcKey" value={calcKeysArray[i]} index={i} key={i}  style={style}>
			{calcKeysArray[i]}
			</button>
		)
		displayKeyArray.push(keyEl)
	}

	return(
		<div className="calculatorMainContainer" ref ={divRef}>
			<div className="calculatorContainer">
				<div className="calculatorHeading">
					<h3>calc</h3>
					<input type="radio" />
				</div>
				<div className="displayContainer">
					<p>
						{toOptionalFixed(numberFormat(calcVariable1))+ " "+(keyOperand ? keyOperand : " ") +" " +(calcVariable2 ? numberFormat(calcVariable2) : "")}
					</p>
					<h3>
						{
							resultOperand ? (
								numberFormat(result)
							) : null
						}
					</h3>
				</div>
				<div className="calcutaorKeysContainer" onKeyUp={handleKeyPressed} onClick={handleKeyPressed}>
					{displayKeyArray}
				</div>
			</div>
		</div>
	)
}