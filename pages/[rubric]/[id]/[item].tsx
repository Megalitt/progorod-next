import React from 'react';
import { wrapper } from '../../../store/store';

import { ProjectLayout } from '../../../layouts/project-layout';
import { SimpleLayout } from '../../../layouts/simple-layout';

import { Head404 } from '../../../components/head-404';
import { ErrorCustom } from '../../../components/error-custom';

import { apiGetPhotoConcursItem } from '../../../services/concurs';

const CityfacesPhoto: React.FC = () => (
  <ProjectLayout>
    <Head404 />
    <SimpleLayout title="404. Страница не найдена">
      <ErrorCustom />
    </SimpleLayout>
  </ProjectLayout>
);

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const { rubric, id, item } = context.query;
  if (rubric === 'cityfaces' && id === 'photo') {
    try {
      const { data: { cityface_id } }: any = await apiGetPhotoConcursItem(item);
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: `/concurs/view/${cityface_id}`,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  } else {
    return {
      notFound: true,
    };
  }
});

export default CityfacesPhoto;
