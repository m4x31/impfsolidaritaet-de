import React, { useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Inputs from '../components/Inputs';
import Stats from '../components/Stats';

const Routes = () => (
  <Router>
    <Switch>
      <Route component={RiscCalculation} />
    </Switch>
  </Router>
);

const RiscCalculation = () => {

  const [ageGroup, setAgeGroup] = useState();
  const [selectedState, setSelectedState] = useState('');
  const [sex, setSex] = useState('');


  return (
    <div className="flex justify-center">

        <div className="flex-1 max-w-lg space-y-4">
          <Inputs
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            sex={sex}
            setSex={setSex}
          />

          <Stats
            ageGroup={ageGroup}
            selectedState={selectedState}
            sex={sex}
          />

        </div>


    </div>
  )
}



export default Routes;
