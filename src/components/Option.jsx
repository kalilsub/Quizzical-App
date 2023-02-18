import React from "react";

export default function Option(props) {

    const styles ={
        backgroundColor: props.isHeld ? "red" : "yellow",
        cursor: "pointer"
        
    }

    let background = ""
    if((props.isHeld && props.isCorrect) || props.isCorrect) {
        background = "green"
    }else if (props.isHeld && !props.isCorrect){
        background = "red"
    }else{
        background = "grey"
    }

    const answerStyles = {
        backgroundColor: background,
    }

    return (
        <button className="choices"
            onClick={props.holdOption}
            style = {props.finished ? answerStyles: styles}
            disabled = {props.finished}
        >
            {props.option}
        </button>
    )
}