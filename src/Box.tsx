import styled from 'styled-components';

const BoxElement = styled.div<{boxState?: "incorrect" | "correct" | "misplaced" | "empty" | "default", clickable?: boolean}>`
    width: 50px;
    height: 50px;
    color: #ffffff;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
    font-weight: bold;
    background-color: ${(props) => {
        switch (props.boxState) {
            case "incorrect":
                return "#3a3a3c";
            case "correct":
                return "#538d4e";
            case "misplaced":
                return "#b59f3b";
            case "empty":
                return "#121213";
            case "default":
                return "#818384";
        }
    }};
    cursor: ${(props) => props.clickable ? "pointer" : "default"};
`;

function sendKeyEvent(key: string | undefined) {
    window.dispatchEvent(
        new KeyboardEvent("keydown", { key, keyCode: key?.charCodeAt(0)})
    );
}

function Box({ boxState, letter, clickable } : {
    boxState: "incorrect" | "correct" | "misplaced" | "empty" | "default";
    letter?: string;
    clickable?: boolean;
}) {
    return (
        <BoxElement boxState={boxState} onClick={()=>clickable && sendKeyEvent(letter)}>
            {letter}
        </BoxElement>
    );
}

export default Box;