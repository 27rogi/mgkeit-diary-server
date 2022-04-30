export const deleteArtifacts = (idName, doc, ret) => {
  ret[idName] = ret._id;
  delete ret.id;
  delete ret._id;
  delete ret.__v;
};

export const paginationLabels = {
  totalDocs: 'totalItems',
  docs: 'items',
  page: 'currentPage',
  nextPage: 'nextPage',
  prevPage: 'previousPage',
};
