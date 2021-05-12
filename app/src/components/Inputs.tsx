import React, { useEffect, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import _ from 'lodash';
import environment from '../environment';

export const ageGroups = [
  { title: '0 - 4', value: 0, apiValue: 'A00-A04' },
  { title: '5 - 14', value: 1, apiValue: 'A05-A14' },
  { title: '15 - 34', value: 2, apiValue: 'A15-A34' },
  { title: '35 - 59', value: 3, apiValue: 'A35-A59' },
  { title: '60 - 79', value: 4, apiValue: 'A60-A79' },
  { title: '80+', value: 5, apiValue: 'A80+' },
]

const sexs = [
  { title: 'Männlich', value: 'male' },
  { title: 'Weiblich', value: 'female' },
]


const Inputs = ({selectedAge, setSelectedAge, selectedState, setSelectedState, sex, setSex}: any) => {

  const { t } = useTranslation();
  const [states, setStates] = useState([] as any[])


  useEffect(() => {
    axios.get(`${environment.dataAPIEndpoint}/states`).then((res) =>{
      setStates(_.values(res.data.data));
    });
  }, [])

  return (
    <div className="bg-white overflow-hidden flex-1 rounded-lg max-w-lg">
      <div className="px-4 py-5 sm:p-6 space-y-4">
        <h2>{t('Deine Angaben')}</h2>
        <p className="text-gray-600">{t('Gebe für deine persönliche Risikoabschätzung deine Daten ein. Alle Daten werden lokal verarbeitet.')}</p>
        <div className="block w-full space-y-4">


            {/* <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Altersgruppe')}</InputLabel>
              <Select
                value={selectedAgeGroupIndex}
                onChange={(event) => {setSelectedAgeGroupIndex(event.target.value as any)}}
                label={t('Altersgruppe')}
              >
                {ageGroups.map((ageGroup) => (
                  <MenuItem value={ageGroup.value}>{ageGroup.title} {t('Jahre')}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
            {/* <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Alter')}</InputLabel> */}
              <TextField
                className="w-full"
                variant="outlined"
                required
                value={selectedAge}
                onChange={(event) => {
                  const v = parseInt(event.target.value, 10);
                  setSelectedAge(v);
                }}
                onBlur={(event) => {
                  const v = parseInt(event.target.value, 10);
                  const min = Math.max(18, v);
                  const max = Math.min(min, 80);
                  setSelectedAge(max);
                }}
                label={t('Alter')}
                InputProps={{ inputProps: { min: 18, max: 80 } }}
                type="number"
              />
            {/* </FormControl> */}

            <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Geschlecht')}</InputLabel>
              <Select
                value={sex}
                onChange={(event) => {setSex(event.target.value as any)}}
                label={t('Geschlecht')}
              >
                {sexs.map((sex) => (
                  <MenuItem value={sex.value}>{t(sex.title)}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="w-full">
              <InputLabel>{t('Bundesland')}</InputLabel>
              <Select
                value={selectedState}
                onChange={(event) => {setSelectedState(event.target.value as any)}}
                label={t('Bundesland')}
              >
                {states.map((state) => (
                  <MenuItem value={state.abbreviation}>{state.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

        </div>
      </div>
    </div>
  )
}

export default Inputs;