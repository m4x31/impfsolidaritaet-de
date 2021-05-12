import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import InfoBox from '../components/InfoBox';
import Inputs from '../components/Inputs';
import Intro from '../components/Intro';
import CoronaPersonalRisk from '../components/CoronaPersonalRisk';
import Stats from '../components/Stats';
import environment from '../environment';
import AZPersonalRisk from '../components/AZPersonalRisk';
import _ from 'lodash';
import PersonalRiskGraph from '../components/PersonalRiskGraph';
import Disclaimer from '../components/Disclaimer';
import DangerBox from '../components/DangerBox';
import Conclusion from '../components/Conclusion';
import WarningBox from '../components/WarningBox';

const Routes = () => (
  <Router>
    <Switch>
      <Route component={RiskCalculation} />
    </Switch>
  </Router>
);

// export const round = (num: number) => {
//   return Math.round(num * 100000) / 100000;
// }

const thrombosisRiskByAge = (age: number) => {
  // https://english.elpais.com/usa/2021-04-21/covid-19-vaccines-what-are-the-risks-and-benefits-for-each-age-group.html
  // primärquelle rauswursteln

  let casesPer100k = 0;
  if(age >= 20 && age < 30) {
    casesPer100k = 2;
  } else if (age >= 30 && age < 40) {
    casesPer100k = 1.6;
  } else if (age >= 40 && age < 50) {
    casesPer100k = 1;
  } else if (age >= 50 && age < 60) {
    casesPer100k = 0.8;
  } else if (age >= 60) {
    casesPer100k = 0.4;
  }

  const riskPer100k = casesPer100k / 100000;

  return _.round(riskPer100k * 100, 5).toString();
}

const RiskCalculation = () => {
  const { t } = useTranslation();
  const [selectedAge, setSelectedAge] = useState();
  const [selectedState, setSelectedState] = useState('');
  const [sex, setSex] = useState('');
  const [loading, setLoading] = useState(false);
  const [incidenceData, setIncidenceData] = useState<any>();

  const [infectionRisk, setInfectionRisk] = useState('');
  const [IRFRisk, setIRFRisk] = useState('');
  const [deathRisk, setDeathRisk] = useState('');

  const [thrombosisRisk, setThrombosisRisk] = useState('');

  const calulcatePersonalRisk = () => {

    const iR = (_.get(_.last(incidenceData!.history), 'weekIncidence', 0) / 100000);
    setInfectionRisk(_.round(iR * 100, 5).toString(10));

    // https://www.medrxiv.org/content/10.1101/2020.07.23.20160895v7
    const ifr = 10 ** (-3.27 + 0.0524 * selectedAge!) / 100
    setIRFRisk(_.round(ifr * 100, 5).toString(10));

    const dR = ifr * iR;
    setDeathRisk(_.round(dR * 100, 7) + '')

    setThrombosisRisk(thrombosisRiskByAge(selectedAge!));
  }

  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      axios.get(`${environment.dataAPIEndpoint}/states/${selectedState}/history/incidence`).then(async (res) =>{
        const d = res.data.data;
        setIncidenceData(d[selectedState]);
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }, [selectedState])

  useEffect(() => {
    if (incidenceData) {
      calulcatePersonalRisk();
    }
  }, [incidenceData, selectedAge])

  return (
    <div className="flex justify-center py-8">
      <div className="flex-1 max-w-lg space-y-8">

        <Intro />
        <DangerBox text={t('Die Informationen auf dieser Seite sind nur als grober Anhaltspunkt gedacht und stellen keinen medizinischen Rat dar. Diese Seite ersetzt auf keinen Fall eine ärztliche Konsultation. Dein individuelles Risiko kann ganz anders ausfallen.')} />
        <WarningBox text={t('Achtung: In einer älteren Version dieses Rechners war ein Fehler, sodass das Gesamtrisiko an Corona zu sterben um den Faktor 100 zu hoch war. Das wurde in dieser Version gefixt.')} />
        <Inputs
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          sex={sex}
          setSex={setSex}
        />
        {selectedState && selectedAge !== undefined && (
          <>
            <Stats
              incidenceData={incidenceData}
              loading={loading}
            />
            <CoronaPersonalRisk
              infectionRisk={infectionRisk}
              IRFRisk={IRFRisk}
              deathRisk={deathRisk}
              loading={loading}
            />
            <AZPersonalRisk
              thrombosisRisk={thrombosisRisk}
              loading={loading}
            />
            <PersonalRiskGraph
              thrombosisRisk={thrombosisRisk}
              infectionRisk={infectionRisk}
              IRFRisk={IRFRisk}
              deathRisk={deathRisk}
              loading={loading}
            />
            <Conclusion
              thrombosisRisk={thrombosisRisk}
              deathRisk={deathRisk}
              loading={loading}
            />
            <DangerBox text={t('Die Informationen auf dieser Seite sind nur als grober Anhaltspunkt gedacht und stellen keinen medizinischen Rat dar. Diese Seite ersetzt auf keinen Fall eine ärztliche Konsultation. Dein individuelles Risiko kann ganz anders ausfallen.')} />
          </>
        )}
        { (!selectedState || selectedAge === undefined) && (
          <InfoBox text={t('Bitte gebe deine persönlichen Daten ein, um eine individuelle Risikoabschätzung zu erhalten.')} />
        )}

        <Disclaimer />
      </div>
    </div>
  )
}



export default Routes;
