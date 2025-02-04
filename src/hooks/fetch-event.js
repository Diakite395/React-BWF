import { useEffect, useState } from "react";
import { getEvent } from "../services/event-services";


export function useFetchEvent(token, id){
  const [data , setData] = useState(null);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);

  useEffect(()=>{
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getEvent(token, id)
        setData(data);
      } catch (error) {
        setError(true);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    getData()
  },[id]);
  return [data, loading, error]
}