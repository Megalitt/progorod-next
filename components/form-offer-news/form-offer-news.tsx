import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from '../button';
import { ButtonLoad } from '../button-load';
import { ProjectCheckbox } from '../project-checkbox';
import { ProjectInput } from '../project-input';
import { ProjectTextarea } from '../project-textarea';
import { PhotoBlock } from './index';
import { ErrorForm, validateField } from '../../utils/form-validate/form-offer-news-validate';
import { setAlerts } from '../../store/alert/alert-slice';
import { apiPostOfferNewsValue } from '../../services/offer-news';
import { agreementTextSelector } from '../../store/settings/settings-selectors';
import { createMarkup } from '../../utils/core/create-markup';

import styles from './form-offer-news.module.scss';

const FormOfferNews = React.memo(() => {
  const [loadFilesPreview, setLoadFilesPreview] = useState([]);
  const [loadFiles, setLoadFiles] = useState<any>([]);
  const [isDisabled, setIsDisabledFlag] = useState(true);
  const agreement = useSelector(agreementTextSelector);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: '',
        contacts: '',
        description: '',
        is_agree: '',
        is_mine: '',
        pics: '',
      }}
      validate={validateField}
      onSubmit={async (values, { resetForm }) => {
        // eslint-disable-next-line no-param-reassign
        setIsDisabledFlag((prev) => !prev);
        try {
          const data = new FormData();
          data.append('contacts', values.contacts);
          data.append('description', values.description);
          data.append('is_agree', values.is_agree);
          data.append('is_mine', values.is_mine);
          data.append('name', values.name);

          for (let i = 0; i < loadFiles.length; i += 1) {
            data.append('pics[]', loadFiles[i]);
          }

          await apiPostOfferNewsValue(data);
          await dispatch(setAlerts('Ваша новость отправлена в редакцию'));
          resetForm();
          setLoadFilesPreview(() => []);
          setIsDisabledFlag((prev) => !prev);
        } catch (err) {
          dispatch(setAlerts('Ошибка! При отправке данных возникла ошибка'));
          setIsDisabledFlag((prev) => !prev);
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid }) => {
        const handlePhotoButtonClick = (index) => {
          const loadFilesCopy = loadFilesPreview.slice();
          const deletedItem = loadFilesCopy.splice(index, 1);
          setLoadFilesPreview(loadFilesCopy.filter((item) => item !== deletedItem));
        };

        const handleFilesLoad = (evt) => {
          setLoadFilesPreview(() => []);
          const { files } = evt.target;
          setLoadFiles(files);

          if (files.length > 10) {
            dispatch(setAlerts({
              message: ErrorForm.MAX_FILES(10),
              messageType: 'info',
            }));
            return;
          }

          for (let i = 0; i < files.length; i += 1) {
            const file = files[i];
            const fileSize = parseFloat(((file.size / 1024) / 1024).toFixed(1));
            const fileTypeImage = file.type.match('image.*');
            const fileTypeVideo = file.type.match('video.*');

            if (fileTypeVideo && fileSize > 1024) {
              dispatch(setAlerts({
                message: ErrorForm.MAX_VIDEO,
                messageType: 'info',
              }));
            } else if (fileTypeImage && fileSize > 8) {
              dispatch(setAlerts({
                message: ErrorForm.MAX_PHOTO,
                messageType: 'info',
              }));
            } else if (!fileTypeImage && !fileTypeVideo) {
              dispatch(setAlerts({
                message: ErrorForm.TYPE_LOAD,
                messageType: 'info',
              }));
            } else {
              const reader = new FileReader();

              reader.onload = (evt) => {
                setLoadFilesPreview((prevLoadFiles) => prevLoadFiles.concat(evt.target.result));
              };

              reader.readAsDataURL(file);
            }
          }
        };

        return (
          <Form className={styles.formOffer} encType="multipart/form-data">
            <ProjectInput
              placeholder="Ваше имя"
              name="name"
              className={styles.formOfferName}
            />
            <ProjectInput
              placeholder="E-mail или телефон"
              name="contacts"
              className={styles.formOfferMail}
            />
            <ProjectTextarea
              placeholder="Текст новости"
              name="description"
              className={styles.formOfferText}
            />
            <ProjectCheckbox
              name="is_agree"
              className={styles.formOfferCheckPersonal}
            >
              {agreement && agreement.length > 0 && (
                <div dangerouslySetInnerHTML={createMarkup(agreement)} />
              )}
            </ProjectCheckbox>
            <ProjectCheckbox
              name="is_mine"
              className={styles.formOfferCheckAuthor}
            >
              Новость является авторской, не скопирована с других сайтов
            </ProjectCheckbox>
            {loadFilesPreview.length > 0 && (
              <PhotoBlock
                photos={loadFilesPreview}
                onPhotoButtonClick={handlePhotoButtonClick}
                className={styles.formOfferPhoto}
              />
            )}
            <ButtonLoad
              name="pics"
              onFilesLoad={handleFilesLoad}
              className={styles.formOfferAdd}
            />
            <Button
              type="submit"
              disabled={isDisabled && !(isValid && dirty)}
              className={styles.formOfferSend}
            >
              Отправить новость
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export default FormOfferNews;
