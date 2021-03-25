import { useIonRouter } from '@ionic/react';
import { useEffect } from 'react'
import { useMeQuery } from '../generated/graphql';


export const IsAuth = () => {
  const {loading, data} = useMeQuery();
  const router = useIonRouter();


  useEffect(() => {
    if (!loading && !data?.me) {
      router.push(`/login?next=${router.routeInfo.pathname}`);
    }
  }, [data, loading, router]);
}