import { useEffect, useState } from "react";
import axios from "axios";

const customHook = (url) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url]);

  return { loader, data, error };
};

export default customHook;
