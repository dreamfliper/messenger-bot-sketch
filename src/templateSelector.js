import { createSelector } from 'reselect'

const getCurrentIndex = ({ duckModule }) => duckModule.currentIndex
const getTemplate = ({ duckModule }) => duckModule.templateDB

export default createSelector(
  [getCurrentIndex, getTemplate],
  (currentIndex, templateDB) => templateDB[currentIndex],
)
