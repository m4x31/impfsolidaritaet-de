import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';

export const ageGroups = [
  { title: '0 - 4', value: 0, apiValue: 'A00-A04' },
  { title: '5 - 14', value: 1, apiValue: 'A05-A14' },
  { title: '15 - 34', value: 2, apiValue: 'A15-A34' },
  { title: '35 - 59', value: 3, apiValue: 'A35-A59' },
  { title: '60 - 79', value: 4, apiValue: 'A60-A79' },
  { title: '80+', value: 5, apiValue: 'A80+' },
]

const sexs = [
  { title: 'Male', value: 'male' },
  { title: 'Female', value: 'female' },
]


const Inputs = ({ageGroup, setAgeGroup, selectedState, setSelectedState, sex, setSex}: any) => {

  const { t } = useTranslation();
  const [states, setStates] = useState([] as any[])


  useEffect(() => {
    axios.get('https://api.corona-zahlen.org/states').then((res) =>{
      console.log(res);
      setStates(_.values(res.data.data));
    });
  }, [])

  return (
    <div className="bg-white overflow-hidden shadow flex-1 rounded-lg max-w-lg">
      <div className="px-4 py-5 sm:p-6 space-y-10">
        <h2>{t('Personal information')}</h2>
        <div className="w-full grid grid-cols-3 gap-4 auto-cols-max">

          <div>
            {t('Age')}:
          </div>
          <div className="col-span-2">
            <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Age group')}</InputLabel>
              <Select
                value={ageGroup}
                onChange={(event) => {setAgeGroup(event.target.value as any)}}
                label={t('Age group')}
              >
                {ageGroups.map((ageGroup) => (
                  <MenuItem value={ageGroup.value}>{ageGroup.title} {t('years')}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            {t('Sex')}:
          </div>
          <div className="col-span-2">
            <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Sex')}</InputLabel>
              <Select
                value={sex}
                onChange={(event) => {setSex(event.target.value as any)}}
                label={t('Sex')}
              >
                {sexs.map((sex) => (
                  <MenuItem value={sex.value}>{t(sex.title)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            {t('State')}:
          </div>
          <div className="col-span-2">
            <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('State')}</InputLabel>
              <Select
                value={selectedState}
                onChange={(event) => {setSelectedState(event.target.value as any)}}
                label={t('State')}
              >
                {states.map((state) => (
                  <MenuItem value={state.abbreviation}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inputs;