import React from 'react'
import { RouteComponentProps } from 'react-router';
import { IsAuth } from '../../utils/useIsAuth';

interface UpdateVictimsProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const UpdateVictim: React.FC<UpdateVictimsProps> = ({match}) => {
    IsAuth();
    console.log(match.params.id);
    return (
      <></>
    );
}