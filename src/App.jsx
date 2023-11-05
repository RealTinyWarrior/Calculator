import "./index.css";
import { useState, useEffect } from "react";

export default function App() {
    let firstSet = ["AC", "DEL", "(-1)", "+", 7, 8, 9, "-", 4, 5, 6, "×", 1, 2, 3, "÷", 0, ".", "="];
    let secondSet = ["%", "√", "x^", "sin", 7, 8, 9, "cos", 4, 5, 6, "tan", 1, 2, 3, "π", 0, "e", "="];

    const [mathMode, shiftMathMode] = useState([123, "⌨"]);
    const [symbol, setSymbol] = useState(firstSet);
    const [dlMode, setDlMode] = useState("☪");
    const [value, setValue] = useState(0);

    const [mode, setMode] = useState({
        font: "black",
        backOpt: "#f3f3f3",
        mMode: "lightgrey",
        ui: "#fff",
    });

    useEffect(() => {
        if (value == "-") setValue(0);
        if (String(value).includes("NaN")) setValue("Syntax Error");
        if (String(value).includes("Infinity")) setValue("(∞) - Can't devide by zero!");
    }, [value]);

    const reactMath = () => {
        if (value.includes("+")) {
            let num01 = Number(value.split("+")[0]);
            let num02 = Number(value.split("+")[1]);

            setValue(String(num01 + num02));
        }

        if (value.includes("-")) {
            let num01 = Number(value.split("-")[0]);
            let num02 = Number(value.split("-")[1]);

            setValue(String(num01 - num02));
        }

        if (value.includes("×")) {
            let num01 = Number(value.split("×")[0]);
            let num02 = Number(value.split("×")[1]);

            setValue(String(num01 * num02));
        }

        if (value.includes("÷")) {
            let num01 = Number(value.split("÷")[0]);
            let num02 = Number(value.split("÷")[1]);

            setValue(String(num01 / num02));
        }

        if (value.includes("^")) {
            let num01 = Number(value.split("^")[0]);
            let num02 = Number(value.split("^")[1]);

            setValue(String(num01 ** num02));
        }
    };

    function calculate(sign, e) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        if (numbers.includes(Number(sign))) {
            if (value == 0 && sign == 0) return;
            if (value == 0 && value !== "0.") setValue("");

            setValue((prev) => prev + sign);
        } else if (["+", "-", "×", "÷", "x^"].includes(sign)) {
            reactMath();
            setValue((prev) => (sign == "x^" ? prev + "^" : prev + sign));
        } else if (sign == "." && value == 0) setValue("0.");
        else readSymbol(sign);
    }

    function CreateButton(prop) {
        let height = prop.size.split("/")[0] + "vh";
        let width = prop.size.split("/")[1] + "%";

        const manageColor = (input) => {
            let orange = ["+", "-", "×", "÷", "π", "=", "sin", "cos", "tan"];
            let dGrey = ["AC", "DEL", "(-1)", "%", "√", "x^"];

            if (orange.includes(input)) return "#ed7117";
            else if (dGrey.includes(input)) return "#717171";
            else return "darkgrey";
        };

        return (
            <div
                id="click-btn"
                style={{
                    width: width,
                    height: height,
                    backgroundColor: manageColor(prop.content),
                }}
                onClick={(e) => calculate(String(prop.content), e)}
            >
                {prop.content}
            </div>
        );
    }

    function Calculator() {
        return (
            <>
                <div id="calc-input" style={{ color: mode.font, backgroundColor: mode.ui }}>
                    <div id="calc-in">{value}&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </div>

                <div id="btn-con-calc" style={{ color: mode.font }}>
                    {symbol.map((item) => (
                        <CreateButton key={"K-" + item} content={item} size={`9.4/${item === 0 ? 45 : 21}`} />
                    ))}
                </div>
            </>
        );
    }

    function Converter(prop) {
        return <p>Error 404 web not created</p>;
    }

    return (
        <div id="all-cont">
            <div id="container" style={{ backgroundColor: mode.ui }}>
                <div id="options" style={{ backgroundColor: mode.backOpt }}>
                    <button
                        id="mode-shifter"
                        style={{ color: mode.font, backgroundColor: mode.mMode }}
                        onClick={(e) => {
                            shiftMathMode((prev) => (prev[0] == 123 ? ["cos", "⌨"] : [123, "⌨"]));
                            setSymbol((prev) => (prev[0] == "%" ? firstSet : secondSet));
                        }}
                    >
                        {mathMode[0]}
                        <br />
                        {mathMode[1]}
                    </button>

                    <div
                        id="dark-light-mode"
                        onClick={(e) => {
                            setDlMode((prev) => (prev == "☉" ? "☪" : "☉"));
                            createMode();
                        }}
                    >
                        {dlMode}
                    </div>
                </div>

                <Calculator />
            </div>
        </div>
    );

    function readSymbol(sign) {
        switch (sign) {
            case "AC":
                setValue(0);
                break;

            case "DEL":
                if (value !== 0 && value.length > 1) setValue((prev) => String(prev.substring(0, prev.length - 1)));
                if (value.length == 1 || value == "Syntax Error" || value == "Can't devide by zero!") setValue(0);
                break;

            case "(-1)":
                let outNumber = Number(value) == "NaN" ? "Syntax Error" : Number(value) * -1;
                setValue(String(outNumber));
                break;

            case "%":
                let newValue = Number(value) / 100;
                setValue(String(newValue));
                break;

            case ".":
                if (!value.includes(".")) setValue((prev) => prev + ".");
                else if (
                    (value.includes("+") || value.includes("-") || value.includes("×") || value.includes("÷")) &&
                    value[value.length - 1] != "."
                )
                    setValue((prev) => prev + ".");
                break;

            case "√":
                let rootValue = Number(value) ** (1 / 2);
                setValue(String(rootValue));
                break;

            case "sin":
                let sinedValue = Math.sin(Number(value));
                setValue(String(sinedValue));
                break;

            case "cos":
                let cosecValue = Math.cos(Number(value));
                setValue(String(cosecValue));
                break;

            case "tan":
                let tangentValue = Math.tan(Number(value));
                setValue(String(tangentValue));
                break;

            case "=":
                reactMath();
                break;

            case "π":
                if (value.endsWith("+") || value.endsWith("-") || value.endsWith("×") || value.endsWith("÷"))
                    setValue((prev) => prev + Math.PI);
                else if (value == "0") setValue(Math.PI);
                else setValue((prev) => prev + "×" + Math.PI);
                break;

            case "e":
                if (value.endsWith("+") || value.endsWith("-") || value.endsWith("×") || value.endsWith("÷"))
                    setValue((prev) => prev + 2.7182818285);
                else if (value == "0") setValue(2.7182818285);
                else setValue((prev) => prev + "x" + 2.7182818285);
                break;
        }
    }

    function createMode(e) {
        let newMode = mode;
        let body = document.querySelector("body");
        newMode.ui = newMode.ui == "black" ? "#fff" : "black";
        newMode.font = newMode.font == "black" ? "white" : "black";
        newMode.mMode = newMode.mMode == "lightgrey" ? "#3b3a3a" : "lightgrey";
        newMode.backOpt = newMode.backOpt == "#111111" ? "#f3f3f3" : "#111111";
        body.style.backgroundColor = body.style.backgroundColor === "black" ? "white" : "black";

        setMode(newMode);
    }
}
