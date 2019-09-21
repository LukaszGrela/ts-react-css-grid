import { connect } from 'react-redux';
import GridView, { IProps } from './GridView';
import { AppState } from '../../store';
import { stringToHashedColour } from '../../utils/stringToHashedColour';

type TStateProps = Pick<IProps, 'columns' | 'rows' | 'gridStyle' | 'gridContent'>;
const mapStateToProps = (state: AppState): TStateProps => ({
  columns: state.grid.columns,
  rows: state.grid.rows,
  gridStyle: state.grid.style,

  gridContent: [
    stringToHashedColour('jeden 1'),
    stringToHashedColour('dwa 2'),
    stringToHashedColour('trzy 3'),
    stringToHashedColour('cztery 4'),
    stringToHashedColour('piec 5'),
    stringToHashedColour('szesc 6'),
    stringToHashedColour('siedem 7'),
    stringToHashedColour('osiem 8'),
  ]
});

export default connect(mapStateToProps)(GridView);
