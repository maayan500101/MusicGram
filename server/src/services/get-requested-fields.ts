export const getRequestedFields = (info: any) => {
  return info.fieldNodes[0].selectionSet.selections.map(
    (field: any) => field.name.value,
  );
};
