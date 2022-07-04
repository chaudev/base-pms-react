import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD } = new BaseAPI<TSourceType & TFilterParams>("source-type");

export const sourceType = globalCRUD;
