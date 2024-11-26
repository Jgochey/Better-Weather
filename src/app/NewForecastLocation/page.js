import React from 'react';
import PropTypes from 'prop-types';
import NewLocationForm from '../../components/forms/NewLocationForm';

export default function NewForecastLocation({ params }) {
  const { locationId } = params;
  return <NewLocationForm locationId={locationId} />;
}

NewForecastLocation.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
