import React from 'react';
import {useParams} from 'react-router-dom';
export default function UserDetail() {
  const {id} = useParams();

  return (<h1 className='text-center'>{id}</h1>)
}