import React, { ChangeEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import ChatStore from '../../stor/ChatStore';
import { MessageBox } from './MessageBox';
import { Button, CircularProgress, Paper, TextField } from '@mui/material';

export const ChatPages = observer(() => {
  const { getReceiveNotification, setSendMessage, loading } = ChatStore;

  const [message, setMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendClick = async () => {
    if (message.trim() !== '') {
      await setSendMessage(message);

      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendClick();
    }
  };

  useEffect(() => {
    const receiveNotificationInterval = setInterval(() => {
      getReceiveNotification();
    }, 5000);

    return () => {
      clearInterval(receiveNotificationInterval);
    };
  }, []);

  return (
    <div style={styles.wrapper}>
      <Paper style={styles.chatWindow}>
        <MessageBox />

        <div style={styles.inputContainer}>
          <TextField
            style={styles.input}
            label="Введите сообщение"
            size={'small'}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <Button
            style={styles.button}
            variant="contained"
            size="small"
            onClick={handleSendClick}
            disabled={!Boolean(message)}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Отправить'
            )}
          </Button>
        </div>
      </Paper>
    </div>
  );
});

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  chatWindow: {
    width: 400,
    padding: '20px',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 5px 8px 5px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    marginRight: '8px',
  },
  button: {
    position: 'relative' as 'relative',
    background: 'rgb(75,173,78)',
  },
};
