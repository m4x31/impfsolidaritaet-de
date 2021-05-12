import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { LinearProgress } from '@material-ui/core';
import Stat from './Stat';


const AZPersonalRisk = ({loading, thrombosisRisk}: any) => {

  const { t } = useTranslation();

  return (
    <div className="bg-white flex-1 overflow-hidden rounded-lg max-w-lg relative">
      {loading && (
        <div className="absolute top-0 w-full"><LinearProgress /></div>
      )}
      <div className="px-4 py-5 sm:p-6 space-y-4">
        <h2>{t('Risiken durch eine Astrazeneca-Impfung')}</h2>
        <p>{t('Risiko eine Thrombose zu entwickeln, abhängig vom Alter.')}</p>
        <Stat secondary value={`${thrombosisRisk} %`} label={t('Wahrscheinlichkeit für Thrombose')} sup={5}/>
      </div>
    </div>
  )
}

export default AZPersonalRisk;