export type VoteOptionsType = {
  id: number,
  title: string,
  votes: number,
};

export type VoteType = {
  date: number,
  end_date: number,
  id: number,
  title: string,
  options: Array<VoteOptionsType>,
};
