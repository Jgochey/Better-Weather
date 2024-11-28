'use client';

import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NewLocationForm from '../../../../../components/forms/NewLocationForm';
import { useAuth } from '../../../../../utils/context/authContext';
import { getSingleLocation } from '../../../../../api/userData';

export default function EditLocation({ params }) {
  const { firebaseKey } = params;
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getSingleLocation(user.uid, firebaseKey).then(setEditItem);
  }, [user, firebaseKey]);

  return <NewLocationForm obj={editItem} />;
}

EditLocation.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
