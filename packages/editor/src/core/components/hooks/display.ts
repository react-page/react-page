import { useCallback } from 'react';

import { useDispatch, useSelector } from '../../reduxConnect';
import { setZoom } from '../../actions/display';
import { useOption } from './options';

export const useSetZoom = () => {
  const dispatch = useDispatch();
  return useCallback((zoom: number) => dispatch(setZoom(zoom)), [dispatch]);
};

/**
 * @returns the current zoom
 */
export const useZoom = () => {
  return useSelector((state) => state.reactPage.display.zoom);
};

export const useZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  const setZoom = useSetZoom();
  return useCallback(() => {
    const newZoom = zoomFactors?.find((z) => z < zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useZoomIn = () => {
  const zoom = useZoom();
  const setZoom = useSetZoom();
  const zoomFactors = useOption('zoomFactors');
  return useCallback(() => {
    const newZoom = [...(zoomFactors ?? [])].reverse().find((z) => z > zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useCanZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');

  return zoomFactors?.some((z) => z < zoom) ?? false;
};

export const useCanZoomIn = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  return zoomFactors?.some((z) => z > zoom) ?? false;
};
