import { useCallback, useEffect, useRef, useState } from "react"

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumber] = useState("false")
  const [charAllowed, setChar] = useState("false")
  const [password, setPassword] = useState("")

  // useRef Hook 
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+{}[]:;'.?"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  // passwordGenerator()  -----> Cannot use this directly becasue this will create too many renders and will give errors

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div
        className="w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('public/bg.png')" }}
      >
        <div className=" w-full max-w-md rounded-lg mx-auto shadow-md bg-emerald-500 px-4 my-65 py-3">
          <h1 className=" text-center text-black text-4xl p-2">Password Generator</h1>
          <div className="flex shadow rounded-lg  overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className=" bg-white outline-none w-full pt-2 py-1 px-3"
              placeholder="Password"
              ref={passwordRef}
              readOnly />
            <button onClick={copytoclipboard} className=" bg-gray-400 hover:bg-blue-400 " >Copy</button>
          </div>

          <div className="flex text-sm gap-x-2">
            <div className=" flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className=" cursor-pointer"
                onChange={(e) => { setLength(e.target.value) }} />
              <label>Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setChar((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput">S-Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
