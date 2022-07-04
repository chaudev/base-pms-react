import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD } = new BaseAPI<TSourceType & TFilterParams>("user");

export const user = globalCRUD;
