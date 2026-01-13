import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { Button } from '../../../button';
import { ButtonLoad } from '../../../button-load';
import { ProjectCheckbox } from '../../../project-checkbox';
import { ProjectInput } from '../../../project-input';
import { ProjectTextarea } from '../../../project-textarea';
import { PhotoBlock } from './index';
import { ErrorForm, validateField } from '../../../../utils/form-validate/form-peoplecontrol-validate';
import { setAlerts } from '../../../../store/alert/alert-slice';
import { postComplaintValue } from '../../../../services/peoplecontrol';
import { agreementTextSelector } from '../../../../store/settings/settings-selectors';
import { createMarkup } from '../../../../utils/core/create-markup';

import ProjectSelectCustom from '../../../project-select-custom/project-select-custom';
import styles from './peoplecontrol-form-complaint.module.scss';

type Props = {
  categories: Array<any>;
};

const PeoplecontrolFormComplaint: React.FC<Props> = React.memo(({ categories }) => {
  const [loadFilesPreview, setLoadFilesPreview] = useState([]);
  const [loadFiles, setLoadFiles] = useState<any>([]);
  const [isDisabled, setIsDisabledFlag] = useState(true);
  const agreement = useSelector(agreementTextSelector);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        author_anon_name: '',
        category_id: '',
        text: '',
        is_agree: '',
      }}
      validate={validateField}
      onSubmit={async (values, { resetForm }) => {
        const resultValues = { ...values };
        resultValues.files = loadFiles;

        setIsDisabledFlag((prev) => !prev);
        try {
          const data = new FormData();
          data.append('author_anon_name', values.author_anon_name);
          data.append('category_id', values.category_id);
          data.append('text', values.text);
          data.append('videolink', values.videolink);
          data.append('is_agree', values.is_agree);

          for (let i = 0; i < loadFiles.length; i += 1) {
            data.append('pics[]', loadFiles[i]);
          }

          await postComplaintValue(data);
          dispatch(setAlerts({
            message: 'Успешно! Ваша жалоба успешно отправлена на модерацию',
            messageType: 'success',
          }));
          resetForm();
          setLoadFilesPreview(() => []);
          setIsDisabledFlag((prev) => !prev);
        } catch (err) {
          dispatch(setAlerts({
            message: 'Ошибка! При отправке данных возникла ошибка',
            messageType: 'error',
          }));
          setIsDisabledFlag((prev) => !prev);
          console.log(err);
        }
      }}
    >
      {({ dirty, isValid, setFieldValue }) => {
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
          <>
            <div className={styles.formPeoplecontrolDescription}>
              В рубрике «Народный контроль» редакция портала Pro Город принимает жалобы,
              обрабатывает их и решает проблемы горожан в режиме онлайн.
              Для отправки жалобы на сайт требуется лишь представиться
              и максимально подробно описать проблему.
            </div>
            <Form className={styles.formPeoplecontrol}>
              <ProjectInput
                placeholder="Имя"
                name="author_anon_name"
                className={styles.formPeoplecontrolName}
              />
              <ProjectSelectCustom
                className={styles.formPeoplecontrolCatagory}
                classNameActive={styles.formPeoplecontrolCatagoryActive}
                name="category_id"
                options={categories}
                selectedDefaultValue={0}
                setFieldValue={setFieldValue}
              />
              <ProjectTextarea
                placeholder="Сообщение"
                name="text"
                className={styles.formPeoplecontrolText}
              />
              <ProjectInput
                placeholder="Ссылка на видео"
                name="videolink"
                className={styles.formPeoplecontrolVideoLink}
              />
              <ProjectCheckbox
                name="is_agree"
                className={styles.formPeoplecontrolCheckPersonal}
              >
                {agreement && agreement.length > 0 && (
                  <div dangerouslySetInnerHTML={createMarkup(agreement)} />
                )}
              </ProjectCheckbox>
              {loadFilesPreview.length > 0 && (
                <PhotoBlock
                  photos={loadFilesPreview}
                  onPhotoButtonClick={handlePhotoButtonClick}
                  className={styles.formPeoplecontrolPhoto}
                />
              )}
              <ButtonLoad
                name="pics"
                onFilesLoad={handleFilesLoad}
                className={styles.formPeoplecontrolAdd}
              />
              <Button
                type="submit"
                disabled={isDisabled && !(isValid && dirty)}
                className={styles.formPeoplecontrolSend}
              >
                Отправить жалобу
              </Button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
});

export default PeoplecontrolFormComplaint;
