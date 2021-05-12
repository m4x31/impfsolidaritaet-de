import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { LinearProgress } from '@material-ui/core';
import Stat from './Stat';


const CoronaPersonalRisk = ({infectionRisk, IRFRisk, deathRisk, loading}: any) => {

  const { t } = useTranslation();

  return (
    <div className="bg-white flex-1 overflow-hidden rounded-lg max-w-lg relative">
      {loading && (
        <div className="absolute top-0 w-full"><LinearProgress /></div>
      )}
      <div className="px-4 py-5 sm:p-6 space-y-4">
        <h2>{t('Risiken durch Corona')}</h2>
        <p>{t('Ansteckungswahrscheinlichkeit abhängig von der Inzidenz in deinem Bundesland. Infektionssterblichkeitsrate abhängig vom Alter.')}</p>
        <Stat value={`${infectionRisk} %`} label={t('Infektionswahrscheinlichkeit')} />
        <Stat value={`${IRFRisk} %`} label={t('Infektionssterblichkeitsrate')} sup={'3'} />
        <Stat value={`${deathRisk} %`} label={t('Gesamtrisiko an Corona zu sterben')} sup={'4'}/>
      </div>
    </div>
  )
}


export default CoronaPersonalRisk;