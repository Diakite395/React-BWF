import { useEffect, useState } from "react";
import { getGroup } from "../services/group-services";


export function useFetchGroup(id){
  const [data , setData] = useState(null);
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState(false);

  useEffect(()=>{
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getGroup(id)
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