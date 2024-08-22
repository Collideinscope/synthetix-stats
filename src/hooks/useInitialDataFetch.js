import { useEffect } from 'react';

import API from '../fetch_functions';
import { getCachedData, setCachedData } from '../utils/cache';

import { getMetricsForRoute } from '../constants/metrics_by_route';
import metricToFetchFunction from '../constants/metrics_to_fetch';

const useInitialDataFetch = (appDispatch, setIsLoading, currentPath) => {
  useEffect(() => {
    const fetchData = async () => {

      try {
        setIsLoading(true);
        const cachedData = await getCachedData();
        
        if (cachedData) {
          appDispatch({ type: 'SET_INITIAL_DATA', payload: cachedData });
        }

        // fetch the current page's data
        const routeMetrics = getMetricsForRoute(currentPath);

        const fetchPromises = routeMetrics.map(metric => metricToFetchFunction[metric]());

        const results = await Promise.all(fetchPromises);
        const newData = Object.fromEntries(routeMetrics.map((key, index) => [key, results[index]]));
        
        // dispatch
        appDispatch({ type: 'SET_PAGE_DATA', payload: newData });
        await setCachedData({ ...cachedData, ...newData });

        // fetch remainder of data
        const allMetrics = Object.keys(metricToFetchFunction);
        const remainingMetrics = allMetrics.filter(metric => !routeMetrics.includes(metric));
        
        const remainingFetchPromises = remainingMetrics.map(metric => metricToFetchFunction[metric]());

        // run and dispatch 
        Promise.all(remainingFetchPromises)
          .then(backgroundResults => {
            const remainingData = Object.fromEntries(remainingMetrics.map((key, index) => [key, backgroundResults[index]]));
            appDispatch({ type: 'SET_ALL_REMAINING_DATA', payload: remainingData });
            setCachedData({ ...cachedData, ...newData, ...remainingData });
          })
          .catch(error => console.error('Error fetching background data:', error));
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [appDispatch, setIsLoading]);
};

export default useInitialDataFetch;