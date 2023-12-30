
import { useEffect, useCallback, useState , useRef } from "react";

function App() {
   const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")

  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzvABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (number ) str += "123456789"
    if (character ) str += "!@#%^&*()"

    for (let i = 1; i < length; i++) {
      let ch = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(ch);
    }
    setpassword(pass)
  }, [length, number, character,setpassword])

  const passref = useRef(null)

   const copypass = useCallback(()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
   },[password])
  
  useEffect(()=>{ passwordgenerator() },[length,character,number]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-yellow-300 bg-gray-600 ">
        <h1 className=" text-gray-300 text-center py-3">PASSWORD GENERATOR</h1>

        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="bg-white outline-none py-1 px-3 w-full text-black"
            type="text"
            readOnly
            value={password}
            placeholder="password"
            ref={passref}
          />
          <button className="bg-blue-500 hover:bg-blue-600 outline-none shrink-0 px-3 py-0.5 " onClick={copypass}>
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length : {length}</label>
          </div>

          <div className=" flex items-center gap-x-1">
            <input
              type="checkbox"
              id="noinput"
              defaultValue={number}
              onChange={() => {
                setnumber((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="flex gap-x-1 items-center">
            <input
              type="checkbox"
              id="chinput"
              defaultValue={character}
              onChange={() => {
                setcharacter((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
          

        </div>
      </div>
    </>
  );
}

export default App;
