import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
export const useJob = (job: (...args: any[]) => any) => {
    const [doing, setDoing] = useState(false);
    const [done, setDone] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<unknown>();

    const go = async (...args: any[]) => {
        setDone(false);
        setDoing(true);

        setData(null);
        setError(null);

        let response = null;

        try {
            response = await job(...args);
        } catch (err) {
            setError(err);
        }

        setDoing(false);
        setDone(true);

        setData(response);

        return response;
    };

    return { go, done, doing, data, error };
};

export default useJob;
