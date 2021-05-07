
const environmentForStage = () => {
  switch (process.env.REACT_APP_STAGE) {
    case 'staging':
      return {

      }
    case 'prod':
      return {
      }
    default:
      return {

      }
  }
}
const environment = environmentForStage();
export default environment;