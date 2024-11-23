// /* eslint-disable prefer-const */
// import React, { useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown';
// import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';
// import { getUserLocations } from '../api/userData';

// export default function Selector({ singleLocationId }) {
//   const [tempList, setTempList] = useState([{}]);
//   const { user } = useAuth();

//   const getAllLocations = () => {
//     getUserLocations(user.id).then(setTempList);
//   };

//   useEffect(() => {
//     getAllLocations();
//   }, []);

//   const submitClick = (locationId) => {
//     singleLocationId(locationId);
//     console.warn(locationId, user.id);
//   };

//   return (
//     <div>

//       <Dropdown>
//         <Dropdown.Toggle variant="success" id="dropdown-basic">
//           Select a Location
//         </Dropdown.Toggle>

//         <Dropdown.Menu>

//           <div>
//             {tempList.map((location) => (
//               // GIVE DATA
//               <Dropdown.Item onClick={() => submitClick(location.id)}> {location.name} </Dropdown.Item>
//             ))}
//           </div>

//         </Dropdown.Menu>
//       </Dropdown>
//     </div>
//   );
// }

// Selector.propTypes = {

//   singleLocationId: PropTypes.func.isRequired,
// };
