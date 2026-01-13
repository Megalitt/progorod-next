import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from '../../../button';
import { ButtonLoad } from '../../../button-load';
import { ProjectCheckbox } from '../../../project-checkbox';
import { ProjectInput } from '../../../project-input';
import { ProjectTextarea } from '../../../project-textarea';
import { PhotoBlock } from './index';

import { ErrorForm, validateField } from '../../../../utils/form-validate/form-concurs-entry';
import { agreementTextSelector } from '../../../../store/settings/settings-selectors';
import { setAlerts } from '../../../../store/alert/alert-slice';
import { apiPostConcursEntryValue } from '../../../../services/concurs-entry';
import { createMarkup } from '../../../../utils/core/create-markup';

import styles from './concurs-form-entry.module.scss';

type Props = {
  cityfaceId: string
};

const ConcursFormEntry: React.FC<Props> = React.memo(({ cityfaceId }) => {
  const [loadFilesPreview, setLoadFilesPreview] = useState([]);
  const [loadFiles, setLoadFiles] = useState<any>([]);
  const [isDisabled, setIsDisabledFlag] = useState(true);
  const dispatch = useDispatch();
  const agreement = useSelector(agreementTextSelector);
  return (
    <Formik
      initialValues={{
        author_name: '',
        contact_info: '',
        is_agree: '',
        pic_field: '',
      }}
      validate={validateField}
      onSubmit={async (values, { resetForm }) => {
        setIsDisabledFlag((prev) => !prev);
        try {
          const data = new FormData();
          data.append('cityface_id', cityfaceId);
          data.append('author_name', values.author_name);
          data.append('contact_info', values.contact_info);
          data.append('text', values.text ? values.text : '');
          data.append('is_agree', values.is_agree);
          data.append('is_mine', values.is_mine);
          data.append('pic_field', loadFiles[0]);
          resetForm();
          await apiPostConcursEntryValue(data);
          await dispatch(setAlerts('Заявка на участие в конкурсе успешно отправлена'));
          setLoadFilesPreview(() => []);
          setIsDisabledFlag((prev) => !prev);
        } catch (err) {
          dispatch(setAlerts('Ошибка! При отправке данных возникла ошибка'));
          setIsDisabledFlag((prev) => !prev);
          console.log(err);
        }
      }}
    >
      {({
        dirty,
        isValid,
        setFieldValue,
      }) => {
        const handlePhotoButtonClick = (index) => {
          const loadFilesCopy = loadFilesPreview.slice();
          const deletedItem = loadFilesCopy.splice(index, 1);
          setLoadFilesPreview(loadFilesCopy.filter((item) => item !== deletedItem));

          if (deletedItem.length === 1) {
            setFieldValue('pic_field', []);
          }
        };

        const handleFilesLoad = (evt) => {
          setLoadFilesPreview(() => []);
          const { files } = evt.target;
          setLoadFiles(files);
          setFieldValue('pic_field', files[0]);

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
          <Form className={styles.concursFormEntry} encType="multipart/form-data">
            <ProjectInput
              placeholder="Имя участника или заголовок"
              name="author_name"
              className={styles.concursFormEntryName}
            />
            <ProjectInput
              placeholder="E-mail или телефон"
              name="contact_info"
              className={styles.concursFormEntryMail}
            />
            <ProjectTextarea
              placeholder="Текст"
              name="text"
              className={styles.concursFormEntryText}
            />
            <ProjectCheckbox
              name="is_agree"
              className={styles.concursFormEntryCheckPersonal}
            >
              {agreement && agreement.length > 0 && (
                <div dangerouslySetInnerHTML={createMarkup(agreement)} />
              )}
            </ProjectCheckbox>
            {loadFilesPreview.length > 0 && (
              <PhotoBlock
                photos={loadFilesPreview}
                onPhotoButtonClick={handlePhotoButtonClick}
                className={styles.concursFormEntryPhoto}
              />
            )}
            <ButtonLoad
              className={styles.concursFormEntryAdd}
              name="pic_field"
              multiple={false}
              onFilesLoad={handleFilesLoad}
            />
            <Button
              type="submit"
              disabled={isDisabled && !(isValid && dirty)}
              className={styles.concursFormEntrySend}
            >
              Отправить заявку
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
});

export default ConcursFormEntry;
