import {StyleSheet} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';
import { horizontalScale } from '../../assets/styles/scaling';

const style = StyleSheet.create({
  userImageContainer: {
    borderColor: '#F35BAC',
    borderWidth: 1,
    padding: horizontalScale(3),
    borderRadius: 65,
  },
});

export default style;
