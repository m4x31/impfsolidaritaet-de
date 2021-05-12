
const environmentForStage = () => {
  switch (process.env.REACT_APP_STAGE) {
    case 'staging':
      return {
        dataAPIEndpoint: 'https://api.impfsolidaritaet.de',
      }
    case 'prod':
      return {
        dataAPIEndpoint: 'https://api.impfsolidaritaet.de',
      }
    default:
      return {
        dataAPIEndpoint: 'https://api.impfsolidaritaet.de',
      }
  }
}
const environment = environmentForStage();
export default environment;