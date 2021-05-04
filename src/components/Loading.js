import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading(props) {
  const { messages } = props;

  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    let timeout;
    if (messages && messageIndex < messages.length - 1) {
      timeout = setTimeout(() => setMessageIndex(messageIndex + 1), 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [messages, messageIndex]);

  return (
    <div className="text-center mt-4">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      {messages && <p className="mt-3">{messages[messageIndex]}</p>}
    </div>
  );
}

export default Loading;
