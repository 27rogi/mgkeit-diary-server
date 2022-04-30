import { createHmac } from 'crypto';
import options from './options';

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

export const doPasswordsMatch = (password1: string, password2: string): boolean => {
  return createHmac('sha256', options.jwtKey).update(password1).digest('hex') === password2;
};

export const hashPassword = (password: string): string => {
  return createHmac('sha256', options.jwtKey).update(password).digest('hex');
};
