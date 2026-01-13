import React from 'react';
import { ProjectLayout } from '../layouts/project-layout';
import { SimpleLayout } from '../layouts/simple-layout';
import { ErrorCustom } from '../components/error-custom';
import { Head404 } from '../components/head-404';

const custom404: React.FC = React.memo(() => (
  <ProjectLayout>
    <Head404 />
    <SimpleLayout title="404. Страница не найдена">
      <ErrorCustom />
    </SimpleLayout>
  </ProjectLayout>
));

export default custom404;
