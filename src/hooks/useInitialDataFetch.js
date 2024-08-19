import { useState, useEffect } from 'react';

import API from '../fetch_functions';

import { getCachedData, setCachedData } from '../utils/cache';

const useInitialDataFetch = (appDispatch, setIsLoading) => {

  useEffect(() => {
    const fetchData = async () => {

      try {
        setIsLoading(true);
        const cachedData = getCachedData();

        if (cachedData) {
          appDispatch({ type: 'SET_INITIAL_DATA', payload: cachedData });
          setIsLoading(false);
        } else {
          const [
            uniqueStakers,
            summaryDataUniqueStakers,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            uniqueTraders,
            summaryDataUniqueTraders,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            perpsVolume,
            summaryDataCumulativePerpsVolume,
            dailyPerpsVolume,
            summaryDataDailyPerpsVolume,
            openInterest,
            summaryDataOpenInterest,
            dailyOpenInterest,
            apy,
            dailyAPY,
            tvl,
            dailyTVL,
            poolRewards,
            dailyPoolRewards,
            coreDelegations,
            dailyCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            exchangeFees,
            summaryDataAPY,
            summaryDataDailyAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataCumulativeExchangeFees,
            dailyExchangeFees,
            summaryDataDailyExchangeFees,
          ] = await Promise.all([
            API.fetchCumulativeUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
            API.fetchSummaryDataUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
            API.fetchDailyUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
            API.fetchSummaryDataDailyUniqueStakers('base', '0xC74eA762cF06c9151cE074E6a569a5945b6302E7'),
            API.fetchCumulativeUniqueTraders('base'),
            API.fetchSummaryDataCumulativeUniqueTraders('base'),
            API.fetchDailyUniqueTraders('base'),
            API.fetchSummaryDataDailyUniqueTraders('base'),
            API.fetchCumulativePerpsVolume('base'),
            API.fetchSummaryDataCumulativePerpsVolume('base'),
            API.fetchDailyPerpsVolume('base'),
            API.fetchSummaryDataDailyPerpsVolume('base'),
            API.fetchOpenInterest('base'),
            API.fetchSummaryDataOpenInterest('base'),
            API.fetchDailyOpenInterest('base'),
            API.fetchAllAPY('base'),
            API.fetchDailyAPY('base'),
            API.fetchAllTVL(),
            API.fetchDailyTVL('base'),
            API.fetchAllPoolRewards('base'),
            API.fetchDailyPoolRewards('base'),
            API.fetchAllCoreDelegations(),
            API.fetchDailyCoreDelegations('base'),
            API.fetchAllPerpStats('base'),
            API.fetchAllPerpAccountStats('base'),
            API.fetchCumulativeExchangeFees('base'),
            API.fetchSummaryDataAPY('base'),
            API.fetchSummaryDataDailyAPY('base'),
            API.fetchSummaryDataTVL('base'),
            API.fetchSummaryDataDailyTVL('base'),
            API.fetchSummaryDataPoolRewards('base'),
            API.fetchSummaryDataDailyPoolRewards('base'),
            API.fetchSummaryDataCoreDelegations('base'),
            API.fetchSummaryDataDailyCoreDelegations('base'),
            API.fetchSummaryDataCumulativeExchangeFees('base'),
            API.fetchDailyExchangeFees('base'),
            API.fetchSummaryDataDailyExchangeFees('base'),
          ]);

          const newData = {
            uniqueStakers,
            summaryDataUniqueStakers,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            uniqueTraders,
            summaryDataUniqueTraders,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            perpsVolume,
            summaryDataCumulativePerpsVolume,
            dailyPerpsVolume,
            summaryDataDailyPerpsVolume,
            openInterest,
            summaryDataOpenInterest,
            dailyOpenInterest,
            apy,
            dailyAPY,
            tvl,
            dailyTVL,
            poolRewards,
            dailyPoolRewards,
            coreDelegations,
            dailyCoreDelegations,
            allPerpStats,
            allPerpAccountStats,
            exchangeFees,
            summaryDataAPY,
            summaryDataDailyAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataCumulativeExchangeFees,
            dailyExchangeFees,
            summaryDataDailyExchangeFees,
          };

          appDispatch({ type: 'SET_INITIAL_DATA', payload: newData });
          //setCachedData(newData);
        }
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