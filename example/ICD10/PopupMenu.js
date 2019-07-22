import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import cx from 'classnames'
import reduce from 'lodash/reduce'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import startCase from 'lodash/startCase'

const styles = (theme) => ({
  list: {
    borderRadius: 12,
    background: theme.palette.background.cool,
    border: `1px solid ${theme.palette.borders.cool}`,
  },
  listItem: {
    border: '1px solid rgba(0, 0, 0, 0)',
    transition: 'all 0.1s ease-out',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.background.lightGrey2,
      '& $text': {
        transform: 'translateX(1.3px)',
        color: theme.palette.secondary.dark,
      },
    },
  },
  text: {
    fontSize: '0.77rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    color: theme.palette.text.soft,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.65rem',
    },
  },
  highlighted: {
    border: `1px solid ${theme.palette.thirdary.main}`,
  },
})

const filterer = (codes, results, inputValue = '') => (acc = [], code) => {
  let shouldShow = false
  const diagnosisResult = results[code] || ''
  const hasInvalidChars = /^.*?(?=[\+\^#%&$\*:<>\?/\{\|\}\[\]\\\)\(]).*$/g.test(
    inputValue,
  )
  if (hasInvalidChars) return acc
  const regexArgs = [inputValue, 'i']
  if (!inputValue) {
    shouldShow = true
  } else if (new RegExp(...regexArgs).test(diagnosisResult) !== -1) {
    shouldShow = true
  } else if (new RegExp(...regexArgs).test(code) !== -1) shouldShow = true
  if (shouldShow) acc.push(code)
  return acc
}

const ProviderPortalICD10PopupMenu = ({
  classes,
  isOpen,
  codes,
  results,
  total,
  inputValue,
  getMenuProps,
  getItemProps,
  highlightedIndex,
}) => {
  if (!isOpen || !total) return null
  const reducer = reduce(codes, filterer(codes, results, inputValue), [])
  return (
    <List
      className={classes.list}
      data-testid="icd10-click-away-listener"
      dense
      {...getMenuProps()}
    >
      {reducer.map((code, index) => (
        <ListItem
          {...getItemProps({
            key: `${code}${index}`,
            index,
            item: code,
            className: cx(classes.listItem, {
              [classes.highlighted]: highlightedIndex === index,
            }),
          })}
        >
          <ListItemText className={classes.text} disableTypography>
            {code}: {startCase(results[code].toUpperCase())}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

ProviderPortalICD10PopupMenu.propTyes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  codes: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  inputValue: PropTypes.string,
  getMenuProps: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProviderPortalICD10PopupMenu)
