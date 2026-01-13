import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Smiles, ChatTextarea, ChatInput } from '../index';
import { Button } from '../../button';

import withChatForm from '../../../hocs/with-chat-form/with-chat-form';
import withSmiles from '../../../hocs/with-smiles/with-smiles';
import { setNickname } from '../../../store/comments/comments-slice';
import { mainInputDisabledSelector, isFormAnswerSendSelector } from '../../../store/comments/comments-selectors';
import { loginStatus, loginUserData } from '../../../store/login/login-selectors';
import { getCookie } from '../../../utils/cookie/get-cookie';

import styles from './chat-form.module.scss';

type Props = {
  inputValue: string,
  textareaValue: string,
  errorsText?: string,
  link: string,
  isSmileOpen: boolean,
  isFormValid: boolean,
  isBtnIndicator: boolean,
  isTextareaDisabled: boolean,
  handleTextareaChange: (e: any) => void,
  handleTextareaBlur: (e: any) => void,
  handleSmileSelected: () => void,
  handleInputChange: (e: any) => void,
  handleInputBlur: (e: any) => void,
  handleFormSubmit: (e: any, isFormAnswer: boolean, link: string) => void,
  handleSmileWindowToggle: () => void,
  setInputValue: (name: string) => void,
};

const ChatForm: React.FC<Props> = ({
  inputValue,
  textareaValue,
  errorsText,
  link,

  isSmileOpen,
  isFormValid,
  isBtnIndicator,
  isTextareaDisabled,

  handleTextareaChange,
  handleTextareaBlur,
  handleSmileSelected,
  handleInputChange,
  handleInputBlur,
  handleFormSubmit,
  handleSmileWindowToggle,

  setInputValue,
}) => {
  const dispatch = useDispatch();

  const isAuth = useSelector(loginStatus);
  const isFormAnswerSend = useSelector(isFormAnswerSendSelector);
  const userData = useSelector(loginUserData);
  const mainInputDisabled = useSelector(mainInputDisabledSelector);

  const [isInputDisabled, setInputDisabledFlag] = useState(true);

  const getUserName = () => {
    const chatName = getCookie('chatname');

    if (isAuth) {
      setInputDisabledFlag(true);
      return userData?.nick;
    }

    if (chatName) {
      setInputDisabledFlag(true);
      return chatName;
    }

    setInputDisabledFlag(false);
    return '';
  };

  const handleFormInnerSubmit = (evt) => {
    setInputDisabledFlag(true);
    handleFormSubmit(evt, false, link);
  };

  useEffect(() => {
    const currentNickname = getUserName();
    dispatch(setNickname(currentNickname));
    setInputValue(currentNickname);

    if (!isAuth && isFormAnswerSend) {
      if (inputValue && inputValue.length === 0) {
        setInputValue('Аноним');
      }
    }

    if (currentNickname && currentNickname.length === 0) {
      dispatch(setNickname('Аноним'));
    }
  }, [isAuth, isFormAnswerSend]);

  return (
    <>
      <div className={styles.chatForm}>
        <form onSubmit={handleFormInnerSubmit}>
          <div className={styles.chatFormFieldWrap}>
            <ChatInput
              placeholder="Введите ваше имя"
              value={inputValue}
              onChange={(evt) => handleInputChange(evt.target.value)}
              onBlur={(evt) => handleInputBlur(evt.target.value)}
              name="uname"
              disabled={mainInputDisabled || isInputDisabled}
            />
          </div>
          <div className={styles.chatFormTextareaWrap}>
            <div className={`${styles.chatFormFieldWrap} ${styles.chatFormFieldTextarea}`}>
              <ChatTextarea
                placeholder="Введите ваш комментарий"
                value={textareaValue}
                onChange={(evt) => handleTextareaChange(evt.target)}
                onBlur={(evt) => handleTextareaBlur(evt.target)}
                maxLength="100"
                name="text"
                disabled={isTextareaDisabled}
              />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className={styles.chatFormEmojiBtn}
                onClick={handleSmileWindowToggle}
              />
            </div>
            <Button
              type="submit"
              className={styles.chatFormBtn}
              disabled={!isFormValid || isBtnIndicator}
            >
              { !isBtnIndicator ? '' : '...' }
            </Button>
          </div>
        </form>
        {
          isSmileOpen && (
          <Smiles
            handleSmileWindowToggle={handleSmileWindowToggle}
            handleSmileSelected={handleSmileSelected}
          />
          )
        }
      </div>
      { errorsText && <div>{errorsText}</div>}
    </>
  );
};

export default withSmiles(withChatForm(ChatForm));
