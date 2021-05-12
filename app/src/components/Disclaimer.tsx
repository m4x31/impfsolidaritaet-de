import React, { useEffect, useRef, useState } from 'react';

const Disclaimer = () => {

  return (
    <>
      <div className="text-sm text-gray-500 border-b space-y-4 p-4">
        <p>
          <sup>1</sup> Es wird nur dein persönliches Risiko betrachtet. Das Risiko andere anzustecken wird nicht betrachet.<br />
          <sup>2</sup> Daten des Robert Koch-Institut. Aufbereitet durch <a href="https://api.corona-zahlen.org/docs/">Robert Koch-Institut API (v2)</a> <br />
          <sup>3</sup> <a href="https://www.medrxiv.org/content/10.1101/2020.07.23.20160895v7">Assessing the Age Specificity of Infection Fatality Rates for COVID-19: Systematic Review, Meta-Analysis, and Public Policy Implications</a><br />
          <sup>4</sup> Infektionswahrscheinlichkeit * Infektionssterblichkeitsrate<br />
          <sup>5</sup> <a href="https://english.elpais.com/usa/2021-04-21/covid-19-vaccines-what-are-the-risks-and-benefits-for-each-age-group.html">Covid-19 vaccines: What are the risks and benefits for each age group?</a>: Primärquelle nachtragen sobald Zeit.
        </p>
        <p>
          Es handelt sich um ein Spaß-Projekt von <a href="https://www.codecouture.io/">Code Couture</a>. Hier gehts zum <a href="https://www.codecouture.io/impressum">Impressum</a>.
        </p>
        <p>
          Du hast einen Fehler gefunden? Sag gerne bescheid. Entweder <a href="https://www.codecouture.io/impressum#contact">mit unserem Kontaktformular</a>, oder <a href="https://twitter.com/maxengel">direkt auf Twitter</a>. Wenn du programmieren kannst, stelle direkt einen Pull-Request auf <a href="https://github.com/m4x31/impfsolidaritaet-de">GitHub</a>.
        </p>

        <p>
          Dieses Projekt ist auf <a href="https://github.com/m4x31/impfsolidaritaet-de">GitHub</a> verfügbar.
        </p>
      </div>
    </>
  )

}

export default Disclaimer;