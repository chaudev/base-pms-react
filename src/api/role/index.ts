import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD } = new BaseAPI<TRole & TFilterParams>("role");

export const role = globalCRUD;
