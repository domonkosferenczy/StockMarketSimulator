import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "Store/Store";
import ExplSource from "images/expl.svg";

function Message(props) {
  const [, dispatch] = useContext(StoreContext);

  const [opacity, setOpacity] = useState(1);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setDisplay(false);
        props.setDestroyedHandler();
      }, 500);
    }, 1000);

    return () => {
      setDisplay(false);
      props.setDestroyedHandler();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.message.id]);

  if (display) {
    return (
      <div
        key={props.message.id + "M"}
        className="Message"
        style={{ opacity: opacity }}
      >
        <img src={ExplSource} alt="Expl Mark" />
        {props.message.content}
      </div>
    );
  } else {
    return "";
  }
}

export default Message;
