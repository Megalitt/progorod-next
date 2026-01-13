import { Api } from './endpoints';
import { createAPI } from './api';

const api = createAPI();

export const postComplaintValue = async (values) => {
  await api.post(`${Api.API}/people-control-complaints`, values);
};

export const getExpert = async (id) => {
  try {
    const { data: expert } = await api.get(`${Api.API}/people-control-experts/${id}`);
    return expert;
  } catch (err) {
    console.log(`peopleControl - getExpert - ${err.message}`);
    return [];
  }
};

export const getComplaint = async (id) => {
  try {
    const { data: complaint } = await api.get(`${Api.API}/people-control-complaints/${id}`);
    return complaint;
  } catch (err) {
    console.log(`peopleControl - getComplaint - ${err.message}`);
    return [];
  }
};

export const getActiveComplaint = async () => {
  try {
    const { data: complaint } = await api.get(`${Api.API}/people-control-complaints?filter[enabled]=1&sort=-date`);
    return complaint;
  } catch (err) {
    console.log(`peopleControl - getActiveComplaint - ${err.message}`);
    return [];
  }
};

export const apiPostLike = async ({ mat_id, mat_type, is_like }) => {
  try {
    return await api.post(
      `${Api.API}${Api.LIKES}${Api.LIKE}`,
      {
        mat_id,
        mat_type,
        is_like,
      },
      // @ts-ignore
      { headers: new Headers({ 'Content-Type': 'application/json' }) },
    );
  } catch (err) {
    console.log(`post - peopleControl - apiPostLike - ${err.message}`);
    return [];
  }
};

export const apiPostDeleteLike = async ({ mat_id, mat_type }) => {
  try {
    return await api.delete(
      `${Api.API}${Api.LIKES}${Api.LIKE_DELETE}`,
      {
        // @ts-ignore
        headers: new Headers({ 'Content-Type': 'application/json' }),
        data: {
          mat_id,
          mat_type,
        },
      },
    );
  } catch (err) {
    console.log(`post - peopleControl - apiPostDeleteLike - ${err.message}`);
    return [];
  }
};
