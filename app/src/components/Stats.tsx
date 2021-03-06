import React, { useEffect, useRef, useState } from 'react';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)


const Stats = ({incidenceData, loading}: any) => {

  const { t } = useTranslation();

  const canvas = useRef(null);
  const [chart, setChart] = useState<Chart>();


  const buildOrUpdateChart = () => {
    const history = incidenceData.history;
    const dayIndidence = history.slice(Math.max(history.length - 20, 0))

    const datasets = [
      {
        label: t('7-Tages-Inzidenz'),
        data: dayIndidence.map((data: any) => data.weekIncidence),
        fill: true,
        borderColor: '#2F6690',
      },
    ]

    const labels = dayIndidence.map((data: any) => {
      return moment(data.date).format('DD.MM.yyyy')
    });

    if (!chart) {
      const c = new Chart(canvas.current as any, {
        type: 'line',
        data: {
          labels,
          datasets,
        },
        options: {
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

  useEffect(() => {
    if (incidenceData) {
      buildOrUpdateChart();
    }
  }, [incidenceData])

  return (
    <div className="bg-white flex-1 overflow-hidden rounded-lg max-w-lg relative">
      {loading && (
        <div className="absolute top-0 w-full"><LinearProgress /></div>
      )}
      <div className="px-4 py-5 sm:p-6 space-y-4">
        <h2>{t('Aktuelles Infektionsgeschehen')}<sup>2</sup></h2>
        <p className="text-gray-600">{t('Aktuelles Infektionsgeschehen in deinem Bundesland.')}</p>
        <canvas ref={canvas} height="200"></canvas>
      </div>
    </div>
  )
}

export default Stats;