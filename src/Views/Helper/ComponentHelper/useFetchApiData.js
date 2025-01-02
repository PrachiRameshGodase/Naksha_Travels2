import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useFetchApiData = (fetchAction, payloadGenerator, dependencies = []) => {

  const dispatch = useDispatch();
  const [trigger, setTrigger] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const payload = payloadGenerator();
      if (payload) {
        dispatch(fetchAction(payload));
      }
    } catch (error) {
      console.error("Error fetching api data:", error);
    }
  }, [dispatch, fetchAction, payloadGenerator]);

  useEffect(() => {
    if (trigger) {
      fetchData(); // Trigger the fetch
    } else {
      setTrigger(true); // Set to true after first render to avoid immediate fetch
    }
  }, [trigger, fetchData, ...dependencies]);

  return { triggerFetch: () => setTrigger(true) };
};

export default useFetchApiData;
