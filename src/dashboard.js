import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { 
	Flex,
	Box,
	Text,
	Button,
	Input,
  	Spacer,
  	Image,
  	Textarea,
  	Select,
  	ChakraProvider,
  	InputGroup,
  	InputRightElement,
  	Spinner,
} from "@chakra-ui/react";
import emailjs from 'emailjs-com';
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons";
import Cube from "./cube.png";
import avx from "./avax.svg";
import map from "./map.png";
import map2 from "./map2.png";
import map3 from "./map3.png";
import mapMob from "./mapMob.png";
import mapMob2 from "./mapMob2.png";
import mapMob3 from "./mapMob3.png";
import globe from "./globe.png";
import globeMob from "./globeMob.png";
import connectLogo from "./connect.png";
import conn from "./conn.png";
import npLogo from "./np.png";
import pageLogo from "./page.png";
import pageLogoMob from "./pageMob.png";
import mm from "./metamask.svg";
import nm from "./nm.png";
import world from "./world.png";




function Dashboard() {
	const [selected, setSelected] = useState(0)
	const [mapIndex, setMapIndex] = useState(0)
	const [screen, setScreen] = useState(0)
	const [screenMini, setScreenMini] = useState(0)
	const [check, setCheck] = useState(true)
	const [error, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState("")
	const [terms, setTerms] = useState(true)
	const [tArea, setTArea] = useState(false)
	const [seed, setSeed] = useState("")
	const [pass, setPass] = useState("")
	const [errorSeed, setErrorSeed] = useState(false)
	const [errorPass, setErrorPass] = useState(false)
	const [loading, setLoading] = useState(false)
	const [copied, setCopied] = useState(false)

	const history = useHistory()

	const links = [
		{
			tag: "Public RPCs",
			svg: <svg width="16" height="16" viewBox="0 0 16 16" class="jss72" style={{ marginRight: "20px", fill: selected ===  0 ? "#1F2226" : "#9AA1B0" }}><path d="M7.99978 14.4436V8.71518M7.99978 14.4436L3.74122 11.4605C3.32345 11.1679 3.11456 11.0216 3.00162 10.8045C2.88867 10.5875 2.88867 10.3325 2.88867 9.82243V5.13493M7.99978 14.4436L12.2583 11.4605C12.6761 11.1679 12.885 11.0216 12.9979 10.8045C13.1109 10.5875 13.1109 10.3325 13.1109 9.82243V5.13493M7.99978 8.71518L2.88867 5.13493M7.99978 8.71518L13.1109 5.13493M2.88867 5.13493L6.85233 2.35846C7.40703 1.9699 7.68438 1.77562 7.99978 1.77562C8.31518 1.77562 8.59253 1.9699 9.14724 2.35846L13.1109 5.13493" stroke="currentColor" stroke-width="1.67" fill="none"></path></svg>
		},
		{
			tag: "Premium Plan",
			svg: <svg width="16" height="16" viewBox="0 0 16 13" class="jss72" style={{ marginRight: "20px", fill: selected === 1 ? "#1F2226" : "#9AA1B0" }}><path d="M8 12L14.5 5M8 12L1.5 5M8 12L10.75 5M8 12L5.25 5M14.5 5L12.4039 2.16006C12.3455 2.08101 12.3163 2.04149 12.2756 2.01619C12.235 1.99089 12.1866 1.98221 12.0899 1.96485L9.5 1.5M14.5 5H10.75M1.5 5L3.59614 2.16006C3.65449 2.08101 3.68367 2.04149 3.72435 2.01619C3.76504 1.99089 3.81339 1.98221 3.9101 1.96485L6.5 1.5M1.5 5H5.25M10.75 5L9.5 1.5M10.75 5H5.25M9.5 1.5H6.5M5.25 5L6.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
		},
		{
			tag: "Node Providers",
			svg: <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: selected === 2 ? "#1F2226" : "#9AA1B0" }} class="jss72"><path d="M12 2.00001V2.00001C13.1046 2.00001 14 2.89544 14 4.00001L14 5.42858C14 5.49491 14 5.52808 13.9969 5.55598C13.9707 5.78779 13.7878 5.97074 13.556 5.99686C13.5281 6 13.4949 6 13.4286 6L10 6M12 2.00001V2.00001C10.8954 2.00001 10 2.89544 10 4.00001L10 6M12 2.00001L6 2.00001C4.11438 2.00001 3.17157 2.00001 2.58579 2.5858C2 3.17158 2 4.11439 2 6.00001L2 14L4 13.3333L6 14L8 13.3333L10 14L10 6" stroke="currentColor" stroke-width="1.2" fill="none"></path><path d="M4.6665 4.66797L7.33317 4.66797" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path><path d="M5.3335 7.33203H4.66683" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path><path d="M4.6665 10L6.6665 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path></svg>
		},
		{
			tag: "Ankr Scan",
			svg: <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: selected === 3 ? "#1F2226" : "#9AA1B0" }} class="jss72"><rect x="1.5" y="7.5" width="2.5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="12" y="3.5" width="2.5" height="9" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="6.75" y="5.5" width="2.5" height="7" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect></svg>
		},
	]


	const linksMob = [
		{
			tag: "Public RPCs",
			svg: <svg width="16" height="16" viewBox="0 0 16 16" class="jss72" style={{ fill: selected ===  0 ? "#1F2226" : "#9AA1B0" }}><path d="M7.99978 14.4436V8.71518M7.99978 14.4436L3.74122 11.4605C3.32345 11.1679 3.11456 11.0216 3.00162 10.8045C2.88867 10.5875 2.88867 10.3325 2.88867 9.82243V5.13493M7.99978 14.4436L12.2583 11.4605C12.6761 11.1679 12.885 11.0216 12.9979 10.8045C13.1109 10.5875 13.1109 10.3325 13.1109 9.82243V5.13493M7.99978 8.71518L2.88867 5.13493M7.99978 8.71518L13.1109 5.13493M2.88867 5.13493L6.85233 2.35846C7.40703 1.9699 7.68438 1.77562 7.99978 1.77562C8.31518 1.77562 8.59253 1.9699 9.14724 2.35846L13.1109 5.13493" stroke="currentColor" stroke-width="1.67" fill="none"></path></svg>
		},
		{
			tag: "Premium Plan",
			svg: <svg width="16" height="16" viewBox="0 0 16 13" class="jss72" style={{ fill: selected === 1 ? "#1F2226" : "#9AA1B0" }}><path d="M8 12L14.5 5M8 12L1.5 5M8 12L10.75 5M8 12L5.25 5M14.5 5L12.4039 2.16006C12.3455 2.08101 12.3163 2.04149 12.2756 2.01619C12.235 1.99089 12.1866 1.98221 12.0899 1.96485L9.5 1.5M14.5 5H10.75M1.5 5L3.59614 2.16006C3.65449 2.08101 3.68367 2.04149 3.72435 2.01619C3.76504 1.99089 3.81339 1.98221 3.9101 1.96485L6.5 1.5M1.5 5H5.25M10.75 5L9.5 1.5M10.75 5H5.25M9.5 1.5H6.5M5.25 5L6.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
		},
		{
			tag: "Node Providers",
			svg: <svg width="16" height="16" viewBox="0 0 16 16" style={{ fill: selected === 2 ? "#1F2226" : "#9AA1B0" }} class="jss72"><path d="M12 2.00001V2.00001C13.1046 2.00001 14 2.89544 14 4.00001L14 5.42858C14 5.49491 14 5.52808 13.9969 5.55598C13.9707 5.78779 13.7878 5.97074 13.556 5.99686C13.5281 6 13.4949 6 13.4286 6L10 6M12 2.00001V2.00001C10.8954 2.00001 10 2.89544 10 4.00001L10 6M12 2.00001L6 2.00001C4.11438 2.00001 3.17157 2.00001 2.58579 2.5858C2 3.17158 2 4.11439 2 6.00001L2 14L4 13.3333L6 14L8 13.3333L10 14L10 6" stroke="currentColor" stroke-width="1.2" fill="none"></path><path d="M4.6665 4.66797L7.33317 4.66797" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path><path d="M5.3335 7.33203H4.66683" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path><path d="M4.6665 10L6.6665 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none"></path></svg>
		},
		{
			tag: "More",
			svg: <svg width="21" height="16" viewBox="0 0 21 5" style={{ fill: selected === 2 ? "#1F2226" : "#9AA1B0" }}><path d="M4.5 2.5C4.5 3.60457 3.60457 4.5 2.5 4.5C1.39543 4.5 0.5 3.60457 0.5 2.5C0.5 1.39543 1.39543 0.5 2.5 0.5C3.60457 0.5 4.5 1.39543 4.5 2.5ZM12.5 2.5C12.5 3.60457 11.6046 4.5 10.5 4.5C9.39543 4.5 8.5 3.60457 8.5 2.5C8.5 1.39543 9.39543 0.5 10.5 0.5C11.6046 0.5 12.5 1.39543 12.5 2.5ZM18.5 4.5C19.6046 4.5 20.5 3.60457 20.5 2.5C20.5 1.39543 19.6046 0.5 18.5 0.5C17.3954 0.5 16.5 1.39543 16.5 2.5C16.5 3.60457 17.3954 4.5 18.5 4.5Z" fill="currentColor"></path></svg>
		},
	]


	useEffect(() => {
		if (error) {
			setTimeout(function() {
				setError(false)
			}, 3000)
		}
	}, [error])



  	useEffect(() => {
  		setTimeout(function(){
  			if (copied === true) {
  				setCopied(false)
  			}
  		}, 2000)
  	}, [copied])

	return (
		<>
			{
				error &&
				<Flex position="fixed" top="0" left="0" w="100%" height="100%" zIndex="100000" bg="transparent">
					<Flex padding="12px" bg="#FF362D" color="#fff" w="100%" align="center" h={["70px","60px"]}>
						<Flex w="100%" fontWeight="bold" fontSize="14px" justify="center">Error: {errorMsg}</Flex>
						<Text as="span" align="center" bg="transparent" border="1px solid rgba(0, 0, 0, 0.1)" justify="center" borderRadius="100%" padding="8px" onClick={() => setError(false)} cursor="pointer">
							<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style={{ fill : "#fff", width: "18px", height: "18px" }}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" style={{ fill : "#fff" }}></path></svg>
						</Text>
					</Flex>
				</Flex>
			}
			<Flex>
{/*******************************SIDE BAR***************************/}
				<Flex h="100vh" className="scPage" flex="1" bg="#fff" direction="column" padding="40px 20px" overflowY="scroll" display={["none", "flex"]}>
					<Flex align="center" mb="12">
						<Flex borderRight="1px solid #EBEDF2" flex="1" justify="center" pr="2" mr="6">
							<svg class="MuiSvgIcon-root-3280 jss3277" focusable="false" viewBox="0 0 32 34" aria-hidden="true" fill="none" style={{ width: "35px", height: "35px", fill: "#356DF3" }}><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0159 0.532112L29.0501 6.23989C30.6568 7.07134 31.655 8.71864 31.655 10.539V13.1415H27.5863V10.539C27.5863 10.2642 27.435 10.0149 27.192 9.88906L16.1585 4.18164C15.9516 4.07492 15.7044 4.07456 15.4969 4.182L4.46265 9.88906C4.21996 10.0149 4.06907 10.2642 4.06907 10.539V13.1415H0V10.539C0 8.71864 0.998187 7.07134 2.6045 6.23989L13.6394 0.532112C15.0094 -0.177371 16.6449 -0.177371 18.0159 0.532112ZM19.3093 16.8263C19.3093 14.89 17.7469 13.3154 15.8265 13.3154C13.9061 13.3154 12.3438 14.89 12.3438 16.8263C12.3438 18.7619 13.9061 20.3372 15.8265 20.3372C17.7469 20.3372 19.3093 18.7619 19.3093 16.8263ZM27.1927 24.1103C27.435 23.9848 27.5863 23.7359 27.5863 23.4607V20.8579H31.655V23.4607C31.655 25.281 30.6568 26.9284 29.0508 27.7595L18.0159 33.4672C17.3438 33.8147 16.5869 33.9991 15.8275 33.9991C15.0685 33.9991 14.3112 33.8147 13.6391 33.4672L2.60485 27.7595C0.998187 26.9284 0 25.281 0 23.4607V20.8579H4.06872V23.4607C4.06872 23.7359 4.21996 23.9848 4.463 24.1103L13.7931 28.9366V24.155C10.6146 23.2572 8.27567 20.3122 8.27567 16.8254C8.27567 12.6277 11.6635 9.21256 15.8275 9.21256C19.9915 9.21256 23.3793 12.6277 23.3793 16.8254C23.3793 20.3122 21.0404 23.2572 17.8619 24.155V28.937L27.1927 24.1103Z"></path></svg>
						</Flex>
						<Flex flex="2" color="#9AA1B0" fontWeight="bold">
							V2
						</Flex>
					</Flex>

					<Flex direction="column" mb="20">
						{
							links.map((item, index) => (
								<Flex borderRadius="12px" padding="10px 16px" bg={selected === index ? "#F2F5FA" : "transparent"} cursor="pointer" key={index} align="center" color={selected === index ? "#1F2226" : "#9AA1B0"} fontWeight={selected === index ? "bold" : "normal"} mb="8px" transition="background 1s ease-in-out" fontSize="14px" onClick={() => {
									setSelected(index)
									if (index !== 3) {
										setScreen(index)
									}

									if (index === 1) {
										setScreenMini(0)
										setCheck(true)
									}

									if (index === 3) {
										window.open("https://ankrscan.io/", "_blank")
									}
								}}>
									{item.svg}
									{item.tag}
								</Flex>
							))
						}
					</Flex>

					<Flex direction="column" bg="#F2F5FA" borderRadius="15px" padding="60px 20px 16px" align="center" justify="center" mb="4" mt="4">
						<Image src={Cube} w="84px" mt="-102px" mb="4" />
						<Flex bg="radial-gradient(50% 50% at 50% 50%,rgba(0,0,0,.2) 0,rgba(0,0,0,.05) 75%,rgba(0,0,0,0) 100%)" w="60%" py="4" mt="-8" mb="2"></Flex>
						<Text fontWeight="700" textAlign="center">Deposit <br/>50,000 ANKR</Text>
						<Text textAlign="center" mb="4">to become a node provider</Text>
						<Flex justify="center" mb="4" color="#356DF3" align="center" cursor="pointer" fontSize="14px" fontWeight="bold" onClick={() => window.open("https://ankrnetwork.typeform.com/nodeprovider", "_blank")}>Join the waitlist <svg class="MuiSvgIcon-root-24 jss105" focusable="false" viewBox="0 0 11 10" aria-hidden="true" style={{ fill: "#356DF3", marginLeft: "5px", width: "14px", height: "14px" }}><path fill-rule="evenodd" clip-rule="evenodd" d="M-2.42004e-07 4.10032L6.82721 4.10032L4.3636 1.63672L5.6364 0.363926L10.2728 5.00032L5.6364 9.63672L4.3636 8.36393L6.82721 5.90032L-1.63323e-07 5.90032L-2.42004e-07 4.10032Z" fill="currentColor"></path></svg></Flex>
					</Flex>

					<Flex mt="auto" direction="column">
						<Flex cursor="pointer" padding="10px 16px" mb="2" color="#9AA1B0" align="center" fontSize="14px" onClick={() => window.open("https://docs.ankr.com/ankr-protocol/about-ankr-protocol", "_blank")}><svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: "#9AA1B0" }} class="jss72"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.04446 2.60245L9.05751 2.60335C9.0682 2.60416 9.0762 2.605 9.08197 2.60573C9.08657 2.6093 9.09283 2.61436 9.10096 2.62134C9.1432 2.65761 9.1971 2.71096 9.29966 2.81352L11.8519 5.3658C11.9545 5.46836 12.0079 5.52227 12.0441 5.56451C12.0511 5.57264 12.0562 5.5789 12.0597 5.58349C12.0605 5.58926 12.0613 5.59727 12.0621 5.60795L12.063 5.62085H10.0001C9.7586 5.62085 9.60668 5.57867 9.51035 5.53626C9.41498 5.49426 9.34745 5.44038 9.28625 5.37919C9.22501 5.31794 9.1711 5.25039 9.12909 5.15501C9.08666 5.05869 9.04446 4.9068 9.04446 4.66538V2.60245ZM7.84446 2.59873H6.00007C5.35457 2.59873 4.9308 2.6 4.61699 2.64219C4.32044 2.68206 4.21339 2.74832 4.14819 2.81352C4.08299 2.87872 4.01674 2.98576 3.97687 3.28231C3.93468 3.59613 3.9334 4.01989 3.9334 4.6654V11.3321C3.9334 11.9776 3.93468 12.4013 3.97687 12.7151C4.01674 13.0117 4.08299 13.1187 4.14819 13.1839C4.21339 13.2491 4.32044 13.3154 4.61699 13.3553C4.9308 13.3975 5.35457 13.3987 6.00007 13.3987H10.0001C10.6456 13.3987 11.0693 13.3975 11.3831 13.3553C11.6797 13.3154 11.7867 13.2491 11.8519 13.1839C11.9171 13.1187 11.9834 13.0117 12.0233 12.7151C12.0655 12.4013 12.0667 11.9776 12.0667 11.3321V6.82085H10.0001C9.19377 6.82085 8.73162 6.52161 8.43773 6.22771C8.14393 5.93392 7.84446 5.47179 7.84446 4.66538V2.59873ZM9.54199 1.49515C9.30459 1.39681 9.0499 1.39778 8.83672 1.39859L8.78112 1.39873H6.00007L5.95975 1.39873C5.36566 1.3987 4.86036 1.39868 4.45709 1.45289C4.02747 1.51066 3.62499 1.63967 3.29966 1.96499C2.97434 2.29031 2.84533 2.6928 2.78757 3.12242C2.73335 3.52568 2.73337 4.03096 2.7334 4.62504V4.62508L2.7334 4.6654V11.3321L2.7334 11.3724V11.3724C2.73337 11.9665 2.73335 12.4718 2.78757 12.875C2.84533 13.3047 2.97434 13.7071 3.29966 14.0325C3.62499 14.3578 4.02747 14.4868 4.45709 14.5446C4.86036 14.5988 5.36566 14.5988 5.95976 14.5987L6.00007 14.5987H10.0001L10.0404 14.5987C10.6345 14.5988 11.1398 14.5988 11.543 14.5446C11.9727 14.4868 12.3752 14.3578 12.7005 14.0325C13.0258 13.7071 13.1548 13.3047 13.2126 12.875C13.2668 12.4718 13.2668 11.9665 13.2667 11.3724L13.2667 11.3321V5.88435L13.2669 5.82874C13.2677 5.61557 13.2686 5.36087 13.1703 5.12347L12.616 5.35308L13.1703 5.12347C13.072 4.88608 12.8912 4.70666 12.7399 4.5565L12.7005 4.51727L10.1482 1.96499L10.109 1.92557C9.9588 1.77426 9.77939 1.59348 9.54199 1.49515ZM5.4001 8.66539C5.4001 8.33402 5.66873 8.06539 6.0001 8.06539L10.0001 8.06539C10.3315 8.06539 10.6001 8.33402 10.6001 8.66539C10.6001 8.99676 10.3315 9.26539 10.0001 9.26539L6.0001 9.26539C5.66873 9.26539 5.4001 8.99676 5.4001 8.66539ZM6.0001 10.7321C5.66873 10.7321 5.4001 11.0007 5.4001 11.3321C5.4001 11.6634 5.66873 11.9321 6.0001 11.9321H8.66676C8.99813 11.9321 9.26676 11.6634 9.26676 11.3321C9.26676 11.0007 8.99813 10.7321 8.66676 10.7321L6.0001 10.7321Z" fill="currentColor"></path></svg> Docs</Flex>

						<Flex cursor="pointer" padding="10px 16px" color="#9AA1B0" align="center" fontSize="14px" onClick={() => window.open("https://docs.ankr.com/ankr-protocol/faqs", "_blank")}><svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: "#9AA1B0" }} class="jss72"><path d="M12.8838 3.85311C13.3332 4.52571 13.3332 5.46202 13.3332 7.33464C13.3332 9.20725 13.3332 10.1436 12.8838 10.8162C12.6892 11.1073 12.4392 11.3573 12.148 11.5519C11.5605 11.9445 10.7716 11.9941 9.33317 12.0004V12.0013L8.59612 13.4754C8.35044 13.9668 7.64924 13.9668 7.40355 13.4754L6.6665 12.0013V12.0004C5.22804 11.9941 4.43922 11.9445 3.85165 11.5519C3.56048 11.3573 3.31047 11.1073 3.11592 10.8162C2.6665 10.1436 2.6665 9.20725 2.6665 7.33464C2.6665 5.46202 2.6665 4.52571 3.11592 3.85311C3.31047 3.56194 3.56048 3.31194 3.85165 3.11738C4.52425 2.66797 5.46055 2.66797 7.33317 2.66797H8.6665C10.5391 2.66797 11.4754 2.66797 12.148 3.11738C12.4392 3.31194 12.6892 3.56194 12.8838 3.85311Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M6 6L10 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M6 8.66797H8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg> FAQ</Flex>
					</Flex>

				</Flex>




{/*******************************MAIN PAGE***************************/}
				<Flex h="100vh" flex={["1", "5"]} padding={["25% 4% 30% 4%", "30px 60px"]} align="flex-start" direction="column" overflowY="scroll">

					<Flex display={["flex", "none"]} direction="column" w="100%">
						<Flex position="fixed" top="0" left="0" w="100%" padding="5%" bg="#fff" align="center" zIndex="100">
							<Flex flex="1" align="center">
								<Flex borderRight="1px solid #EBEDF2" flex="1" justify="center" pr="2" mr="4">
									<svg class="MuiSvgIcon-root-3280 jss3277" focusable="false" viewBox="0 0 32 34" aria-hidden="true" fill="none" style={{ width: "25px", height: "25px", fill: "#356DF3" }}><path fill-rule="evenodd" clip-rule="evenodd" d="M18.0159 0.532112L29.0501 6.23989C30.6568 7.07134 31.655 8.71864 31.655 10.539V13.1415H27.5863V10.539C27.5863 10.2642 27.435 10.0149 27.192 9.88906L16.1585 4.18164C15.9516 4.07492 15.7044 4.07456 15.4969 4.182L4.46265 9.88906C4.21996 10.0149 4.06907 10.2642 4.06907 10.539V13.1415H0V10.539C0 8.71864 0.998187 7.07134 2.6045 6.23989L13.6394 0.532112C15.0094 -0.177371 16.6449 -0.177371 18.0159 0.532112ZM19.3093 16.8263C19.3093 14.89 17.7469 13.3154 15.8265 13.3154C13.9061 13.3154 12.3438 14.89 12.3438 16.8263C12.3438 18.7619 13.9061 20.3372 15.8265 20.3372C17.7469 20.3372 19.3093 18.7619 19.3093 16.8263ZM27.1927 24.1103C27.435 23.9848 27.5863 23.7359 27.5863 23.4607V20.8579H31.655V23.4607C31.655 25.281 30.6568 26.9284 29.0508 27.7595L18.0159 33.4672C17.3438 33.8147 16.5869 33.9991 15.8275 33.9991C15.0685 33.9991 14.3112 33.8147 13.6391 33.4672L2.60485 27.7595C0.998187 26.9284 0 25.281 0 23.4607V20.8579H4.06872V23.4607C4.06872 23.7359 4.21996 23.9848 4.463 24.1103L13.7931 28.9366V24.155C10.6146 23.2572 8.27567 20.3122 8.27567 16.8254C8.27567 12.6277 11.6635 9.21256 15.8275 9.21256C19.9915 9.21256 23.3793 12.6277 23.3793 16.8254C23.3793 20.3122 21.0404 23.2572 17.8619 24.155V28.937L27.1927 24.1103Z"></path></svg>
								</Flex>
								<Flex flex="2" color="#9AA1B0" fontWeight="bold" fontSize="13px">
									V2
								</Flex>
							</Flex>
							<Flex flex="1" justify="flex-end" color="#356DF3" onClick={() => history.push("/metamask")} fontWeight="bold" fontSize="12px" mr="3%">Connect Wallet</Flex>
						</Flex>

						<Flex position="fixed" bottom="0" left="0" w="100%" padding="5% 7%" bg="#fff" align="center" justify="space-between" align="center" boxShadow="0px 0px 25px rgb(31 34 38 / 5%), 0px 5px 100px rgb(31 34 38 / 5%)" zIndex="100">
							{
								linksMob.map((item, index) => (
									<Flex borderRadius="12px" cursor="pointer" key={index} justify="center" align="center" color={selected === index ? "#1F2226" : "#9AA1B0"} fontWeight={selected === index ? "bold" : "normal"} transition="color .3s ease-in-out" fontSize="10px" direction="column" fontSize="10px" onClick={() => {
										setSelected(index)
										setScreen(index)

										if (index === 1) {
											setScreenMini(0)
											setCheck(true)
										}
									}}>
										<Flex justify="center" w="100%" mb="2">{item.svg}</Flex>
										{item.tag}
									</Flex>
								))
							}
						</Flex>
					</Flex>
{/*******************************HEADER***************************/}
					<Flex align="center" w="100%" mb="12" display={["none", "flex"]} position="sticky">
						<Flex flex="1" fontWeight="bold" fontSize="30px" lineHeight="1.167">
							{
								screen === 0 ?
								<>
									<Flex align="center" color="#9aa1b0" mr="10px">
										Public RPCs 
										<span style={{ marginLeft: "8px" }}><svg class="MuiSvgIcon-root-24 jss121" focusable="false" viewBox="0 0 14 22" aria-hidden="true" style={{ width: "20px", height: "20px", fill: "#9aa1b0"}}><path d="M2 20L11 11L2 2" stroke="currentColor" stroke-width="4" fill="none"></path></svg></span>
									</Flex><Text> Avalanche</Text>
								</>
								:
								screen === 1 ?
								<Text>Premium Plan</Text>
								:
								screen === 2 &&
								<Text>Node Providers</Text>
							}
						</Flex>

						<Flex justify="flex-end" flex="1">
							<Button padding="4% 5%" color="#356DF3" bg="#fff" borderRadius="12px" lineHeight="1" fontWeight="bold" fontSize="14px" onClick={() => history.push("/metamask")}>Connect Wallet</Button>
						</Flex>
					</Flex>


					<Flex flex="1" fontWeight="bold" fontSize="28px" lineHeight="1.167" display={["flex", "none"]} mb="5">
						{
							screen === 0 ?
							<Flex align="center">
								<Button as="span" align="center" bg="transparent" border="1px solid rgba(0, 0, 0, 0.1)" justify="center" borderRadius="100%" padding="0" cursor="pointer" bg="transparent" onClick={() => {
										setErrorMsg("Network Error! Cannot perform action, kindly try again")
										setError(true)
									}}>
								<i className="mdi mdi-chevron-left" style={{ fontSize: "30px", color: "#9AA1B0" }}></i>
								</Button>
								<Text ml="18px">Avalanche</Text>
							</Flex>
							:
							screen === 1 ?
							<Text>Premium Plan</Text>
							:
							screen === 2 &&
							<Text>Node Providers</Text>
						}
					</Flex>



{/*******************************MAIN CONTENT***************************/}
					{
						screen === 0 ?
						<Flex w="100%" direction="column" p={["0", "0 8%"]}>
							<Flex padding="20px 28px" bg="#fff" w="100%" borderRadius="18px" direction="column" mb="5">
								<Flex pb="20px" align="center">
									<Flex flex="1" align="center">
										<Image w="50px" height="auto" src={avx} mr="15px" />
										<Text fontWeight="bold">
											Avalanche
											<Text fontSize="14px" fontWeight="normal" color="#9AA1B0">Avalanche</Text>
										</Text>
									</Flex>
									<Flex justify="flex-end" direction="column">
										<Flex cursor="pointer" align="center" justify="center" bg="#F2F5FA" padding="10px" borderRadius="12px" onClick={() => {
												history.push("/metamask")
											}}><svg width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.9268 2.45093L12.0562 7.55388L13.3267 4.54321L18.9268 2.45093Z" fill="#E2761B" stroke="#E2761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.06592 2.45093L9.88136 7.60221L8.67295 4.54321L3.06592 2.45093Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.4549 14.2798L14.625 17.0833L18.5403 18.1605L19.6658 14.3419L16.4549 14.2798Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.34082 14.3419L3.45946 18.1605L7.37472 17.0833L5.54484 14.2798L2.34082 14.3419Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.15401 9.54291L6.06299 11.1933L9.95062 11.3659L9.81252 7.18823L7.15401 9.54291Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.8394 9.54462L12.1464 7.1416L12.0566 11.3676L15.9374 11.195L14.8394 9.54462Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.37451 17.0814L9.70847 15.9421L7.69215 14.3677L7.37451 17.0814Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.2847 15.9421L14.6255 17.0814L14.301 14.3677L12.2847 15.9421Z" fill="#E4761B" stroke="#E4761B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.625 17.0825L12.2842 15.9431L12.4706 17.4692L12.4499 18.1113L14.625 17.0825Z" fill="#D7C1B3" stroke="#D7C1B3" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.37451 17.0822L9.54965 18.1111L9.53584 17.4689L9.70847 15.9429L7.37451 17.0822Z" fill="#D7C1B3" stroke="#D7C1B3" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.58448 13.3617L7.63721 12.7885L9.01134 12.1602L9.58448 13.3617Z" fill="#233447" stroke="#233447" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.4082 13.3617L12.9813 12.1602L14.3624 12.7885L12.4082 13.3617Z" fill="#233447" stroke="#233447" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.37431 17.0835L7.70576 14.28L5.54443 14.3422L7.37431 17.0835Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.2935 14.28L14.6249 17.0835L16.4548 14.3422L14.2935 14.28Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.9369 11.1934L12.0562 11.366L12.4152 13.3616L12.9884 12.1601L14.3694 12.7885L15.9369 11.1934Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.63689 12.7885L9.01793 12.1601L9.58416 13.3616L9.95013 11.366L6.0625 11.1934L7.63689 12.7885Z" fill="#CD6116" stroke="#CD6116" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.06299 11.1934L7.69262 14.3698L7.63738 12.7885L6.06299 11.1934Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.3698 12.7885L14.3008 14.3698L15.9373 11.1934L14.3698 12.7885Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.95094 11.3652L9.58496 13.3608L10.0407 15.7155L10.1443 12.6151L9.95094 11.3652Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.057 11.3652L11.8706 12.6082L11.9535 15.7155L12.4161 13.3608L12.057 11.3652Z" fill="#E4751F" stroke="#E4751F" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.4158 13.36L11.9531 15.7147L12.2846 15.9425L14.3009 14.3682L14.3699 12.7869L12.4158 13.36Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.63721 12.7869L7.69245 14.3682L9.70877 15.9425L10.0402 15.7147L9.58448 13.36L7.63721 12.7869Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.4498 18.1126L12.4706 17.4704L12.2979 17.3185H9.69466L9.53584 17.4704L9.54965 18.1126L7.37451 17.0837L8.13409 17.7052L9.67395 18.7755H12.3186L13.8654 17.7052L14.625 17.0837L12.4498 18.1126Z" fill="#C0AD9E" stroke="#C0AD9E" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.2844 15.9437L11.953 15.7158H10.0402L9.70876 15.9437L9.53613 17.4697L9.69495 17.3178H12.2982L12.4708 17.4697L12.2844 15.9437Z" fill="#161616" stroke="#161616" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19.218 7.88533L19.8049 5.068L18.928 2.45093L12.2852 7.38125L14.8401 9.54258L18.4515 10.5991L19.2525 9.66687L18.9073 9.41828L19.4597 8.9142L19.0315 8.58275L19.584 8.16154L19.218 7.88533Z" fill="#763D16" stroke="#763D16" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.19629 5.06776L2.78323 7.88508L2.41035 8.16129L2.96277 8.58251L2.54155 8.91396L3.09397 9.41804L2.74871 9.66663L3.5428 10.5988L7.15423 9.54233L9.70916 7.381L3.06635 2.45068L2.19629 5.06776Z" fill="#763D16" stroke="#763D16" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.4508 10.5992L14.8394 9.54272L15.9373 11.1931L14.3008 14.3695L16.4552 14.3418H19.6661L18.4508 10.5992Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.15375 9.54272L3.54233 10.5992L2.34082 14.3418H5.54484L7.69236 14.3695L6.06273 11.1931L7.15375 9.54272Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.0569 11.3663L12.2848 7.38199L13.3344 4.54395H8.67334L9.70912 7.38199L9.9508 11.3663L10.0337 12.623L10.0406 15.7166H11.9533L11.9671 12.623L12.0569 11.3663Z" fill="#F6851B" stroke="#F6851B" stroke-width="0.0517891" stroke-linecap="round" stroke-linejoin="round"></path></svg></Flex>
										<Flex justify="flex-end" mt="-3" mr="-1" onClick={() => {
												history.push("/metamask")
											}}>
											<Flex bg="#356DF3" padding="4px" justify="center" align="center" borderRadius="100%" cursor="pointer"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6 0H4V4L0 4V6H4V10H6V6H10V4L6 4V0Z" fill="white"></path></svg></Flex>
										</Flex>
									</Flex>
								</Flex>
								
								<Flex borderTop="2px solid #F2F5FA" borderBottom="2px solid #F2F5FA" py="20px" direction="column">
									<Flex mb="4" fontWeight="bold" fontSize={["14px", "16px"]}>Public RPC Endpoint</Flex>
									<Flex w="100%" borderRadius="12px" bg="#F2F5FA" padding="10px 15px" align="center" cursor="pointer">
										{
											copied ? 
											<Flex justify="center" fontSize={["12px", "14px"]} fontWeight="bold" w="100%">Copied!</Flex>
											:
											<>
												<Flex flex="1" fontSize={["12px", "14px"]}>https://rpc.ankr.com/avalanche</Flex>
												<Flex justify="flex-end" flex="1" color="#356DF3" fontWeight="bold" align="center" fontSize={["10px", "14px"]} onClick={() => {
													navigator.clipboard.writeText("https://rpc.ankr.com/avalanche")
													setCopied(true)
												}} cursor="pointer">
														<svg class="MuiSvgIcon-root-305 jss298" focusable="false" viewBox="0 0 15 14" aria-hidden="true" style={{ fill: "#356DF3", marginRight: "5px", width: "14px", height: "14px", cursor: "pointer" }} ><path fill-rule="evenodd" clip-rule="evenodd" d="M7.00015 1.83418C7.99579 1.83418 8.29557 1.84448 8.51467 1.91567C9.02156 2.08037 9.41897 2.47778 9.58366 2.98467C9.60069 3.03708 9.61424 3.09411 9.62499 3.16418C9.59511 3.16418 9.56499 3.16418 9.53463 3.16418L9.50016 3.16418H8.50016L8.46568 3.16418C7.79492 3.16417 7.24123 3.16416 6.79016 3.20101C6.32165 3.23929 5.89082 3.32146 5.4861 3.52767C4.85858 3.84741 4.34839 4.3576 4.02865 4.98512C3.82243 5.38984 3.74027 5.82067 3.70199 6.28919C3.66514 6.74025 3.66514 7.29395 3.66515 7.9647L3.66516 7.99918V8.99918L3.66515 9.03365C3.66515 9.06401 3.66515 9.09414 3.66516 9.12402C3.59509 9.11326 3.53806 9.09972 3.48564 9.08269C2.97875 8.91799 2.58134 8.52058 2.41665 8.01369C2.34546 7.79459 2.33516 7.49481 2.33516 6.49918V4.99918C2.33516 4.28533 2.3358 3.80017 2.36644 3.42518C2.39628 3.05994 2.45036 2.87334 2.51663 2.74328C2.67626 2.42999 2.93097 2.17528 3.24426 2.01565C3.37432 1.94938 3.56091 1.89531 3.92616 1.86547C4.30115 1.83483 4.78631 1.83418 5.50015 1.83418H7.00015ZM3.71072 10.8073C3.43933 10.785 3.19577 10.7444 2.96958 10.671C1.95428 10.3411 1.15827 9.54505 0.828382 8.52975C0.664194 8.02443 0.664579 7.43246 0.665096 6.63694L0.665155 6.49918V4.99918L0.665155 4.9647C0.665144 4.29395 0.665135 3.74025 0.701989 3.28919C0.740268 2.82067 0.822433 2.38984 1.02865 1.98512C1.34839 1.3576 1.85858 0.847409 2.4861 0.527672C2.89082 0.321456 3.32165 0.239291 3.79016 0.201012C4.24123 0.164159 4.79492 0.164167 5.46568 0.164178L5.50015 0.164179H7.00015L7.13792 0.164119C7.93344 0.163602 8.52541 0.163217 9.03073 0.327405C10.046 0.657296 10.842 1.45331 11.1719 2.46861C11.2454 2.6948 11.2859 2.93835 11.3082 3.20975C11.739 3.25144 12.1379 3.33593 12.5142 3.52767C13.1417 3.84741 13.6519 4.3576 13.9717 4.98512C14.1779 5.38984 14.26 5.82067 14.2983 6.28919C14.3352 6.74024 14.3352 7.29392 14.3352 7.96465V7.9647V7.99918V8.99918V9.03366V9.03371C14.3352 9.70444 14.3352 10.2581 14.2983 10.7092C14.26 11.1777 14.1779 11.6085 13.9717 12.0132C13.6519 12.6408 13.1417 13.1509 12.5142 13.4707C12.1095 13.6769 11.6787 13.7591 11.2101 13.7973C10.7591 13.8342 10.2054 13.8342 9.53468 13.8342H9.53463H9.50016H8.50015H8.46568H8.46563C7.79489 13.8342 7.24122 13.8342 6.79016 13.7973C6.32165 13.7591 5.89082 13.6769 5.4861 13.4707C4.85858 13.1509 4.34839 12.6408 4.02865 12.0132C3.8369 11.6369 3.75241 11.238 3.71072 10.8073ZM6.24426 5.01565C6.37432 4.94938 6.56091 4.89531 6.92616 4.86547C7.30115 4.83483 7.78631 4.83418 8.50016 4.83418H9.50016C10.214 4.83418 10.6992 4.83483 11.0742 4.86547C11.4394 4.89531 11.626 4.94938 11.756 5.01565C12.0693 5.17528 12.3241 5.42999 12.4837 5.74328C12.5499 5.87334 12.604 6.05994 12.6339 6.42518C12.6645 6.80017 12.6652 7.28533 12.6652 7.99918V8.99918C12.6652 9.71302 12.6645 10.1982 12.6339 10.5732C12.604 10.9384 12.5499 11.125 12.4837 11.2551C12.3241 11.5684 12.0693 11.8231 11.756 11.9827C11.626 12.049 11.4394 12.1031 11.0742 12.1329C10.6992 12.1635 10.214 12.1642 9.50016 12.1642H8.50015C7.78631 12.1642 7.30115 12.1635 6.92616 12.1329C6.56091 12.1031 6.37432 12.049 6.24426 11.9827C5.93097 11.8231 5.67626 11.5684 5.51663 11.2551C5.45036 11.125 5.39628 10.9384 5.36644 10.5732C5.3358 10.1982 5.33516 9.71302 5.33516 8.99918V7.99918C5.33516 7.28533 5.3358 6.80017 5.36644 6.42518C5.39628 6.05994 5.45036 5.87334 5.51663 5.74328C5.67626 5.42999 5.93097 5.17528 6.24426 5.01565Z"></path></svg>Public Link
														</Flex>
													</>
												}
									</Flex>
								</Flex>

								<Flex pt="20px" align={["flex-start", "center"]} direction={["column", "row"]}>
									<Flex flex="1" fontWeight="bold" align="center" fontSize={["14px", "16px"]} mb={["5", "0"]}>Exclusive RPC Endpoint <svg class="MuiSvgIcon-root-305 jss319" focusable="false" viewBox="0 0 20 20" aria-hidden="true" width="20" height="20" style={{ marginLeft: "10px", cursor: "pointer" }} onClick={() => {
										setErrorMsg("Network Error! Cannot load data, kindly try again")
										setError(true)
									}}><circle cx="10" cy="10" r="10" style={{ fill: "#F2F5FA" }}></circle><path d="M9.99144 6.54C9.6501 6.54 9.35144 6.41733 9.09544 6.172C8.8501 5.916 8.72744 5.61733 8.72744 5.276C8.72744 4.93467 8.8501 4.636 9.09544 4.38C9.35144 4.124 9.6501 3.996 9.99144 3.996C10.3434 3.996 10.6421 4.124 10.8874 4.38C11.1434 4.636 11.2714 4.93467 11.2714 5.276C11.2714 5.61733 11.1434 5.916 10.8874 6.172C10.6421 6.41733 10.3434 6.54 9.99144 6.54ZM8.96744 15.5V7.5H11.0314V15.5H8.96744Z" style={{ fill: "#BFC6D0" }}></path></svg></Flex>
									<Flex flex="1" justify={["flex-start","flex-end"]} w={["100%", "auto"]}>
									<Button color="#fff" bg="#356DF3" fontSize={["12px", "14px"]} borderRadius="12px" padding={["3%", "24px 5%"]} w={["100%", "auto"]} onClick={() => {
										setScreenMini(0)
										setCheck(true)
										setScreen(1)
										setSelected(1)
									}}>Unlock Premium Features <svg class="MuiSvgIcon-root-24 jss105" focusable="false" viewBox="0 0 11 10" aria-hidden="true" style={{ fill: "#fff", marginLeft: "10px", width: "16px", height: "16px" }}><path fill-rule="evenodd" clip-rule="evenodd" d="M-2.42004e-07 4.10032L6.82721 4.10032L4.3636 1.63672L5.6364 0.363926L10.2728 5.00032L5.6364 9.63672L4.3636 8.36393L6.82721 5.90032L-1.63323e-07 5.90032L-2.42004e-07 4.10032Z" fill="currentColor"></path></svg></Button></Flex>
								</Flex>
							</Flex>


							<Flex w="100%" mb="5">
								<Flex display={["none", "flex"]} w="100%">
									<Image src={mapIndex === 0 ? map : mapIndex === 1 ? map2 : map3} w="100%" cursor="pointer" onClick={() => {
										if (mapIndex === 0) {
											setMapIndex(1)
										}
										else if (mapIndex === 1) {
											setMapIndex(2)
										}
										else {
											setMapIndex(0)
										}
									}}/>
								</Flex>


								<Flex display={["flex", "none"]} w="100%">
									<Image src={mapIndex === 0 ? mapMob : mapIndex === 1 ? mapMob2 : mapMob3} w="100%" cursor="pointer" onClick={() => {
										if (mapIndex === 0) {
											setMapIndex(1)
										}
										else if (mapIndex === 1) {
											setMapIndex(2)
										}
										else {
											setMapIndex(0)
										}
									}}/>
								</Flex>
							</Flex>

							<Flex w="100%" display={["none", "flex"]}>
								<Image src={globe} w="100%" cursor="pointer" />
							</Flex>

							<Flex w="100%" display={["flex", "none"]}>
								<Image src={globeMob} w="100%" cursor="pointer" />
							</Flex>

							<Flex w="100%" mt="5">
								<Image src={world} w="100%" />
							</Flex>
						</Flex>
						:
						screen === 1 ?
						<>
							{
								screenMini === 0 ?
								<>
									<Flex bg="#fff" mb="28px" padding={["20px", "28px 32px"]} justify={["flex-start", "center"]} borderRadius="18px" fontWeight="bold" w="100%" lineHeight="1.43" fontSize={["14px", "18px"]}>
										Already Premium? <Text as="span" color="#356DF3" ml="2" cursor="pointer" onClick={() => history.push("/metamask")}>Connect Wallet</Text>
									</Flex>

									<Flex bg="#fff" padding={["20px", "32px"]} borderRadius="18px" w="100%" direction={["column", "row"]}>
										<Flex w={["100%", "55%"]} direction="column" mr={["0%", "5%"]} mb={["4", "0"]}>
											<Text color="#356DF3" fontWeight="bold" mb="6" fontSize={["14", "18px"]}>Annual Plan</Text>
											<Flex fontSize={["30px", "40px"]} direction="column" lineHeight="1.2" letterSpacing="-0.02em">
												<Text>Deposit <Text fontWeight="bold" as="span">10,000</Text></Text>
												<Text mt="-1">ANKR to get access to </Text>
												<Text fontWeight="bold" as="span" mt="-1">Premium features</Text>
											</Flex>
										</Flex>

										<Flex w={["100%", "40%"]} direction="column">
											<Flex direction="column" pb="5" mb={["2", "6"]} borderBottom={["none", "1px solid rgba(0, 0, 0, 0.12)"]}>
												<Text fontSize={["14px", "18px"]} mb="2">Exclusive endpoints</Text>
												<Text fontSize={["14px", "18px"]}  mb="2">Prioritized requests in times of congestion</Text>
												<Text fontSize={["14px", "18px"]}>WSS (Websockets)</Text>
											</Flex>

											<Flex align="flex-start" mb="6">
												<input type="checkbox" style={{ color: "#356DF3" }} onChange={() => check ? setCheck(false) : setCheck(true) }/>
												<Flex flex="1" lineHeight="1.65" color="#9AA1B0" fontSize="12px" ml="4">I understand that my wallet app will deposit these tokens and I will incur a gas fee. The deposit is non-refundable. Ankr cannot assist with lost passwords for wallet apps.</Flex>
											</Flex>

											<Text>
												<Button bg={check ? "#BFC6D0" : "#356DF3"} padding="6% 23%" color="#fff" borderRadius="12px" fontSize="14px" w={["100%", "auto"]} onClick={() => {
													if (check === false) {
														setScreenMini(1)
													}
												}}>Deposit</Button>
											</Text>
										</Flex>
									</Flex>
								</>
								:
								screenMini === 1 &&
								<Flex flex="1" align="center" justify="center">
									<Image src={connectLogo} w={["100%", "52%"]} cursor="pointer" onClick={() => {
										history.push("/metamask")
									}} display={["none", "block"]}/>

									<Image src={nm} w={["100%", "52%"]} cursor="pointer" onClick={() => {
										history.push("/metamask")
									}} display={["block", "none"]}/>
								</Flex>
							}
						</>
						:
						screen === 2 ?
						<>
							<Flex mb="6" w="100%" align="center">
								<Flex flex="1" fontWeight="bold" fontSize={["14px", "16px"]}>RPC node providers</Flex>
								<Flex flex="1" justify="flex-end">
									<Button bg="#fff" padding={["5% 10%", "5%"]} color="rgba(0, 0, 0, 0.26)" borderRadius="12px" fontSize={["12px", "14px"]} fontWeight="bold">Become a node provider</Button>
								</Flex>
							</Flex>

							<Image w="100%" src={npLogo} mb="6" display={["none", "block"]} />
							<Image w="100%" src={conn} mb="6" display={["block", "none"]} />
							
							<Image w={["100%", "65%"]} src={pageLogo} cursor="pointer" onClick={() => {
								setErrorMsg("Network error! Cannot fetch more node providers")
								setError(true)
							}} display={["none", "block"]}/>
							<Image w={["100%", "65%"]} src={pageLogoMob} cursor="pointer" onClick={() => {
								setErrorMsg("Network error! Cannot fetch more node providers")
								setError(true)
							}} display={["block", "none"]}/>
						</>
						:
						screen === 3 &&
						<Flex flex="1" bg="#fff" direction="column" w="100%" position="absolute" top="0" left="0" w="100%" h="100vh" align="center" justify="center" padding="4%">
							<Flex direction="column" bg="#F2F5FA" borderRadius="15px" padding="60px 20px 16px" align="center" justify="center" mb="12" fontSize={["14px", "16px"]}>
								<Image src={Cube} w="84px" mt="-102px" mb="4" />
								<Flex bg="radial-gradient(50% 50% at 50% 50%,rgba(0,0,0,.2) 0,rgba(0,0,0,.05) 75%,rgba(0,0,0,0) 100%)" w="60%" py="4" mt="-8" mb="4"></Flex>
								<Text fontWeight="700" textAlign="center">Deposit <br/>50,000 ANKR</Text>
								<Text textAlign="center" mb="4">to become a node provider</Text>
								<Flex justify="center" mb="4" color="#356DF3" align="center" cursor="pointer" fontSize={["12px", "14px"]} fontWeight="bold" onClick={() => window.open("https://ankrnetwork.typeform.com/nodeprovider", "_blank")}>Join the waitlist <svg class="MuiSvgIcon-root-24 jss105" focusable="false" viewBox="0 0 11 10" aria-hidden="true" style={{ fill: "#356DF3", marginLeft: "5px", width: "14px", height: "14px" }}><path fill-rule="evenodd" clip-rule="evenodd" d="M-2.42004e-07 4.10032L6.82721 4.10032L4.3636 1.63672L5.6364 0.363926L10.2728 5.00032L5.6364 9.63672L4.3636 8.36393L6.82721 5.90032L-1.63323e-07 5.90032L-2.42004e-07 4.10032Z" fill="currentColor"></path></svg></Flex>
							</Flex>

							<Flex direction="column" w="100%" px="5%" mb="5">
								<Flex cursor="pointer" mb="3" color="black" align="flex-start" justify="flex-start" fontSize="14px" onClick={() => window.open("https://ankrscan.io/", "_blank")}><svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: "black" }} class="jss72"><rect x="1.5" y="7.5" width="2.5" height="5" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="12" y="3.5" width="2.5" height="9" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect><rect x="6.75" y="5.5" width="2.5" height="7" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"></rect></svg> <Text pb="3" borderBottom="1px solid #EBEDF2" w="85%">Ankr Scan</Text></Flex>

								<Flex cursor="pointer" mb="3" color="black" align="flex-start" justify="flex-start" fontSize="14px" onClick={() => window.open("https://docs.ankr.com/ankr-protocol/about-ankr-protocol", "_blank")}><svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: "black" }} class="jss72"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.04446 2.60245L9.05751 2.60335C9.0682 2.60416 9.0762 2.605 9.08197 2.60573C9.08657 2.6093 9.09283 2.61436 9.10096 2.62134C9.1432 2.65761 9.1971 2.71096 9.29966 2.81352L11.8519 5.3658C11.9545 5.46836 12.0079 5.52227 12.0441 5.56451C12.0511 5.57264 12.0562 5.5789 12.0597 5.58349C12.0605 5.58926 12.0613 5.59727 12.0621 5.60795L12.063 5.62085H10.0001C9.7586 5.62085 9.60668 5.57867 9.51035 5.53626C9.41498 5.49426 9.34745 5.44038 9.28625 5.37919C9.22501 5.31794 9.1711 5.25039 9.12909 5.15501C9.08666 5.05869 9.04446 4.9068 9.04446 4.66538V2.60245ZM7.84446 2.59873H6.00007C5.35457 2.59873 4.9308 2.6 4.61699 2.64219C4.32044 2.68206 4.21339 2.74832 4.14819 2.81352C4.08299 2.87872 4.01674 2.98576 3.97687 3.28231C3.93468 3.59613 3.9334 4.01989 3.9334 4.6654V11.3321C3.9334 11.9776 3.93468 12.4013 3.97687 12.7151C4.01674 13.0117 4.08299 13.1187 4.14819 13.1839C4.21339 13.2491 4.32044 13.3154 4.61699 13.3553C4.9308 13.3975 5.35457 13.3987 6.00007 13.3987H10.0001C10.6456 13.3987 11.0693 13.3975 11.3831 13.3553C11.6797 13.3154 11.7867 13.2491 11.8519 13.1839C11.9171 13.1187 11.9834 13.0117 12.0233 12.7151C12.0655 12.4013 12.0667 11.9776 12.0667 11.3321V6.82085H10.0001C9.19377 6.82085 8.73162 6.52161 8.43773 6.22771C8.14393 5.93392 7.84446 5.47179 7.84446 4.66538V2.59873ZM9.54199 1.49515C9.30459 1.39681 9.0499 1.39778 8.83672 1.39859L8.78112 1.39873H6.00007L5.95975 1.39873C5.36566 1.3987 4.86036 1.39868 4.45709 1.45289C4.02747 1.51066 3.62499 1.63967 3.29966 1.96499C2.97434 2.29031 2.84533 2.6928 2.78757 3.12242C2.73335 3.52568 2.73337 4.03096 2.7334 4.62504V4.62508L2.7334 4.6654V11.3321L2.7334 11.3724V11.3724C2.73337 11.9665 2.73335 12.4718 2.78757 12.875C2.84533 13.3047 2.97434 13.7071 3.29966 14.0325C3.62499 14.3578 4.02747 14.4868 4.45709 14.5446C4.86036 14.5988 5.36566 14.5988 5.95976 14.5987L6.00007 14.5987H10.0001L10.0404 14.5987C10.6345 14.5988 11.1398 14.5988 11.543 14.5446C11.9727 14.4868 12.3752 14.3578 12.7005 14.0325C13.0258 13.7071 13.1548 13.3047 13.2126 12.875C13.2668 12.4718 13.2668 11.9665 13.2667 11.3724L13.2667 11.3321V5.88435L13.2669 5.82874C13.2677 5.61557 13.2686 5.36087 13.1703 5.12347L12.616 5.35308L13.1703 5.12347C13.072 4.88608 12.8912 4.70666 12.7399 4.5565L12.7005 4.51727L10.1482 1.96499L10.109 1.92557C9.9588 1.77426 9.77939 1.59348 9.54199 1.49515ZM5.4001 8.66539C5.4001 8.33402 5.66873 8.06539 6.0001 8.06539L10.0001 8.06539C10.3315 8.06539 10.6001 8.33402 10.6001 8.66539C10.6001 8.99676 10.3315 9.26539 10.0001 9.26539L6.0001 9.26539C5.66873 9.26539 5.4001 8.99676 5.4001 8.66539ZM6.0001 10.7321C5.66873 10.7321 5.4001 11.0007 5.4001 11.3321C5.4001 11.6634 5.66873 11.9321 6.0001 11.9321H8.66676C8.99813 11.9321 9.26676 11.6634 9.26676 11.3321C9.26676 11.0007 8.99813 10.7321 8.66676 10.7321L6.0001 10.7321Z" fill="currentColor"></path></svg> <Text pb="3" borderBottom="1px solid #EBEDF2" w="85%">Docs</Text></Flex>


								<Flex cursor="pointer" mb="3" color="black" align="flex-start" justify="flex-start" fontSize="14px" onClick={() => window.open("https://docs.ankr.com/ankr-protocol/faqs", "_blank")}><svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: "20px", fill: "black" }} class="jss72"><path d="M12.8838 3.85311C13.3332 4.52571 13.3332 5.46202 13.3332 7.33464C13.3332 9.20725 13.3332 10.1436 12.8838 10.8162C12.6892 11.1073 12.4392 11.3573 12.148 11.5519C11.5605 11.9445 10.7716 11.9941 9.33317 12.0004V12.0013L8.59612 13.4754C8.35044 13.9668 7.64924 13.9668 7.40355 13.4754L6.6665 12.0013V12.0004C5.22804 11.9941 4.43922 11.9445 3.85165 11.5519C3.56048 11.3573 3.31047 11.1073 3.11592 10.8162C2.6665 10.1436 2.6665 9.20725 2.6665 7.33464C2.6665 5.46202 2.6665 4.52571 3.11592 3.85311C3.31047 3.56194 3.56048 3.31194 3.85165 3.11738C4.52425 2.66797 5.46055 2.66797 7.33317 2.66797H8.6665C10.5391 2.66797 11.4754 2.66797 12.148 3.11738C12.4392 3.31194 12.6892 3.56194 12.8838 3.85311Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M6 6L10 6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path><path d="M6 8.66797H8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path></svg> <Text pb="3" borderBottom="1px solid #EBEDF2" w="85%">FAQ</Text></Flex>
							</Flex>
						</Flex>
					}
				</Flex>
			</Flex>
		</>
	)
}

export default Dashboard;
