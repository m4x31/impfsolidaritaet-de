import React, { useEffect, useRef, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core';
import _, { round } from 'lodash';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


const PersonalRiskGraph = ({thrombosisRisk, deathRisk, loading}: any) => {

  const { t } = useTranslation();



  const shouldI = thrombosisRisk < deathRisk;

  let risk = 0;

  if (shouldI) {
    risk = round((deathRisk / thrombosisRisk), 1);
  }

  if (!shouldI) {
    risk =  round((thrombosisRisk / deathRisk), 1);
  }


  return (
    <div className="bg-primary-500 text-white flex-1 overflow-hidden rounded-lg max-w-lg relative">
      {loading && (
        <div className="absolute top-0 w-full"><LinearProgress /></div>
      )}
      <div className="px-4 py-5 sm:p-6 space-y-4">
        { shouldI && (
          <>
            <h2>{t('Lass dich mit Astrazeneca impfen!')}</h2>
            <p>{t('Dein Risiko an Corona zu sterben ist {{factor}} mal so hoch, wie das Risiko eine Thrombose durch eine Impfung mit Astrazeneca zu entwickeln. Verhalte dich solidarisch und lass dich mit Astrazeneca impfen!', { factor: risk })}</p>
          </>
        )}

        { !shouldI && (
          <>
            <h2>{t('Frage deinen Arzt')}</h2>
            <p>{t('Dein Risiko eine Thrombose durch eine Impfung mit Astrazeneca zu entwickeln ist statistisch betrachtet {{factor}} mal so hoch, wie das Risiko an Corona zu sterben. ', { factor: risk })}</p>
          </>
        )}
        <p className="text-gray-600">{t('')}</p>
      </div>
    </div>
  )
}

export default PersonalRiskGraph;