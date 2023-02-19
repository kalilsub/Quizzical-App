import React from "react";

export default function Option(props) {

    const styles ={
        backgroundColor: props.isHeld ? "#D6DBF5" : "transparent",
        color: "#293264",
        cursor: "pointer"
        
    }

    let background = ""
    if((props.isHeld && props.isCorrect) || props.isCorrect) {
        background = "#94D7A2"
    }else if (props.isHeld && !props.isCorrect){
        background = "#F8BCBC"
    }else{
        background = "grey"
    }

    const answerStyles = {
        backgroundColor: background,
        color: props.isCorrect ? "#293264" : ""
    }

    return (
        <button className="choice"
            onClick={props.holdOption}
            style = {props.finished ? answerStyles: styles}
            disabled = {props.finished}
        >
            {props.option}
        </button>
    )
}