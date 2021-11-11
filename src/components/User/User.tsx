import React from 'react';
import { useParams } from 'react-router';

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(typeof id);
  return (
    <div>
      <div>{id}</div>
    </div>
  );
};

export default User;
