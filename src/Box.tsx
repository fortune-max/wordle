import React from 'react';
import styled from 'styled-components';

const BoxElement = styled.div<{boxState?: "incorrect" | "correct" | "misplaced" | "empty"}>`
    width: 50px;
    height: 50px;
    color: #ffffff;
    text-align: center;
    vertical-align: middle;
    line-height: 50px;
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
        }
    }};
`;

function Box({ boxState, children } : {
    boxState: "incorrect" | "correct" | "misplaced" | "empty";
    children?: React.ReactNode;
}) {
    return (
        <BoxElement boxState={boxState}>
            {children}
        </BoxElement>
    );
}

export default Box;