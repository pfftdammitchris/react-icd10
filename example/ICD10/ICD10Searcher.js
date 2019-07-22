import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'
import onlyUpdateForKeys from 'util/onlyUpdateForKeys'
import Typography from 'components/common/Typography'
import useICD10 from 'hooks/useICD10'
import ICD10SearchInput from './ICD10SearchInput'

const StatusCaption = ({ fetching, fetchError, ...props }) => (
  <Typography
    variant="subtitle1"
    secondary={!fetchError && fetching}
    thirdary={!fetchError && !fetching}
    error={!!fetchError}
    {...props}
  >
    {fetching && 'Searching...'}
    {!fetching && 'Search a keyword'}
    {fetchError &&
      (fetchError ? fetchError.message || '' : 'An error occurred')}
  </Typography>
)

StatusCaption.propTypes = {
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
}

const OptimizedStatusCaption = onlyUpdateForKeys(['fetching', 'fetchError'])(
  StatusCaption,
)

const styles = {
  root: {
    marginBottom: 6,
  },
  statusCaption: {
    margin: '0 10px',
  },
}

const ProviderPortalMeetingICD10Searcher = ({
  classes,
  highlightField,
  highlightedField,
  updateField,
  popField,
  pushField,
  removeField,
  forEachField,
}) => {
  const user = useSelector((state) => state.app.user.user)
  const {
    fetching,
    fetchError,
    onSelect,
    onSearch,
    onStateChange,
    onKeyPress,
    downshiftReducer,
    stringify,
    data: { codes, results, total },
  } = useICD10({
    token: user.token,
    updateField,
    highlightField,
    highlightedField,
    popField,
    pushField,
    removeField,
    forEachField,
  })
  return (
    <div className={classes.root}>
      <OptimizedStatusCaption
        fetching={fetching}
        fetchError={fetchError}
        className={classes.statusCaption}
      />
      <ICD10SearchInput
        codes={codes}
        results={results}
        total={total}
        fetching={fetching}
        onSelect={onSelect}
        onInputValueChange={onSearch}
        highlightedField={highlightedField}
        stringify={stringify}
        onStateChange={onStateChange}
        downshiftReducer={downshiftReducer}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}

ProviderPortalMeetingICD10Searcher.propTypes = {
  classes: PropTypes.object.isRequired,
  highlightField: PropTypes.func.isRequired,
  highlightedField: PropTypes.number.isRequired,
  updateField: PropTypes.func.isRequired,
  popField: PropTypes.func.isRequired,
  pushField: PropTypes.func.isRequired,
  removeField: PropTypes.func.isRequired,
  forEachField: PropTypes.func.isRequired,
}

const areEqual = (props, nextProps) => {
  if (props.highlightedField === nextProps.highlightedField) return true
  return false
}

export default React.memo(
  withStyles(styles)(ProviderPortalMeetingICD10Searcher),
  areEqual,
)
