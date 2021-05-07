import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';



const Stats = ({ageGroup, selectedState, sex}: any) => {

  const { t } = useTranslation();

  const [stats, setStats] = useState();



  useEffect(() => {
    if (ageGroup && selectedState) {
      axios.get(`https://api.corona-zahlen.org/states/${selectedState}/age-groups`).then((res) =>{
        setStats(res.data.data);
        console.log({k: res.data.data});
      });
    }
  }, [ageGroup, selectedState])


  if (ageGroup && selectedState) {
    return (
      <div className="bg-white overflow-hidden shadow flex-1 rounded-lg max-w-lg">
        <div className="px-4 py-5 sm:p-6 space-y-10">
        <h2>{t('Stats')}</h2>

          ageGroup: {ageGroup} <br />
          selectedState: {selectedState}
          sex: {sex}

        </div>
      </div>
    )
  } else {

  }
}

export default Stats;