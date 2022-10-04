import React from "react";

function Comments ( props ) {
    return ( 
        <>
            <div className="card" style={{ justifyContent: 'center', margin: '1rem' }} key={props.idx}>
                <div className="card-body">
                    <h3 className="card-title">comment by : {props.comment.user.username}</h3>
                    <p className="card-text">{props.comment.content}</p>
                </div>
            </div>
        </>
    );
}
export default Comments;