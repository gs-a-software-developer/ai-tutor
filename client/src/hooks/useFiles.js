// useFiles.js
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFiles } from '../redux/actions/fileActions';

export const useFiles = () => {
  const dispatch = useDispatch();
  const { files, loading, error } = useSelector(state => state.files);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return { files, loading, error };
};