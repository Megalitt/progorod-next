import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { apiPostComments } from '../../services/chat';

import {
  setMainInputDisabled,
  setFormAnswerSend,
  setNewCommentData,
  setNickname,
} from '../../store/comments/comments-slice';
import { nicknameSelector } from '../../store/comments/comments-selectors';
import { getCookie } from '../../utils/cookie/get-cookie';
import { setCookie } from '../../utils/cookie/set-cookie';
import { loginStatus } from '../../store/login/login-selectors';

const withChatForm = (Component) => (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const nickname = useSelector(nicknameSelector);
  const isAuth = useSelector(loginStatus);

  const [textareaValue, setTextareaValue] = useState('');
  const [textareaSelectionEnd, setTextareaSelectionEnd] = useState(0);
  const [inputValue, setInputValue] = useState(nickname);
  const [errorsText, setErrorsText] = useState(null);
  const [myParent, setMyParent] = useState(null);
  const [recipientId, setRecipientId] = useState(null);

  const [isFormValid, setFormValidFlag] = useState(false);
  const [isBtnIndicator, setBtnIndicatorFlag] = useState(false);
  const [isTextareaDisabled, setTextareaDisabledFlag] = useState(false);
  const [isValidInput, setValidInputFlag] = useState(false);
  const [isValidTextarea, setValidTextareaFlag] = useState(false);

  const checkFieldFormValid = (value, callBack) => {
    if (!!value && value.length >= 2 && value.length <= 100) {
      callBack(true);
    } else {
      callBack(false);
    }
  };

  const checkFormValid = () => ((isValidInput && isValidTextarea)
    ? setFormValidFlag(true)
    : setFormValidFlag(false));

  const resetForm = () => {
    setTextareaValue('');
  };

  const handleSmileSelected = (smile) => {
    setTextareaValue((prev) => (prev.length <= 98
      ? prev.slice(0, textareaSelectionEnd) + smile + prev.slice(textareaSelectionEnd)
      : prev));
    setTextareaSelectionEnd((prev) => prev + 2);
    checkFieldFormValid(textareaValue + smile, setValidTextareaFlag);
    checkFormValid();
  };

  const handleTextareaChange = (elem) => {
    setTextareaValue(elem.value);
    checkFieldFormValid(elem.value, setValidTextareaFlag);
    checkFieldFormValid(inputValue, setValidInputFlag);
    checkFormValid();
  };

  const handleTextareaBlur = (elem) => {
    setTextareaSelectionEnd(elem.selectionEnd);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    checkFieldFormValid(value, setValidInputFlag);
    checkFormValid();
  };

  const handleInputBlur = (value) => {
    dispatch(setNickname(value));
    setInputValue(value);
    checkFieldFormValid(value, setValidInputFlag);
    checkFormValid();
  };

  const handleFormSubmit = async (evt, isFormAnswer = false, link) => {
    evt.preventDefault();

    const values = {
      stat: 1,
      link,
      pid: router.query.id,
      uname: inputValue.trim(),
      text: textareaValue,
      toid: myParent,
      recipient_id: recipientId,
    };

    setBtnIndicatorFlag(true);
    setTextareaDisabledFlag(true);

    await apiPostComments(values)
      .then((res) => dispatch(setNewCommentData(res)))
      .then(() => resetForm())
      .then(() => {
        const chatName = getCookie('chatname');
        if (!isAuth && !chatName) {
          const date = new Date((Date.now() + 86400e3) * 14); // 14 дней от текущей даты
          setCookie('chatname', inputValue, { 'max-age': date });
        }
      })
      .then(() => {
        dispatch(setMainInputDisabled(true));
        dispatch(setFormAnswerSend(isFormAnswer));
      })
      .then(() => setBtnIndicatorFlag(false))
      .then(() => setTextareaDisabledFlag(false))
      .then(() => setFormValidFlag(false))
      .catch((err) => {
        console.log(err.message);
        setErrorsText(err.message);
        setTimeout(() => setErrorsText(null), 5000);
      });
  };

  return (
    <Component
      {...props}
      textareaValue={textareaValue}
      inputValue={inputValue}
      errorsText={errorsText}
      isFormValid={isFormValid}
      isBtnIndicator={isBtnIndicator}
      isTextareaDisabled={isTextareaDisabled}
      handleTextareaChange={handleTextareaChange}
      handleTextareaBlur={handleTextareaBlur}
      handleSmileSelected={handleSmileSelected}
      handleInputChange={handleInputChange}
      handleInputBlur={handleInputBlur}
      handleFormSubmit={handleFormSubmit}
      setInputValue={setInputValue}
      setTextareaValue={setTextareaValue}
      setMyParent={setMyParent}
      setRecipientId={setRecipientId}
    />
  );
};

export default withChatForm;
