import getControl from '../../../../utils/getControl';
import mapValues from 'lodash/mapValues';
import randomValues from '../../../../utils/randomValues';
import valueOrNullOrUndefined from '../../../../utils/valueOrNullOrUndefined';

export default (propTypeData, customMetaData) => {
  const canBeNull = !propTypeData.required;
  const canBeUndefined = !propTypeData.required;
  const normalizedPropsWithControls = mapValues(propTypeData.value, (prop, key) => {
    const nestedCustomMetaData = customMetaData.constraints.props[key];
    prop.control = getControl(prop, nestedCustomMetaData); // eslint-disable-line no-param-reassign
    prop.controlType = nestedCustomMetaData && nestedCustomMetaData.controlType; // eslint-disable-line no-param-reassign, max-len
    prop.customMetaData = nestedCustomMetaData; // eslint-disable-line no-param-reassign, max-len
    return prop;
  });
  const value = randomValues(normalizedPropsWithControls);
  return valueOrNullOrUndefined(value, canBeNull, canBeUndefined);
};
