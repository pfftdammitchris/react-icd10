import React from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Input from '@material-ui/core/Input'
import { IoIosSearch } from 'react-icons/io'
import Downshift from 'downshift'
import PopupMenu from './PopupMenu'

const styles = (theme) => ({
  root: {
    margin: 'auto',
  },
  inputWrapper: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  input: {
    height: 40,
    minWidth: 400,
    borderRadius: 12,
    background: theme.palette.background.cool,
    border: `1px solid ${theme.palette.borders.cool}`,
    '& input': {
      padding: '8px 3px',
      fontSize: '0.9rem',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      fontSize: '0.9rem',
    },
    '&:hover': {
      background: theme.palette.background.lightGrey2,
      color: theme.palette.text.soft,
      '& $searchIcon': {
        color: theme.palette.text.soft,
      },
    },
  },
  searchIcon: {
    color: theme.palette.secondary.main,
    transition: 'all 1.5s ease-out',
    fontSize: '1.2rem',
    padding: '3px 5px',
  },
  searchIconSearching: {
    color: theme.palette.thirdary.dark,
  },
  spinner: {
    transform: 'translateX(-16px)',
  },
})

const LoadingSpinner = ({ loading, ...props }) =>
  loading && (
    <CircularProgress
      color="secondary"
      size={30}
      thickness={3}
      variant="indeterminate"
      {...props}
    />
  )
LoadingSpinner.propTypes = {
  loading: PropTypes.bool.isRequired,
}

const ProviderPortalProverNotesICD10SearchInput = ({
  classes,
  codes = [],
  results,
  total,
  fetching,
  onSelect,
  onInputValueChange,
  stringify,
  onStateChange,
  downshiftReducer,
  onKeyPress,
}) => (
  <Downshift
    onSelect={onSelect}
    onInputValueChange={onInputValueChange}
    itemToString={stringify(results)}
    onStateChange={onStateChange}
    stateReducer={downshiftReducer}
  >
    {({
      getMenuProps,
      getInputProps,
      getItemProps,
      inputValue,
      highlightedIndex,
      isOpen,
    }) => (
      <div className={classes.inputWrapper}>
        <Input
          {...getInputProps({
            startAdornment: (
              <IoIosSearch
                className={cx(classes.searchIcon, {
                  [classes.searchIconSearching]: fetching,
                })}
              />
            ),
            endAdornment: (
              <LoadingSpinner className={classes.spinner} loading={fetching} />
            ),
            placeholder: ' Find references',
            disableUnderline: true,
            className: classes.input,
            title: 'Search ICD10 diagnosis',
            onKeyPress,
          })}
        />
        {!!codes.length && (
          <PopupMenu
            codes={codes}
            results={results}
            total={total}
            isOpen={isOpen}
            inputValue={inputValue}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            highlightedIndex={highlightedIndex}
          />
        )}
      </div>
    )}
  </Downshift>
)

ProviderPortalProverNotesICD10SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  codes: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  onInputValueChange: PropTypes.func.isRequired,
  stringify: PropTypes.func.isRequired,
  downshiftReducer: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProviderPortalProverNotesICD10SearchInput)
