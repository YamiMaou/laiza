import Langs from '~/langs';

const lang = new Langs();
const word = lang.getWord();

export const monthsList = word.monthList;

export const daysList = word.dayList;
