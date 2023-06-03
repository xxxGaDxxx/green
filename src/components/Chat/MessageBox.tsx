import React from 'react';
import { observer } from 'mobx-react-lite';
import ChatStore, { MessageType } from '../../stor/ChatStore';
import bg from '../../images/whatsapp.png';

export const MessageBox = observer(() => {
  const { chatHistory } = ChatStore;

  return (
    <div style={styles.wrapper}>
      {chatHistory.map((msg) => {
        const isMyMessage = msg.typeMessage === MessageType.ExtendedTextMessage;

        const containerStyle = isMyMessage
          ? { ...styles.container, ...styles.containerRight }
          : { ...styles.container, ...styles.containerLeft };
        const stylesMessage = isMyMessage
          ? { ...styles.message, ...styles.rightMessage }
          : { ...styles.message, ...styles.leftMessage };

        return (
          <div key={msg.idMessage} style={containerStyle}>
            <div style={stylesMessage}>{msg.message}</div>
          </div>
        );
      })}
    </div>
  );
});

const styles = {
  wrapper: {
    height: '50vh',
    backgroundImage: `url(${bg})`,
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
    marginBottom: '20px',
  },
  container: {
    minHeight: '20px',
    marginBottom: '10px',
    display: 'flex',
  },
  containerLeft: {
    justifyContent: 'flex-star',
  },
  containerRight: {
    justifyContent: 'flex-end',
  },
  message: {
    maxWidth: '80%',
    borderRadius: '4px',
    padding: '5px',
  },
  leftMessage: {
    left: 0,
    background: 'white',
  },
  rightMessage: {
    right: 0,
    background: 'rgba(200, 241, 176, 1)',
  },
};
