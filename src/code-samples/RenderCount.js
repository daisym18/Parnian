

import { useState, useEffect, useRef } from "react";


function RenderCount() {
    useEffect(() => {
        count.current = count.current + 1;
    });

    const [inputValue, setInputValue] = useState("");
    const count = useRef(0);

    return (
        <div className="App">
            <header className="App-header">
               
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <h1>Render Count: {count.current}</h1>

            </header>
        </div>
    );

}

export default RenderCount;

