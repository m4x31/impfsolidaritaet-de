import React, { useEffect, useRef, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


const PersonalRiskGraph = ({thrombosisRisk, infectionRisk, IRFRisk, deathRisk, loading}: any) => {

  const { t } = useTranslation();

  const canvas = useRef(null);
  const [chart, setChart] = useState<Chart>();


  const buildOrUpdateChart = () => {
    const datasets = [
      {
        label: t('Wahrscheinlichkeiten'),
        data: [
          deathRisk,
          thrombosisRisk
        ],
        fill: true,
        borderColor: '#2F6690',
        backgroundColor: '#A4C7E1'
      },
    ]

    const labels = [
      t('Tod durch Corona'),
      t('Enstehung Thrombose')
    ]

    if (!chart) {
      const c = new Chart(canvas.current as any, {
        type: 'bar',
        data: {
          labels,
          datasets,
        },
        options: {
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
          },
        }
      });
      setChart(c);
    } else {
      chart.data.datasets = datasets;
      chart.data.labels = labels;
      chart.update();
    }
  }

  useEffect(buildOrUpdateChart, [thrombosisRisk, infectionRisk, IRFRisk, deathRisk])

  return (
    <div className="bg-white flex-1 overflow-hidden rounded-lg max-w-lg relative">
      {loading && (
        <div className="absolute top-0 w-full"><LinearProgress /></div>
      )}
      <div className="px-4 py-5 sm:p-6 space-y-4">
        <h2>{t('Risikovergleich')}</h2>
        <p>{t('Wahrscheinlichkeit eine Thrombose durch eine Astrazeneca-Impfung zu entwickeln vs. Tod durch Corona. Beachte aber, dass nicht jede Thrombose zum Tod führt.')}</p>
        <canvas ref={canvas} height="200"></canvas>
      </div>
    </div>
  )
}

export default PersonalRiskGraph;