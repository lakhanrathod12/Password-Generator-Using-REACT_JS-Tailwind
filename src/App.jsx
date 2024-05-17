import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState('copy');
  const [buttonColor, setButtonColor] = useState('bg-blue-700');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPass = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setButtonText('copied');
    setButtonColor('bg-green-500');
    setTimeout(() => {
      setButtonText('copy');
      setButtonColor('bg-blue-700');
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-16 py-4 text-orange-500 bg-gray-700'>
      <h1 className='text-white text-center mb-3'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 text-black'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPass}
          className={`outline-none ${buttonColor} text-white px-3 py-0.5 shrink-0 hover:bg-green-500 transition-colors`}
        >
          {buttonText}
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1 text-white'>
          <input
            type="range"
            min={6}
            max={16}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length ({length})</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className='ml-1'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1 text-white'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label className='ml-1'>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
