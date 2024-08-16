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
        } else {
          const [
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
            uniqueStakers,
            uniqueTraders,
            perpsVolume,
            exchangeFees,
            collectedFees,
            openInterest,
            dailyOpenInterest,
            summaryDataAPY,
            summaryDataDailyAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            dailyPerpsVolume,
            dailyCollectedFees,
            dailyExchangeFees,
            summaryDataDailyPerpsVolume,
            summaryDataDailyCollectedFees,
            summaryDataDailyExchangeFees,
          ] = await Promise.all([
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
            API.fetchCumulativeUniqueStakers(),
            API.fetchCumulativeUniqueTraders('base'),
            API.fetchCumulativePerpsVolume('base'),
            API.fetchCumulativeExchangeFees('base'),
            API.fetchCumulativeCollectedFees('base'),
            API.fetchOpenInterest('base'),
            API.fetchDailyOpenInterest('base'),
            API.fetchSummaryDataAPY('base'),
            API.fetchSummaryDataDailyAPY('base'),
            API.fetchSummaryDataTVL('base'),
            API.fetchSummaryDataDailyTVL('base'),
            API.fetchSummaryDataPoolRewards('base'),
            API.fetchSummaryDataDailyPoolRewards('base'),
            API.fetchSummaryDataCoreDelegations('base'),
            API.fetchSummaryDataDailyCoreDelegations('base'),
            API.fetchSummaryDataUniqueStakers('base'),
            API.fetchSummaryDataCumulativeUniqueTraders('base'),
            API.fetchSummaryDataCumulativePerpsVolume('base'),
            API.fetchSummaryDataCumulativeExchangeFees('base'),
            API.fetchSummaryDataCumulativeCollectedFees('base'),
            API.fetchSummaryDataOpenInterest('base'),
            API.fetchDailyUniqueStakers('base'),
            API.fetchSummaryDataDailyUniqueStakers('base'),
            API.fetchDailyUniqueTraders('base'),
            API.fetchSummaryDataDailyUniqueTraders('base'),
            API.fetchDailyPerpsVolume('base'),
            API.fetchDailyCollectedFees('base'),
            API.fetchDailyExchangeFees('base'),
            API.fetchSummaryDataDailyPerpsVolume('base'),
            API.fetchSummaryDataDailyExchangeFees('base'),
            API.fetchSummaryDataDailyCollectedFees('base'),
          ]);

          const newData = {
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
            uniqueStakers,
            uniqueTraders,
            perpsVolume,
            exchangeFees,
            collectedFees,
            openInterest,
            dailyOpenInterest,
            summaryDataAPY,
            summaryDataDailyAPY,
            summaryDataTVL,
            summaryDataDailyTVL,
            summaryDataPoolRewards,
            summaryDataDailyPoolRewards,
            summaryDataCoreDelegations,
            summaryDataDailyCoreDelegations,
            summaryDataUniqueStakers,
            summaryDataUniqueTraders,
            summaryDataCumulativePerpsVolume,
            summaryDataCumulativeExchangeFees,
            summaryDataCumulativeCollectedFees,
            summaryDataOpenInterest,
            dailyUniqueStakers,
            summaryDataDailyUniqueStakers,
            dailyUniqueTraders,
            summaryDataDailyUniqueTraders,
            dailyPerpsVolume,
            dailyCollectedFees,
            dailyExchangeFees,
            summaryDataDailyPerpsVolume,
            summaryDataDailyCollectedFees,
            summaryDataDailyExchangeFees,
          };

          appDispatch({ type: 'SET_INITIAL_DATA', payload: newData });
          //setCachedData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [appDispatch, setIsLoading]);
};

export default useInitialDataFetch;