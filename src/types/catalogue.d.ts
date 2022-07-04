type TUserGroupCatalogue = TBaseReponseParams & TBasePermissionParams & {};

type TUserLevelCatalogue = Omit<TBaseReponseParams, "Description"> & {};

type TUserCatalogue = Omit<TBaseReponseParams, "Description" | "Name"> &
  TBaseUserFileParams &
  TBasePermissionParams & {
    Name: string;
    Code: string;
    Description: string;
    id: string;
    created: string;
    createdBy: string;
    updated: number;
    active: number;
    Catalogue: any;
  };

type TSourceTypesCatalogue = TBaseReponseParams;
