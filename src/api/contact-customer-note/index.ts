import BaseAPI from "../methods";

type TFilterParams = {
  Type: number;
};

const { globalCRUD } = new BaseAPI<TNote & TFilterParams>(
  "contact-customer-notes"
);

export const contactCustomersNotes = globalCRUD;
