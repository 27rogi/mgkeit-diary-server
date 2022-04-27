export const deleteArtifacts = (idName, doc, ret) => {
  ret[idName] = ret._id;
  delete ret.id;
  delete ret._id;
  delete ret.__v;
};
