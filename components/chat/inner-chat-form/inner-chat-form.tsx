import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Smiles, ChatTextarea } from '../index';

import withSmiles from '../../../hocs/with-smiles/with-smiles';
import withChatForm from '../../../hocs/with-chat-form/with-chat-form';

import styles from './inner-chat-form.module.scss';
import { nicknameSelector } from '../../../store/comments/comments-selectors';

type Props = {
  toUser: string,
  id: number,
  toId: any,
  textareaValue: string,
  errorsText: string,
  link: string,
  isSmileOpen: boolean,
  isFormValid: boolean,
  isBtnIndicator: boolean,
  isTextareaDisabled: boolean,
  handleTextareaChange: (val: any) => void,
  handleTextareaBlur: (val: any) => void,
  handleSmileWindowToggle: () => void,
  handleSmileSelected: () => void,
  handleFormSubmit: (e: any, isFormAnswer: boolean, link: string) => void,
  setFormOpenFlag: (val: any) => void,
  setTextareaValue: (val: string) => void,
  setMyParent: (val: number) => void,
  setRecipientId: (id: number) => void,
};

const InnerChatForm: React.FC<Props> = ({
  toUser,
  id,
  toId,
  textareaValue,
  errorsText,
  link,

  isSmileOpen,
  isFormValid,
  isBtnIndicator,
  isTextareaDisabled,

  handleTextareaChange,
  handleTextareaBlur,
  handleSmileWindowToggle,
  handleSmileSelected,
  handleFormSubmit,

  setFormOpenFlag,
  setTextareaValue,
  setMyParent,
  setRecipientId,
}) => {
  const nickname = useSelector(nicknameSelector);

  const handleChange = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    setTextareaValue(`${toUser}, `);
    setRecipientId(id);
    setMyParent(toId == null ? id : toId);
  }, []);

  const handleSubmitInner = async (evt) => {
    await handleFormSubmit(evt, true, link);
    setTimeout(() => {
      setFormOpenFlag(false);
    }, 1000);
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 27) {
      setFormOpenFlag(false);
    }
  };

  return (
    <>
      <div className={styles.innerChatForm}>
        <form onSubmit={handleSubmitInner}>
          <div className={styles.innerChatFormTop}>
            <b className={styles.innerChatFormUsername}>{nickname}</b>
            <span className={styles.innerChatFormAddress}>{toUser}</span>
          </div>
          <div className={styles.innerChatFormWrap}>
            <div className={styles.innerChatFormField}>
              <ChatTextarea
                onInput={handleChange}
                onChange={(evt) => handleTextareaChange(evt.target)}
                onBlur={(evt) => handleTextareaBlur(evt.target)}
                onKeyDown={handleKeyDown}
                maxLength="100"
                name="text"
                value={textareaValue}
                disabled={isTextareaDisabled}
                autoFocus
              />
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className={styles.innerChatFormEmojiBtn}
                onClick={handleSmileWindowToggle}
              />
            </div>
            <button
              className={`${styles.innerChatFormBtn} ${!isBtnIndicator ? styles.innerChatFormBtnSend : styles.innerChatFormBtnLoad}`}
              type="submit"
              disabled={!isFormValid || isBtnIndicator}
              aria-label="Отправить комментарий"
            />
          </div>
        </form>
      </div>
      { isSmileOpen
            && (
            <Smiles
              handleSmileWindowToggle={handleSmileWindowToggle}
              handleSmileSelected={handleSmileSelected}
            />
            )}
      { errorsText && <div>{errorsText}</div>}
    </>
  );
};

export default withChatForm(withSmiles(InnerChatForm));
