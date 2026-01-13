import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { ButtonLoad } from '../../button-load';
import { getLoginStatus, setLoginStatus } from '../../../store/login/login-slice';
import { apiPutUserPhoto } from '../../../services/user-photo';

import styles from './form-user-photo.module.scss';

const FormUserPhoto: React.FC = React.memo(() => {
  const [loadFiles, setLoadFiles] = React.useState([]);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        pics: [],
      }}
      onSubmit={
        async () => {
        // eslint-disable-next-line no-param-reassign
          try {
            const data = new FormData();
            data.append('userphotoField', loadFiles[0]);
            const { data: statusCode }: any = await apiPutUserPhoto(data);
            if (statusCode.status) {
              const { payload }: any = await dispatch(getLoginStatus());
              const { resultCode } = payload;
              if (payload.resultCode) {
                dispatch(setLoginStatus(resultCode));
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    >
      {({ handleSubmit }) => {
        const handleFilesLoad = (evt) => {
          const { files } = evt.target;

          if (files.length > 0) {
            setLoadFiles(files);
            handleSubmit();
          }
        };
        return (
          <Form className={styles.formUserPhoto}>
            <ButtonLoad
              className={styles.formUserPhotoSubmit}
              name="pics"
              multiple={false}
              title="Изменить фото"
              onFilesLoad={handleFilesLoad}
            />
          </Form>
        );
      }}
    </Formik>
  );
});

export default FormUserPhoto;
