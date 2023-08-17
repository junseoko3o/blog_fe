import { useState, useEffect } from 'react';
import api from '../../api/api';
import { ContentList } from './interface';

export const useContent = async () => {
  const response = await api.get<ContentList>('/content/list');
  return response.data;
}